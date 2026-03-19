package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "service_packages", uniqueConstraints = {
        @UniqueConstraint(name = "uk_service_packages_slug", columnNames = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class ServicePackage extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(name = "regular_price", nullable = false, precision = 19, scale = 2)
    private BigDecimal regularPrice;

    @Column(name = "package_price", nullable = false, precision = 19, scale = 2)
    private BigDecimal packagePrice;

    @Column
    private String image;

    @Column(nullable = false)
    private Integer duration;

    @Column(name = "valid_from", nullable = false)
    private LocalDate validFrom;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;

    @Column(name = "is_popular", nullable = false)
    @Builder.Default
    private Boolean isPopular = false;

    @Column(name = "valid_for")
    private String validFor;

    @OneToMany(mappedBy = "servicePackage", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private List<PackageService> packageServices = new ArrayList<>();
}
