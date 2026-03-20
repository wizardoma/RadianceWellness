package com.zaidom.radiancewellness.presentation.controller.pub;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.application.shared.response.PaginatedApiResponse;
import com.zaidom.radiancewellness.application.usecase.service.*;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.presentation.dto.response.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Public Services", description = "Public service catalog endpoints")
public class PublicServiceController {

    private final GetServicesUseCase getServicesUseCase;
    private final GetServiceByIdOrSlugUseCase getServiceByIdOrSlugUseCase;
    private final SearchServicesUseCase searchServicesUseCase;
    private final GetCategoriesUseCase getCategoriesUseCase;
    private final GetCategoryWithServicesUseCase getCategoryWithServicesUseCase;
    private final GetAddOnsUseCase getAddOnsUseCase;
    private final ServiceAddOnRepository serviceAddOnRepository;

    @Operation(summary = "List services", description = "Get all active services with optional category filtering")
    @GetMapping
    public ResponseEntity<PaginatedApiResponse<ServiceSummaryResponse>> listServices(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), size);
        Page<Service> services = getServicesUseCase.execute(category, pageable);

        Page<ServiceSummaryResponse> responsePage = services.map(ServiceSummaryResponse::fromEntity);
        return paginatedResponse(responsePage);
    }

    @Operation(summary = "Get service detail", description = "Get service by ID or slug")
    @GetMapping("/{idOrSlug}")
    public ResponseEntity<ApiResponse<ServiceResponse>> getService(@PathVariable String idOrSlug) {
        Service service = getServiceByIdOrSlugUseCase.execute(idOrSlug);
        List<ServiceAddOn> addOns = serviceAddOnRepository.findByServicesId(service.getId());
        ServiceResponse response = ServiceResponse.fromEntity(service, addOns);
        return okResponse(response);
    }

    @Operation(summary = "Search services", description = "Search services by name")
    @GetMapping("/search")
    public ResponseEntity<PaginatedApiResponse<ServiceSummaryResponse>> searchServices(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(Math.max(0, page - 1), size);
        Page<Service> services = searchServicesUseCase.execute(q, pageable);

        Page<ServiceSummaryResponse> responsePage = services.map(ServiceSummaryResponse::fromEntity);
        return paginatedResponse(responsePage);
    }

    @Operation(summary = "List categories", description = "Get all active service categories")
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<ServiceCategoryResponse>>> listCategories() {
        List<ServiceCategory> categories = getCategoriesUseCase.execute();

        List<ServiceCategoryResponse> response = categories.stream()
                .map(c -> ServiceCategoryResponse.fromEntity(c, 0L))
                .toList();
        return okResponse(response);
    }

    @Operation(summary = "Get category with services", description = "Get a category and its active services by slug")
    @GetMapping("/categories/{slug}")
    public ResponseEntity<ApiResponse<CategoryWithServicesResponse>> getCategoryWithServices(@PathVariable String slug) {
        GetCategoryWithServicesUseCase.Result result = getCategoryWithServicesUseCase.execute(slug);

        List<ServiceSummaryResponse> serviceSummaries = result.services().stream()
                .map(ServiceSummaryResponse::fromEntity)
                .toList();

        CategoryWithServicesResponse response = CategoryWithServicesResponse.builder()
                .category(ServiceCategoryResponse.fromEntity(result.category(), (long) result.services().size()))
                .services(serviceSummaries)
                .build();

        return okResponse(response);
    }

    @Operation(summary = "List add-ons", description = "Get all active service add-ons")
    @GetMapping("/add-ons")
    public ResponseEntity<ApiResponse<List<ServiceAddOnResponse>>> listAddOns() {
        List<ServiceAddOn> addOns = getAddOnsUseCase.execute();

        List<ServiceAddOnResponse> response = addOns.stream()
                .map(ServiceAddOnResponse::fromEntity)
                .toList();
        return okResponse(response);
    }
}
