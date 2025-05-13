package kr.co.programmers.collabond.shared.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.LocalDateTime;

@Converter
public class DeletedAtConverter implements AttributeConverter<Boolean, LocalDateTime> {

    @Override
    public LocalDateTime convertToDatabaseColumn(Boolean isDeleted) {
        return isDeleted ? LocalDateTime.now() : null;
    }

    @Override
    public Boolean convertToEntityAttribute(LocalDateTime deletedAt) {
        return deletedAt != null;
    }
}
