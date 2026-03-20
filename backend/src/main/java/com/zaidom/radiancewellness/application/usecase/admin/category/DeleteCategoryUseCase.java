package com.zaidom.radiancewellness.application.usecase.admin.category;

import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DeleteCategoryUseCase {

    private final ServiceCategoryRepository serviceCategoryRepository;

    public void execute(String id) {
        log.info("Deleting service category with id: {}", id);

        ServiceCategory category = serviceCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceCategory", id));

        category.softDelete();
        serviceCategoryRepository.save(category);

        log.info("Service category soft-deleted successfully with id: {}", id);
    }
}
