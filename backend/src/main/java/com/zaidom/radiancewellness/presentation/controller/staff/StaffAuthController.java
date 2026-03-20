package com.zaidom.radiancewellness.presentation.controller.staff;

import com.zaidom.radiancewellness.application.dto.auth.LoginResult;
import com.zaidom.radiancewellness.application.dto.auth.TokenRefreshResult;
import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.auth.RefreshTokenUseCase;
import com.zaidom.radiancewellness.application.usecase.staff.auth.StaffLoginUseCase;
import com.zaidom.radiancewellness.application.usecase.staff.auth.StaffLogoutUseCase;
import com.zaidom.radiancewellness.infrastructure.security.SecurityContextUtil;
import com.zaidom.radiancewellness.presentation.dto.request.RefreshTokenRequest;
import com.zaidom.radiancewellness.presentation.dto.request.StaffLoginRequest;
import com.zaidom.radiancewellness.presentation.dto.response.AuthResponse;
import com.zaidom.radiancewellness.presentation.dto.response.TokenRefreshResponse;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/api/v1/staff/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Staff Authentication", description = "Staff login, refresh, and logout")
public class StaffAuthController {

    private final StaffLoginUseCase staffLoginUseCase;
    private final RefreshTokenUseCase refreshTokenUseCase;
    private final StaffLogoutUseCase staffLogoutUseCase;

    @Operation(summary = "Staff login")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody @Valid StaffLoginRequest request) {
        log.info("Staff login attempt for email: {}", request.getEmail());

        LoginResult result = staffLoginUseCase.execute(request.getEmail(), request.getPassword());

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

    @Operation(summary = "Refresh staff token")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refresh(@RequestBody @Valid RefreshTokenRequest request) {
        log.info("Staff token refresh request");

        TokenRefreshResult result = refreshTokenUseCase.execute(request.getRefreshToken());

        TokenRefreshResponse response = TokenRefreshResponse.builder()
                .accessToken(result.getAccessToken())
                .refreshToken(result.getRefreshToken())
                .expiresIn(result.getExpiresIn())
                .build();

        return okResponse(response);
    }

    @Operation(summary = "Staff logout")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout() {
        String userId = SecurityContextUtil.getCurrentUserId();
        log.info("Staff logout for userId: {}", userId);

        staffLogoutUseCase.execute(userId);

        return okResponse("Logged out successfully");
    }
}
