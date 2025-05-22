package kr.co.programmers.collabond.shared.exception.custom;

import kr.co.programmers.collabond.shared.exception.AbstractCustomException;
import kr.co.programmers.collabond.shared.exception.ErrorCode;

public class ExpiredException extends AbstractCustomException {
    public ExpiredException() {
        super(ErrorCode.INVALID_REQUEST);
    }

    public ExpiredException(ErrorCode errorCode) {
        super(errorCode);
    }
}
