package kr.co.programmers.collabond.api.profile.domain.dto;

import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDto {
    private Long id;
    private String name;
    private String description;
    private ProfileType type;
    private int collaboCount;
    private int joinedYear;
    private Long userId;
}