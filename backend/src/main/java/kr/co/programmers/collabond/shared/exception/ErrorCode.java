package kr.co.programmers.collabond.shared.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INVALID_REQUEST(400, "요청 데이터가 올바르지 않습니다"),
    NOT_FOUND(404, "요청에 대한 데이터를 찾을 수 없습니다"),
    ;

    private final int status;
    private final String message;

    // status값으로 HttpStatus를 반환하는 메서드
    public HttpStatus getStatus() {
        return HttpStatus.valueOf(status);
    }
}
