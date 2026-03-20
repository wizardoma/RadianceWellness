package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.addon.CreateAddOnUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.addon.DeleteAddOnUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.addon.UpdateAddOnUseCase;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.presentation.dto.request.CreateAddOnRequest;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateAddOnRequest;
import com.zaidom.radiancewellness.presentation.dto.response.ServiceAddOnResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/admin/add-ons")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Add-On Management", description = "Admin CRUD operations for service add-ons")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminAddOnController {

    private final CreateAddOnUseCase createAddOnUseCase;
    private final UpdateAddOnUseCase updateAddOnUseCase;
    private final DeleteAddOnUseCase deleteAddOnUseCase;

    @Operation(summary = "Create an add-on")
    @PostMapping
    public ResponseEntity<ApiResponse<ServiceAddOnResponse>> create(@RequestBody @Valid CreateAddOnRequest request) {
        ServiceAddOn addOn = createAddOnUseCase.execute(request);
        return createdResponse(ServiceAddOnResponse.fromEntity(addOn), "Add-on created successfully");
    }

    @Operation(summary = "Update an add-on")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceAddOnResponse>> update(
            @PathVariable String id,
            @RequestBody UpdateAddOnRequest request) {
        ServiceAddOn addOn = updateAddOnUseCase.execute(id, request);
        return okResponse(ServiceAddOnResponse.fromEntity(addOn), "Add-on updated successfully");
    }

    @Operation(summary = "Delete an add-on")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable String id) {
        deleteAddOnUseCase.execute(id);
        return okResponse("Add-on deleted successfully");
    }
}
