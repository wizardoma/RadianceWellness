package com.zaidom.radiancewellness.application.usecase.admin.accommodation;

import com.zaidom.radiancewellness.domain.enums.AccommodationType;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Accommodation;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.AccommodationRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateAccommodationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateAccommodationUseCase {

    private final AccommodationRepository accommodationRepository;

    public Accommodation execute(CreateAccommodationRequest request) {
        log.info("Creating accommodation: {}", request.getName());

        String slug = request.getName().toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .trim();

        Accommodation accommodation = Accommodation.builder()
                .name(request.getName())
                .slug(slug)
                .type(AccommodationType.valueOf(request.getType()))
                .description(request.getDescription())
                .shortDescription(request.getShortDescription())
                .coverImage(request.getCoverImage())
                .images(request.getImages())
                .thumbnail(request.getThumbnail())
                .capacity(request.getCapacity())
                .bedrooms(request.getBedrooms())
                .bathrooms(request.getBathrooms())
                .size(request.getSize())
                .pricePerNight(request.getPricePerNight())
                .pricePerWeek(request.getPricePerWeek())
                .pricePerMonth(request.getPricePerMonth())
                .cleaningFee(request.getCleaningFee())
                .securityDeposit(request.getSecurityDeposit())
                .amenities(request.getAmenities())
                .checkInTime(request.getCheckInTime() != null ? request.getCheckInTime() : "15:00")
                .checkOutTime(request.getCheckOutTime() != null ? request.getCheckOutTime() : "11:00")
                .minStay(request.getMinStay() != null ? request.getMinStay() : 1)
                .maxStay(request.getMaxStay())
                .status(ServiceStatus.ACTIVE)
                .build();

        accommodation = accommodationRepository.save(accommodation);
        log.info("Accommodation created with id: {}", accommodation.getId());
        return accommodation;
    }
}
