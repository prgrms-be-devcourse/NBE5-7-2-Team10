package kr.co.programmers.collabond.api.apply.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.attachment.domain.Attachment;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.shared.domain.CreatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Table(name = "apply_posts")
@Getter
@SQLDelete(sql = "UPDATE apply_posts SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class ApplyPost extends CreatedEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruit_post_id", nullable = false)
    private RecruitPost recruitPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplyPostStatus status;

    @OneToMany(mappedBy = "applyPost", cascade = CascadeType.ALL)
    private List<Attachment> attachments;

    @Builder
    public ApplyPost(RecruitPost recruitPost, Profile profile, String content
            , ApplyPostStatus status) {
        this.recruitPost = recruitPost;
        this.profile = profile;
        this.content = content;
        this.status = status;
    }
}
