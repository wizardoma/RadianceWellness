package com.zaidom.radiancewellness.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_staff_assignments", uniqueConstraints = {
        @UniqueConstraint(name = "uk_service_staff_assignments_service_staff", columnNames = {"service_id", "staff_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class ServiceStaffAssignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    @ToString.Exclude
    private Service service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", nullable = false)
    @ToString.Exclude
    private Staff staff;
}
