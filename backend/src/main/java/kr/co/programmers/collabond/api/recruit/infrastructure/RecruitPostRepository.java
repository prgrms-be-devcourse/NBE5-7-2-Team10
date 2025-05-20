package kr.co.programmers.collabond.api.recruit.infrastructure;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecruitPostRepository extends JpaRepository<RecruitPost, Long> {

    // 회원이 작성한 모집글 조회 (프로필을 통해 사용자 ID 연결)
    @Query("SELECT r FROM RecruitPost r WHERE r.profile.user.id = :userId")
    Page<RecruitPost> findByUserId(Long userId, Pageable pageable);

    // 프로필이 작성한 모집글 조회
    Page<RecruitPost> findByProfileId(Long profileId, Pageable pageable);

    // 상태별 모집글 조회 (필터링)
    Page<RecruitPost> findByStatus(RecruitPostStatus status, Pageable pageable);

    // 삭제되지 않은 모집글만 조회
    Page<RecruitPost> findByDeletedAtIsNull(Pageable pageable);
}


