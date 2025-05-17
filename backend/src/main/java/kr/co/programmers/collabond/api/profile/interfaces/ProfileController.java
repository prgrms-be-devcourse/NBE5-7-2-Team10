package kr.co.programmers.collabond.api.profile.interfaces;

import kr.co.programmers.collabond.api.profile.application.ProfileService;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<ProfileResponseDto> create(@RequestBody ProfileRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(profileService.create(dto));
    }
    //특정 프로필 id로 프로필 상세 조회
    @GetMapping("/{profileId}")
    public ResponseEntity<ProfileResponseDto> get(@PathVariable Long profileId) {
        return profileService.findById(profileId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    //특정 유저가 가진 모든 프로필 목록 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProfileResponseDto>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(profileService.findAllByUser(userId));
    }

    @PatchMapping("/{profileId}")
    public ResponseEntity<ProfileResponseDto> update(@PathVariable Long profileId, @RequestBody ProfileRequestDto dto) {
        return ResponseEntity.ok(profileService.update(profileId, dto));
    }

    //프로필 삭제시 연결된 파일은 HARDDELETE 후 프로필은 SOFTDELETE됨
    @DeleteMapping("/{profileId}")
    public ResponseEntity<Void> delete(@PathVariable Long profileId) {
        profileService.delete(profileId);
        return ResponseEntity.noContent().build();
    }
}
