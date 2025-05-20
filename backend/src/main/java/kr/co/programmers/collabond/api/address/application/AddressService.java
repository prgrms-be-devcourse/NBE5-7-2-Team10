package kr.co.programmers.collabond.api.address.application;

import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.address.infrastructure.AddressRepository;
import kr.co.programmers.collabond.api.address.interfaces.AddressMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address findByAddressId(Long addressId) {
        return addressRepository.findById(addressId).orElse(null);
    }
}
