package com.zaidom.radiancewellness.application.usecase.staff.auth;

import com.zaidom.radiancewellness.application.dto.auth.LoginResult;
import com.zaidom.radiancewellness.application.service.JwtProvider;
import com.zaidom.radiancewellness.domain.model.RefreshToken;
import com.zaidom.radiancewellness.domain.model.Staff;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.exception.UnauthorizedException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.RefreshTokenRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.StaffRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
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
public class StaffLoginUseCase {

    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public LoginResult execute(String email, String password) {
        log.info("Staff login attempt for email: {}", email);

        // Find staff by email
        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        // Ensure staff has a linked login account
        if (staff.getUser() == null) {
            throw new UnauthorizedException("No login account associated with this staff member");
        }

        User user = staff.getUser();

        // Check if account is locked
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(LocalDateTime.now())) {
            log.warn("Staff account locked for email: {}", email);
            throw new UnauthorizedException("Account is locked. Try again later");
        }

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            int attempts = user.getLoginAttempts() + 1;
            user.setLoginAttempts(attempts);

            if (attempts >= 5) {
                user.setLockedUntil(LocalDateTime.now().plusMinutes(15));
                log.warn("Staff account locked due to {} failed attempts for email: {}", attempts, email);
            }

            userRepository.save(user);
            throw new UnauthorizedException("Invalid credentials");
        }

        // Reset login attempts on successful login
        user.setLoginAttempts(0);
        user.setLockedUntil(null);
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // Generate tokens
        String fullName = staff.getFirstName() + " " + staff.getLastName();
        String accessToken = jwtProvider.generateAccessToken(
                user.getId(), user.getEmail(), fullName, staff.getRole().name(), "STAFF"
        );
        String refreshToken = jwtProvider.generateRefreshToken(user.getId(), "STAFF");

        // Save refresh token
        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .token(refreshToken)
                .userType("STAFF")
                .userId(user.getId())
                .expiryDate(LocalDateTime.now().plusSeconds(jwtProvider.getRefreshTokenExpiration() / 1000))
                .build();
        refreshTokenRepository.save(refreshTokenEntity);

        log.info("Staff login successful for email: {}", email);

        // Build response
        return LoginResult.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(staff.getFirstName())
                .lastName(staff.getLastName())
                .role(staff.getRole().name())
                .userType("STAFF")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtProvider.getAccessTokenExpiration())
                .build();
    }
}
