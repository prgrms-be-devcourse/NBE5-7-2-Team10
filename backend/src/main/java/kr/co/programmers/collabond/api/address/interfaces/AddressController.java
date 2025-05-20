package kr.co.programmers.collabond.api.address.interfaces;

import kr.co.programmers.collabond.api.address.application.AddressService;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.address.domain.dto.AddressNameDto;
import kr.co.programmers.collabond.api.address.domain.dto.RegionCodeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping("")
    public ResponseEntity<List<AddressNameDto>> getAllRegions() {
        return ResponseEntity.ok(addressService.getAllRegions());
    }

    @GetMapping("/provinces")
    public ResponseEntity<List<RegionCodeDto>> getProvinces() {
        return ResponseEntity.ok(addressService.getAllProvinces());
    }

    @GetMapping("/districts")
    public ResponseEntity<List<RegionCodeDto>> getDistricts(@RequestParam String sidoCode) {
        return ResponseEntity.ok(addressService.getDistrictsBySidoCode(sidoCode));
    }

    @GetMapping("/neighborhoods")
    public ResponseEntity<List<RegionCodeDto>> getNeighborhoods(@RequestParam String sigunguCode) {
        return ResponseEntity.ok(addressService.getNeighborhoodsBySigunguCode(sigunguCode));
    }
}