package kr.co.programmers.collabond.api.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import kr.co.programmers.collabond.api.mail.dto.ReceivedApplyMailSendRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.format.DateTimeFormatter;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    @Value("${custom.mail.subject.apply-received}")
    private String applyReceivedSubject;

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendReceivedApplyMail(ReceivedApplyMailSendRequestDto request) {
        Context context = new Context();
        context.setVariable("recruitPostTitle", request.getRecruitPostTitle());
        context.setVariable("applicantName", request.getApplicantName());
        context.setVariable("applicantProfileName", request.getApplicantProfileName());
        context.setVariable("appliedAt", request.getAppliedAt());

        sendTemplateMail(
                request.getReceiverEmail(),
                applyReceivedSubject,
                "mail/apply-notification.html",
                context
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
