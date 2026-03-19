package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "suppliers", uniqueConstraints = {
        @UniqueConstraint(name = "uk_suppliers_company_name", columnNames = "company_name")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Supplier extends BaseEntity {

    @Column(name = "company_name", nullable = false, unique = true)
    private String companyName;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column
    private String address;

    @Column
    private String city;

    @Column
    private String state;

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;
}
