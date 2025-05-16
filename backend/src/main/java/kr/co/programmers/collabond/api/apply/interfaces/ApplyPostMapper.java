package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.ApplyPostStatus;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostResponseDto;
import kr.co.programmers.collabond.api.attachment.interfaces.AttachmentMapper;

import java.util.stream.Collectors;

public class ApplyPostMapper {

    public static ApplyPost toEntity(ApplyPostRequestDto request) {
        return ApplyPost.builder()
//                .recruitPost()
//                .profile()
                .content(request.getContent())
                .status(ApplyPostStatus.PENDING)
                .build();
    }

    public static ApplyPostResponseDto toDto(ApplyPost entity) {
        return ApplyPostResponseDto.builder()
                .content(entity.getContent())
                .status(entity.getStatus().toString())
                .attachmentFiles(
                        entity.getAttachments().stream()
                                .map(AttachmentMapper::toDto)
                                .collect(Collectors.toList())
                )
                .build();
    }
}
