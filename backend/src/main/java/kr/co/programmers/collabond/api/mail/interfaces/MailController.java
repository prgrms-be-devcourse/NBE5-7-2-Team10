package kr.co.programmers.collabond.api.mail.interfaces;

import kr.co.programmers.collabond.api.mail.service.MailService;
import kr.co.programmers.collabond.core.auth.oauth2.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping("/{profileId}")
    public ResponseEntity<Void> sendBondRequest(
            @PathVariable Long profileId,
            @AuthenticationPrincipal OAuth2UserInfo userInfo) {

        mailService.sendBondRequestedMail(userInfo.getProviderId(), profileId);

        return ResponseEntity.ok().build();
    }
}
