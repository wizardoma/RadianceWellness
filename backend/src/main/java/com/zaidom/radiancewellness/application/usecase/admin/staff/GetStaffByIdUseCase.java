package com.zaidom.radiancewellness.application.usecase.admin.staff;

import com.zaidom.radiancewellness.domain.model.Staff;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class GetStaffByIdUseCase {

    private final StaffRepository staffRepository;

    public Staff execute(String id) {
        log.info("Fetching staff member with id: {}", id);

        return staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff", id));
    }
}
