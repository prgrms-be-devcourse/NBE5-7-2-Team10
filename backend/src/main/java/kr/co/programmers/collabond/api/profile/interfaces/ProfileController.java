package kr.co.programmers.collabond.api.profile.interfaces;

import kr.co.programmers.collabond.api.profile.application.ProfileService;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // 프로필 생성
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ProfileResponseDto> create(
            @RequestPart("dto") ProfileRequestDto dto,
            @RequestPart(name = "profileImage", required = false) MultipartFile profileImage,
            @RequestPart(name = "thumbnailImage", required = false) MultipartFile thumbnailImage,
            @RequestPart(name = "extraImages", required = false) List<MultipartFile> extraImages,
            @RequestPart(name = "tagIds", required = false) List<Long> tagIds) {

        ProfileResponseDto response = profileService.create(dto, profileImage, thumbnailImage, extraImages, tagIds);
        return ResponseEntity.ok(response);
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

    //프로필 수정
    @PatchMapping(value = "/{profileId}", consumes = "multipart/form-data")
    public ResponseEntity<ProfileResponseDto> update(
            @PathVariable Long profileId,
            @RequestPart("dto") ProfileRequestDto dto,
            @RequestPart(name = "profileImage", required = false) MultipartFile profileImage,
            @RequestPart(name = "thumbnailImage", required = false) MultipartFile thumbnailImage,
            @RequestPart(name = "extraImages", required = false) List<MultipartFile> extraImages,
            @RequestPart(name = "tagIds", required = false) List<Long> tagIds) {

        ProfileResponseDto response = profileService.update(profileId, dto, profileImage, thumbnailImage, extraImages, tagIds);
        return ResponseEntity.ok(response);
    }

    //프로필 삭제시 연결된 파일은 HARDDELETE 후 프로필은 SOFTDELETE됨
    @DeleteMapping("/{profileId}")
    public ResponseEntity<Void> delete(@PathVariable Long profileId) {
        profileService.delete(profileId);
        return ResponseEntity.noContent().build();
    }
}
