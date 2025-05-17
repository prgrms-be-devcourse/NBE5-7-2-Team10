package kr.co.programmers.collabond.api.tag.interfaces;

import kr.co.programmers.collabond.api.tag.domain.Tag;
import kr.co.programmers.collabond.api.tag.domain.dto.TagRequestDto;
import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import org.springframework.stereotype.Component;

@Component
public class TagMapper {

    // TagRequestDto -> Tag 엔티티 변환
    public Tag toEntity(TagRequestDto dto) {
        return Tag.builder()
                .name(dto.getName())
                .type(dto.getType())  // TagType 사용
                .build();
    }

    // Tag -> TagResponseDto 변환
    public TagResponseDto toDto(Tag tag) {
        return TagResponseDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .type(tag.getType())  // TagType 사용
                .build();
    }
}
