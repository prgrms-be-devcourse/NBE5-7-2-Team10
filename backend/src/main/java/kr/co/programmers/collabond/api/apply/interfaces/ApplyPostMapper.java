package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.ApplyPostStatus;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto;
import kr.co.programmers.collabond.api.attachment.interfaces.AttachmentMapper;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.interfaces.ProfileMapper;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.interfaces.RecruitPostMapper;

import java.util.stream.Collectors;

public class ApplyPostMapper {

    public static ApplyPost toEntity(RecruitPost recruitPost,
                                     Profile profile,
                                     ApplyPostRequestDto request) {

        return ApplyPost.builder()
                .recruitPost(recruitPost)
                .profile(profile)
                .content(request.getContent())
                .status(ApplyPostStatus.PENDING)
                .build();
    }

    public static ApplyPostDto toDto(ApplyPost entity) {
        return ApplyPostDto.builder()
                .recruitPost(RecruitPostMapper.toDto(entity.getRecruitPost()))
                .profile(ProfileMapper.toDto(entity.getProfile()))
                .content(entity.getContent())
                .status(entity.getStatus().toString())
                .attachmentFiles(
                        entity.getAttachments() == null
                                ? null
                                : entity.getAttachments().stream()
                                .map(AttachmentMapper::toDto)
                                .collect(Collectors.toList())
                )
                .build();
    }
}
