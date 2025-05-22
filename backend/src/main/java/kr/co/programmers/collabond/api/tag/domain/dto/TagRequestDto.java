package kr.co.programmers.collabond.api.tag.domain.dto;

import lombok.Builder;

@Builder
public record TagRequestDto(String name, String type) { }
