package kr.co.programmers.collabond.api.file.infrastructure;

import kr.co.programmers.collabond.api.file.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}