package kr.co.programmers.collabond.shared.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ApiErrorResponse<T> {

    private String message;
    private int status;

    public static <T> ResponseEntity<ApiErrorResponse<T>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status)
                .body(new ApiErrorResponse<>(message, status.value()));
    }
}
