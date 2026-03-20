package com.zaidom.radiancewellness.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerProfileRequest {

    private String firstName;
    private String lastName;
    private String phone;
    private String gender;
    private String dateOfBirth;
    private String address;
    private String city;
    private String state;
    private Boolean emailOptIn;
    private Boolean smsOptIn;
    private Boolean whatsappOptIn;
}
