package kr.co.programmers.collabond.api.profile.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.address.infrastructure.AddressRepository;
import kr.co.programmers.collabond.api.file.infrastructure.FileRepository;
import kr.co.programmers.collabond.api.image.infrastructure.ImageRepository;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
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

        if (!user.getRole().name().contains(dto.getType().name())) {
            throw new IllegalStateException("유저의 권한과 프로필 타입이 일치하지 않습니다.");
        }

        if (profileRepository.countByUserId(user.getId()) >= 5) {
            throw new IllegalStateException("프로필은 최대 5개까지 생성 가능합니다.");
        }

        Profile profile = Profile.builder()
                .user(user)
                .address(dto.getAddressId() != null ? addressRepository.findById(dto.getAddressId()).orElse(null) : null)
                .type(ProfileType.valueOf(dto.getType().name()))
                .name(dto.getName())
                .description(dto.getDescription())
                .detailAddress(dto.getDetailAddress())
                .status(true)
                .collaboCount(0)
                .build();

        return toDto(profileRepository.save(profile));
    }

    @Transactional
    public ProfileResponseDto update(Long profileId, ProfileRequestDto dto) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));

        profile.update(dto.getName(), dto.getDescription(), dto.getDetailAddress());
        return toDto(profile);
    }

    @Transactional
    public void delete(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필이 존재하지 않습니다."));

        imageRepository.findByProfileIdAndType(profileId, "PROFILE")
                .forEach(image -> fileRepository.deleteById(image.getFile().getId()));

        profileRepository.delete(profile);
    }
    public Optional<ProfileResponseDto> findById(Long id) {
        return profileRepository.findById(id)
                .map(this::toDto);
    }

    public List<ProfileResponseDto> findAllByUser(Long userId) {
        return profileRepository.findAllByUserId(userId).stream()
                .map(this::toDto)
                .toList();
    }

    private ProfileResponseDto toDto(Profile profile) {
        return ProfileResponseDto.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .addressId(profile.getAddress() != null ? profile.getAddress().getId() : null)
                .type(ProfileType.valueOf(String.valueOf(profile.getType())))
                .name(profile.getDisplayName())
                .description(profile.getDescription())
                .detailAddress(profile.getDetailAddress())
                .collaboCount(profile.getCollaboCount())
                .status(profile.isStatus())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
