package kr.co.programmers.collabond.api.tag.domain.dto;

import kr.co.programmers.collabond.api.tag.domain.TagType;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagResponseDto {
    private Long id;
    private String name;
    private TagType type;
}

