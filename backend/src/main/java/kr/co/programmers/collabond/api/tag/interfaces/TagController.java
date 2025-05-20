package kr.co.programmers.collabond.api.tag.interfaces;

import kr.co.programmers.collabond.api.tag.application.TagService;
import kr.co.programmers.collabond.api.tag.domain.dto.TagRequestDto;
import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    // 전체 태그 목록 조회
    @GetMapping("/tags")
    public ResponseEntity<List<TagResponseDto>> getAllTags() {
        List<TagResponseDto> tags = tagService.findAll();
        return ResponseEntity.ok(tags);
    }

    // 태그 추가
    @PostMapping("/admin/tags")
    public ResponseEntity<TagResponseDto> createTag(@RequestBody TagRequestDto request) {
        TagResponseDto response = tagService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 태그 삭제
    @DeleteMapping("/admin/tags/{tagId}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long tagId) {
        tagService.delete(tagId);
        return ResponseEntity.noContent().build();
    }
}
