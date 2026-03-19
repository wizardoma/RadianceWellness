package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.DiscountType;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "promo_codes", uniqueConstraints = {
        @UniqueConstraint(name = "uk_promo_codes_code", columnNames = "code")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class PromoCode extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String code;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "discount_type", nullable = false)
    private DiscountType discountType;

    @Column(name = "discount_value", nullable = false, precision = 19, scale = 2)
    private BigDecimal discountValue;

    @Column(name = "applicable_to", nullable = false)
    private String applicableTo;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "applicable_service_ids", columnDefinition = "jsonb")
    private List<String> applicableServiceIds;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "applicable_category_ids", columnDefinition = "jsonb")
    private List<String> applicableCategoryIds;

    @Column(name = "minimum_spend", precision = 19, scale = 2)
    private BigDecimal minimumSpend;

    @Column(name = "usage_limit")
    private Integer usageLimit;

    @Column(name = "per_customer_limit", nullable = false)
    @Builder.Default
    private Integer perCustomerLimit = 1;

    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;

    @Column(name = "valid_until", nullable = false)
    private LocalDate validUntil;

    @Column(name = "first_booking_only", nullable = false)
    @Builder.Default
    private Boolean firstBookingOnly = false;

    @Column(name = "usage_count", nullable = false)
    @Builder.Default
    private Integer usageCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;
}
