package kr.co.programmers.collabond.api.profile.infrastructure;

import kr.co.programmers.collabond.api.profile.domain.Profile;

import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findAllByUserId(Long userId);

    long countByUserId(Long userId);

    @Query("""
            SELECT DISTINCT p FROM Profile p
            JOIN p.tags pt
            WHERE p.type = :type
            AND pt.tag.id IN :tagIds
            AND p.addressCode IN :addressCodes
            """)
    Page<Profile> findByTypeAndTagIdsAndAddressCodes(
            ProfileType type,
            List<Long> tagIds,
            List<String> addressCodes,
            Pageable pageable);

    @Query("""
           SELECT DISTINCT p FROM Profile p
           JOIN p.tags pt
           WHERE p.type = :type
           AND pt.tag.id IN :tagIds
           """)
    Page<Profile> findByTypeAndTagIds(
            ProfileType type,
            List<Long> tagIds,
            Pageable pageable);

    @Query("""
            SELECT DISTINCT p FROM Profile p
            WHERE p.type = :type
            AND p.addressCode IN :addressCodes
            """)
    Page<Profile> findByTypeAndAddressCodes(
            ProfileType type,
            List<String> addressCodes,
            Pageable pageable);
}