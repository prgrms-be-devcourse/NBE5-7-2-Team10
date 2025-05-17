package kr.co.programmers.collabond.core.auth.oauth2;

import kr.co.programmers.collabond.api.user.domain.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OAuth2UserInfo implements OAuth2User {
    private String username;
    private String email;
    private String name;
    private Role role;
    private Map<String, Object> attributes;

    @Builder
    public OAuth2UserInfo(String username, String email, String name, Role role,
                          Map<String, Object> attributes) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.role = role;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getName() {
        return name;
    }
}
