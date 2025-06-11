package kr.co.programmers.collabond.core.auth.jwt;

import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.api.user.domain.User;

public class TokenMapper {
    public static TokenBodyDto toTokenBodyDto(String sub, String role) {
        return TokenBodyDto.builder()
                .providerId(sub)
                .role(Role.valueOf(role.toUpperCase()))
                .build();
    }

    public static LoginTokenResponseDto toLoginTokenResponseDto(
            String accessToken, String refreshToken, User user) {
        return LoginTokenResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .id(user.getId())
                .nickname(user.getNickname())
                .role(user.getRole())
                .build();
    }
}
