package com.zaidom.radiancewellness.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "package_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class PackageService extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_package_id", nullable = false)
    @ToString.Exclude
    private ServicePackage servicePackage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    @ToString.Exclude
    private Service service;

    @Column(nullable = false)
    @Builder.Default
    private Integer quantity = 1;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;
}
