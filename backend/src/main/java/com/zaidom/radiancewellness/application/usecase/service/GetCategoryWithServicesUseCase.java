package com.zaidom.radiancewellness.application.usecase.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetCategoryWithServicesUseCase {

    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceRepository serviceRepository;

    public record Result(ServiceCategory category, List<Service> services) {}

    @Transactional(readOnly = true)
    public Result execute(String slug) {
        log.info("Fetching category with services for slug: {}", slug);

        ServiceCategory category = serviceCategoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceCategory", slug));

        List<Service> services = serviceRepository.findByCategoryIdAndStatus(category.getId(), ServiceStatus.ACTIVE);

        return new Result(category, services);
    }
}
