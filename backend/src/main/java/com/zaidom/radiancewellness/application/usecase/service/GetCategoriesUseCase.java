package com.zaidom.radiancewellness.application.usecase.service;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class GetCategoriesUseCase {

    private final ServiceCategoryRepository serviceCategoryRepository;

    @Transactional(readOnly = true)
    public List<ServiceCategory> execute() {
        log.info("Fetching all active service categories");

        return serviceCategoryRepository.findByStatusOrderByDisplayOrderAsc(ServiceStatus.ACTIVE);
    }
}
