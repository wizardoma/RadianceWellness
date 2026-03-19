package com.zaidom.radiancewellness.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "referrals", uniqueConstraints = {
        @UniqueConstraint(name = "uk_referrals_referral_code", columnNames = "referral_code")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Referral extends BaseEntity {

    @Column(name = "referrer_customer_id", nullable = false)
    private String referrerCustomerId;

    @Column(name = "referred_customer_id")
    private String referredCustomerId;

    @Column(name = "referral_code", nullable = false, unique = true)
    private String referralCode;

    @Column(name = "referred_email")
    private String referredEmail;

    @Column(nullable = false)
    @Builder.Default
    private String status = "PENDING";

    @Column(name = "reward_amount", precision = 19, scale = 2)
    private BigDecimal rewardAmount;

    @Column(name = "reward_granted", nullable = false)
    @Builder.Default
    private Boolean rewardGranted = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
