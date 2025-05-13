package kr.co.programmers.collabond.api.apply.interfaces;

import kr.co.programmers.collabond.api.apply.application.ApplyPostService;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequest;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController("/applications")
@RequiredArgsConstructor
public class ApplyPostController {

    private final ApplyPostService applyPostService;

    @PostMapping("/{recruitmentId}")
    public ResponseEntity<ApplyPostResponse> applyPost(
            @PathVariable Long recruitmentId
            , ApplyPostRequest request
            , List<MultipartFile> files
    ) {
        applyPostService.applyPost(recruitmentId, request, files);

        return ResponseEntity.ok(new ApplyPostResponse());
    }
}
