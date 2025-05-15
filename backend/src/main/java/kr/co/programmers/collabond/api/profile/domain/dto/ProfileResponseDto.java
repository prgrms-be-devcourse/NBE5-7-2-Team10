package kr.co.programmers.collabond.api.profile.domain.dto;

import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponseDto {
    private Long id;
    private Long userId;
    private Long addressId;
    private ProfileType type;
    private String name;
    private String description;
    private String detailAddress;
    private int collaboCount;
    private boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
