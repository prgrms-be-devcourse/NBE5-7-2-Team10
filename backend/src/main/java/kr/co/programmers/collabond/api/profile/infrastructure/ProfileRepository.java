package kr.co.programmers.collabond.api.profile.infrastructure;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findAllByUserId(Long userId);

    long countByUserId(Long userId);

}