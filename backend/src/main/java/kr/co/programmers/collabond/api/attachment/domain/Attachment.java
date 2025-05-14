package kr.co.programmers.collabond.api.attachment.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.file.domain.File;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "attachments")
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apply_post_id", nullable = false)
    private ApplyPost applyPost;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private File file;

    @Builder
    public Attachment(ApplyPost applyPost, File file) {
        this.applyPost = applyPost;
        this.file = file;
    }

    public void addApplyPost(ApplyPost applyPost) {
        this.applyPost = applyPost;
    }
}