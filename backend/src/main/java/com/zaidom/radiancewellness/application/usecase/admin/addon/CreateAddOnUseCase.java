package com.zaidom.radiancewellness.application.usecase.admin.addon;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateAddOnRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateAddOnUseCase {

    private final ServiceAddOnRepository serviceAddOnRepository;

    public ServiceAddOn execute(CreateAddOnRequest request) {
        log.info("Creating new service add-on with name: {}", request.getName());

        ServiceAddOn addOn = ServiceAddOn.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .duration(request.getDuration())
                .status(ServiceStatus.ACTIVE)
                .build();

        ServiceAddOn savedAddOn = serviceAddOnRepository.save(addOn);
        log.info("Service add-on created successfully with id: {}", savedAddOn.getId());
        return savedAddOn;
    }
}
