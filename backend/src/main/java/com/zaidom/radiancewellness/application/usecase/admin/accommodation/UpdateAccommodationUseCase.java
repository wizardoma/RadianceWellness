package com.zaidom.radiancewellness.application.usecase.admin.accommodation;

import com.zaidom.radiancewellness.domain.enums.AccommodationType;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Accommodation;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.AccommodationRepository;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateAccommodationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UpdateAccommodationUseCase {

    private final AccommodationRepository accommodationRepository;

    public Accommodation execute(String id, UpdateAccommodationRequest request) {
        log.info("Updating accommodation with id: {}", id);

        Accommodation a = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accommodation", id));

        if (request.getName() != null) {
            a.setName(request.getName());
            a.setSlug(request.getName().toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-")
                    .replaceAll("-+", "-")
                    .trim());
        }
        if (request.getType() != null) a.setType(AccommodationType.valueOf(request.getType()));
        if (request.getDescription() != null) a.setDescription(request.getDescription());
        if (request.getShortDescription() != null) a.setShortDescription(request.getShortDescription());
        if (request.getCoverImage() != null) a.setCoverImage(request.getCoverImage());
        if (request.getImages() != null) a.setImages(request.getImages());
        if (request.getThumbnail() != null) a.setThumbnail(request.getThumbnail());
        if (request.getCapacity() != null) a.setCapacity(request.getCapacity());
        if (request.getBedrooms() != null) a.setBedrooms(request.getBedrooms());
        if (request.getBathrooms() != null) a.setBathrooms(request.getBathrooms());
        if (request.getSize() != null) a.setSize(request.getSize());
        if (request.getPricePerNight() != null) a.setPricePerNight(request.getPricePerNight());
        if (request.getPricePerWeek() != null) a.setPricePerWeek(request.getPricePerWeek());
        if (request.getPricePerMonth() != null) a.setPricePerMonth(request.getPricePerMonth());
        if (request.getCleaningFee() != null) a.setCleaningFee(request.getCleaningFee());
        if (request.getSecurityDeposit() != null) a.setSecurityDeposit(request.getSecurityDeposit());
        if (request.getAmenities() != null) a.setAmenities(request.getAmenities());
        if (request.getCheckInTime() != null) a.setCheckInTime(request.getCheckInTime());
        if (request.getCheckOutTime() != null) a.setCheckOutTime(request.getCheckOutTime());
        if (request.getMinStay() != null) a.setMinStay(request.getMinStay());
        if (request.getMaxStay() != null) a.setMaxStay(request.getMaxStay());
        if (request.getStatus() != null) a.setStatus(ServiceStatus.valueOf(request.getStatus()));
        if (request.getAirbnbSyncEnabled() != null) a.setAirbnbSyncEnabled(request.getAirbnbSyncEnabled());
        if (request.getAirbnbIcalUrl() != null) a.setAirbnbIcalUrl(request.getAirbnbIcalUrl());

        Accommodation updated = accommodationRepository.save(a);
        log.info("Accommodation updated with id: {}", updated.getId());
        return updated;
    }
}
