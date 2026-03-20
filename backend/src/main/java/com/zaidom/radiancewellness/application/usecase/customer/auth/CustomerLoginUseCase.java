package com.zaidom.radiancewellness.application.usecase.customer.auth;

import com.zaidom.radiancewellness.application.dto.auth.LoginResult;
import com.zaidom.radiancewellness.application.service.JwtProvider;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.domain.model.RefreshToken;
import com.zaidom.radiancewellness.infrastructure.exception.UnauthorizedException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomerLoginUseCase {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public LoginResult execute(String email, String password) {
        log.info("Customer login attempt for email: {}", email);

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        // Check if customer has a password (walk-in customers don't until they register)
        if (customer.getPassword() == null || customer.getPassword().isBlank()) {
            log.warn("Walk-in customer attempted login without registration for email: {}", email);
            throw new UnauthorizedException("Please register your account first to set a password");
        }

        // Check if account is locked
        if (customer.getLockedUntil() != null && customer.getLockedUntil().isAfter(LocalDateTime.now())) {
            log.warn("Customer account locked for email: {}", email);
            throw new UnauthorizedException("Account locked. Try again later");
        }

        // Verify password
        if (!passwordEncoder.matches(password, customer.getPassword())) {
            int attempts = customer.getLoginAttempts() + 1;
            customer.setLoginAttempts(attempts);

            if (attempts >= 5) {
                customer.setLockedUntil(LocalDateTime.now().plusMinutes(15));
                log.warn("Customer account locked due to {} failed attempts for email: {}", attempts, email);
            }

            customerRepository.save(customer);
            throw new UnauthorizedException("Invalid email or password");
        }

        // Reset login attempts on successful login
        customer.setLoginAttempts(0);
        customer.setLockedUntil(null);
        customerRepository.save(customer);

        // Generate tokens
        String fullName = customer.getFirstName() + " " + customer.getLastName();
        String accessToken = jwtProvider.generateAccessToken(
                customer.getId(), customer.getEmail(), fullName, "CUSTOMER", "CUSTOMER"
        );
        String refreshToken = jwtProvider.generateRefreshToken(customer.getId(), "CUSTOMER");

        // Save refresh token
        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .token(refreshToken)
                .userType("CUSTOMER")
                .userId(customer.getId())
                .expiryDate(LocalDateTime.now().plusSeconds(jwtProvider.getRefreshTokenExpiration() / 1000))
                .build();
        refreshTokenRepository.save(refreshTokenEntity);

        log.info("Customer login successful for email: {}", email);

        // Build response
        return LoginResult.builder()
                .userId(customer.getId())
                .email(customer.getEmail())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .role("CUSTOMER")
                .userType("CUSTOMER")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtProvider.getAccessTokenExpiration())
                .build();
    }
}
