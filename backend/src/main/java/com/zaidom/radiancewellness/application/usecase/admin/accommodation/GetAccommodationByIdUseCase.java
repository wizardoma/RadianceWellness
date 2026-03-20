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
@Transactional(readOnly = true)
public class GetAccommodationByIdUseCase {

    private final AccommodationRepository accommodationRepository;

    public Accommodation execute(String id) {
        log.info("Fetching accommodation with id: {}", id);

        return accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation", id));
    }
}
