package kr.co.programmers.collabond.api.user.interfaces;

import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.domain.dto.UserDto;
import kr.co.programmers.collabond.api.user.domain.dto.UserRequestDto;
import kr.co.programmers.collabond.api.user.domain.dto.UserResponseDto;

public class UserMapper {

    public static User toEntity(UserRequestDto dto) {
        return User.builder()
                .email(dto.getEmail())
                .nickname(dto.getNickname())
                .role(Role.valueOf(dto.getRole()))
                .build();
    }

    public static UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .role(user.getRole().name())
                .build();
    }

    public static UserResponseDto toResponseDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

}
