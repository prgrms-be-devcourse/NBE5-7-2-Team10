package kr.co.programmers.collabond.api.profile.domain.dto;

import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponseDto {
    private Long id;
    private Long userId;
    private String type;
    private String name;
    private String imageUrl;
    private String description;
    private String address;
    private String addressCode;
    private int collaboCount;
    private boolean status;
    private List<TagResponseDto> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
