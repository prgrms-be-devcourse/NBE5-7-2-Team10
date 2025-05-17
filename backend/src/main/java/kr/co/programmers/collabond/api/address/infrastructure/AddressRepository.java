package kr.co.programmers.collabond.api.address.infrastructure;

import kr.co.programmers.collabond.api.address.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
