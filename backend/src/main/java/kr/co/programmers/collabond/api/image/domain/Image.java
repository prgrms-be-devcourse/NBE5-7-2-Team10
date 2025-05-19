package kr.co.programmers.collabond.api.image.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.file.domain.File;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "images")
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private File file;

    @Column(nullable = false)
    private String type;

    private Integer priority;

    @Builder
    public Image(Profile profile, File file, String type, Integer priority) {
        this.profile = profile;
        this.file = file;
        this.type = type;
        this.priority = priority;
    }

    public void updateProfile(Profile profile) {
        this.profile = profile;
    }

}

