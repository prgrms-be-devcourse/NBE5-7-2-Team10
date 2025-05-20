package kr.co.programmers.collabond.api.tag.domain.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagRequestDto {

    private String name;
    private String type;
}
