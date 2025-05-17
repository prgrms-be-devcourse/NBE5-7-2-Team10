package kr.co.programmers.collabond.api.recruit.dto;

import kr.co.programmers.collabond.api.address.domain.Address;
import lombok.Getter;

@Getter
public class AddressResponseDto {

    private String sido;
    private String sigungu;
    private String dong;

    // Address 엔티티를 DTO로 변환하는 메서드
    public AddressResponseDto(Address address) {
        this.sido = address.getSido();
        this.sigungu = address.getSigungu();
        this.dong = address.getDong();
    }
}

