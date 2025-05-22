package kr.co.programmers.collabond.shared.exception.custom;

import kr.co.programmers.collabond.shared.exception.AbstractCustomException;
import kr.co.programmers.collabond.shared.exception.ErrorCode;

public class DuplicatedException extends AbstractCustomException {
    public DuplicatedException() {
        super(ErrorCode.DUPLICATED_DATA);
    }

    public DuplicatedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
