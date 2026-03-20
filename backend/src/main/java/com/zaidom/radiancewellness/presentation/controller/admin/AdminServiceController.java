package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.service.CreateServiceUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.service.DeleteServiceUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.service.UpdateServiceUseCase;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateServiceRequest;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateServiceRequest;
import com.zaidom.radiancewellness.presentation.dto.response.ServiceResponse;
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
@RequestMapping("/api/v1/admin/services")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Service Management", description = "Admin CRUD operations for services")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminServiceController {

    private final CreateServiceUseCase createServiceUseCase;
    private final UpdateServiceUseCase updateServiceUseCase;
    private final DeleteServiceUseCase deleteServiceUseCase;
    private final ServiceAddOnRepository serviceAddOnRepository;

    @Operation(summary = "Create a service")
    @PostMapping
    public ResponseEntity<ApiResponse<ServiceResponse>> create(@RequestBody @Valid CreateServiceRequest request) {
        Service service = createServiceUseCase.execute(request);
        var addOns = serviceAddOnRepository.findByServicesId(service.getId());
        return createdResponse(ServiceResponse.fromEntity(service, addOns), "Service created successfully");
    }

    @Operation(summary = "Update a service")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceResponse>> update(
            @PathVariable String id,
            @RequestBody UpdateServiceRequest request) {
        Service service = updateServiceUseCase.execute(id, request);
        var addOns = serviceAddOnRepository.findByServicesId(service.getId());
        return okResponse(ServiceResponse.fromEntity(service, addOns), "Service updated successfully");
    }

    @Operation(summary = "Delete a service")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable String id) {
        deleteServiceUseCase.execute(id);
        return okResponse("Service deleted successfully");
    }
}
