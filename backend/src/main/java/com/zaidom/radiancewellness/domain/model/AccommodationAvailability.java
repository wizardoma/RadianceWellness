package com.zaidom.radiancewellness.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "accommodation_availability", uniqueConstraints = {
        @UniqueConstraint(name = "uk_accommodation_availability_accommodation_date", columnNames = {"accommodation_id", "date"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class AccommodationAvailability extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_id", nullable = false)
    @ToString.Exclude
    private Accommodation accommodation;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String status;

    @Column(name = "booking_id")
    private String bookingId;

    @Column
    private String reason;

    @Column(name = "synced_from_airbnb", nullable = false)
    @Builder.Default
    private Boolean syncedFromAirbnb = false;

    @Column(name = "last_synced_at")
    private LocalDateTime lastSyncedAt;
}
