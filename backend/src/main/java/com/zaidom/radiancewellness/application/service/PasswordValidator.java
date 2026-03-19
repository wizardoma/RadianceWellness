package com.zaidom.radiancewellness.application.service;

import com.zaidom.radiancewellness.infrastructure.exception.BadRequestException;
import org.springframework.stereotype.Component;

@Component
public class PasswordValidator {

    public void validate(String password) {
        if (password == null || password.isEmpty()) {
            throw new BadRequestException("Password is required");
        }

        if (password.length() < 8) {
            throw new BadRequestException("Password must be at least 8 characters long");
        }

        if (!password.chars().anyMatch(Character::isUpperCase)) {
            throw new BadRequestException("Password must contain at least one uppercase letter");
        }

        if (!password.chars().anyMatch(Character::isDigit)) {
            throw new BadRequestException("Password must contain at least one digit");
        }
    }
}
