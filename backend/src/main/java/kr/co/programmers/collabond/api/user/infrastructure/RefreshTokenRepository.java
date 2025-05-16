package kr.co.programmers.collabond.api.user.infrastructure;

import kr.co.programmers.collabond.api.user.domain.RefreshToken;
import kr.co.programmers.collabond.api.user.domain.TokenStatus;
import kr.co.programmers.collabond.api.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUserAndStatus(User user, TokenStatus status);
}
