package kr.co.programmers.collabond.api.user.interfaces;

import kr.co.programmers.collabond.api.user.application.UserService;
import kr.co.programmers.collabond.api.user.domain.dto.UserRequestDto;
import kr.co.programmers.collabond.api.user.domain.dto.UserResponseDto;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;



    @PostMapping
    public ResponseEntity<UserResponseDto> create(@RequestBody UserRequestDto dto) {
        return ResponseEntity.ok(userService.create(dto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long userId) {
        return userService.findById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping
    public ResponseEntity<UserResponseDto> update(@AuthenticationPrincipal OAuth2UserInfo userInfo,
                                                  @RequestBody UserRequestDto dto) {
        return ResponseEntity.ok(userService.update(userInfo.getUsername(), dto));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable Long userId) {
        userService.delete(userId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyUserInfo(@AuthenticationPrincipal OAuth2UserInfo userInfo) {
        return ResponseEntity.ok(userService.findDtoByProviderId(userInfo.getProviderId()));

    }
    @GetMapping("/{userId}/profiles")
    public ResponseEntity<?> getUserProfiles(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getProfilesByUserId(userId));
    }

}