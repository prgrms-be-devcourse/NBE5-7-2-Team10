package kr.co.programmers.collabond.core.auth.oauth2;

import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import kr.co.programmers.collabond.core.auth.UnavailableProviderException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        // 기본 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuth2ResponseDto oAuth2ResponseDto = null;

        switch (provider) {
            case "google":
                oAuth2ResponseDto = new GoogleResponseDto(oAuth2User.getAttributes());
                break;
            case "naver":
                oAuth2ResponseDto = new NaverResponseDto(oAuth2User.getAttributes());
                break;
            case "kakao":
                oAuth2ResponseDto = new KakaoResponseDto(oAuth2User.getAttributes());
                break;
            default:
                throw new UnavailableProviderException("oauth 제공자가 없습니다.");
        }

        String providerId = oAuth2ResponseDto.getProvider() + "_" + oAuth2ResponseDto.getProviderId();
        String email = oAuth2ResponseDto.getEmail();
        String name = oAuth2ResponseDto.getName();

        // providerId로 사용자 찾기
        Optional<User> userByProviderId = userRepository.findByProviderId(providerId);
        if (userByProviderId.isPresent()) {
            return OAuth2UserInfo.of(userByProviderId.get());
        }

        log.info("email = {}", email);
        userRepository.findByEmail(email).ifPresent(user -> {
            throw new EntityExistsException("다른 oauth로 가입된 상태입니다.");
        });

        User newUser = userRepository.save(
                User.builder()
                        .providerId(providerId)
                        .email(email)
                        .nickname(name)
                        .role(Role.ROLE_TMP)
                        .build()
        );

        return OAuth2UserInfo.of(newUser);
    }


}
