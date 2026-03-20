package com.zaidom.radiancewellness.presentation.controller.pub;

import com.zaidom.radiancewellness.application.shared.response.ApiResponse;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Accommodation;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.AccommodationRepository;
import com.zaidom.radiancewellness.presentation.dto.response.AccommodationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.zaidom.radiancewellness.application.shared.utils.ApiResponseUtils.*;

@RestController
@RequestMapping("/api/v1/accommodations")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Public Accommodations", description = "Public accommodation listing")
public class PublicAccommodationController {

    private final AccommodationRepository accommodationRepository;

    @Operation(summary = "List active accommodations")
    @GetMapping
    public ResponseEntity<ApiResponse<List<AccommodationResponse>>> listAccommodations() {
        List<Accommodation> accommodations = accommodationRepository.findByStatus(ServiceStatus.ACTIVE);
        List<AccommodationResponse> responses = accommodations.stream()
                .map(AccommodationResponse::fromEntity)
                .toList();
        return okResponse(responses);
    }

    @Operation(summary = "Get accommodation by slug")
    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<AccommodationResponse>> getAccommodation(@PathVariable String slug) {
        Accommodation accommodation = accommodationRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation not found"));
        return okResponse(AccommodationResponse.fromEntity(accommodation));
    }
}
