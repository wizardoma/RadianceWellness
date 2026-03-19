package com.zaidom.radiancewellness.application.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordResult {
    private String message;
    private String resetToken; // included for testing; omit in production responses
}
