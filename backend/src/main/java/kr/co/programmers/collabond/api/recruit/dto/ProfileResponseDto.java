package kr.co.programmers.collabond.api.recruit.dto;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.address.domain.Address;
import lombok.Getter;

@Getter
public class ProfileResponseDto {

    private Long profileId;
    private String type;
    private AddressResponseDto address;

    // Profile 엔티티를 DTO로 변환하는 메서드
    public ProfileResponseDto(Profile profile) {
        this.profileId = profile.getId();
        this.type = profile.getType().name();
        this.address = new AddressResponseDto(profile.getAddress());
    }
}

