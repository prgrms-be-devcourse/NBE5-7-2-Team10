package kr.co.programmers.collabond.api.apply.application;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ApplyPostDto;
import kr.co.programmers.collabond.api.apply.domain.dto.ReceivedApplyPostsRequestDto;
import kr.co.programmers.collabond.api.apply.domain.dto.SentApplyPostsRequestDto;
import kr.co.programmers.collabond.api.apply.infrastructure.ApplyPostRepository;
import kr.co.programmers.collabond.api.apply.interfaces.ApplyPostMapper;
import kr.co.programmers.collabond.api.attachment.domain.Attachment;
import kr.co.programmers.collabond.api.file.application.FileService;
import kr.co.programmers.collabond.api.file.domain.File;
import kr.co.programmers.collabond.api.mail.dto.ReceivedApplyMailSendRequestDto;
import kr.co.programmers.collabond.api.mail.interfaces.MailMapper;
import kr.co.programmers.collabond.api.mail.service.MailService;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.infrastructure.RecruitPostRepository;
import kr.co.programmers.collabond.api.user.domain.User;
import kr.co.programmers.collabond.api.user.infrastructure.UserRepository;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import kr.co.programmers.collabond.shared.exception.ErrorCode;
import kr.co.programmers.collabond.shared.exception.custom.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final MailService mailService;
    private final RecruitPostRepository recruitPostRepository;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplyPostDto applyPost(
            Long recruitmentId
            , ApplyPostRequestDto request
            , List<MultipartFile> files
    ) throws IOException {

        RecruitPost recruitPost = recruitPostRepository.findById(recruitmentId)
                .orElseThrow(() -> new NotFoundException(ErrorCode.RECRUIT_NOT_FOUND));
        Profile profile = profileRepository.findById(request.getProfileId())
                .orElseThrow(() -> new NotFoundException(ErrorCode.PROFILE_NOT_FOUND));
        List<File> savedFiles = fileService.saveFiles(files);

        ApplyPost applyPost = ApplyPostMapper.toEntity(recruitPost, profile, request);

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

        applyPost.updateAttachment(attachments);

        ApplyPost save = applyPostRepository.save(applyPost);

        ReceivedApplyMailSendRequestDto mailSendRequestDto =
                MailMapper.toDto(recruitPost, profile, save.getCreatedAt());

        mailService.sendReceivedApplyMail(mailSendRequestDto);

        return ApplyPostMapper.toDto(save);
    }

    @Transactional(readOnly = true)
    public Page<ApplyPostDto> findSentApplyPosts(
            SentApplyPostsRequestDto request
            , OAuth2UserInfo userInfo
            , Pageable pageable
    ) {
        User user = userRepository.findByProviderId(userInfo.getUsername())
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        Page<ApplyPostDto> applyPosts = applyPostRepository
                .findAllSentByUserId(user.getId(), request.getStatus(), pageable);

        return applyPosts;
    }

    @Transactional(readOnly = true)
    public Page<ApplyPostDto> findReceivedApplyPosts(
            ReceivedApplyPostsRequestDto request
            , OAuth2UserInfo userInfo
            , Pageable pageable
    ) {
        User user = userRepository.findByProviderId(userInfo.getUsername())
                .orElseThrow(() -> new NotFoundException(ErrorCode.USER_NOT_FOUND));

        Page<ApplyPostDto> applyPosts = applyPostRepository
                .findAllReceivedByUserId(user.getId(), request.getStatus(), pageable);

        return applyPosts;
    }
}
