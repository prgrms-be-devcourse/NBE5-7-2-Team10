package kr.co.programmers.collabond.api.apply.infrastructure;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplyPostRepository extends JpaRepository<ApplyPost, Long> {
    Optional<List<ApplyPost>> findByProfileId(Long profileId);

    // 보낸 applyPost를 보는 것이기 때문에 status는 applyPost의 상태
    @Query("SELECT new kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto(a) " +
            "FROM ApplyPost a " +
            "WHERE a.status = :status and a.profile.user.id = :userId")
    Page<ApplyPostDto> findAllSentByUserId(Long userId, String status, Pageable pageable);

    // 받은 applyPost를 보는 것이기 때문에 status는 recruitPost의 상태
    @Query("SELECT new kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto(a) " +
            "FROM ApplyPost a " +
            "WHERE a.recruitPost.status = :status and a.recruitPost.profile.user.id = :userId")
    Page<ApplyPostDto> findAllReceivedByUserId(Long userId, String status, Pageable pageable);
}
