package kr.co.programmers.collabond.shared.exception;

import lombok.Getter;

@Getter
public abstract class AbstractCustomException extends RuntimeException {

    private final ErrorCode errorCode;

    public AbstractCustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return errorCode.getMessage();
    }

    // 이 예외 상위에 아무런 trace도 가지지 않도록 this를 호출
    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
