package kr.co.programmers.collabond.api.attachment.interfaces;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.attachment.domain.Attachment;
import kr.co.programmers.collabond.api.attachment.domain.dto.AttachmentDto;
import kr.co.programmers.collabond.api.file.domain.File;

public class AttachmentMapper {

    public static Attachment toEntity(ApplyPost applyPost, File file) {
        return Attachment.builder()
                .applyPost(applyPost)
                .file(file)
                .build();
    }

    public static AttachmentDto toDto(Attachment attachment) {
        return AttachmentDto.builder()
                .originName(attachment.getFile().getOriginName())
                .savedName(attachment.getFile().getSavedName())
                .build();
    }
}
