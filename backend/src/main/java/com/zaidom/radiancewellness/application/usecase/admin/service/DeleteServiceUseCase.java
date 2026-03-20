package com.zaidom.radiancewellness.application.usecase.admin.service;

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
@Transactional
public class DeleteServiceUseCase {

    private final ServiceRepository serviceRepository;

    public void execute(String id) {
        log.info("Deleting service with id: {}", id);

        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", id));

        service.softDelete();
        serviceRepository.save(service);

        log.info("Service soft-deleted successfully with id: {}", id);
    }
}
