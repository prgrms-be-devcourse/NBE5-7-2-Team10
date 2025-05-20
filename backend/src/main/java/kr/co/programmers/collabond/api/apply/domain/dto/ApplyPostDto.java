package kr.co.programmers.collabond.api.apply.domain.dto;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.interfaces.ApplyPostMapper;
import kr.co.programmers.collabond.api.attachment.domain.dto.AttachmentDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileDto;
import kr.co.programmers.collabond.api.recruit.dto.RecruitPostDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ApplyPostDto {

    private RecruitPostDto recruitPost;

    private ProfileDto profile;

    private String content;

    private String status;

    private List<AttachmentDto> attachmentFiles;

    @Builder
    private ApplyPostDto(RecruitPostDto recruitPost,
                         ProfileDto profile,
                         String content,
                         String status,
                         List<AttachmentDto> attachmentFiles) {

        this.recruitPost = recruitPost;
        this.profile = profile;
        this.content = content;
        this.status = status;
        this.attachmentFiles = attachmentFiles;
    }

    // todo : dto에서 생성자 사용하지 않는 방법이 있나 찾아보기
    public ApplyPostDto(
            ApplyPost applyPost
    ) {
        ApplyPostDto a = ApplyPostMapper.toDto(applyPost);
        this.recruitPost = a.getRecruitPost();
        this.profile = a.getProfile();
        this.content = a.getContent();
        this.status = a.getStatus();
        this.attachmentFiles = a.getAttachmentFiles();
    }
}
