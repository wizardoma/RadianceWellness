package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.Staff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String bio;
    private String position;
    private String department;
    private String role;
    private String status;
    private String avatar;
    private LocalDate startDate;
    private Boolean displayOnWebsite;
    private Boolean customerCanRequest;
    private BigDecimal rating;
    private Integer totalBookings;
    private Boolean hasLoginAccount;
    private LocalDateTime createdAt;

    public static StaffResponse fromEntity(Staff staff) {
        return StaffResponse.builder()
                .id(staff.getId())
                .firstName(staff.getFirstName())
                .lastName(staff.getLastName())
                .email(staff.getEmail())
                .phone(staff.getPhone())
                .bio(staff.getBio())
                .position(staff.getPosition())
                .department(staff.getDepartment())
                .role(staff.getRole() != null ? staff.getRole().name() : null)
                .status(staff.getStatus() != null ? staff.getStatus().name() : null)
                .avatar(staff.getAvatar())
                .startDate(staff.getStartDate())
                .displayOnWebsite(staff.getDisplayOnWebsite())
                .customerCanRequest(staff.getCustomerCanRequest())
                .rating(staff.getRating())
                .totalBookings(staff.getTotalBookings())
                .hasLoginAccount(staff.getUser() != null)
                .createdAt(staff.getCreatedAt())
                .build();
    }
}
