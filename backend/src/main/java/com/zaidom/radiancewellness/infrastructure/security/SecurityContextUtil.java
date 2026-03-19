package com.zaidom.radiancewellness.infrastructure.security;

import com.zaidom.radiancewellness.infrastructure.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextUtil {

    private SecurityContextUtil() {
        // Static utility class
    }

    public static AuthenticatedUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUser)) {
            throw new UnauthorizedException("No authenticated user found");
        }
        return (AuthenticatedUser) authentication.getPrincipal();
    }

    public static String getCurrentUserId() {
        return getCurrentUser().getUserId();
    }

    public static String getCurrentUserEmail() {
        return getCurrentUser().getEmail();
    }

    public static String getCurrentUserRole() {
        return getCurrentUser().getRole();
    }

    public static boolean isAdmin() {
        return "ADMIN".equals(getCurrentUser().getUserType());
    }

    public static boolean isCustomer() {
        return "CUSTOMER".equals(getCurrentUser().getUserType());
    }
}
