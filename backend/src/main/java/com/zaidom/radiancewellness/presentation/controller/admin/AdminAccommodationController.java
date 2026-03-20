package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.shared.response.PaginatedApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.accommodation.*;
import com.zaidom.radiancewellness.domain.model.Accommodation;
import com.zaidom.radiancewellness.presentation.dto.request.CreateAccommodationRequest;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateAccommodationRequest;
import com.zaidom.radiancewellness.presentation.dto.response.AccommodationResponse;
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
@RequestMapping("/api/v1/admin/accommodations")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Accommodation Management", description = "Admin CRUD operations for accommodations")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminAccommodationController {

    private final GetAccommodationListUseCase getAccommodationListUseCase;
    private final GetAccommodationByIdUseCase getAccommodationByIdUseCase;
    private final CreateAccommodationUseCase createAccommodationUseCase;
    private final UpdateAccommodationUseCase updateAccommodationUseCase;
    private final DeleteAccommodationUseCase deleteAccommodationUseCase;

    @Operation(summary = "List accommodations")
    @GetMapping
    public ResponseEntity<PaginatedApiResponse<AccommodationResponse>> listAccommodations(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Accommodation> accommodationPage = getAccommodationListUseCase.execute(status, pageable);

        Page<AccommodationResponse> responsePage = accommodationPage.map(AccommodationResponse::fromEntity);
        return paginatedResponse(responsePage);
    }

    @Operation(summary = "Get accommodation by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccommodationResponse>> getAccommodation(@PathVariable String id) {
        Accommodation accommodation = getAccommodationByIdUseCase.execute(id);
        return okResponse(AccommodationResponse.fromEntity(accommodation));
    }

    @Operation(summary = "Create an accommodation")
    @PostMapping
    public ResponseEntity<ApiResponse<AccommodationResponse>> create(
            @RequestBody @Valid CreateAccommodationRequest request) {
        Accommodation accommodation = createAccommodationUseCase.execute(request);
        return createdResponse(AccommodationResponse.fromEntity(accommodation), "Accommodation created successfully");
    }

    @Operation(summary = "Update an accommodation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AccommodationResponse>> update(
            @PathVariable String id,
            @RequestBody UpdateAccommodationRequest request) {
        Accommodation accommodation = updateAccommodationUseCase.execute(id, request);
        return okResponse(AccommodationResponse.fromEntity(accommodation), "Accommodation updated successfully");
    }

    @Operation(summary = "Delete an accommodation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable String id) {
        deleteAccommodationUseCase.execute(id);
        return okResponse("Accommodation deleted successfully");
    }
}
