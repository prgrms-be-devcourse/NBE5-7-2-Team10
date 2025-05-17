package kr.co.programmers.collabond.core.auth.jwt;


import kr.co.programmers.collabond.api.user.domain.Role;
import lombok.Builder;

@Builder
public record TokenBodyDto(String providerId, Role role) {}
