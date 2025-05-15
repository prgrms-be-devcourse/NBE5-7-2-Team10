package kr.co.programmers.collabond.api.apply.domain.dto;

import kr.co.programmers.collabond.api.attachment.domain.dto.AttachmentDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ApplyPostResponseDto {

//    private RecruitPostDto recruitPost;

//    private ProfileDto profile;

    private String content;

    private String status;

    private List<AttachmentDto> attachmentFiles;

    @Builder
    private ApplyPostResponseDto(String content, String status, List<AttachmentDto> attachmentFiles) {
        this.content = content;
        this.status = status;
        this.attachmentFiles = attachmentFiles;
    }
}
