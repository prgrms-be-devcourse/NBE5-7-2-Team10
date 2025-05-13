package kr.co.programmers.collabond.api.user.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.shared.domain.UpdatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@SQLDelete(sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class User extends UpdatedEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Profile> profiles;

    @Builder
    public User(String email, String nickname, Role role) {
        this.email = email;
        this.nickname = nickname;
        this.role = role;
    }

    public User update(String email, String nickname) {
        if (email != null) {
            this.email = email;
        }

        if (nickname != null) {
            this.nickname = nickname;
        }

        return this;
    }
}
