package kr.co.programmers.collabond.api.user.domain.dto;

import kr.co.programmers.collabond.api.user.domain.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String nickname;
    private Role role;
}
