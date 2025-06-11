package kr.co.programmers.collabond.api.mail.interfaces;

import kr.co.programmers.collabond.api.apply.domain.ApplyPost;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.recruit.domain.RecruitPost;
import kr.co.programmers.collabond.api.user.domain.User;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;

public class MailMapper {
    public static Context toReceivedApplyContext(
            RecruitPost recruitPost, Profile applicantProfile, LocalDateTime appliedAt) {
        Context context = new Context();
        context.setVariable("recruitPostTitle",    recruitPost.getTitle());
        context.setVariable("applicantName",       applicantProfile.getUser().getNickname());
        context.setVariable("applicantProfileName",applicantProfile.getName());
        context.setVariable("appliedAt",           appliedAt);
        return context;
    }

    public static Context toAppliedCompleteContext(
            ApplyPost applyPost, LocalDateTime acceptedAt) {
        RecruitPost recruitPost = applyPost.getRecruitPost();
        Context context = new Context();
        context.setVariable("recruitPostTitle",     recruitPost.getTitle());
        context.setVariable("recruitUserEmail",     recruitPost.getProfile().getUser().getEmail());
        context.setVariable("recruitProfileName",   recruitPost.getProfile().getName());
        context.setVariable("recruitUserNickname",  recruitPost.getProfile().getUser().getNickname());
        context.setVariable("acceptedAt",           acceptedAt);
        return context;
    }

    public static Context toRecruitedCompleteContext(
            ApplyPost applyPost, LocalDateTime acceptedAt) {
        Profile applicantProfile = applyPost.getProfile();
        Context context = new Context();
        context.setVariable("applyProfileName",     applicantProfile.getName());
        context.setVariable("applyUserNickname",    applicantProfile.getUser().getNickname());
        context.setVariable("applyUserEmail",    applicantProfile.getUser().getEmail());
        context.setVariable("acceptedAt",           acceptedAt);
        return context;
    }

    public static Context toRequestedBondContext(
            User requestUser, Profile requestedProfile, LocalDateTime requestedAt) {
        Context context = new Context();
        context.setVariable("requestedUserNickname", requestUser.getNickname());
        context.setVariable("requestedUserEmail", requestUser.getEmail());
        context.setVariable("requestedProfileName", requestedProfile.getName());
        context.setVariable("requestedUserRole", requestUser.getRole().toString());
        context.setVariable("requestedAt", requestedAt);
        return context;
    }
}
