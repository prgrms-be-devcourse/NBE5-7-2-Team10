package kr.co.programmers.collabond.shared.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ApiSuccessResponse<T> {

    private String message;
    private int status;
    private T data;

    public static <T> ResponseEntity<ApiSuccessResponse<T>> ok(T data, String message) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiSuccessResponse<>(message, HttpStatus.OK.value(), data));
    }

    public static <T> ResponseEntity<ApiSuccessResponse<T>> created(T data, String message) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiSuccessResponse<>(message, HttpStatus.CREATED.value(), data));
    }
}
