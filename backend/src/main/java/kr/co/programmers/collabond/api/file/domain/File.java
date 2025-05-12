package kr.co.programmers.collabond.api.file.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import kr.co.programmers.collabond.shared.domain.CreatedEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "files")
@Getter
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
