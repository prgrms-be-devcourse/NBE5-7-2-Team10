package kr.co.programmers.collabond.core.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import kr.co.programmers.collabond.api.user.domain.RefreshToken;
import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.api.user.domain.TokenStatus;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.infrastructure.RefreshTokenRepository;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {

    @Value("${custom.jwt.token-validity-time.access}")
    private Long accessTokenValiditySeconds;

    @Value("${custom.jwt.token-validity-time.refresh}")
    private Long refreshTokenValiditySeconds;

    @Value("${custom.jwt.secret}")
    private String secretKey;

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public LoginTokenResponseDto issueTokens(String providerId, Role role) {

        User found = userRepository.findByProviderId(providerId)
                .orElseThrow(() -> new NoSuchElementException("검색된 회원이 없습니다."));

        String accessToken = createAccessToken(providerId, role);

        // 기존 유효한 리프레시 토큰이 있다면 해당 토큰 반환
        Optional<RefreshToken> foundRefreshToken = refreshTokenRepository
                .findByUserAndStatus(found, TokenStatus.VALID);

        if(foundRefreshToken.isPresent()) {
            return new LoginTokenResponseDto(accessToken, foundRefreshToken.get().getToken());
        }

        String refreshToken = createRefreshToken(providerId, role);

        // 새로운 리프레시 토큰 저장
        RefreshToken newRefreshToken = RefreshToken.builder()
                .token(refreshToken)
                .user(found)
                .build();
        refreshTokenRepository.save(newRefreshToken);

        return new LoginTokenResponseDto(accessToken, refreshToken);
    }

    public String createAccessToken(String providerId, Role role) {
        return createToken(providerId, role, accessTokenValiditySeconds);
    }

    public String createRefreshToken(String providerId, Role role) {
        return createToken(providerId, role, refreshTokenValiditySeconds);
    }

    public String createToken(String providerId, Role role, long validitySeconds) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + validitySeconds * 1000);

        return Jwts.builder()
                .subject(providerId)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(getSignKey(), Jwts.SIG.HS512)
                .compact();
    }

    public AccessTokenResponseDto refreshAccessToken(String refreshToken) {
        log.info("refreshToken = {}", refreshToken);
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 리프레시 토큰입니다"));

        // 토큰 상태 검사
        if (token.getStatus() != TokenStatus.VALID) {
            throw new IllegalArgumentException("유효하지 않은 리프레시 토큰입니다");
        }

        // 토큰 유효성 및 만료 검사
        if (!validate(refreshToken)) {
            token.updateStatus(TokenStatus.EXPIRED);
            refreshTokenRepository.save(token);
            throw new IllegalArgumentException("만료된 리프레시 토큰입니다");
        }

        // 토큰 페이로드 파싱
        TokenBodyDto tokenBodyDto = parseJwt(refreshToken);

        // 새로운 액세스 토큰 발급
        String newAccessToken = createAccessToken(tokenBodyDto.providerId(), tokenBodyDto.role());
        return new AccessTokenResponseDto(newAccessToken);
    }


    public void logout(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 리프레시 토큰입니다"));

        token.updateStatus(TokenStatus.LOGGED_OUT);
        refreshTokenRepository.save(token);
    }

    public boolean validate(String token) {

        try {
            Jwts.parser()
                    .verifyWith(getSignKey())
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (JwtException e) {
            log.error("token = {}", token);
        } catch (IllegalArgumentException e) {
            log.error("token = {}", token);
        }

        return false;
    }

    public TokenBodyDto parseJwt(String token) {
        Jws<Claims> parsed = Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token);

        String sub = parsed.getPayload().getSubject();
        String role = parsed.getPayload().get("role").toString();

        return TokenBodyDto.builder()
                .providerId(sub)
                .role(Role.valueOf(role.toUpperCase()))
                .build();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
