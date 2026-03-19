package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.BookingStatus;
import com.zaidom.radiancewellness.domain.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {

    List<Booking> findByCustomerId(String customerId);

    Page<Booking> findByCustomerId(String customerId, Pageable pageable);

    List<Booking> findByBookingDateAndStaffId(LocalDate bookingDate, String staffId);

    List<Booking> findByBookingDateBetweenAndStatus(LocalDate startDate, LocalDate endDate, BookingStatus status);

    Optional<Booking> findByReference(String reference);

    boolean existsByStaffIdAndBookingDateAndStartTimeLessThanAndEndTimeGreaterThan(
            String staffId, LocalDate bookingDate, LocalTime endTime, LocalTime startTime);
}
