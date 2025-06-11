package kr.co.programmers.collabond.core.auth.oauth2;

import kr.co.programmers.collabond.api.user.domain.Role;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.core.auth.jwt.TokenBodyDto;

public class OAuth2Mapper {
    public static OAuth2UserInfo toOAuth2UserInfo(User user) {
        return OAuth2UserInfo.builder()
                .username(user.getProviderId())
                .email(user.getEmail())
                .name(user.getNickname())
                .role(user.getRole())
                .build();
    }

    public static OAuth2UserInfo toOAuth2UserInfo(TokenBodyDto tokenBodyDto) {
        return OAuth2UserInfo.builder()
                .username(tokenBodyDto.providerId())
                .role(tokenBodyDto.role())
                .build();
    }

    public static User toUser(OAuth2ResponseDto oAuth2ResponseDto, Role role) {
        String providerId = oAuth2ResponseDto.getProvider() + "_" + oAuth2ResponseDto.getProviderId();
        String email = oAuth2ResponseDto.getEmail();
        String name = oAuth2ResponseDto.getName();

        return User.builder()
                .providerId(providerId)
                .email(email)
                .nickname(name)
                .role(Role.ROLE_TMP)
                .build();
    }
}
