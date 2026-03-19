package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.profile.GetAdminProfileUseCase;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.security.SecurityContextUtil;
import com.zaidom.radiancewellness.presentation.dto.response.AdminProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/admin/profile")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Profile", description = "Admin user profile management")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminProfileController {

    private final GetAdminProfileUseCase getAdminProfileUseCase;

    @Operation(summary = "Get current admin profile", description = "Returns the profile of the currently authenticated admin user")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<ApiResponse<AdminProfileResponse>> getProfile() {
        String userId = SecurityContextUtil.getCurrentUserId();
        log.info("Admin profile request for userId: {}", userId);

        User user = getAdminProfileUseCase.execute(userId);

        AdminProfileResponse response = AdminProfileResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .twoFactorEnabled(user.getTwoFactorEnabled())
                .lastLoginAt(user.getLastLoginAt())
                .createdAt(user.getCreatedAt())
                .build();

        return okResponse(response);
    }
}
