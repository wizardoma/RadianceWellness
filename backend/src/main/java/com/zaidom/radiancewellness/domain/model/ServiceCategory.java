package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_categories", uniqueConstraints = {
        @UniqueConstraint(name = "uk_service_categories_name", columnNames = "name"),
        @UniqueConstraint(name = "uk_service_categories_slug", columnNames = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class ServiceCategory extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String description;

    @Column
    private String icon;

    @Column
    private String image;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;
}
