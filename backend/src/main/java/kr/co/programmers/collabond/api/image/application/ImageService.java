package kr.co.programmers.collabond.api.image.application;

import kr.co.programmers.collabond.api.image.domain.Image;
import kr.co.programmers.collabond.api.image.infrastructure.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public List<Image> findByProfileIdAndType(Long profileId, String type) {
        return imageRepository.findByProfileIdAndType(profileId, type);
    }

    public List<Image> findByProfileId(Long profileId) {
        return imageRepository.findByProfileId(profileId);
    }

}
