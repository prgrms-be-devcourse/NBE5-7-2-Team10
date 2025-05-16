package kr.co.programmers.collabond.api.tag.infrastructure;

import kr.co.programmers.collabond.api.tag.domain.Tag;
import kr.co.programmers.collabond.api.tag.domain.TagType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {

    boolean existsByNameAndType(String name, TagType type);

    List<Tag> findAll();  // 모든 태그 조회
}
