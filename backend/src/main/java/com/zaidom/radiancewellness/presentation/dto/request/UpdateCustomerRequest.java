package com.zaidom.radiancewellness.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerRequest {

    private String firstName;
    private String lastName;
    private String phone;
    private String gender;
    private String dateOfBirth;
    private String address;
    private String city;
    private String state;
    private String status;
    private String notes;
    private List<String> tags;
    private Boolean emailOptIn;
    private Boolean smsOptIn;
    private Boolean whatsappOptIn;
}
