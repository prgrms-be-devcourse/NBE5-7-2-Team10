package kr.co.programmers.collabond.api.recruit.application;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.infrastructure.ProfileRepository;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPostStatus;
import kr.co.programmers.collabond.api.recruit.dto.RecruitPostRequestDto;
import kr.co.programmers.collabond.api.recruit.dto.RecruitPostResponseDto;
import kr.co.programmers.collabond.api.recruit.infrastructure.RecruitPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RecruitPostService {
    private final RecruitPostRepository recruitPostRepository;
    private final ProfileRepository profileRepository;

    // 모집글 작성
    @Transactional
    public RecruitPostResponseDto createRecruitPost(RecruitPostRequestDto request, Long userId) {
        Profile profile = profileRepository.findById(request.getProfileId())
                .orElseThrow(() -> new IllegalArgumentException("프로필을 찾을 수 없습니다."));

        if (!profile.getUser().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다.");
        }

        RecruitPost post = RecruitPost.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .deadline(request.getDeadline())
                .profile(profile)
                .status(RecruitPostStatus.RECRUITING)
                .build();

        return RecruitPostResponseDto.from(recruitPostRepository.save(post));
    }

    // 모집글 수정
    @Transactional
    public RecruitPostResponseDto updateRecruitPost(Long recruitmentId, RecruitPostRequestDto request, Long userId) {
        RecruitPost post = recruitPostRepository.findById(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        // 소프트 삭제된 게시글은 수정할 수 없습니다.
        if (post.getDeletedAt() != null) {
            throw new IllegalArgumentException("삭제된 모집글은 수정할 수 없습니다.");
        }

        if (!post.getProfile().getUser().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다.");
        }

        post.update(request.getTitle(), request.getDescription(), request.getStatus(), request.getDeadline());
        return RecruitPostResponseDto.from(post);
    }

    // 모집글 삭제 (소프트 삭제)
    @Transactional
    public void deleteRecruitPost(Long recruitmentId, Long userId) {
        RecruitPost post = recruitPostRepository.findById(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        if (!post.getProfile().getUser().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다.");
        }

        recruitPostRepository.delete(post);
    }

    // 모집글 목록 조회
    @Transactional(readOnly = true)
    public Page<RecruitPostResponseDto> getAllRecruitPosts(RecruitPostStatus status, String sort, Pageable pageable) {
        Page<RecruitPost> posts = status != null
                ? recruitPostRepository.findByStatus(status, pageable)
                : recruitPostRepository.findAll(pageable);

        return posts.map(RecruitPostResponseDto::from);
    }

    // 회원이 작성한 모집글 조회
    @Transactional(readOnly = true)
    public Page<RecruitPostResponseDto> getRecruitPostsByUser(Long userId, Pageable pageable) {
        return recruitPostRepository.findByProfile_User_Id(userId, pageable)
                .map(RecruitPostResponseDto::from);
    }

    // 프로필이 작성한 모집글 조회
    @Transactional(readOnly = true)
    public RecruitPostResponseDto getRecruitPostByProfile(Long profileId) {
        RecruitPost post = recruitPostRepository.findByProfile_Id(profileId)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로필이 작성한 모집글을 찾을 수 없습니다."));
        return RecruitPostResponseDto.from(post);
    }
}
