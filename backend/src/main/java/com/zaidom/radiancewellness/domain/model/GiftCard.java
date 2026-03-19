package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.GiftCardStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "gift_cards", uniqueConstraints = {
        @UniqueConstraint(name = "uk_gift_cards_code", columnNames = "code")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class GiftCard extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal balance;

    @Column(name = "purchaser_name", nullable = false)
    private String purchaserName;

    @Column(name = "purchaser_email", nullable = false)
    private String purchaserEmail;

    @Column(name = "recipient_name", nullable = false)
    private String recipientName;

    @Column(name = "recipient_email", nullable = false)
    private String recipientEmail;

    @Column(columnDefinition = "text")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GiftCardStatus status;

    @Column(name = "purchase_date", nullable = false)
    private LocalDate purchaseDate;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @Column(name = "used_date")
    private LocalDate usedDate;

    @Column(name = "used_by_customer_id")
    private String usedByCustomerId;
}
