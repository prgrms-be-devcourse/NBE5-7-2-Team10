package kr.co.programmers.collabond.api.apply.application;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequest;
import kr.co.programmers.collabond.api.apply.infrastructure.ApplyPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplyPostService {

    private final ApplyPostRepository applyPostRepository;

    public void applyPost(Long recruitmentId, ApplyPostRequest request, List<MultipartFile> files) {

        ApplyPost applyPost = request.toEntity();

        applyPostRepository.save(applyPost);
    }
}
