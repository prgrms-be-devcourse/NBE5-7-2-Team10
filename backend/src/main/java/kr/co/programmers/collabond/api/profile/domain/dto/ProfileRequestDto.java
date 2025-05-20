package kr.co.programmers.collabond.api.profile.domain.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileRequestDto {
    private Long userId;
    private Long addressId;
    private String type;
    private String name;
    private String description;
    private String detailAddress;
    private List<Long> tagIds;
}
