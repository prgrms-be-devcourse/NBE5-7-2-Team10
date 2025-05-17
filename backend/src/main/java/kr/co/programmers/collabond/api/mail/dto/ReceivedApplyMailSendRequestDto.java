package kr.co.programmers.collabond.api.mail.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReceivedApplyMailSendRequestDto {
    private String recruitPostTitle; // 모집 글 제목
    private String applicantName; // 지원자 이름
    private String applicantProfileName; // 지원자 프로필 이름
    private String receiverEmail; // 수신자(모집글 작성자) 이메일
    private LocalDateTime appliedAt; // 지원 시간
}
