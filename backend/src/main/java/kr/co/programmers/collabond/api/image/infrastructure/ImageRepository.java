package kr.co.programmers.collabond.api.image.infrastructure;

import kr.co.programmers.collabond.api.image.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByProfileIdAndType(Long profileId, String type);
    List<Image> findByProfileId(Long profileId);
}

