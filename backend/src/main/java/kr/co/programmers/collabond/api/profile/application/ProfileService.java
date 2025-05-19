package kr.co.programmers.collabond.api.profile.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.address.infrastructure.AddressRepository;
import kr.co.programmers.collabond.api.file.application.FileService;
import kr.co.programmers.collabond.api.file.domain.File;
import kr.co.programmers.collabond.api.file.infrastructure.FileRepository;
import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.image.infrastructure.ImageRepository;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.tag.application.TagService;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import kr.co.programmers.collabond.api.profile.interfaces.ProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ImageRepository imageRepository;
    private final FileService fileService;
    private final FileRepository fileRepository;
    private final TagService tagService;

    @Transactional
    public ProfileResponseDto create(ProfileRequestDto dto,
                                     MultipartFile profileImage,
                                     MultipartFile thumbnailImage,
                                     List<MultipartFile> extraImages,
                                     List<Long> tagIds) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        if (!user.getRole().name().contains(dto.getType())) {
            throw new IllegalStateException("유저의 권한과 프로필 타입이 일치하지 않습니다.");
        }

        if (profileRepository.countByUserId(user.getId()) >= 5) {
            throw new IllegalStateException("프로필은 최대 5개까지 생성 가능합니다.");
        }
        // profile의 adressId 가 있을 경우 주소 엔티티 조회, 있으면 주소 가져오고 없으면 null
        Address address = dto.getAddressId() != null
                ? addressRepository.findById(dto.getAddressId()).orElse(null)
                : null;
        // Profile 엔티티 생성, db에 저장 후 ResponseDto 반환
        Profile profile = ProfileMapper.toEntity(dto, user, address);
        Profile savedProfile= profileRepository.save(profile);
        // 이미지 업로드
        updateImage(savedProfile.getId(), savedProfile, profileImage, "PROFILE");
        updateImage(savedProfile.getId(), savedProfile, thumbnailImage, "THUMBNAIL");
        updateExtraImages(savedProfile.getId(), savedProfile, extraImages);

        if (!hasRequiredImages(savedProfile.getId())) {
            throw new IllegalStateException("PROFILE 이미지와 THUMBNAIL 이미지는 각각 1개 이상 필수입니다.");
        }


        // 태그 등록
        if (tagIds != null && !tagIds.isEmpty()) {
            tagService.validateAndBindTags(savedProfile, tagIds);
        }


        return ProfileMapper.toResponseDto(savedProfile);
    }

    @Transactional
    public ProfileResponseDto update(Long profileId,
                                     ProfileRequestDto dto,
                                     MultipartFile profileImage,
                                     MultipartFile thumbnailImage,
                                     List<MultipartFile> extraImages,
                                     List<Long> tagIds) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));

        profile.update(dto.getName(), dto.getDescription(), dto.getDetailAddress());


        updateImage(profileId, profile, profileImage, "PROFILE");
        updateImage(profileId, profile, thumbnailImage, "THUMBNAIL");
        updateExtraImages(profileId, profile, extraImages);

        if (!hasRequiredImages(profileId)) {
            throw new IllegalStateException("PROFILE 이미지와 THUMBNAIL 이미지는 각각 1개 이상 필수입니다.");
        }
        // 태그 재설정
        tagService.clearTags(profile); //기존 태그 모두 삭제 후
        tagService.validateAndBindTags(profile, tagIds); //태그 최대 5개 등록 및 타입 검증

        return ProfileMapper.toResponseDto(profile);
    }

    @Transactional
    public void delete(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));

        // file에서 하드 딜리트
        imageRepository.findByProfileId(profileId)
                .forEach(image -> fileRepository.deleteById(image.getFile().getId()));

        // 프로필은 soft delete (@SQLDelete)
        profileRepository.delete(profile);
    }

    // 프로필 단건 조회
    public Optional<ProfileResponseDto> findById(Long id) {
        return profileRepository.findById(id)
                .map(ProfileMapper::toResponseDto);
    }

    // 유저의 전체 프로필 목록 조회
    public List<ProfileResponseDto> findAllByUser(Long userId) {
        return profileRepository.findAllByUserId(userId).stream()
                .map(ProfileMapper::toResponseDto)
                .toList();
    }

    // 이미지 저장 메서드
    private void saveImage(Profile profile, MultipartFile imageFile, String type, Integer priority) {
        try {
            File file = fileService.saveFile(imageFile);
            Image image = Image.builder()
                    .file(file)
                    .type(type)
                    .priority(priority)
                    .build();
            profile.addImage(image);
        } catch (IOException e) {
            throw new RuntimeException("이미지 저장 실패", e);
        }
    }

    //타입별 이미지 삭제 (파일 하드삭제 ,이미지 삭제)
    private void deleteImagesByType(Long profileId, String type) {
        imageRepository.findByProfileIdAndType(profileId, type)
                .forEach(image -> {
                    fileRepository.deleteById(image.getFile().getId());
                    imageRepository.delete(image);
                });
    }
    private void updateImage(Long profileId, Profile profile, MultipartFile imageFile, String type) {
        if (imageFile != null && !imageFile.isEmpty()) {
            deleteImagesByType(profileId, type);
            saveImage(profile, imageFile, type, 1);
        }
    }

    private void updateExtraImages(Long profileId, Profile profile, List<MultipartFile> extraImages) {
        if (extraImages != null && !extraImages.isEmpty()) {
            deleteImagesByType(profileId, "EXTRA");
            for (int i = 0; i < extraImages.size(); i++) {
                MultipartFile file = extraImages.get(i);
                if (!file.isEmpty()) {
                    saveImage(profile, file, "EXTRA", i + 1);
                }
            }
        }
    }


    // 프로필, 썸네일 1개이상인지 확인
    private boolean hasRequiredImages(Long profileId) {
        long profileCount = imageRepository.findByProfileIdAndType(profileId, "PROFILE").size();
        long thumbnailCount = imageRepository.findByProfileIdAndType(profileId, "THUMBNAIL").size();
        return profileCount >= 1 && thumbnailCount >= 1;
    }
}
