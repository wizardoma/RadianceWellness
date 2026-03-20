package com.zaidom.radiancewellness.application.usecase.admin.category;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateCategoryRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UpdateCategoryUseCase {

    private final ServiceCategoryRepository serviceCategoryRepository;

    public ServiceCategory execute(String id, UpdateCategoryRequest request) {
        log.info("Updating service category with id: {}", id);

        ServiceCategory category = serviceCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceCategory", id));

        if (request.getName() != null) {
            category.setName(request.getName());
            category.setSlug(generateSlug(request.getName()));
        }

        if (request.getDescription() != null) {
            category.setDescription(request.getDescription());
        }

        if (request.getIcon() != null) {
            category.setIcon(request.getIcon());
        }

        if (request.getImage() != null) {
            category.setImage(request.getImage());
        }

        if (request.getDisplayOrder() != null) {
            category.setDisplayOrder(request.getDisplayOrder());
        }

        if (request.getStatus() != null) {
            category.setStatus(ServiceStatus.valueOf(request.getStatus()));
        }

        ServiceCategory updatedCategory = serviceCategoryRepository.save(category);
        log.info("Service category updated successfully with id: {}", updatedCategory.getId());
        return updatedCategory;
    }

    private String generateSlug(String name) {
        return name.toLowerCase().trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");
    }
}
