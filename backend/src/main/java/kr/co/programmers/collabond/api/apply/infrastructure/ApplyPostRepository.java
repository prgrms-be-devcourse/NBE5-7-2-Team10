package kr.co.programmers.collabond.api.apply.infrastructure;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplyPostRepository extends JpaRepository<ApplyPost, Long> {
}
