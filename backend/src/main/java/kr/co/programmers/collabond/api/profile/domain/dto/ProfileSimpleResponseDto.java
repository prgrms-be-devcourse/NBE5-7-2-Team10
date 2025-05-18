package kr.co.programmers.collabond.api.profile.domain.dto;

import kr.co.programmers.collabond.api.address.domain.dto.AddressNameDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileSimpleResponseDto {

    private Long profileId;
    private String type;
    private AddressNameDto address;
}

