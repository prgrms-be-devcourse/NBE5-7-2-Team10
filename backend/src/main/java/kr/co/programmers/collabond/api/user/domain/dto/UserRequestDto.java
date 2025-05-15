package kr.co.programmers.collabond.api.user.domain.dto;


import kr.co.programmers.collabond.api.user.domain.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDto {
    private String email;
    private String nickname;
    private Role role;
}