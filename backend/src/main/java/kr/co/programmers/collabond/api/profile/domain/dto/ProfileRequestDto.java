package kr.co.programmers.collabond.api.profile.domain.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileRequestDto {
    private Long userId;
    private String type;
    private String name;
    private String description;
    private String address;
    private String addressCode;
    private List<Long> tagIds;
}
