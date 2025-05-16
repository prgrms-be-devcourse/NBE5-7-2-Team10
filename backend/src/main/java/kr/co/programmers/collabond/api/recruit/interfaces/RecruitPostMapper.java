package kr.co.programmers.collabond.api.recruit.interfaces;

import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.dto.RecruitPostDto;

public class RecruitPostMapper {

    public static RecruitPostDto toDto(RecruitPost post) {
        return RecruitPostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .status(post.getStatus().toString())
                .deadline(post.getDeadline())
                .writerProfileId(post.getProfile().getId())
                .writerProfileName(post.getProfile().getName())
                .build();
    }
}
