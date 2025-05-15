package kr.co.programmers.collabond.api.attachment.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AttachmentDto {

    private String savedName;

    private String originName;

    @Builder
    public AttachmentDto(String savedName, String originName) {
        this.savedName = savedName;
        this.originName = originName;
    }
}
