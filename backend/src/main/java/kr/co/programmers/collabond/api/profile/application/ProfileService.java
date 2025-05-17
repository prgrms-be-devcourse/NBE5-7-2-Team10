package kr.co.programmers.collabond.api.profile.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.address.infrastructure.AddressRepository;
import kr.co.programmers.collabond.api.file.infrastructure.FileRepository;
import kr.co.programmers.collabond.api.image.infrastructure.ImageRepository;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import kr.co.programmers.collabond.api.profile.interfaces.ProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ImageRepository imageRepository;
    private final FileRepository fileRepository;

    @Transactional
    public ProfileResponseDto create(ProfileRequestDto dto) {
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
        Profile saveProfile = profileRepository.save(profile);

        return ProfileMapper.toResponseDto(saveProfile);
    }

    @Transactional
    public ProfileResponseDto update(Long profileId, ProfileRequestDto dto) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));

        profile.update(dto.getName(), dto.getDescription(), dto.getDetailAddress());
        return ProfileMapper.toResponseDto(profile);
    }

    @Transactional
    public void delete(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));
        // 파일은 hard delete
        imageRepository.findByProfileIdAndType(profileId, "PROFILE")
                .forEach(image -> fileRepository.deleteById(image.getFile().getId()));
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

}
