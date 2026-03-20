package com.zaidom.radiancewellness.application.usecase.admin.accommodation;

import com.zaidom.radiancewellness.domain.model.Accommodation;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DeleteAccommodationUseCase {

    private final AccommodationRepository accommodationRepository;

    public void execute(String id) {
        log.info("Deleting accommodation with id: {}", id);

        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation", id));

        accommodation.softDelete();
        accommodationRepository.save(accommodation);

        log.info("Accommodation soft-deleted with id: {}", id);
    }
}
