package com.zaidom.radiancewellness.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStaffRequest {

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
    private String startDate;
    private Boolean displayOnWebsite;
    private Boolean customerCanRequest;
}
