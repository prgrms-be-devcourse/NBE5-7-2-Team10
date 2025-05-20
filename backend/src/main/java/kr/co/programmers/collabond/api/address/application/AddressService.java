package kr.co.programmers.collabond.api.address.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.address.domain.dto.AddressNameDto;
import kr.co.programmers.collabond.api.address.domain.dto.RegionCodeDto;
import kr.co.programmers.collabond.api.address.infrastructure.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address findByAddressId(Long addressId) {
        return addressRepository.findById(addressId).orElse(null);
    }

    public List<RegionCodeDto> getAllProvinces() {
        return addressRepository.findDistinctSidoWithCode().stream()
                .map(row -> new RegionCodeDto((String) row[0], (String) row[1]))
                .toList();
    }

    public List<RegionCodeDto> getDistrictsBySidoCode(String sidoCode) {
        return addressRepository.findDistinctSigunguWithCode(sidoCode).stream()
                .map(row -> new RegionCodeDto((String) row[0], (String) row[1]))
                .toList();
    }

    public List<RegionCodeDto> getNeighborhoodsBySigunguCode(String sigunguCode) {
        return addressRepository.findDistinctDongWithCode(sigunguCode).stream()
                .map(row -> new RegionCodeDto((String) row[0], (String) row[1]))
                .toList();
    }


    @Transactional
    public List<AddressNameDto> getAllRegions() {
        return addressRepository.findAll().stream()
                .map(address -> AddressNameDto.builder()
                        .sido(address.getSido())
                        .sigungu(address.getSigungu())
                        .dong(address.getDong())
                        .build())
                .toList();
    }
}
