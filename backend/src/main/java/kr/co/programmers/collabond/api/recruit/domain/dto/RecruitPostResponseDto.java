package kr.co.programmers.collabond.api.recruit.domain.dto;

import kr.co.programmers.collabond.api.profile.domain.dto.ProfileSimpleResponseDto;
import kr.co.programmers.collabond.api.profile.interfaces.ProfileMapper;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class RecruitPostResponseDto {
    private Long id;
    private String title;
    private String description;
    private RecruitPostStatus status;
    private LocalDateTime deadline;
    private Long profileId;
    private String profileName;
    private ProfileSimpleResponseDto profile;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt; // 소프트 삭제 시간
/**
    public static RecruitPostResponseDto toResponseDto(RecruitPost entity) {
        return RecruitPostResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .deadline(entity.getDeadline())
                .profileId(entity.getProfile().getId())
                .profileName(entity.getProfile().getName())
                .profile(ProfileMapper.toSimpleDto(entity.getProfile()))
                .createdAt(entity.getCreatedAt())
                .deletedAt(entity.getDeletedAt()) // 소프트 삭제 시간 포함
                .build();
    }
 **/
}
