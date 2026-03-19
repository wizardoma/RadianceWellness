package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.BookingNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingNoteRepository extends JpaRepository<BookingNote, String> {

    List<BookingNote> findByBookingId(String bookingId);
}
