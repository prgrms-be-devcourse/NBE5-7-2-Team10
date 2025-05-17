package kr.co.programmers.collabond.api.profile.interfaces;

import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileDto;

public class ProfileMapper {

    public static ProfileDto toDto(Profile entity) {
        return ProfileDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .type(entity.getType().toString())
                .collaboCount(entity.getCollaboCount())
                .userId(entity.getUser().getId())
                .build();
    }
}
