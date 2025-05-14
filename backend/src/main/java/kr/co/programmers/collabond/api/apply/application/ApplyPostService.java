package kr.co.programmers.collabond.api.apply.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequest;
import kr.co.programmers.collabond.api.apply.infrastructure.ApplyPostRepository;
import kr.co.programmers.collabond.api.apply.interfaces.ApplyPostMapper;
import kr.co.programmers.collabond.api.attachment.application.AttachmentService;
import kr.co.programmers.collabond.api.attachment.domain.Attachment;
import kr.co.programmers.collabond.api.file.application.FileService;
import kr.co.programmers.collabond.api.file.domain.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplyPostService {

    private final ApplyPostRepository applyPostRepository;
    private final FileService fileService;

    @Transactional
    public void applyPost(Long recruitmentId, ApplyPostRequest request, List<MultipartFile> files) throws IOException {

        // todo : recruitmentId로 RecruitPost 찾아오는 로직 필요
        List<File> savedFiles = fileService.saveFiles(files);
        ApplyPost applyPost = ApplyPostMapper.toEntity(request);
        ArrayList<Attachment> attachments = new ArrayList<>();

        for (File savedFile : savedFiles) {
            attachments.add(
                    Attachment.builder()
                            .applyPost(applyPost)
                            .file(savedFile)
                            .build()
            );
            log.debug("savedFile.getOriginName() = {}", savedFile.getOriginName());
            log.debug("savedFile.getSavedName() = {}", savedFile.getSavedName());
        }

        applyPost.addAttachment(attachments);

        applyPostRepository.save(applyPost);
    }
}
