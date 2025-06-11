package kr.co.programmers.collabond.api.profiletag.interfaces;

import kr.co.programmers.collabond.api.profiletag.domain.ProfileTag;
import kr.co.programmers.collabond.api.tag.domain.Tag;

public class ProfileTagMapper {

    public static ProfileTag toEntity(Tag tag) {
        return ProfileTag.builder()
                .tag(tag)
                .build();
    }
}
