package kr.co.programmers.collabond.shared.exception;

import kr.co.programmers.collabond.shared.exception.custom.DuplicatedException;
import kr.co.programmers.collabond.shared.exception.custom.InvalidException;
import kr.co.programmers.collabond.shared.exception.custom.NotFoundException;
import kr.co.programmers.collabond.shared.util.ApiErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    // CustomException을 전부 handle하는 경우
    @ExceptionHandler({AbstractCustomException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleCustomException(
            AbstractCustomException exception
    ) {
        return ApiErrorResponse.error(exception.getMessage(), exception.getErrorCode());
    }

    @ExceptionHandler({DuplicatedException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleDuplicatedException(
            DuplicatedException exception
    ) {
        return ApiErrorResponse.error(exception.getMessage(), exception.getErrorCode());
    }

    @ExceptionHandler({NotFoundException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleNotFoundException(
            NotFoundException exception
    ) {
        return ApiErrorResponse.error(exception.getMessage(), exception.getErrorCode());
    }

    @ExceptionHandler({InvalidException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleInvalidException(
            InvalidException exception
    ) {
        return ApiErrorResponse.error(exception.getMessage(), exception.getErrorCode());
    }
}
