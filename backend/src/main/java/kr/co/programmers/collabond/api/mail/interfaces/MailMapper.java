package kr.co.programmers.collabond.api.mail.interfaces;

import kr.co.programmers.collabond.api.mail.dto.ReceivedApplyMailSendRequestDto;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;

import java.time.LocalDateTime;

public class MailMapper {
    public static ReceivedApplyMailSendRequestDto toDto(
            RecruitPost recruitPost, Profile applicantProfile, LocalDateTime appliedAt) {
        return ReceivedApplyMailSendRequestDto.builder()
                .recruitPostTitle(recruitPost.getTitle())
                .applicantName(applicantProfile.getUser().getNickname())
                .applicantProfileName(applicantProfile.getName())
                .receiverEmail(recruitPost.getProfile().getUser().getEmail())
                .appliedAt(appliedAt)
                .build();
    }
}
