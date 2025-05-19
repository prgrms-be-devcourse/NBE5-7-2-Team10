package kr.co.programmers.collabond.api.tag.application;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profiletag.domain.ProfileTag;
import kr.co.programmers.collabond.api.profiletag.infrastructure.ProfileTagRepository;
import kr.co.programmers.collabond.api.tag.domain.Tag;
import kr.co.programmers.collabond.api.tag.domain.TagType;
import kr.co.programmers.collabond.api.tag.infrastructure.TagRepository;
import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import kr.co.programmers.collabond.api.tag.domain.dto.TagRequestDto;
import kr.co.programmers.collabond.api.tag.interfaces.TagMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ProfileTagRepository profileTagRepository;
    private final TagMapper tagMapper; // TagMapper 주입

    // 태그 생성
    @Transactional
    public TagResponseDto create(TagRequestDto dto) {
        // 중복된 태그 이름 체크
        if (tagRepository.existsByNameAndType(dto.getName(), dto.getType())) {
            throw new IllegalArgumentException("태그 이름과 타입이 같은 태그가 이미 존재합니다.");
        }

        // Tag 엔티티로 변환
        Tag tag = tagMapper.toEntity(dto);
        Tag savedTag = tagRepository.save(tag);
        return tagMapper.toDto(savedTag); // DTO 변환 후 반환
    }

    // 태그 삭제
    @Transactional
    public void delete(Long tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new IllegalArgumentException("태그가 존재하지 않습니다."));
        tagRepository.delete(tag);
    }

    // 모든 태그 조회
    @Transactional(readOnly = true)
    public List<TagResponseDto> findAll() {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream().map(tagMapper::toDto).toList(); // Tag -> TagResponseDto 변환 후 반환
    }

    //프로필에 태그를 설정 (최대 5개, 타입 일치 검증)
    @Transactional
    public void validateAndBindTags(Profile profile, List<Long> tagIds) {
        if (tagIds.size() > 5) {
            throw new IllegalArgumentException("태그는 최대 5개까지 선택할 수 있습니다.");
        }

        List<Tag> tags = tagRepository.findAllById(tagIds);

        if (tags.size() != tagIds.size()) {
            throw new IllegalArgumentException("존재하지 않는 태그가 포함되어 있습니다.");
        }

        TagType profileType = TagType.valueOf(profile.getType().name());
        for (Tag tag : tags) {
            if (!tag.getType().equals(profileType)) {
                throw new IllegalArgumentException("프로필 타입과 일치하지 않는 태그가 포함되어 있습니다.");
            }
        }

        for (Tag tag : tags) {
            ProfileTag profileTag = ProfileTag.builder()
                    .tag(tag)
                    .build();
            profile.addTag(profileTag); // Profile이 연관관계 관리
        }
    }

    //프로필에 연결된 태그 전부 제거
    @Transactional
    public void clearTags(Profile profile) {
        profile.getTags().clear();// orphanRemoval로 자동 삭제
    }
}


