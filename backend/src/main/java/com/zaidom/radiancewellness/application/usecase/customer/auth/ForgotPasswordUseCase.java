package com.zaidom.radiancewellness.application.usecase.customer.auth;

import com.zaidom.radiancewellness.application.dto.auth.ForgotPasswordResult;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.domain.model.PasswordResetToken;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ForgotPasswordUseCase {

    private final CustomerRepository customerRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public ForgotPasswordResult execute(String email) {
        log.info("Processing forgot password request for email: {}", email);

        String message = "If an account exists, a reset link has been sent";
        String resetToken = null;

        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();

            // Generate reset token
            String token = UUID.randomUUID().toString();

            PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                    .token(token)
                    .customerId(customer.getId())
                    .expiryDate(LocalDateTime.now().plusHours(1))
                    .used(false)
                    .build();

            passwordResetTokenRepository.save(passwordResetToken);

            log.info("Password reset token generated for customerId: {}", customer.getId());

            // Include token in result for testing purposes
            resetToken = token;
        } else {
            log.info("Forgot password requested for non-existent email: {}", email);
        }

        return ForgotPasswordResult.builder()
                .message(message)
                .resetToken(resetToken)
                .build();
    }
}
