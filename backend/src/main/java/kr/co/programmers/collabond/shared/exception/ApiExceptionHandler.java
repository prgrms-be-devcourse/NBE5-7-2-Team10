package kr.co.programmers.collabond.shared.exception;

import kr.co.programmers.collabond.shared.exception.custom.DuplicatedException;
import kr.co.programmers.collabond.shared.exception.custom.ForbiddenException;
import kr.co.programmers.collabond.shared.exception.custom.InvalidException;
import kr.co.programmers.collabond.shared.exception.custom.NotFoundException;
import kr.co.programmers.collabond.shared.util.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler {

    // CustomException을 전부 handle하는 경우
    @ExceptionHandler({AbstractCustomException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleCustomException(
            AbstractCustomException exception) {

        log.info("AbstractCustomException: {}", exception.getMessage());
        log.info("AbstractCustomException Status: {}", exception.getStatus());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({DuplicatedException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleDuplicatedException(
            DuplicatedException exception) {

        log.info("DuplicatedException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({NotFoundException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleNotFoundException(
            NotFoundException exception) {

        log.info("NotFoundException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({InvalidException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleInvalidException(
            InvalidException exception) {

        log.info("InvalidException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({ForbiddenException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleForbiddenException(
            ForbiddenException exception) {

        log.info("ForbiddenException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }
}
