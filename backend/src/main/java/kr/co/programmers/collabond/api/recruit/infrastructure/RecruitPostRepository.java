package kr.co.programmers.collabond.api.recruit.infrastructure;

import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruitPostRepository extends JpaRepository<RecruitPost, Long> {

    // 회원이 작성한 모집글 조회 (프로필을 통해 사용자 ID 연결)
    Page<RecruitPost> findByProfile_User_Id(Long userId, Pageable pageable);

    // 프로필이 작성한 모집글 조회
    Page<RecruitPost> findByProfile_Id(Long profileId, Pageable pageable);

    // 상태별 모집글 조회 (필터링)
    Page<RecruitPost> findByStatus(RecruitPostStatus status, Pageable pageable);

    // 특정 프로필이 작성한 모집글 중 하나 조회
    Optional<RecruitPost> findByProfile_Id(Long profileId);
}


