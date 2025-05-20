package kr.co.programmers.collabond.api.profile.domain.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDto {
    private Long id;
    private String name;
    private String description;
    private String type;
    private int collaboCount;
    private Long userId;
}