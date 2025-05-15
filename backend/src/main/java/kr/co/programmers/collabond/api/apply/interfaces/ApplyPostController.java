package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.application.ApplyPostService;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostResponseDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ReceivedApplyPostsRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.SentApplyPostsRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController("/applications")
@RequiredArgsConstructor
public class ApplyPostController {

    private final ApplyPostService applyPostService;

    @PostMapping("/{recruitmentId}")
    public ResponseEntity<ApplyPostResponseDto> applyPost(
            @PathVariable Long recruitmentId
            , ApplyPostRequestDto request
            , List<MultipartFile> files
    ) throws IOException {
        applyPostService.applyPost(recruitmentId, request, files);

        return ResponseEntity.ok(new ApplyPostResponseDto());
    }

    // 내가 보낸 지원서, 내가 받은 지원서
    @GetMapping("/sent")
    public ResponseEntity<List<ApplyPostResponseDto>> sentApplyPosts(SentApplyPostsRequestDto request) {
        // todo : 로그인된 회원 정보도 파라미터에 필요
        List<ApplyPostResponseDto> applyPosts = applyPostService.findSentApplyPosts(request);
        return ResponseEntity.ok(applyPosts);
    }

    @GetMapping("/received")
    public ResponseEntity<List<ApplyPostResponseDto>> receivedApplyPosts(ReceivedApplyPostsRequestDto request) {
        // todo : 로그인된 회원 정보도 파라미터에 필요
        List<ApplyPostResponseDto> applyPosts = applyPostService.findReceivedApplyPosts(request);
        return ResponseEntity.ok(applyPosts);
    }
}
