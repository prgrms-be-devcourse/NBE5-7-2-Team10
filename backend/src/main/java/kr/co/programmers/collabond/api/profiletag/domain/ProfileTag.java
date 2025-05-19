package kr.co.programmers.collabond.api.profiletag.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.tag.domain.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profile_tags")
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class ProfileTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @Builder
    public ProfileTag(Profile profile, Tag tag) {
        this.profile = profile;
        this.tag = tag;
    }

    public void updateProfile(Profile profile) {
        this.profile = profile;
    }
}
