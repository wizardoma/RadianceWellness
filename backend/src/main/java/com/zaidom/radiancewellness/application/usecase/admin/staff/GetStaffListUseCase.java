package com.zaidom.radiancewellness.application.usecase.admin.staff;

import com.zaidom.radiancewellness.domain.enums.StaffStatus;
import com.zaidom.radiancewellness.domain.model.Staff;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.StaffRepository;
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
@Transactional(readOnly = true)
public class GetStaffListUseCase {

    private final StaffRepository staffRepository;

    public Page<Staff> execute(String status, Pageable pageable) {
        log.info("Fetching staff list with status filter: {}", status);

        if (status != null && !status.isBlank()) {
            StaffStatus staffStatus = StaffStatus.valueOf(status);
            List<Staff> staffList = staffRepository.findByStatus(staffStatus);
            return new PageImpl<>(staffList, pageable, staffList.size());
        }

        return staffRepository.findAll(pageable);
    }
}
