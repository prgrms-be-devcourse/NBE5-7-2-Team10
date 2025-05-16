package kr.co.programmers.collabond.api.attachment.infrastructure;

import kr.co.programmers.collabond.api.attachment.domain.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
