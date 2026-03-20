package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.shared.response.PaginatedApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.customer.*;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.presentation.dto.request.CreateWalkInCustomerRequest;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateCustomerRequest;
import com.zaidom.radiancewellness.presentation.dto.response.CustomerProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/admin/customers")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Customer Management", description = "Admin CRUD operations for customers")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminCustomerController {

    private final GetCustomerListUseCase getCustomerListUseCase;
    private final GetCustomerByIdUseCase getCustomerByIdUseCase;
    private final CreateWalkInCustomerUseCase createWalkInCustomerUseCase;
    private final UpdateCustomerUseCase updateCustomerUseCase;
    private final DeleteCustomerUseCase deleteCustomerUseCase;

    @Operation(summary = "List customers")
    @GetMapping
    public ResponseEntity<PaginatedApiResponse<CustomerProfileResponse>> listCustomers(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Customer> customerPage = getCustomerListUseCase.execute(status, search, pageable);

        Page<CustomerProfileResponse> responsePage = customerPage.map(CustomerProfileResponse::fromEntity);
        return paginatedResponse(responsePage);
    }

    @Operation(summary = "Get customer by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerProfileResponse>> getCustomer(@PathVariable String id) {
        Customer customer = getCustomerByIdUseCase.execute(id);
        return okResponse(CustomerProfileResponse.fromEntity(customer));
    }

    @Operation(summary = "Create a walk-in customer")
    @PostMapping
    public ResponseEntity<ApiResponse<CustomerProfileResponse>> create(
            @RequestBody @Valid CreateWalkInCustomerRequest request) {
        Customer customer = createWalkInCustomerUseCase.execute(request);
        return createdResponse(CustomerProfileResponse.fromEntity(customer), "Customer created successfully");
    }

    @Operation(summary = "Update a customer")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerProfileResponse>> update(
            @PathVariable String id,
            @RequestBody UpdateCustomerRequest request) {
        Customer customer = updateCustomerUseCase.execute(id, request);
        return okResponse(CustomerProfileResponse.fromEntity(customer), "Customer updated successfully");
    }

    @Operation(summary = "Delete a customer")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable String id) {
        deleteCustomerUseCase.execute(id);
        return okResponse("Customer deleted successfully");
    }
}
