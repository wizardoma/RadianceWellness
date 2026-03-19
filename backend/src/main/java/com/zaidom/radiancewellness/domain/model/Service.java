package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "services", uniqueConstraints = {
        @UniqueConstraint(name = "uk_services_slug", columnNames = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Service extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<Integer, BigDecimal> pricing;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<Integer> duration;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> images;

    @Column
    private String thumbnail;

    @Column(precision = 3, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "review_count", nullable = false)
    @Builder.Default
    private Integer reviewCount = 0;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> benefits;

    @Column(columnDefinition = "text")
    private String preparation;

    @Column(name = "what_to_expect", columnDefinition = "text")
    private String whatToExpect;

    @Column(columnDefinition = "text")
    private String contraindications;

    @Column(name = "requires_staff", nullable = false)
    @Builder.Default
    private Boolean requiresStaff = true;

    @Column(name = "available_for_online_booking", nullable = false)
    @Builder.Default
    private Boolean availableForOnlineBooking = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;

    @Column(name = "buffer_time")
    private Integer bufferTime;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "is_popular", nullable = false)
    @Builder.Default
    private Boolean isPopular = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @ToString.Exclude
    private ServiceCategory category;
}
