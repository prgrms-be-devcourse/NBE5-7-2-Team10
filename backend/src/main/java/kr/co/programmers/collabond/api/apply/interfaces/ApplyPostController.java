package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.application.ApplyPostService;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ReceivedApplyPostsRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.SentApplyPostsRequestDto;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.core.auth.jwt.TokenBodyDto;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController("/applications")
@RequiredArgsConstructor
public class ApplyPostController {

    private final ApplyPostService applyPostService;

    @PostMapping("/{recruitmentId}")
    public ResponseEntity<ApplyPostDto> applyPost(
            @PathVariable Long recruitmentId
            , @RequestPart("apply") ApplyPostRequestDto request
            , @RequestPart("attachment") List<MultipartFile> files
    ) throws IOException {
        ApplyPostDto response = applyPostService.applyPost(recruitmentId, request, files);

        return ResponseEntity.ok(response);
    }

    // 내가 보낸 지원서
    @GetMapping("/sent")
    public ResponseEntity<Page<ApplyPostDto>> sentApplyPosts(
            SentApplyPostsRequestDto request
            , @AuthenticationPrincipal OAuth2UserInfo userInfo
            , Pageable pageable
    ) {
        Page<ApplyPostDto> applyPosts = applyPostService
                .findSentApplyPosts(request, userInfo, pageable);

        return ResponseEntity.ok(applyPosts);
    }

    // 내가 받은 지원서
    @GetMapping("/received")
    public ResponseEntity<Page<ApplyPostDto>> receivedApplyPosts(
            ReceivedApplyPostsRequestDto request
            , @AuthenticationPrincipal OAuth2UserInfo userInfo
            , @PageableDefault Pageable pageable
    ) {
        Page<ApplyPostDto> applyPosts = applyPostService
                .findReceivedApplyPosts(request, userInfo, pageable);

        return ResponseEntity.ok(applyPosts);
    }
}
