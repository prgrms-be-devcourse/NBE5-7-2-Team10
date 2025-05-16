package kr.co.programmers.collabond.core.auth.oauth2;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.core.auth.jwt.LoginTokenResponseDto;
import kr.co.programmers.collabond.core.auth.jwt.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final TokenService tokenService;

    @Value("${custom.jwt.redirect-main}")
    private String redirectMain;

    @Value("${custom.jwt.redirect-sign-up}")
    private String redirectSignUp;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2UserInfo oAuth2UserInfo = (OAuth2UserInfo) authentication.getPrincipal();

        LoginTokenResponseDto tokens = tokenService.issueTokens(oAuth2UserInfo.getUsername()
                , oAuth2UserInfo.getRole());

        // 프론트엔드로 리다이렉트 (토큰 포함)
        String targetUrl = UriComponentsBuilder.fromUriString(
                oAuth2UserInfo.getRole() == Role.ROLE_TMP ? redirectSignUp : redirectMain)
                .queryParam("accessToken", tokens.accessToken())
                .queryParam("refreshToken", tokens.refreshToken())
                .build().toUriString();

        response.sendRedirect(targetUrl);
    }
}
