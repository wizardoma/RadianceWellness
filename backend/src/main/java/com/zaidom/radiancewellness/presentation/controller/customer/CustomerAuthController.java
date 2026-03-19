package com.zaidom.radiancewellness.presentation.controller.customer;

import com.zaidom.radiancewellness.application.dto.auth.ForgotPasswordResult;
import com.zaidom.radiancewellness.application.dto.auth.LoginResult;
import com.zaidom.radiancewellness.application.dto.auth.RegisterResult;
import com.zaidom.radiancewellness.application.dto.auth.TokenRefreshResult;
import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.customer.auth.CustomerLoginUseCase;
import com.zaidom.radiancewellness.application.usecase.customer.auth.CustomerLogoutUseCase;
import com.zaidom.radiancewellness.application.usecase.customer.auth.CustomerRegisterUseCase;
import com.zaidom.radiancewellness.application.usecase.customer.auth.ForgotPasswordUseCase;
import com.zaidom.radiancewellness.application.usecase.auth.RefreshTokenUseCase;
import com.zaidom.radiancewellness.application.usecase.customer.auth.ResetPasswordUseCase;
import com.zaidom.radiancewellness.infrastructure.security.SecurityContextUtil;
import com.zaidom.radiancewellness.presentation.dto.request.CustomerLoginRequest;
import com.zaidom.radiancewellness.presentation.dto.request.CustomerRegisterRequest;
import com.zaidom.radiancewellness.presentation.dto.request.ForgotPasswordRequest;
import com.zaidom.radiancewellness.presentation.dto.request.RefreshTokenRequest;
import com.zaidom.radiancewellness.presentation.dto.request.ResetPasswordRequest;
import com.zaidom.radiancewellness.presentation.dto.response.AuthResponse;
import com.zaidom.radiancewellness.presentation.dto.response.CustomerRegisterResponse;
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
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Customer Authentication", description = "Customer registration, login, password management")
public class CustomerAuthController {

    private final CustomerRegisterUseCase customerRegisterUseCase;
    private final CustomerLoginUseCase customerLoginUseCase;
    private final RefreshTokenUseCase refreshTokenUseCase;
    private final CustomerLogoutUseCase customerLogoutUseCase;
    private final ForgotPasswordUseCase forgotPasswordUseCase;
    private final ResetPasswordUseCase resetPasswordUseCase;

    @Operation(summary = "Register a new customer", description = "Create a new customer account with email, name, phone, and password")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Registration successful"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Email already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CustomerRegisterResponse>> register(@RequestBody @Valid CustomerRegisterRequest request) {
        log.info("Customer registration attempt for email: {}", request.getEmail());

        RegisterResult result = customerRegisterUseCase.execute(
                request.getEmail(),
                request.getPhone(),
                request.getFirstName(),
                request.getLastName(),
                request.getPassword()
        );

        CustomerRegisterResponse response = CustomerRegisterResponse.builder()
                .customerId(result.getCustomerId())
                .email(result.getEmail())
                .message(result.getMessage())
                .build();

        return createdResponse(response, "Registration successful");
    }

    @Operation(summary = "Customer login", description = "Authenticate a customer with email and password")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error")
    })
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody @Valid CustomerLoginRequest request) {
        log.info("Customer login attempt for email: {}", request.getEmail());

        LoginResult result = customerLoginUseCase.execute(request.getEmail(), request.getPassword());

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

    @Operation(summary = "Refresh customer token", description = "Refresh an expired access token using a valid refresh token")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Token refreshed successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid or expired refresh token")
    })
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refresh(@RequestBody @Valid RefreshTokenRequest request) {
        log.info("Customer token refresh request");

        TokenRefreshResult result = refreshTokenUseCase.execute(request.getRefreshToken());

        TokenRefreshResponse tokenRefreshResponse = TokenRefreshResponse.builder()
                .accessToken(result.getAccessToken())
                .refreshToken(result.getRefreshToken())
                .expiresIn(result.getExpiresIn())
                .build();

        return okResponse(tokenRefreshResponse);
    }

    @Operation(summary = "Forgot password", description = "Request a password reset link to be sent to the provided email")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Password reset email sent if account exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error")
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<?>> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        log.info("Forgot password request for email: {}", request.getEmail());

        ForgotPasswordResult result = forgotPasswordUseCase.execute(request.getEmail());

        return okResponse(result.getMessage());
    }

    @Operation(summary = "Reset password", description = "Reset the password using a valid reset token and new password")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Password has been reset successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid or expired reset token")
    })
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<?>> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
        log.info("Password reset attempt");

        resetPasswordUseCase.execute(request.getToken(), request.getNewPassword());

        return okResponse("Password has been reset successfully");
    }

    @Operation(summary = "Customer logout", description = "Invalidate the current customer session and refresh token")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Logged out successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout() {
        String customerId = SecurityContextUtil.getCurrentUserId();
        log.info("Customer logout for customerId: {}", customerId);

        customerLogoutUseCase.execute(customerId);

        return okResponse("Logged out successfully");
    }
}
