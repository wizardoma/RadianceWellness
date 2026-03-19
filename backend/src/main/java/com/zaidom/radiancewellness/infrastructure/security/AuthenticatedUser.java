package com.zaidom.radiancewellness.infrastructure.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AuthenticatedUser {

    private String userId;
    private String email;
    private String name;
    private String role;
    private String userType;
}
