package kr.co.programmers.collabond.api.address.infrastructure;

import kr.co.programmers.collabond.api.address.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("SELECT DISTINCT a.sido, a.sidoCode FROM Address a")
    List<Object[]> findDistinctSidoWithCode();

    @Query("SELECT DISTINCT a.sigungu, a.sigunguCode FROM Address a WHERE a.sidoCode = :sidoCode")
    List<Object[]> findDistinctSigunguWithCode(@Param("sidoCode") String sidoCode);

    @Query("SELECT DISTINCT a.dong, a.dongCode FROM Address a WHERE a.sigunguCode = :sigunguCode")
    List<Object[]> findDistinctDongWithCode(@Param("sigunguCode") String sigunguCode);

}
