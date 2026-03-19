package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.AccommodationType;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "accommodations", uniqueConstraints = {
        @UniqueConstraint(name = "uk_accommodations_slug", columnNames = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Accommodation extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccommodationType type;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> images;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Integer bedrooms;

    @Column(nullable = false)
    private Integer bathrooms;

    @Column
    private Integer size;

    @Column(name = "price_per_night", nullable = false, precision = 19, scale = 2)
    private BigDecimal pricePerNight;

    @Column(name = "price_per_week", precision = 19, scale = 2)
    private BigDecimal pricePerWeek;

    @Column(name = "price_per_month", precision = 19, scale = 2)
    private BigDecimal pricePerMonth;

    @Column(name = "cleaning_fee", precision = 19, scale = 2)
    private BigDecimal cleaningFee;

    @Column(name = "security_deposit", precision = 19, scale = 2)
    private BigDecimal securityDeposit;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> amenities;

    @Column(name = "check_in_time", nullable = false)
    @Builder.Default
    private String checkInTime = "15:00";

    @Column(name = "check_out_time", nullable = false)
    @Builder.Default
    private String checkOutTime = "11:00";

    @Column(name = "min_stay", nullable = false)
    @Builder.Default
    private Integer minStay = 1;

    @Column(name = "max_stay")
    private Integer maxStay;

    @Column(precision = 3, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "review_count", nullable = false)
    @Builder.Default
    private Integer reviewCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;

    @Column(name = "airbnb_sync_enabled", nullable = false)
    @Builder.Default
    private Boolean airbnbSyncEnabled = false;

    @Column(name = "airbnb_ical_url")
    private String airbnbIcalUrl;

    @Column(name = "last_airbnb_sync")
    private LocalDateTime lastAirbnbSync;
}
