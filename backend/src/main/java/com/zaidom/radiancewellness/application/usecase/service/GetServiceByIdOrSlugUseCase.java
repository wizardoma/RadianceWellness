package com.zaidom.radiancewellness.application.usecase.service;

import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetServiceByIdOrSlugUseCase {

    private final ServiceRepository serviceRepository;

    @Transactional(readOnly = true)
    public Service execute(String idOrSlug) {
        log.info("Fetching service by idOrSlug: {}", idOrSlug);

        return serviceRepository.findById(idOrSlug)
                .or(() -> serviceRepository.findBySlug(idOrSlug))
                .orElseThrow(() -> new ResourceNotFoundException("Service", idOrSlug));
    }
}
