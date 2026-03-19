package com.zaidom.radiancewellness.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String userId;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String userType;
    private String accessToken;
    private String refreshToken;
    private Long expiresIn;
}
