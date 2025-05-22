package kr.co.programmers.collabond.api.tag.domain.dto;

import lombok.Builder;

@Builder
public record TagResponseDto(Long id, String name, String type) { }

