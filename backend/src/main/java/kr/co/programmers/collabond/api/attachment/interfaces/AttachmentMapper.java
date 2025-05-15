package kr.co.programmers.collabond.api.attachment.interfaces;

import kr.co.programmers.collabond.api.attachment.domain.Attachment;
import kr.co.programmers.collabond.api.attachment.domain.dto.AttachmentDto;

public class AttachmentMapper {

    public static AttachmentDto toDto(Attachment attachment) {
        return AttachmentDto.builder()
                .originName(attachment.getFile().getOriginName())
                .savedName(attachment.getFile().getSavedName())
                .build();
    }
}
