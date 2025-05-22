package kr.co.programmers.collabond.api.recruit.interfaces;

import kr.co.programmers.collabond.api.recruit.domain.dto.RecruitPostRequestDto;
import kr.co.programmers.collabond.api.recruit.domain.dto.RecruitPostResponseDto;
import kr.co.programmers.collabond.api.recruit.application.RecruitPostService;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruitments")
@RequiredArgsConstructor
public class RecruitPostController {

    private final RecruitPostService recruitPostService;

    // 모집글 작성
    @PostMapping
    public ResponseEntity<RecruitPostResponseDto> createRecruitPost(
            @RequestBody RecruitPostRequestDto request,
            @AuthenticationPrincipal OAuth2UserInfo userInfo) {

        // 요청으로 받은 DTO와 사용자 ID를 바탕으로 모집글 작성
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(recruitPostService.createRecruitPost(request, userInfo));
    }

    // 모집글 단건 조회 - 5/23일 수정
    @GetMapping("/{recruitmentId}")
    public ResponseEntity<RecruitPostResponseDto> getRecruitPostById(
            @PathVariable Long recruitmentId) {

        // 특정 ID의 모집글을 조회하여 반환
        return ResponseEntity.ok(recruitPostService.getRecruitPostById(recruitmentId));
    }

    // 모집글 수정
    @PatchMapping("/{recruitmentId}")
    public ResponseEntity<RecruitPostResponseDto> updateRecruitPost(
            @PathVariable Long recruitmentId,
            @RequestBody RecruitPostRequestDto request,
            @AuthenticationPrincipal OAuth2UserInfo userInfo) {

        // 특정 모집글 ID를 찾아서 해당 모집글을 수정
        return ResponseEntity
                .ok(recruitPostService.updateRecruitPost(recruitmentId, request, userInfo));
    }

    // 모집글 삭제
    @DeleteMapping("/{recruitmentId}")
    public ResponseEntity<Void> deleteRecruitPost(
            @PathVariable Long recruitmentId,
            @AuthenticationPrincipal OAuth2UserInfo userInfo) {

        // 모집글을 삭제하며, 사용자 권한을 체크한 후 삭제
        recruitPostService.deleteRecruitPost(recruitmentId, userInfo);
        return ResponseEntity.ok().build();
    }

    // 모집글 목록 조회
    @GetMapping
    public ResponseEntity<Page<RecruitPostResponseDto>> getAllRecruitPosts(
            @RequestParam(required = false) RecruitPostStatus status,
            @RequestParam(required = false) String sort,
            @PageableDefault(size = 10) Pageable pageable) {

        // 모집글 목록을 필터링 (상태 및 정렬)하여 조회
        return ResponseEntity.ok(recruitPostService.getAllRecruitPosts(status, sort, pageable));
    }

    // 회원이 작성한 모집글 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<Page<RecruitPostResponseDto>> getRecruitPostsByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 10) Pageable pageable) {

        // 특정 회원이 작성한 모집글을 조회
        return ResponseEntity.ok(recruitPostService.getRecruitPostsByUser(userId, pageable));
    }

    // 프로필이 작성한 모집글 조회
    @GetMapping("/profiles/{profileId}")
    public ResponseEntity<Page<RecruitPostResponseDto>> getRecruitPostByProfile(
            @PathVariable Long profileId,
            @PageableDefault(size = 10) Pageable pageable) {

        // 특정 프로필이 작성한 모집글을 조회
        return ResponseEntity.ok(recruitPostService.getRecruitPostByProfile(profileId, pageable));
    }
}
