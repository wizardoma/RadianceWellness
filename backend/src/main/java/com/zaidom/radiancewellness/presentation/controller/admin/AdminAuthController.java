package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.dto.auth.LoginResult;
import com.zaidom.radiancewellness.application.dto.auth.TokenRefreshResult;
import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.auth.AdminLoginUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.auth.AdminLogoutUseCase;
import com.zaidom.radiancewellness.application.usecase.auth.RefreshTokenUseCase;
import com.zaidom.radiancewellness.infrastructure.security.SecurityContextUtil;
import com.zaidom.radiancewellness.presentation.dto.request.AdminLoginRequest;
import com.zaidom.radiancewellness.presentation.dto.request.RefreshTokenRequest;
import com.zaidom.radiancewellness.presentation.dto.response.AuthResponse;
import com.zaidom.radiancewellness.presentation.dto.response.TokenRefreshResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/admin/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Authentication", description = "Admin login, refresh, and logout")
public class AdminAuthController {

    private final AdminLoginUseCase adminLoginUseCase;
    private final RefreshTokenUseCase refreshTokenUseCase;
    private final AdminLogoutUseCase adminLogoutUseCase;

    @Operation(summary = "Admin login", description = "Authenticate an admin user with email and password")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error")
    })
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody @Valid AdminLoginRequest request) {
        log.info("Admin login attempt for email: {}", request.getEmail());

        LoginResult result = adminLoginUseCase.execute(request.getEmail(), request.getPassword());

        AuthResponse authResponse = AuthResponse.builder()
                .userId(result.getUserId())
                .email(result.getEmail())
                .firstName(result.getFirstName())
                .lastName(result.getLastName())
                .role(result.getRole())
                .userType(result.getUserType())
                .accessToken(result.getAccessToken())
                .refreshToken(result.getRefreshToken())
                .expiresIn(result.getExpiresIn())
                .build();

        return okResponse(authResponse, "Login successful");
    }

    @Operation(summary = "Refresh admin token", description = "Refresh an expired access token using a valid refresh token")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Token refreshed successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid or expired refresh token")
    })
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refresh(@RequestBody @Valid RefreshTokenRequest request) {
        log.info("Admin token refresh request");

        TokenRefreshResult result = refreshTokenUseCase.execute(request.getRefreshToken());

        TokenRefreshResponse tokenRefreshResponse = TokenRefreshResponse.builder()
                .accessToken(result.getAccessToken())
                .refreshToken(result.getRefreshToken())
                .expiresIn(result.getExpiresIn())
                .build();

        return okResponse(tokenRefreshResponse);
    }

    @Operation(summary = "Admin logout", description = "Invalidate the current admin session and refresh token")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Logged out successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout() {
        String userId = SecurityContextUtil.getCurrentUserId();
        log.info("Admin logout for userId: {}", userId);

        adminLogoutUseCase.execute(userId);

        return okResponse("Logged out successfully");
    }
}
