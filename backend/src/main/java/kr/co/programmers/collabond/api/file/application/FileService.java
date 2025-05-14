package kr.co.programmers.collabond.api.file.application;

import jakarta.transaction.Transactional;
import kr.co.programmers.collabond.api.file.domain.File;
import kr.co.programmers.collabond.api.file.infrastructure.FileRepository;
import kr.co.programmers.collabond.api.file.interfaces.FileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    @Value("${custom.file.path}")
    private String fileDir;

    @Transactional
    public File saveFile(MultipartFile multipartFile) throws IOException {
        String originFileName = multipartFile.getOriginalFilename();
        String savedFileName = createStoreFileName(originFileName);
        multipartFile.transferTo(new java.io.File(getFullPath(savedFileName)));

        File file = FileMapper.toEntity(originFileName, savedFileName);

        return fileRepository.save(file);
    }

    private String getFullPath(String fileName) {
        return fileDir + fileName;
    }

    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    @Transactional
    public List<File> saveFiles(List<MultipartFile> files) throws IOException {
        ArrayList<File> savedFilesResult = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                savedFilesResult.add(saveFile(file));
            }
        }
        return savedFilesResult;
    }
}
