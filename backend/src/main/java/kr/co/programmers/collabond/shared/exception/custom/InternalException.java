package kr.co.programmers.collabond.shared.exception.custom;

import kr.co.programmers.collabond.shared.exception.AbstractCustomException;
import kr.co.programmers.collabond.shared.exception.ErrorCode;

public class InternalException extends AbstractCustomException {
    public InternalException() {
        super(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    public InternalException(ErrorCode errorCode) {
        super(errorCode);
    }
}
