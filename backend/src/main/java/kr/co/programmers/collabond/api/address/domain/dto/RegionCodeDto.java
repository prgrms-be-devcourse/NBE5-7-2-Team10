package kr.co.programmers.collabond.api.address.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RegionCodeDto {
    private String name;
    private String code;
}