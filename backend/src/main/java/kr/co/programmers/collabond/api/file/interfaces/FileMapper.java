package kr.co.programmers.collabond.api.file.interfaces;

import kr.co.programmers.collabond.api.file.domain.File;

public class FileMapper {

    public static File toEntity(String originFileName, String savedFileName) {
        return File.builder()
                .originName(originFileName)
                .savedName(savedFileName)
                .build();
    }
}
