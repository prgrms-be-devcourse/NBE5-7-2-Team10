package kr.co.programmers.collabond.api.user.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.domain.dto.UserRequestDto;
import kr.co.programmers.collabond.api.user.domain.dto.UserResponseDto;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.file.infrastructure.FileRepository;
import kr.co.programmers.collabond.api.image.infrastructure.ImageRepository;
import kr.co.programmers.collabond.api.user.interfaces.UserMapper;
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
        User user = UserMapper.toEntity(dto);
        User savedUser = userRepository.save(user);
        return UserMapper.toResponseDto(savedUser);
    }

    @Transactional
    public UserResponseDto update(Long userId, UserRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        user.update(dto.getEmail(), dto.getNickname(), Role.valueOf(dto.getRole()));
        return UserMapper.toResponseDto(userRepository.save(user));
    }

    @Transactional
    public void delete(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        List<Profile> profiles = profileRepository.findAllByUserId(userId);
        //파일은 hard delete
        for (Profile profile : profiles) {
            imageRepository.findByProfileIdAndType(profile.getId(), "PROFILE")
                    .forEach(image -> fileRepository.deleteById(image.getFile().getId()));
        }
        //user는 soft delete
        userRepository.delete(user);
    }

    public Optional<UserResponseDto> findById(Long userId) {

        return userRepository.findById(userId).map(UserMapper::toResponseDto);
    }

    public Optional<UserResponseDto> findByEmail(String email) {
        return userRepository.findByEmail(email).map(UserMapper::toResponseDto);
    }


}
