package kr.co.programmers.collabond.shared.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class AbstractCustomException extends RuntimeException {

    private final String message;
    private final HttpStatus status;

    public AbstractCustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.message = errorCode.getMessage();
        this.status = errorCode.getStatus();
    }

    public AbstractCustomException(ErrorCode errorCode, String message) {
        super(message);
        this.message = message;
        this.status = errorCode.getStatus();
    }

    public AbstractCustomException(ErrorCode errorCode, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.message = errorCode.getMessage();
        this.status = errorCode.getStatus();
    }

    // 이 예외 상위에 아무런 trace도 가지지 않도록 this를 호출
    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
