package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.enums.Gender;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "customers", uniqueConstraints = {
        @UniqueConstraint(name = "uk_customers_email", columnNames = "email"),
        @UniqueConstraint(name = "uk_customers_phone", columnNames = "phone")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Customer extends BaseEntity {

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column
    private String avatar;

    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column
    private String address;

    @Column
    private String city;

    @Column
    private String state;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private CustomerStatus status = CustomerStatus.ACTIVE;

    @Column(name = "registration_source")
    private String registrationSource;

    @Column(columnDefinition = "text")
    private String notes;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> tags;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "preferred_staff_ids", columnDefinition = "jsonb")
    private List<String> preferredStaffIds;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "preferred_times", columnDefinition = "jsonb")
    private List<String> preferredTimes;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "favorite_service_ids", columnDefinition = "jsonb")
    private List<String> favoriteServiceIds;

    @Column(name = "email_opt_in", nullable = false)
    @Builder.Default
    private Boolean emailOptIn = true;

    @Column(name = "sms_opt_in", nullable = false)
    @Builder.Default
    private Boolean smsOptIn = true;

    @Column(name = "whatsapp_opt_in", nullable = false)
    @Builder.Default
    private Boolean whatsappOptIn = false;

    @Column(nullable = false)
    private String password;

    @Column(name = "email_verified", nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column(name = "login_attempts", nullable = false)
    @Builder.Default
    private Integer loginAttempts = 0;

    @Column(name = "locked_until")
    private LocalDateTime lockedUntil;
}
