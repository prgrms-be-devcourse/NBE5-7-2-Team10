package kr.co.programmers.collabond.api.profile.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileSimpleResponseDto {

    private Long profileId;
    private String type;
    private String imageUrl;
    private String address;
    private boolean status;
}

