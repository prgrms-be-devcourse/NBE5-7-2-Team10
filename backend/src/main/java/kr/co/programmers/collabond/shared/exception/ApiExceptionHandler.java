package kr.co.programmers.collabond.shared.exception;

import kr.co.programmers.collabond.shared.util.ApiErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    // CustomException을 전부 handle하는 경우
    @ExceptionHandler({CustomException.class})
    public <T> ResponseEntity<ApiErrorResponse<T>> handleCustomException(CustomException exception) {
        return ApiErrorResponse.error(exception.getMessage(), exception.getErrorCode());
    }
}
