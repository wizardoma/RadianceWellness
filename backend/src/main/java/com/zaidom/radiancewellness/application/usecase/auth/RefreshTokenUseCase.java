package com.zaidom.radiancewellness.application.usecase.auth;

import com.zaidom.radiancewellness.application.dto.auth.TokenRefreshResult;
import com.zaidom.radiancewellness.application.service.JwtProvider;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.domain.model.RefreshToken;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.exception.UnauthorizedException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.RefreshTokenRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RefreshTokenUseCase {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public TokenRefreshResult execute(String refreshToken) {
        log.info("Processing refresh token request");

        RefreshToken storedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (storedToken.getRevoked()) {
            log.warn("Attempt to use revoked refresh token for userId: {}", storedToken.getUserId());
            throw new UnauthorizedException("Token has been revoked");
        }

        if (storedToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            log.warn("Attempt to use expired refresh token for userId: {}", storedToken.getUserId());
            throw new UnauthorizedException("Refresh token expired");
        }

        // Revoke old token
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        String newAccessToken;
        String newRefreshToken;
        String userType = storedToken.getUserType();
        String userId = storedToken.getUserId();

        if ("ADMIN".equals(userType)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UnauthorizedException("User not found"));

            String fullName = user.getFirstName() + " " + user.getLastName();
            newAccessToken = jwtProvider.generateAccessToken(
                    user.getId(), user.getEmail(), fullName, user.getRole().name(), "ADMIN"
            );
            newRefreshToken = jwtProvider.generateRefreshToken(user.getId(), "ADMIN");
        } else {
            Customer customer = customerRepository.findById(userId)
                    .orElseThrow(() -> new UnauthorizedException("Customer not found"));

            String fullName = customer.getFirstName() + " " + customer.getLastName();
            newAccessToken = jwtProvider.generateAccessToken(
                    customer.getId(), customer.getEmail(), fullName, "CUSTOMER", "CUSTOMER"
            );
            newRefreshToken = jwtProvider.generateRefreshToken(customer.getId(), "CUSTOMER");
        }

        // Save new refresh token
        RefreshToken newRefreshTokenEntity = RefreshToken.builder()
                .token(newRefreshToken)
                .userType(userType)
                .userId(userId)
                .expiryDate(LocalDateTime.now().plusSeconds(jwtProvider.getRefreshTokenExpiration() / 1000))
                .build();
        refreshTokenRepository.save(newRefreshTokenEntity);

        log.info("Refresh token rotated successfully for userId: {}", userId);

        return TokenRefreshResult.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .expiresIn(jwtProvider.getAccessTokenExpiration())
                .build();
    }
}
