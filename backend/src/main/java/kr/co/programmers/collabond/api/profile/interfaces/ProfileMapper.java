package kr.co.programmers.collabond.api.profile.interfaces;

import kr.co.programmers.collabond.api.address.interfaces.AddressMapper;
import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import kr.co.programmers.collabond.api.address.domain.Address;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileRequestDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileResponseDto;
import kr.co.programmers.collabond.api.profile.domain.dto.ProfileSimpleResponseDto;
import kr.co.programmers.collabond.api.tag.interfaces.TagMapper;
import kr.co.programmers.collabond.api.user.domain.User;

public class ProfileMapper {

    public static Profile toEntity(ProfileRequestDto dto, User user, Address address) {
        return Profile.builder()
                .user(user)
                .address(address)
                .type(ProfileType.valueOf(dto.getType()))
                .name(dto.getName())
                .description(dto.getDescription())
                .detailAddress(dto.getDetailAddress())
                .collaboCount(0)
                .status(true)
                .build();
    }

    public static ProfileDto toDto(Profile entity) {
        return ProfileDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .type(entity.getType().toString())
                .imageUrl(
                        entity.getImages().stream()
                                .filter(i -> i.getType().equals("PROFILE"))
                                .findFirst()
                                .map(profile -> profile.getFile().getSavedName())
                                .orElse(null)
                )
                .collaboCount(entity.getCollaboCount())
                .userId(entity.getUser().getId())
                .build();
    }

    public static ProfileResponseDto toResponseDto(Profile entity, String imageUrl) {
        return ProfileResponseDto.builder()
                .id(entity.getId())
                .userId(entity.getUser().getId())
                .addressId(entity.getAddress() != null ? entity.getAddress().getId() : null)
                .type(entity.getType().name())
                .name(entity.getName())
                .imageUrl(imageUrl)
                .description(entity.getDescription())
                .detailAddress(entity.getDetailAddress())
                .collaboCount(entity.getCollaboCount())
                .status(entity.isStatus())
                .tags(
                        entity.getTags().stream()
                                .map(t -> TagMapper.toDto(t.getTag()))
                                .toList()
                )
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static ProfileSimpleResponseDto toSimpleDto(Profile entity, String imageUrl) {
        return ProfileSimpleResponseDto.builder()
                .profileId(entity.getId())
                .imageUrl(imageUrl)
                .type(entity.getType().name())
                .address(AddressMapper.toDto(entity.getAddress()))
                .build();
    }
}
