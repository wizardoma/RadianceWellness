package com.zaidom.radiancewellness.application.usecase.admin.category;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateCategoryRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateCategoryUseCase {

    private final ServiceCategoryRepository serviceCategoryRepository;

    public ServiceCategory execute(CreateCategoryRequest request) {
        log.info("Creating new service category with name: {}", request.getName());

        String slug = generateSlug(request.getName());

        ServiceCategory category = ServiceCategory.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .icon(request.getIcon())
                .image(request.getImage())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .status(ServiceStatus.ACTIVE)
                .build();

        ServiceCategory savedCategory = serviceCategoryRepository.save(category);
        log.info("Service category created successfully with id: {}", savedCategory.getId());
        return savedCategory;
    }

    private String generateSlug(String name) {
        return name.toLowerCase().trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }
}
