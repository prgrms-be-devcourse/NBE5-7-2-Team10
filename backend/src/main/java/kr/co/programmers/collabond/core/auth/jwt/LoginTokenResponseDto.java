package kr.co.programmers.collabond.core.auth.jwt;

public record LoginTokenResponseDto(String accessToken, String refreshToken) { }
