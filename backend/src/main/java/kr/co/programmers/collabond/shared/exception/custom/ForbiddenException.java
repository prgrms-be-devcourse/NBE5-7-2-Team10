package kr.co.programmers.collabond.shared.exception.custom;

import kr.co.programmers.collabond.shared.exception.AbstractCustomException;
import kr.co.programmers.collabond.shared.exception.ErrorCode;

public class ForbiddenException extends AbstractCustomException {
    public ForbiddenException() {
        super(ErrorCode.FORBIDDEN_REQUEST);
    }

    public ForbiddenException(ErrorCode errorCode) {
        super(errorCode);
    }
}
