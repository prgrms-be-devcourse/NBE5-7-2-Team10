package kr.co.programmers.collabond.shared.exception;

import kr.co.programmers.collabond.shared.exception.custom.*;
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

        log.debug("AbstractCustomException: {}", exception.getMessage());
        log.debug("AbstractCustomException Status: {}", exception.getStatus());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({DuplicatedException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleDuplicatedException(
            DuplicatedException exception) {

        log.debug("DuplicatedException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({ExpiredException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleExpiredException(
            ExpiredException exception) {

        log.debug("ExpiredException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({ForbiddenException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleForbiddenException(
            ForbiddenException exception) {

        log.debug("ForbiddenException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({InternalException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleInternalException(
            InternalException exception) {

        log.debug("InternalException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({NotFoundException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleNotFoundException(
            NotFoundException exception) {

        log.debug("NotFoundException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }

    @ExceptionHandler({InvalidException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleInvalidException(
            InvalidException exception) {

        log.debug("InvalidException: {}", exception.getMessage());

        return ApiErrorResponse.error(exception.getMessage(), exception.getStatus());
    }
}
