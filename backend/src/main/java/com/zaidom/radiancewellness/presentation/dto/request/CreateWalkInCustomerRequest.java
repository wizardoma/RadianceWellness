package com.zaidom.radiancewellness.presentation.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateWalkInCustomerRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String gender;
    private String dateOfBirth;
    private String address;
    private String city;
    private String state;
    private String notes;
    private List<String> tags;
    private Boolean emailOptIn;
    private Boolean smsOptIn;
    private Boolean whatsappOptIn;
}
