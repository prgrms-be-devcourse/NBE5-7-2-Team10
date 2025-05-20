package kr.co.programmers.collabond.api.user.domain.dto;


import lombok.Builder;

@Builder
public record UserUpdateRequestDto(String nickname) { }