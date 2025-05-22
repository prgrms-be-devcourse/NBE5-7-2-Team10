package kr.co.programmers.collabond.api.profile.domain.dto;

import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ProfileDetailResponseDto(
        Long id,
        Long userId,
        String nickname,
        String type,
        String name,
        String profileImageUrl,
        String thumbnailImageUrl,
        List<String> extraImageUrls,
        String description,
        String address,
        String addressCode,
        int collaboCount,
        boolean status,
        List<TagResponseDto> tags,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) { }
