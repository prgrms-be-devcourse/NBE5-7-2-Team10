package kr.co.programmers.collabond.api.address.interfaces;

import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.address.domain.dto.AddressNameDto;

public class AddressMapper {

    public static AddressNameDto toDto(Address entity) {
        return AddressNameDto.builder()
                .sido(entity.getSido())
                .sigungu(entity.getSigungu())
                .dong(entity.getDong())
                .build();
    }
}
