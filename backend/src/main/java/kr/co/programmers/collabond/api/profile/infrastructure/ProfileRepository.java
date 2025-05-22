package kr.co.programmers.collabond.api.profile.infrastructure;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long>,
        JpaSpecificationExecutor<Profile> {
    List<Profile> findAllByUserId(Long userId);

    long countByUserId(Long userId);
}