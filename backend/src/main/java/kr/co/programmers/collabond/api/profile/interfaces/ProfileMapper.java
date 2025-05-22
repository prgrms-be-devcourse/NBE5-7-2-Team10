package kr.co.programmers.collabond.api.profile.interfaces;

import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.profile.domain.ProfileType;
import kr.co.programmers.collabond.api.profile.domain.Profile;
import kr.co.programmers.collabond.api.profile.domain.dto.*;
import kr.co.programmers.collabond.api.tag.domain.dto.TagResponseDto;
import kr.co.programmers.collabond.api.tag.interfaces.TagMapper;
import kr.co.programmers.collabond.api.user.domain.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProfileMapper {

    public static Profile toEntity(ProfileRequestDto dto, User user) {
        return Profile.builder()
                .user(user)
                .address(dto.getAddress())
                .addressCode(dto.getAddressCode())
                .type(ProfileType.valueOf(dto.getType()))
                .name(dto.getName())
                .description(dto.getDescription())
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
        String profileImageUrl = null;
        String thumbnailImageUrl = null;
        List<String> extraImageUrls = new ArrayList<>();

        for (Image image : entity.getImages()) {
            if ("PROFILE".equals(image.getType())) {
                profileImageUrl = image.getFile().getSavedName();
            } else if ("THUMBNAIL".equals(image.getType())) {
                thumbnailImageUrl = image.getFile().getSavedName();
            } else {
                extraImageUrls.add(image.getFile().getSavedName());
            }
        }


        return ProfileResponseDto.builder()
                .id(entity.getId())
                .userId(entity.getUser().getId())
                .type(entity.getType().name())
                .name(entity.getName())
                .profileImageUrl(profileImageUrl)
                .thumbnailImageUrl(thumbnailImageUrl)
                .extraImageUrls(extraImageUrls)
                .description(entity.getDescription())
                .addressCode(entity.getAddressCode())
                .address(entity.getAddress())
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
                .address(entity.getAddress())
                .build();
    }

    public static ProfileDetailResponseDto toDetailResponseDto(Profile profile) {
        String profileImageUrl = null;
        String thumbnailImageUrl = null;
        List<String> extraImageUrls = new ArrayList<>();

        for (Image image : profile.getImages()) {
            if ("PROFILE".equals(image.getType())) {
                profileImageUrl = image.getFile().getSavedName();
            } else if ("THUMBNAIL".equals(image.getType())) {
                thumbnailImageUrl = image.getFile().getSavedName();
            } else {
                extraImageUrls.add(image.getFile().getSavedName());
            }
        }

        List<TagResponseDto> tagDtos = profile.getTags().stream()
                .map(tag -> TagMapper.toDto(tag.getTag()))
                .collect(Collectors.toList());

        return ProfileDetailResponseDto.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .nickname(profile.getUser().getNickname())
                .type(profile.getType().name())
                .name(profile.getName())
                .profileImageUrl(profileImageUrl)
                .thumbnailImageUrl(thumbnailImageUrl)
                .extraImageUrls(extraImageUrls)
                .description(profile.getDescription())
                .address(profile.getAddress())
                .addressCode(profile.getAddressCode())
                .collaboCount(profile.getCollaboCount())
                .status(profile.isStatus())
                .tags(tagDtos)
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
