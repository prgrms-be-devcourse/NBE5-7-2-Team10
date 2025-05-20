package kr.co.programmers.collabond.api.profile.application;

import kr.co.programmers.collabond.api.address.application.AddressService;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.file.domain.File;
import kr.co.programmers.collabond.api.file.application.FileService;
import kr.co.programmers.collabond.api.image.application.ImageService;
import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.image.infrastructure.ImageMapper;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.tag.application.TagService;
import kr.co.programmers.collabond.api.user.application.UserService;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.profile.interfaces.ProfileMapper;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import kr.co.programmers.collabond.shared.exception.ErrorCode;
import kr.co.programmers.collabond.shared.exception.custom.ForbiddenException;
import kr.co.programmers.collabond.shared.exception.custom.InternalException;
import kr.co.programmers.collabond.shared.exception.custom.InvalidException;
import kr.co.programmers.collabond.shared.exception.custom.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final AddressService addressService;
    private final ImageService imageService;
    private final FileService fileService;
    private final UserService userService;
    private final TagService tagService;

    private final ProfileRepository profileRepository;

    @Transactional
    public ProfileResponseDto create(ProfileRequestDto dto,
                                     MultipartFile profileImage,
                                     MultipartFile thumbnailImage,
                                     List<MultipartFile> extraImages,
                                     OAuth2UserInfo userInfo) {

        User user = userService.findByProviderId(userInfo.getUsername());

        if (!user.getRole().name().contains(dto.getType())) {
            throw new ForbiddenException();
        }

        if (profileRepository.countByUserId(user.getId()) >= 5) {
            throw new InvalidException(ErrorCode.CREATE_NO_MORE);
        }

        // profile의 adressId 가 있을 경우 주소 엔티티 조회, 있으면 주소 가져오고 없으면 null
        Address address = addressService.findByAddressId(dto.getAddressId());

        // Profile 엔티티 생성, db에 저장 후 ResponseDto 반환
        Profile profile = ProfileMapper.toEntity(dto, user, address);

        saveImage(profile, profileImage, "PROFILE", 1);
        saveImage(profile, thumbnailImage, "THUMBNAIL", 1);

        if (extraImages != null && !extraImages.isEmpty()) {
            for (int i = 0; i < extraImages.size(); i++) {
                MultipartFile file = extraImages.get(i);
                if (!file.isEmpty()) {
                    saveImage(profile, file, "EXTRA", i + 1);
                }
            }
        }

        Profile savedProfile = profileRepository.save(profile);
        List<Long> tagIds = dto.getTagIds();

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
                                     List<MultipartFile> extraImages) {

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.PROFILE_NOT_FOUND));

        profile.update(dto.getName(), dto.getDescription(), dto.getDetailAddress());

        updateImage(profile, profileImage, "PROFILE");
        updateImage(profile, thumbnailImage, "THUMBNAIL");
        updateExtraImages(profile, extraImages);

        // 태그 재설정
        tagService.clearTags(profile); //기존 태그 모두 삭제 후
        tagService.validateAndBindTags(profile, dto.getTagIds()); //태그 최대 5개 등록 및 타입 검증

        return ProfileMapper.toResponseDto(profile);
    }

    @Transactional
    public void delete(Long profileId) {

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.PROFILE_NOT_FOUND));

        // 파일은 hard delete
        profile.getImages().clear();

        // profile은 엔티티  @SQLDelete로 인해 soft delete 됨
        profileRepository.delete(profile);
    }

    // ID로 프로필 조회 후 존재할 경우 ResponseDto로 변환하여 반환
    public Optional<ProfileResponseDto> findById(Long id) {
        return profileRepository.findById(id)
                .map(ProfileMapper::toResponseDto);
    }

    // 특정 User의 모든 프로필 조회, 각 프로필을 ResponseDto로 매필해 반환
    public List<ProfileResponseDto> findAllByUser(Long userId) {
        return profileRepository.findAllByUserId(userId).stream()
                .map(ProfileMapper::toResponseDto)
                .toList();
    }

    // 이미지 저장 메서드
    private void saveImage(Profile profile,
                           MultipartFile imageFile,
                           String type,
                           Integer priority) {

        try {
            File file = fileService.saveFile(imageFile);
            Image image = ImageMapper.toEntity(file, type, priority);
            profile.addImage(image);
        } catch (RuntimeException e) {
            throw new InternalException(ErrorCode.SAVE_IMAGE_ERROR);
        }
    }

    //타입별 이미지 삭제 (파일 하드삭제 ,이미지 삭제)
    private void deleteImagesByType(Profile profile, String type) {
        imageService.findByProfileIdAndType(profile.getId(), type)
                .forEach(i -> profile.getImages().remove(i));
    }

    private void updateImage(Profile profile, MultipartFile imageFile, String type) {
        if (imageFile != null && !imageFile.isEmpty()) {
            deleteImagesByType(profile, type);
            saveImage(profile, imageFile, type, 1);
        }
    }

    private void updateExtraImages(Profile profile, List<MultipartFile> extraImages) {
        if (extraImages != null && !extraImages.isEmpty()) {
            deleteImagesByType(profile, "EXTRA");
            for (int i = 0; i < extraImages.size(); i++) {
                MultipartFile file = extraImages.get(i);
                if (!file.isEmpty()) {
                    saveImage(profile, file, "EXTRA", i + 1);
                }
            }
        }
    }

    @Transactional
    public Profile findByProfileId(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.PROFILE_NOT_FOUND));
    }
}
