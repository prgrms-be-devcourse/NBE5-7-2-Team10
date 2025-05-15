package kr.co.programmers.collabond.api.recruit.application;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.repository.ProfileRepository;
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

@Service
@RequiredArgsConstructor
public class RecruitPostService {
    private final RecruitPostRepository recruitPostRepository;
    private final ProfileRepository profileRepository;

    // 모집글 작성
    @Transactional
    public RecruitPostResponseDto createRecruitPost(RecruitPostRequestDto request, Long userId) {
        // 1. 요청으로 받은 프로필 ID에 해당하는 프로필을 찾기
        Profile profile = profileRepository.findById(request.getProfileId())
                .orElseThrow(() -> new IllegalArgumentException("프로필을 찾을 수 없습니다."));

        // 2. 프로필의 사용자 ID가 요청한 userId와 일치하는지 확인 (권한 체크)
        if (!profile.getUser().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다.");
        }

        // 3. 모집글을 생성하고, RecruitPost 엔티티에 저장
        RecruitPost post = RecruitPost.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .deadline(request.getDeadline())
                .profile(profile)
                .status(RecruitPostStatus.RECRUITING)  // 기본 상태: RECRUITING
                .build();

        // 4. 저장된 모집글을 DTO로 변환하여 반환
        return RecruitPostResponseDto.from(recruitPostRepository.save(post));
    }

    // 모집글 수정
    @Transactional
    public RecruitPostResponseDto updateRecruitPost(Long recruitmentId, RecruitPostRequestDto request, Long userId) {
        // 1. 수정할 모집글을 ID로 조회
        RecruitPost post = recruitPostRepository.findById(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        // 2. 프로필 사용자 ID와 요청한 userId를 비교하여 권한을 체크
        if (!post.getProfile().getUser().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다.");
        }

        // 3. 모집글을 업데이트
        post.update(request.getTitle(), request.getDescription(), request.getStatus(), request.getDeadline());

        // 4. 업데이트된 모집글을 DTO로 반환
        return RecruitPostResponseDto.from(post);
    }

    // 모집글 삭제
    @Transactional
    public void deleteRecruitPost(Long recruitmentId, Long userId) {
        // 1. 삭제할 모집글을 조회
        RecruitPost post = recruitPostRepository.findById(recruitmentId)
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        // 2. 프로필 사용자 ID와 요청한 userId를 비교하여 권한을 체크
        if (!post.getProfile().getUser().getId().equals(userId)) {
            throw new SecurityException("권한이 없습니다.");
        }

        // 3. 모집글을 삭제
        recruitPostRepository.delete(post);
    }

    // 모집글 목록 조회
    @Transactional(readOnly = true)
    public Page<RecruitPostResponseDto> getAllRecruitPosts(RecruitPostStatus status, String sort, Pageable pageable) {
        // 1. 상태에 맞는 모집글을 조회하거나 모든 모집글을 조회
        Page<RecruitPost> posts = status != null
                ? recruitPostRepository.findByStatus(status, pageable)
                : recruitPostRepository.findAll(pageable);

        // 2. 조회된 모집글을 DTO로 변환하여 반환
        return posts.map(RecruitPostResponseDto::from);
    }

    // 회원이 작성한 모집글 조회
    @Transactional(readOnly = true)
    public Page<RecruitPostResponseDto> getRecruitPostsByUser(Long userId, Pageable pageable) {
        // 1. 회원 ID로 작성한 모집글을 조회
        return recruitPostRepository.findByProfile_User_Id(userId, pageable)
                .map(RecruitPostResponseDto::from);
    }

    // 프로필이 작성한 모집글 조회
    @Transactional(readOnly = true)
    public RecruitPostResponseDto getRecruitPostByProfile(Long profileId) {
        // 1. 프로필 ID로 작성한 모집글을 조회
        RecruitPost post = recruitPostRepository.findByProfile_Id(profileId)
                .orElseThrow(() -> new IllegalArgumentException("해당 프로필이 작성한 모집글을 찾을 수 없습니다."));

        // 2. 조회된 모집글을 DTO로 변환하여 반환
        return RecruitPostResponseDto.from(post);
    }
}
