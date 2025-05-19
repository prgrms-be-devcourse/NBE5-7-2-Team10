package kr.co.programmers.collabond.api.recruit.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class RecruitPostRequestDto {
    private Long profileId;
    private String title;
    private String description;
    private LocalDateTime deadline;
    private String status;
}

