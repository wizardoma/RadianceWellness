package com.zaidom.radiancewellness.application.usecase.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
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
public class GetServicesUseCase {

    private final ServiceRepository serviceRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;

    @Transactional(readOnly = true)
    public Page<Service> execute(String categorySlug, Pageable pageable) {
        log.info("Fetching services with categorySlug: {}", categorySlug);

        if (categorySlug == null || categorySlug.isBlank()) {
            return serviceRepository.findByStatusOrderByRatingDesc(ServiceStatus.ACTIVE, pageable);
        }

        ServiceCategory category = serviceCategoryRepository.findBySlug(categorySlug)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceCategory", categorySlug));

        List<Service> services = serviceRepository.findByCategoryIdAndStatus(category.getId(), ServiceStatus.ACTIVE);

        return new PageImpl<>(services, pageable, services.size());
    }
}
