package kr.co.programmers.collabond.api.profile.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.profiletag.domain.ProfileTag;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.shared.domain.UpdatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    private String detailAddress;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProfileType type;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer collaboCount;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    private List<Image> images;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    private List<ProfileTag> tags;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    private List<ApplyPost> applyPosts;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    private List<ApplyPost> recruitPosts;

    /**
     * true - 활성 / false - 비활성
     */
    @Column(nullable = false)
    private Boolean status;

    @Builder
    public Profile(User user, Address address, ProfileType type, String name, String description
            , String detailAddress, Integer collaboCount, Boolean status) {
        this.user = user;
        this.address = address;
        this.type = type;
        this.name = name;
        this.description = description;
        this.detailAddress = detailAddress;
        this.collaboCount = collaboCount;
        this.status = status;
    }

    public Profile update(String name, String description, Address address, String detailAddress
            , Integer collaboCount, Boolean status) {
        if (name != null) {
            this.name = name;
        }

        if (description != null) {
            this.description = description;
        }

        if (address != null) {
            this.address = address;
        }

        if (detailAddress != null) {
            this.detailAddress = detailAddress;
        }

        if (collaboCount != null) {
            this.collaboCount = collaboCount;
        }

        if (status != null) {
            this.status = status;
        }

        return this;
    }
}