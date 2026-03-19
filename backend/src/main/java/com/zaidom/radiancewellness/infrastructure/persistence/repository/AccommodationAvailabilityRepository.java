package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.AccommodationAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccommodationAvailabilityRepository extends JpaRepository<AccommodationAvailability, String> {

    List<AccommodationAvailability> findByAccommodationIdAndDateBetween(String accommodationId, LocalDate startDate, LocalDate endDate);

    Optional<AccommodationAvailability> findByAccommodationIdAndDate(String accommodationId, LocalDate date);
}
