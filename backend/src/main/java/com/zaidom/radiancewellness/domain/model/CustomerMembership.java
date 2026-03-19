package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.BillingCycle;
import com.zaidom.radiancewellness.domain.enums.MembershipStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "customer_memberships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class CustomerMembership extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @ToString.Exclude
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "membership_plan_id", nullable = false)
    @ToString.Exclude
    private MembershipPlan membershipPlan;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MembershipStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "billing_cycle", nullable = false)
    private BillingCycle billingCycle;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "renewal_date", nullable = false)
    private LocalDate renewalDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "paused_until_date")
    private LocalDate pausedUntilDate;

    @Column(name = "discount_percentage", precision = 19, scale = 2)
    private BigDecimal discountPercentage;

    @Column(name = "total_paid", nullable = false, precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal totalPaid = BigDecimal.ZERO;

    @Column(columnDefinition = "text")
    private String notes;
}
