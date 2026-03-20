package com.zaidom.radiancewellness.application.usecase.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetAddOnsUseCase {

    private final ServiceAddOnRepository serviceAddOnRepository;

    @Transactional(readOnly = true)
    public List<ServiceAddOn> execute() {
        log.info("Fetching all active service add-ons");

        return serviceAddOnRepository.findByStatus(ServiceStatus.ACTIVE);
    }
}
