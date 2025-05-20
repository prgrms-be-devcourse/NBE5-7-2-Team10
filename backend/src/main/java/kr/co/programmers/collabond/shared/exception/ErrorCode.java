package kr.co.programmers.collabond.shared.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INVALID_REQUEST(400, "요청이 올바르지 않습니다"),
    INVALID_TOKEN(400, "유효하지 않은 토큰입니다"),
    INVALID_PROVIDER(400, "유효하지 않은 OAuth2.0 제공자입니다"),
    INVALID_SIGNUP_REQUEST(400, "이미 회원가입 했습니다"),
    DUPLICATED_DATA(400, "중복된 데이터입니다"),
    DUPLICATED_CHARACTER_NAME(400, "중복되는 캐릭터 이름입니다"),
    DUPLICATED_USER_EMAIL(400, "이미 가입된 이메일입니다"),
    EXPIRED_DATA(401, "만료된 데이터입니다"),
    EXPIRED_TOKEN(401, "만료된 토큰입니다"),
    EXPIRED_REFRESH_TOKEN(410, "만료된 리프레시 토큰입니다"),
    NOT_FOUND(404, "요청에 대한 데이터를 찾을 수 없습니다"),
    RECRUIT_NOT_FOUND(404, "모집 공고글을 찾을 수 없습니다"),
    PROFILE_NOT_FOUND(404, "프로필을 찾을 수 없습니다"),
    USER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다"),
    APPLY_NOT_FOUND(404, "제출한 지원글을 찾을 수 없습니다"),
    TOKEN_NOT_FOUND(404, "토큰을 찾을 수 없습니다")
    ;

    private final int status;
    private final String message;

    // status값으로 HttpStatus를 반환하는 메서드
    public HttpStatus getStatus() {
        return HttpStatus.valueOf(status);
    }
}
