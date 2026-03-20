package com.zaidom.radiancewellness.application.usecase.admin.addon;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateAddOnRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UpdateAddOnUseCase {

    private final ServiceAddOnRepository serviceAddOnRepository;

    public ServiceAddOn execute(String id, UpdateAddOnRequest request) {
        log.info("Updating service add-on with id: {}", id);

        ServiceAddOn addOn = serviceAddOnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceAddOn", id));

        if (request.getName() != null) {
            addOn.setName(request.getName());
        }

        if (request.getDescription() != null) {
            addOn.setDescription(request.getDescription());
        }

        if (request.getPrice() != null) {
            addOn.setPrice(request.getPrice());
        }

        if (request.getDuration() != null) {
            addOn.setDuration(request.getDuration());
        }

        if (request.getStatus() != null) {
            addOn.setStatus(ServiceStatus.valueOf(request.getStatus()));
        }

        ServiceAddOn updatedAddOn = serviceAddOnRepository.save(addOn);
        log.info("Service add-on updated successfully with id: {}", updatedAddOn.getId());
        return updatedAddOn;
    }
}
