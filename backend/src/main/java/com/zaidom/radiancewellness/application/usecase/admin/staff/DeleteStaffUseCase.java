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
@Transactional
public class DeleteStaffUseCase {

    private final StaffRepository staffRepository;

    public void execute(String id) {
        log.info("Deleting staff member with id: {}", id);

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff", id));

        staff.softDelete();
        staffRepository.save(staff);

        log.info("Staff member soft-deleted successfully with id: {}", id);
    }
}
