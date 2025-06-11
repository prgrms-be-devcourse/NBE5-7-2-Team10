package kr.co.programmers.collabond.api.image.infrastructure;

import kr.co.programmers.collabond.api.file.domain.File;
import kr.co.programmers.collabond.api.image.domain.Image;

public class ImageMapper {

    public static Image toEntity(File file, String type, Integer priority) {
        return Image.builder()
                .file(file)
                .type(type)
                .priority(priority)
                .build();
    }
}
