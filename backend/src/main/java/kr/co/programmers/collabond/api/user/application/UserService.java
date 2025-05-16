package kr.co.programmers.collabond.api.user.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.domain.dto.UserRequestDto;
import kr.co.programmers.collabond.api.user.domain.dto.UserResponseDto;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.file.infrastructure.FileRepository;
import kr.co.programmers.collabond.api.image.infrastructure.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ImageRepository imageRepository;
    private final FileRepository fileRepository;

    @Transactional
    public UserResponseDto create(UserRequestDto dto) {
        User user = User.builder()
                .email(dto.getEmail())
                .nickname(dto.getNickname())
                .role(dto.getRole())
                .build();
        return toDto(userRepository.save(user));
    }

    @Transactional
    public UserResponseDto update(Long userId, UserRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        user.update(dto.getEmail(), dto.getNickname());
        return toDto(user);
    }

    @Transactional
    public void delete(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        List<Profile> profiles = profileRepository.findAllByUserId(userId);
        for (Profile profile : profiles) {
            imageRepository.findByProfileIdAndType(profile.getId(), "PROFILE")
                    .forEach(image -> fileRepository.deleteById(image.getFile().getId()));
            profile.softDelete();
        }

        userRepository.deleteById(userId);
    }

    public Optional<UserResponseDto> findById(Long userId) {
        return userRepository.findById(userId).map(this::toDto);
    }

    public Optional<UserResponseDto> findByEmail(String email) {
        return userRepository.findByEmail(email).map(this::toDto);
    }

    private UserResponseDto toDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
