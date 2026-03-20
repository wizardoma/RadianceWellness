package com.zaidom.radiancewellness.presentation.controller.admin;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.usecase.admin.category.CreateCategoryUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.category.DeleteCategoryUseCase;
import com.zaidom.radiancewellness.application.usecase.admin.category.UpdateCategoryUseCase;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.presentation.dto.request.CreateCategoryRequest;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateCategoryRequest;
import com.zaidom.radiancewellness.presentation.dto.response.ServiceCategoryResponse;
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
@RequestMapping("/api/v1/admin/categories")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Admin Category Management", description = "Admin CRUD operations for service categories")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminCategoryController {

    private final CreateCategoryUseCase createCategoryUseCase;
    private final UpdateCategoryUseCase updateCategoryUseCase;
    private final DeleteCategoryUseCase deleteCategoryUseCase;

    @Operation(summary = "Create a category")
    @PostMapping
    public ResponseEntity<ApiResponse<ServiceCategoryResponse>> create(@RequestBody @Valid CreateCategoryRequest request) {
        ServiceCategory category = createCategoryUseCase.execute(request);
        return createdResponse(ServiceCategoryResponse.fromEntity(category, 0L), "Category created successfully");
    }

    @Operation(summary = "Update a category")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceCategoryResponse>> update(
            @PathVariable String id,
            @RequestBody UpdateCategoryRequest request) {
        ServiceCategory category = updateCategoryUseCase.execute(id, request);
        return okResponse(ServiceCategoryResponse.fromEntity(category, 0L), "Category updated successfully");
    }

    @Operation(summary = "Delete a category")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable String id) {
        deleteCategoryUseCase.execute(id);
        return okResponse("Category deleted successfully");
    }
}
