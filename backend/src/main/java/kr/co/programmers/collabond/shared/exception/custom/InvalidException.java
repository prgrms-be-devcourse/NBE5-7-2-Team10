package kr.co.programmers.collabond.shared.exception.custom;

import kr.co.programmers.collabond.shared.exception.AbstractCustomException;
import kr.co.programmers.collabond.shared.exception.ErrorCode;

public class InvalidException extends AbstractCustomException {
    public InvalidException() {
        super(ErrorCode.INVALID_REQUEST);
    }

    public InvalidException(ErrorCode errorCode) {
        super(errorCode);
    }
}
