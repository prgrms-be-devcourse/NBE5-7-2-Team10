package kr.co.programmers.collabond.api.tag.application;

import kr.co.programmers.collabond.api.tag.domain.Tag;
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
    private final TagMapper tagMapper; // TagMapper 주입

    // 태그 생성
    @Transactional
    public TagResponseDto create(TagRequestDto dto) {
        // 중복된 태그 이름 체크
        if (tagRepository.existsByName(dto.getName(), dto.getType())) {
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
}
