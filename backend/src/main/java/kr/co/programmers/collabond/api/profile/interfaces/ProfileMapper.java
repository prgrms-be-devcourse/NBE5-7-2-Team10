package kr.co.programmers.collabond.api.profile.interfaces;
import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import ch.qos.logback.classic.Level;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import kr.co.programmers.collabond.api.user.domain.User;

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
    public static ProfileResponseDto toResponseDto(Profile entity) {
        return ProfileResponseDto.builder()
                .id(entity.getId())
                .userId(entity.getUser().getId())
                .addressId(entity.getAddress() != null ? entity.getAddress().getId() : null)
                .type(entity.getType().name())
                .name(entity.getName())
                .description(entity.getDescription())
                .detailAddress(entity.getDetailAddress())
                .collaboCount(entity.getCollaboCount())
                .status(entity.isStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static Profile toEntity(ProfileRequestDto dto, User user, Address address) {
        return Profile.builder()
                .user(user)
                .address(address)
                .type(ProfileType.valueOf(dto.getType()))// .type(dto.getType().name())
                .name(dto.getName())
                .description(dto.getDescription())
                .detailAddress(dto.getDetailAddress())
                .build();
    }
}
