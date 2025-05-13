package kr.co.programmers.collabond.api.file.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import kr.co.programmers.collabond.shared.domain.CreatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "files")
@Getter
@SQLDelete(sql = "UPDATE files SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class File extends CreatedEntity {

    @Column(name = "saved_name", nullable = false)
    private String savedName;

    @Column(name = "origin_name", nullable = false)
    private String originName;

    @Builder
    public File(String savedName, String originName) {
        this.savedName = savedName;
        this.originName = originName;
    }
}
