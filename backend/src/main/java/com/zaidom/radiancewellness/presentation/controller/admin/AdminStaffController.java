package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.shared.response.PaginatedApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.staff.*;
import com.zaidom.radiancewellness.domain.model.Staff;
import com.zaidom.radiancewellness.presentation.dto.request.CreateStaffRequest;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateStaffRequest;
import com.zaidom.radiancewellness.presentation.dto.response.StaffResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/admin/staff")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Staff Management", description = "Admin CRUD operations for staff members")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminStaffController {

    private final CreateStaffUseCase createStaffUseCase;
    private final UpdateStaffUseCase updateStaffUseCase;
    private final DeleteStaffUseCase deleteStaffUseCase;
    private final GetStaffListUseCase getStaffListUseCase;
    private final GetStaffByIdUseCase getStaffByIdUseCase;

    @Operation(summary = "List staff members")
    @GetMapping
    public ResponseEntity<PaginatedApiResponse<StaffResponse>> listStaff(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), size);
        Page<Staff> staffPage = getStaffListUseCase.execute(status, pageable);

        Page<StaffResponse> responsePage = staffPage.map(StaffResponse::fromEntity);
        return paginatedResponse(responsePage);
    }

    @Operation(summary = "Get staff member by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StaffResponse>> getStaff(@PathVariable String id) {
        Staff staff = getStaffByIdUseCase.execute(id);
        return okResponse(StaffResponse.fromEntity(staff));
    }

    @Operation(summary = "Create a staff member")
    @PostMapping
    public ResponseEntity<ApiResponse<StaffResponse>> create(@RequestBody @Valid CreateStaffRequest request) {
        Staff staff = createStaffUseCase.execute(request);
        return createdResponse(StaffResponse.fromEntity(staff), "Staff member created successfully");
    }

    @Operation(summary = "Update a staff member")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StaffResponse>> update(
            @PathVariable String id,
            @RequestBody UpdateStaffRequest request) {
        Staff staff = updateStaffUseCase.execute(id, request);
        return okResponse(StaffResponse.fromEntity(staff), "Staff member updated successfully");
    }

    @Operation(summary = "Delete a staff member")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable String id) {
        deleteStaffUseCase.execute(id);
        return okResponse("Staff member deleted successfully");
    }
}
