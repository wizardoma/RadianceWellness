package com.zaidom.radiancewellness.presentation.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateStaffRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String bio;
    private String position;
    private String department;

    @NotBlank(message = "Staff role is required")
    private String role;

    private String avatar;
    private String startDate;
    private Boolean displayOnWebsite;
    private Boolean customerCanRequest;

    // If true, creates a User account linked to this staff for login access
    private Boolean createLoginAccount;
    private String password;
}
