package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.application.ApplyPostService;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ReceivedApplyPostsRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.SentApplyPostsRequestDto;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplyPostController {

    private final ApplyPostService applyPostService;

    @PostMapping("/{recruitmentId}")
    public ResponseEntity<ApplyPostDto> applyPost(
            @PathVariable Long recruitmentId,
            @RequestPart("applyRequest") ApplyPostRequestDto request,
            @RequestPart(name = "attachment", required = false) List<MultipartFile> files) {

        ApplyPostDto response = applyPostService.applyPost(recruitmentId, request, files);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 내가 보낸 지원서
    @GetMapping("/sent")
    public ResponseEntity<Page<ApplyPostDto>> sentApplyPosts(
            SentApplyPostsRequestDto request,
            @AuthenticationPrincipal OAuth2UserInfo userInfo,
            @PageableDefault Pageable pageable) {

        Page<ApplyPostDto> applyPosts = applyPostService
                .findSentApplyPosts(request, userInfo, pageable);

        return ResponseEntity.ok(applyPosts);
    }

    // 내가 받은 지원서
    @GetMapping("/received")
    public ResponseEntity<Page<ApplyPostDto>> receivedApplyPosts(
            ReceivedApplyPostsRequestDto request,
            @AuthenticationPrincipal OAuth2UserInfo userInfo,
            @PageableDefault Pageable pageable) {

        Page<ApplyPostDto> applyPosts = applyPostService
                .findReceivedApplyPosts(request, userInfo, pageable);

        return ResponseEntity.ok(applyPosts);
    }
}
