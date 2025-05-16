package kr.co.programmers.collabond.api.recruit.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RecruitPostDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime deadline;
    private Long writerProfileId;
    private String writerProfileName;

    @Builder
    private RecruitPostDto(
            Long id
            , String title
            , String description
            , String status
            , LocalDateTime deadline
            , Long writerProfileId
            , String writerProfileName
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
        this.writerProfileId = writerProfileId;
        this.writerProfileName = writerProfileName;
    }
}
