package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.BookingStatus;
import com.zaidom.radiancewellness.domain.model.AccommodationBooking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccommodationBookingRepository extends JpaRepository<AccommodationBooking, String> {

    List<AccommodationBooking> findByCustomerId(String customerId);

    Page<AccommodationBooking> findByCustomerId(String customerId, Pageable pageable);

    List<AccommodationBooking> findByAccommodationIdAndStatus(String accommodationId, BookingStatus status);

    Optional<AccommodationBooking> findByReference(String reference);
}
