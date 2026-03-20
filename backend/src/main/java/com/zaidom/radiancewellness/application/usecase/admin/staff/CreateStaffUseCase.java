package com.zaidom.radiancewellness.application.usecase.admin.staff;

import com.zaidom.radiancewellness.application.service.PasswordValidator;
import com.zaidom.radiancewellness.domain.enums.StaffRole;
import com.zaidom.radiancewellness.domain.enums.UserRole;
import com.zaidom.radiancewellness.domain.enums.UserStatus;
import com.zaidom.radiancewellness.domain.model.Staff;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.exception.ConflictException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.StaffRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateStaffRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateStaffUseCase {

    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;

    public Staff execute(CreateStaffRequest request) {
        log.info("Creating new staff member with email: {}", request.getEmail());

        // Check if staff email already exists
        staffRepository.findByEmail(request.getEmail())
                .ifPresent(existing -> {
                    throw new ConflictException("Staff member with email " + request.getEmail() + " already exists");
                });

        // Parse staff role
        StaffRole staffRole = StaffRole.valueOf(request.getRole());

        // Parse start date if provided
        LocalDate startDate = null;
        if (request.getStartDate() != null && !request.getStartDate().isBlank()) {
            startDate = LocalDate.parse(request.getStartDate());
        }

        // Build staff entity
        Staff staff = Staff.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .bio(request.getBio())
                .position(request.getPosition())
                .department(request.getDepartment())
                .role(staffRole)
                .avatar(request.getAvatar())
                .startDate(startDate)
                .displayOnWebsite(request.getDisplayOnWebsite() != null ? request.getDisplayOnWebsite() : true)
                .customerCanRequest(request.getCustomerCanRequest() != null ? request.getCustomerCanRequest() : true)
                .rating(BigDecimal.ZERO)
                .totalBookings(0)
                .build();

        // Optionally create a login account for this staff member
        if (Boolean.TRUE.equals(request.getCreateLoginAccount())
                && request.getPassword() != null && !request.getPassword().isBlank()) {

            passwordValidator.validate(request.getPassword());

            if (userRepository.existsByEmail(request.getEmail())) {
                throw new ConflictException("User account with email " + request.getEmail() + " already exists");
            }

            User user = User.builder()
                    .email(request.getEmail())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .phone(request.getPhone())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(UserRole.RECEPTIONIST)
                    .status(UserStatus.ACTIVE)
                    .build();

            User savedUser = userRepository.save(user);
            staff.setUser(savedUser);
            log.info("Login account created for staff member with email: {}", request.getEmail());
        }

        Staff savedStaff = staffRepository.save(staff);
        log.info("Staff member created successfully with id: {}", savedStaff.getId());
        return savedStaff;
    }
}
