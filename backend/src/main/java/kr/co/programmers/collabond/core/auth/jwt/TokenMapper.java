package kr.co.programmers.collabond.core.auth.jwt;

import kr.co.programmers.collabond.api.user.domain.Role;

public class TokenMapper {
    public static TokenBodyDto toTokenBodyDto(String sub, String role) {
        return TokenBodyDto.builder()
                .providerId(sub)
                .role(Role.valueOf(role.toUpperCase()))
                .build();
    }
}
