package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.ApplyPostStatus;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequest;

public class ApplyPostMapper {

    public static ApplyPost toEntity(ApplyPostRequest request) {
        return ApplyPost.builder()
//                .recruitPost()
//                .profile()
                .content(request.getContent())
                .status(ApplyPostStatus.PENDING)
                .build();
    }
}
