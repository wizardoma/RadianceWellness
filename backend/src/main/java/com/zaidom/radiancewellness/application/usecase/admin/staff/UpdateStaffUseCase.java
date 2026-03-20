package com.zaidom.radiancewellness.application.usecase.admin.staff;

import com.zaidom.radiancewellness.domain.enums.StaffRole;
import com.zaidom.radiancewellness.domain.enums.StaffStatus;
import com.zaidom.radiancewellness.domain.model.Staff;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.StaffRepository;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateStaffRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UpdateStaffUseCase {

    private final StaffRepository staffRepository;

    public Staff execute(String id, UpdateStaffRequest request) {
        log.info("Updating staff member with id: {}", id);

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff", id));

        if (request.getFirstName() != null) {
            staff.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            staff.setLastName(request.getLastName());
        }

        if (request.getEmail() != null) {
            staff.setEmail(request.getEmail());
        }

        if (request.getPhone() != null) {
            staff.setPhone(request.getPhone());
        }

        if (request.getBio() != null) {
            staff.setBio(request.getBio());
        }

        if (request.getPosition() != null) {
            staff.setPosition(request.getPosition());
        }

        if (request.getDepartment() != null) {
            staff.setDepartment(request.getDepartment());
        }

        if (request.getRole() != null) {
            staff.setRole(StaffRole.valueOf(request.getRole()));
        }

        if (request.getStatus() != null) {
            staff.setStatus(StaffStatus.valueOf(request.getStatus()));
        }

        if (request.getAvatar() != null) {
            staff.setAvatar(request.getAvatar());
        }

        if (request.getStartDate() != null) {
            staff.setStartDate(LocalDate.parse(request.getStartDate()));
        }

        if (request.getDisplayOnWebsite() != null) {
            staff.setDisplayOnWebsite(request.getDisplayOnWebsite());
        }

        if (request.getCustomerCanRequest() != null) {
            staff.setCustomerCanRequest(request.getCustomerCanRequest());
        }

        Staff updatedStaff = staffRepository.save(staff);
        log.info("Staff member updated successfully with id: {}", updatedStaff.getId());
        return updatedStaff;
    }
}
