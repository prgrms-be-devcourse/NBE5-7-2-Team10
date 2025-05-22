package kr.co.programmers.collabond.api.tag.interfaces;

import kr.co.programmers.collabond.api.tag.domain.Tag;
import kr.co.programmers.collabond.api.tag.domain.TagType;
import kr.co.programmers.collabond.api.tag.domain.dto.TagRequestDto;
import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;

public class TagMapper {

    // TagRequestDto -> Tag 엔티티 변환
    public static Tag toEntity(TagRequestDto dto) {
        return Tag.builder()
                .name(dto.name())
                .type(TagType.valueOf(dto.type()))  // TagType 사용
                .build();
    }

    // Tag -> TagResponseDto 변환
    public static TagResponseDto toDto(Tag tag) {
        return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .type(tag.getType().name())  // TagType 사용
                .build();
    }
}
