package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.StaffRole;
import com.zaidom.radiancewellness.domain.enums.StaffStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "staff", uniqueConstraints = {
        @UniqueConstraint(name = "uk_staff_email", columnNames = "email")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Staff extends BaseEntity {

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column
    private String avatar;

    @Column(columnDefinition = "text")
    private String bio;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private String department;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StaffRole role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StaffStatus status = StaffStatus.ACTIVE;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "display_on_website", nullable = false)
    @Builder.Default
    private Boolean displayOnWebsite = true;

    @Column(name = "customer_can_request", nullable = false)
    @Builder.Default
    private Boolean customerCanRequest = true;

    @Column(precision = 3, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "total_bookings", nullable = false)
    @Builder.Default
    private Integer totalBookings = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;
}
