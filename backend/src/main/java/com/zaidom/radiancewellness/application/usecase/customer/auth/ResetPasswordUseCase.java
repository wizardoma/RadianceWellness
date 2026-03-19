package com.zaidom.radiancewellness.application.usecase.customer.auth;

import com.zaidom.radiancewellness.application.service.PasswordValidator;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.domain.model.PasswordResetToken;
import com.zaidom.radiancewellness.infrastructure.exception.BadRequestException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ResetPasswordUseCase {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;

    public void execute(String token, String newPassword) {
        log.info("Processing password reset request");

        // Find reset token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid reset token"));

        // Check if already used
        if (resetToken.getUsed()) {
            throw new BadRequestException("Token already used");
        }

        // Check if expired
        if (resetToken.isExpired()) {
            throw new BadRequestException("Reset token expired");
        }

        // Validate new password
        passwordValidator.validate(newPassword);

        // Find customer and update password
        Customer customer = customerRepository.findById(resetToken.getCustomerId())
                .orElseThrow(() -> new BadRequestException("Customer not found"));

        customer.setPassword(passwordEncoder.encode(newPassword));
        customerRepository.save(customer);

        // Mark token as used
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);

        log.info("Password reset successful for customerId: {}", customer.getId());
    }
}
