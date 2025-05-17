package kr.co.programmers.collabond.api.apply.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApplyPostRequestDto {

    private Long profileId;
    private String content;
}
