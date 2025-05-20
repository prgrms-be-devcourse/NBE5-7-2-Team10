package kr.co.programmers.collabond.api.recruit.interfaces;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.interfaces.ProfileMapper;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import kr.co.programmers.collabond.api.recruit.domain.dto.RecruitPostDto;
import kr.co.programmers.collabond.api.recruit.domain.dto.RecruitPostRequestDto;
import kr.co.programmers.collabond.api.recruit.domain.dto.RecruitPostResponseDto;

public class RecruitPostMapper {

    public static RecruitPostDto toDto(RecruitPost entity) {
        return RecruitPostDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .status(entity.getStatus().toString())
                .deadline(entity.getDeadline())
                .writerProfileId(entity.getProfile().getId())
                .writerProfileName(entity.getProfile().getName())
                .build();
    }

    public static RecruitPostResponseDto toResponseDto(RecruitPost entity, String fullPath) {
        return RecruitPostResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .status(entity.getStatus())
                .deadline(entity.getDeadline())
                .profileId(entity.getProfile().getId())
                .profileName(entity.getProfile().getName())
                .profile(ProfileMapper.toSimpleDto(entity.getProfile(), fullPath))
                .deletedAt(entity.getDeletedAt()) // 소프트 삭제 시간 포함
                .build();
    }

    public static RecruitPost toEntity(RecruitPostRequestDto dto, Profile profile) {
        return RecruitPost.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .deadline(dto.getDeadline())
                .profile(profile)
                .status(
                        (dto.getStatus() == null || dto.getStatus().isEmpty())
                                ? RecruitPostStatus.RECRUITING
                                : RecruitPostStatus.valueOf(dto.getStatus())
                )
                .build();
    }
}
