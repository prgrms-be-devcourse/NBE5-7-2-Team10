package kr.co.programmers.collabond.api.user.domain.dto;


import kr.co.programmers.collabond.api.user.domain.Role;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDto {
    private String nickname;
    private String role;
}