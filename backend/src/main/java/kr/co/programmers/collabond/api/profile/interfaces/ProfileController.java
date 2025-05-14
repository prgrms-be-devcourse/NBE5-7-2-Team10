package kr.co.programmers.collabond.api.profile.interfaces;

import kr.co.programmers.collabond.api.profile.application.ProfileService;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import lombok.RequiredArgsConstructor;
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
        return ResponseEntity.ok(profileService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> get(@PathVariable Long id) {
        return profileService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProfileResponseDto>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(profileService.findAllByUser(userId));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> update(@PathVariable Long id, @RequestBody ProfileRequestDto dto) {
        return ResponseEntity.ok(profileService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        profileService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
