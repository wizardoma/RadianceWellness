package com.zaidom.radiancewellness.application.usecase.admin.addon;

import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DeleteAddOnUseCase {

    private final ServiceAddOnRepository serviceAddOnRepository;

    public void execute(String id) {
        log.info("Deleting service add-on with id: {}", id);

        ServiceAddOn addOn = serviceAddOnRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceAddOn", id));

        addOn.softDelete();
        serviceAddOnRepository.save(addOn);

        log.info("Service add-on soft-deleted successfully with id: {}", id);
    }
}
