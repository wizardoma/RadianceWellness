package com.zaidom.radiancewellness.application.usecase.admin.auth;

import com.zaidom.radiancewellness.application.dto.auth.LoginResult;
import com.zaidom.radiancewellness.application.service.JwtProvider;
import com.zaidom.radiancewellness.domain.model.RefreshToken;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.exception.UnauthorizedException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.RefreshTokenRepository;
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
public class AdminLoginUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public LoginResult execute(String email, String password) {
        log.info("Admin login attempt for email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        // Check if account is locked
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(LocalDateTime.now())) {
            log.warn("Admin account locked for email: {}", email);
            throw new UnauthorizedException("Account locked. Try again later");
        }

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            int attempts = user.getLoginAttempts() + 1;
            user.setLoginAttempts(attempts);

            if (attempts >= 5) {
                user.setLockedUntil(LocalDateTime.now().plusMinutes(15));
                log.warn("Admin account locked due to {} failed attempts for email: {}", attempts, email);
            }

            userRepository.save(user);
            throw new UnauthorizedException("Invalid email or password");
        }

        // Reset login attempts on successful login
        user.setLoginAttempts(0);
        user.setLockedUntil(null);
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // Generate tokens
        String fullName = user.getFirstName() + " " + user.getLastName();
        String accessToken = jwtProvider.generateAccessToken(
                user.getId(), user.getEmail(), fullName, user.getRole().name(), "ADMIN"
        );
        String refreshToken = jwtProvider.generateRefreshToken(user.getId(), "ADMIN");

        // Save refresh token
        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .token(refreshToken)
                .userType("ADMIN")
                .userId(user.getId())
                .expiryDate(LocalDateTime.now().plusSeconds(jwtProvider.getRefreshTokenExpiration() / 1000))
                .build();
        refreshTokenRepository.save(refreshTokenEntity);

        log.info("Admin login successful for email: {}", email);

        // Build response
        return LoginResult.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .userType("ADMIN")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtProvider.getAccessTokenExpiration())
                .build();
    }
}
