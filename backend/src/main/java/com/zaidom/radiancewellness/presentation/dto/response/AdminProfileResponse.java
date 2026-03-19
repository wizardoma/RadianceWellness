package com.zaidom.radiancewellness.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminProfileResponse {

    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String avatar;
    private String role;
    private String status;
    private Boolean twoFactorEnabled;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
}
