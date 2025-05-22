package kr.co.programmers.collabond.api.profile.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.profiletag.domain.ProfileTag;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.shared.domain.UpdatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
@Getter
@SQLDelete(sql = "UPDATE profiles SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Profile extends UpdatedEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String addressCode;

    private String address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProfileType type;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(name = "collabo_count", nullable = false)
    private Integer collaboCount = 0;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProfileTag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "profile")
    private List<ApplyPost> applyPosts = new ArrayList<>();

    @OneToMany(mappedBy = "profile")
    private List<RecruitPost> recruitPosts = new ArrayList<>();

    @Column(nullable = false)
    private Boolean status;

    @Builder
    public Profile(User user, String addressCode, String address, ProfileType type, String name,
                   String description, Integer collaboCount, Boolean status) {
        this.user = user;
        this.addressCode = addressCode;
        this.address = address;
        this.type = type;
        this.name = name;
        this.description = description;
        this.collaboCount = collaboCount;
        this.status = status;
    }

    public Profile update(String name, String description, String addressCode, String address,
                          Integer collaboCount, Boolean status) {
        if (name != null) {
            this.name = name;
        }

        if (description != null) {
            this.description = description;
        }

        if (addressCode != null) {
            this.addressCode = address;
        }

        if (collaboCount != null) {
            this.collaboCount = collaboCount;
        }

        if (status != null) {
            this.status = status;
        }

        return this;
    }

    public String getDisplayName() {
        return isDeleted() ? "(이름없음)" : this.name;
    }

    public boolean isStatus() {
        return Boolean.TRUE.equals(this.status);
    }

    public void update(String name, String description, String addressCode, String address, boolean status) {
        if (name != null) {
            this.name = name;
        }

        if (description != null) {
            this.description = description;
        }

        if( addressCode != null ){
            this.addressCode = addressCode;
        }

        if(address != null){
            this.address = address;
        }
        this.status = status;
    }

    public void addImage(Image image) {
        images.add(image);
        image.updateProfile(this);
    }

    public void addTag(ProfileTag tag) {
        this.tags.add(tag);
        tag.updateProfile(this);
    }

    public void updateCollaboCount() {
        this.collaboCount = this.collaboCount + 1;
    }
}