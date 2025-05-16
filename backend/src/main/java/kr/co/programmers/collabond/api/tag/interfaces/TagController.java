package kr.co.programmers.collabond.api.tag.interfaces;

import kr.co.programmers.collabond.api.tag.application.TagService;
import kr.co.programmers.collabond.api.tag.domain.dto.TagRequestDto;
import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    // 전체 태그 목록 조회
    @GetMapping("/tags")
    public ResponseEntity<List<TagResponseDto>> getAllTags() {
        List<TagResponseDto> tags = tagService.findAll();
        return ResponseEntity.ok(tags);
    }

    // 태그 추가 (관리자 권한 체크)
    @PreAuthorize("hasRole('ROLE_ADMIN')")  // 관리자만 접근 가능
    @PostMapping("/admin/tags")
    public ResponseEntity<TagResponseDto> createTag(@RequestBody TagRequestDto dto) {
        TagResponseDto response = tagService.create(dto);
        return ResponseEntity.ok(response);
    }

    // 태그 삭제 (관리자 권한 체크)
    @PreAuthorize("hasRole('ROLE_ADMIN')")  // 관리자만 접근 가능
    @DeleteMapping("/admin/tags/{tagId}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long tagId) {
        tagService.delete(tagId);
        return ResponseEntity.noContent().build();
    }
}
