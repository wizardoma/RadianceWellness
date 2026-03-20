package com.zaidom.radiancewellness.application.usecase.admin.accommodation;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Accommodation;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class GetAccommodationListUseCase {

    private final AccommodationRepository accommodationRepository;

    public Page<Accommodation> execute(String status, Pageable pageable) {
        log.info("Fetching accommodation list — status: {}", status);

        if (status != null && !status.isBlank()) {
            List<Accommodation> list = accommodationRepository.findByStatus(ServiceStatus.valueOf(status));
            return new PageImpl<>(list, pageable, list.size());
        }

        return accommodationRepository.findAll(pageable);
    }
}
