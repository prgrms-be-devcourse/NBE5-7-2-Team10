package kr.co.programmers.collabond.shared.util;

import kr.co.programmers.collabond.shared.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ApiErrorResponse<T> {

    private String message;
    private int status;

    public static <T> ResponseEntity<ApiErrorResponse<T>> error(String message, ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getStatus())
                .body(new ApiErrorResponse<>(message, errorCode.getStatus().value()));
    }
}
