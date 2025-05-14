package kr.co.programmers.collabond.api.tag.domain;

import jakarta.persistence.*;
import kr.co.programmers.collabond.shared.domain.UpdatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "tags")
@Getter
@SQLDelete(sql = "UPDATE tags SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Tag extends UpdatedEntity {

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TagType type;

    @Builder
    public Tag(String name, TagType type) {
        this.name = name;
        this.type = type;
    }

    public Tag update(String name) {
        if (name != null) {
            this.name = name;
        }

        return this;
    }
}