package com.zaidom.radiancewellness.application.usecase.admin.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateServiceRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UpdateServiceUseCase {

    private final ServiceRepository serviceRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceAddOnRepository serviceAddOnRepository;

    public Service execute(String id, UpdateServiceRequest request) {
        log.info("Updating service with id: {}", id);

        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", id));

        if (request.getName() != null) {
            service.setName(request.getName());
            service.setSlug(generateSlug(request.getName()));
        }

        if (request.getShortDescription() != null) {
            service.setShortDescription(request.getShortDescription());
        }

        if (request.getDescription() != null) {
            service.setDescription(request.getDescription());
        }

        if (request.getPricing() != null) {
            service.setPricing(request.getPricing());
        }

        if (request.getDuration() != null) {
            service.setDuration(request.getDuration());
        }

        if (request.getImages() != null) {
            service.setImages(request.getImages());
        }

        if (request.getThumbnail() != null) {
            service.setThumbnail(request.getThumbnail());
        }

        if (request.getBenefits() != null) {
            service.setBenefits(request.getBenefits());
        }

        if (request.getPreparation() != null) {
            service.setPreparation(request.getPreparation());
        }

        if (request.getWhatToExpect() != null) {
            service.setWhatToExpect(request.getWhatToExpect());
        }

        if (request.getContraindications() != null) {
            service.setContraindications(request.getContraindications());
        }

        if (request.getBufferTime() != null) {
            service.setBufferTime(request.getBufferTime());
        }

        if (request.getMaxCapacity() != null) {
            service.setMaxCapacity(request.getMaxCapacity());
        }

        if (request.getIsPopular() != null) {
            service.setIsPopular(request.getIsPopular());
        }

        if (request.getCategoryId() != null) {
            ServiceCategory category = serviceCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("ServiceCategory", request.getCategoryId()));
            service.setCategory(category);
        }

        if (request.getStatus() != null) {
            service.setStatus(ServiceStatus.valueOf(request.getStatus()));
        }

        if (request.getAddOnIds() != null) {
            // Remove service from all current add-ons
            List<ServiceAddOn> currentAddOns = serviceAddOnRepository.findAll();
            for (ServiceAddOn addOn : currentAddOns) {
                addOn.getServices().remove(service);
            }
            serviceAddOnRepository.saveAll(currentAddOns);

            // Add service to the new add-ons
            if (!request.getAddOnIds().isEmpty()) {
                List<ServiceAddOn> newAddOns = serviceAddOnRepository.findAllById(request.getAddOnIds());
                for (ServiceAddOn addOn : newAddOns) {
                    addOn.getServices().add(service);
                }
                serviceAddOnRepository.saveAll(newAddOns);
            }
        }

        Service updatedService = serviceRepository.save(service);
        log.info("Service updated successfully with id: {}", updatedService.getId());
        return updatedService;
    }

    private String generateSlug(String name) {
        return name.toLowerCase().trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }
}
