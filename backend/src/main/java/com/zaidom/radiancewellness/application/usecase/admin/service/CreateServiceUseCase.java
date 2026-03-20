package com.zaidom.radiancewellness.application.usecase.admin.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateServiceRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateServiceUseCase {

    private final ServiceRepository serviceRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceAddOnRepository serviceAddOnRepository;

    public Service execute(CreateServiceRequest request) {
        log.info("Creating new service with name: {}", request.getName());

        String slug = generateSlug(request.getName());

        ServiceCategory category = serviceCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("ServiceCategory", request.getCategoryId()));

        Service service = Service.builder()
                .name(request.getName())
                .slug(slug)
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .pricing(request.getPricing())
                .duration(request.getDuration())
                .images(request.getImages())
                .thumbnail(request.getThumbnail())
                .benefits(request.getBenefits())
                .preparation(request.getPreparation())
                .whatToExpect(request.getWhatToExpect())
                .contraindications(request.getContraindications())
                .bufferTime(request.getBufferTime())
                .maxCapacity(request.getMaxCapacity())
                .requiresStaff(true)
                .availableForOnlineBooking(true)
                .isPopular(request.getIsPopular() != null ? request.getIsPopular() : false)
                .status(ServiceStatus.ACTIVE)
                .category(category)
                .build();

        Service savedService = serviceRepository.save(service);

        if (request.getAddOnIds() != null && !request.getAddOnIds().isEmpty()) {
            List<ServiceAddOn> addOns = serviceAddOnRepository.findAllById(request.getAddOnIds());
            for (ServiceAddOn addOn : addOns) {
                addOn.getServices().add(savedService);
            }
            serviceAddOnRepository.saveAll(addOns);
        }

        log.info("Service created successfully with id: {}", savedService.getId());
        return savedService;
    }

    private String generateSlug(String name) {
        return name.toLowerCase().trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }
}
