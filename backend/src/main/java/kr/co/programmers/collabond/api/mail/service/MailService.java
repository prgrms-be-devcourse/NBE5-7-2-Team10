package kr.co.programmers.collabond.api.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.mail.interfaces.MailMapper;
import kr.co.programmers.collabond.api.profile.application.ProfileService;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.user.application.UserService;
import kr.co.programmers.collabond.api.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    @Value("${custom.mail.subject.apply-received}")
    private String applyReceivedSubject;

    @Value("${custom.mail.subject.bond-completed}")
    private String bondCompletedSubject;

    @Value("${custom.mail.subject.bond-requested}")
    private String bondRequestedSubject;

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final UserService userService;
    private final ProfileService profileService;

    // 트랜잭션 전파 없이 실행
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void sendBondCompletionEmails(ApplyPost applyPost, LocalDateTime acceptedAt) {
        sendTemplateMail(
                applyPost.getProfile().getUser().getEmail(),
                bondCompletedSubject,
                "mail/complete-bond-to-applied.html",
                MailMapper.toAppliedCompleteContext(applyPost, acceptedAt)
        );
        sendTemplateMail(
                applyPost.getRecruitPost().getProfile().getUser().getEmail(),
                bondCompletedSubject,
                "mail/complete-bond-to-recruited.html",
                MailMapper.toRecruitedCompleteContext(applyPost, acceptedAt)
        );
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void sendReceivedApplyMail(RecruitPost recruitPost, Profile applicantProfile, LocalDateTime appliedAt) {
        sendTemplateMail(
                recruitPost.getProfile().getUser().getEmail(),
                applyReceivedSubject,
                "mail/apply-notification.html",
                MailMapper.toReceivedApplyContext(recruitPost, applicantProfile, appliedAt)
        );
    }

    @Transactional(readOnly = true)
    public void sendBondRequestedMail(String providerId, Long profileId) {
        User requestUser = userService.findByProviderId(providerId);
        Profile requestedProfile = profileService.findByProfileId(profileId);

        sendTemplateMail(
                requestedProfile.getUser().getEmail(),
                bondRequestedSubject,
                "mail/bond-request.html",
                MailMapper.toRequestedBondContext(requestUser, requestedProfile, LocalDateTime.now())
        );
    }

    @Async
    protected void sendTemplateMail(String to, String subject, String templateName, Context context) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper =
                    new MimeMessageHelper(mimeMessage, true, "UTF-8");

            String body = templateEngine.process(templateName, context);

            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("이메일 전송 오류 : " + e.getMessage());
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
