package kr.co.programmers.collabond.api.apply.domain.dto;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.ApplyPostStatus;

public class ApplyPostRequest {

    private String content;

    public ApplyPost toEntity() {
        return ApplyPost.builder()
                .content(content)
                .status(ApplyPostStatus.PENDING)
                .build();
    }
}
