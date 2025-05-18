package kr.co.programmers.collabond.api.address.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "addresses")
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "varchar(2)")
    private String sidoCode;

    @Column(nullable = false, columnDefinition = "varchar(3)")
    private String sigunguCode;

    @Column(nullable = false, columnDefinition = "varchar(3)")
    private String dongCode;

    @Column(nullable = false)
    private String sido;

    @Column(nullable = false)
    private String sigungu;

    @Column
    private String dong;

    @Builder
    public Address(Long id, String sidoCode, String sigunguCode, String dongCode,
                   String sido, String sigungu, String dong) {
        this.id = id;
        this.sidoCode = sidoCode;
        this.sigunguCode = sigunguCode;
        this.dongCode = dongCode;
        this.sido = sido;
        this.sigungu = sigungu;
        this.dong = dong;
    }
}