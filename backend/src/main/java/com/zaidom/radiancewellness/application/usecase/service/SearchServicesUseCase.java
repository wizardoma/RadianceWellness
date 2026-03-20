package com.zaidom.radiancewellness.application.usecase.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class SearchServicesUseCase {

    private final ServiceRepository serviceRepository;

    @Transactional(readOnly = true)
    public Page<Service> execute(String query, Pageable pageable) {
        log.info("Searching services with query: {}", query);

        if (query == null || query.isBlank()) {
            return serviceRepository.findByStatusOrderByRatingDesc(ServiceStatus.ACTIVE, pageable);
        }

        return serviceRepository.findByNameContainingIgnoreCaseAndStatus(query, ServiceStatus.ACTIVE, pageable);
    }
}
