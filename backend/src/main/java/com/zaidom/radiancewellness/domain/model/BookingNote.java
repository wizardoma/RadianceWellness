package com.zaidom.radiancewellness.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class BookingNote extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    @ToString.Exclude
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", nullable = false)
    @ToString.Exclude
    private Staff staff;

    @Column(name = "treatment_notes", columnDefinition = "text")
    private String treatmentNotes;

    @Column(name = "customer_feedback", columnDefinition = "text")
    private String customerFeedback;

    @Column(name = "follow_up_needed", nullable = false)
    @Builder.Default
    private Boolean followUpNeeded = false;
}
