package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.MembershipTier;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "membership_plans", uniqueConstraints = {
        @UniqueConstraint(name = "uk_membership_plans_name", columnNames = "name"),
        @UniqueConstraint(name = "uk_membership_plans_slug", columnNames = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class MembershipPlan extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MembershipTier tier;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(name = "monthly_price", nullable = false, precision = 19, scale = 2)
    private BigDecimal monthlyPrice;

    @Column(name = "annual_price", nullable = false, precision = 19, scale = 2)
    private BigDecimal annualPrice;

    @Column(name = "service_discount_percent", precision = 19, scale = 2)
    private BigDecimal serviceDiscountPercent;

    @Column(name = "product_discount_percent", precision = 19, scale = 2)
    private BigDecimal productDiscountPercent;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<Map<String, Object>> features;

    @Column
    private String color;

    @Column(name = "is_popular", nullable = false)
    @Builder.Default
    private Boolean isPopular = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;
}
