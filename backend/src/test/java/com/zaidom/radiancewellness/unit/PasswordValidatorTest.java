package com.zaidom.radiancewellness.unit;

import com.zaidom.radiancewellness.application.service.PasswordValidator;
import com.zaidom.radiancewellness.infrastructure.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class PasswordValidatorTest {

    @Autowired
    private PasswordValidator passwordValidator;

    @Test
    @DisplayName("validate accepts a valid password with uppercase, digit, and sufficient length")
    void validate_acceptsValidPassword() {
        assertDoesNotThrow(() -> passwordValidator.validate("Admin@2026"),
                "A valid password should not throw any exception");
    }

    @Test
    @DisplayName("validate rejects a password that is too short")
    void validate_rejectsTooShort() {
        BadRequestException exception = assertThrows(BadRequestException.class,
                () -> passwordValidator.validate("Ab1"),
                "Password shorter than 8 characters should throw BadRequestException");

        assertTrue(exception.getMessage().toLowerCase().contains("8 characters"),
                "Error message should mention the minimum character requirement");
    }

    @Test
    @DisplayName("validate rejects a password with no uppercase letter")
    void validate_rejectsNoUppercase() {
        BadRequestException exception = assertThrows(BadRequestException.class,
                () -> passwordValidator.validate("admin2026"),
                "Password without uppercase should throw BadRequestException");

        assertTrue(exception.getMessage().toLowerCase().contains("uppercase"),
                "Error message should mention uppercase requirement");
    }

    @Test
    @DisplayName("validate rejects a password with no digit")
    void validate_rejectsNoNumber() {
        BadRequestException exception = assertThrows(BadRequestException.class,
                () -> passwordValidator.validate("AdminPass"),
                "Password without digit should throw BadRequestException");

        assertTrue(exception.getMessage().toLowerCase().contains("digit"),
                "Error message should mention digit requirement");
    }

    @Test
    @DisplayName("validate rejects null and empty passwords")
    void validate_rejectsNullOrEmpty() {
        assertThrows(BadRequestException.class,
                () -> passwordValidator.validate(null),
                "Null password should throw BadRequestException");

        assertThrows(BadRequestException.class,
                () -> passwordValidator.validate(""),
                "Empty password should throw BadRequestException");
    }
}
