package kr.co.programmers.collabond.api.recruit.dto;

import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
public class RecruitPostResponseDto {
    private Long id;
    private String title;
    private String description;
    private RecruitPostStatus status;
    private LocalDateTime deadline;
    private Long profileId;
    private String profileName;
    private ProfileResponseDto profile;

    // RecruitPost 엔티티를 DTO로 변환하는 메서드
    public static RecruitPostResponseDto from(RecruitPost post) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto(post.getProfile());
        return RecruitPostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .status(post.getStatus())
                .deadline(post.getDeadline())
                .profileId(post.getProfile().getId())
                .profileName(post.getProfile().getName())
                .profile(profileResponseDto)
                .build();
    }
}
