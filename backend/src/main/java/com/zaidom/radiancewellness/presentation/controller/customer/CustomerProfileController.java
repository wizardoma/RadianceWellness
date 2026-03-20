package com.zaidom.radiancewellness.presentation.controller.customer;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.customer.profile.GetCustomerProfileUseCase;
import com.zaidom.radiancewellness.application.usecase.customer.profile.UpdateCustomerProfileUseCase;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.infrastructure.security.SecurityContextUtil;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateCustomerProfileRequest;
import com.zaidom.radiancewellness.presentation.dto.response.CustomerProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/customer/profile")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Customer Profile", description = "Customer profile management")
@SecurityRequirement(name = "Bearer Authentication")
public class CustomerProfileController {

    private final GetCustomerProfileUseCase getCustomerProfileUseCase;
    private final UpdateCustomerProfileUseCase updateCustomerProfileUseCase;

    @Operation(summary = "Get current customer profile", description = "Returns the profile of the currently authenticated customer")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<ApiResponse<CustomerProfileResponse>> getProfile() {
        String customerId = SecurityContextUtil.getCurrentUserId();
        log.info("Customer profile request for customerId: {}", customerId);

        Customer customer = getCustomerProfileUseCase.execute(customerId);
        return okResponse(CustomerProfileResponse.fromEntity(customer));
    }

    @Operation(summary = "Update current customer profile", description = "Updates the profile of the currently authenticated customer")
    @PutMapping
    public ResponseEntity<ApiResponse<CustomerProfileResponse>> updateProfile(
            @RequestBody UpdateCustomerProfileRequest request) {
        String customerId = SecurityContextUtil.getCurrentUserId();
        log.info("Customer profile update for customerId: {}", customerId);

        Customer customer = updateCustomerProfileUseCase.execute(customerId, request);
        return okResponse(CustomerProfileResponse.fromEntity(customer), "Profile updated successfully");
    }
}
