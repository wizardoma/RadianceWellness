package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerProfileResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatar;
    private String gender;
    private LocalDate dateOfBirth;
    private String address;
    private String city;
    private String state;
    private String status;
    private String registrationSource;
    private Boolean emailVerified;
    private Boolean emailOptIn;
    private Boolean smsOptIn;
    private Boolean whatsappOptIn;
    private List<String> tags;
    private String notes;
    private LocalDateTime createdAt;

    public static CustomerProfileResponse fromEntity(Customer customer) {
        return CustomerProfileResponse.builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .avatar(customer.getAvatar())
                .gender(customer.getGender() != null ? customer.getGender().name() : null)
                .dateOfBirth(customer.getDateOfBirth())
                .address(customer.getAddress())
                .city(customer.getCity())
                .state(customer.getState())
                .status(customer.getStatus().name())
                .registrationSource(customer.getRegistrationSource() != null ? customer.getRegistrationSource().name() : null)
                .emailVerified(customer.getEmailVerified())
                .emailOptIn(customer.getEmailOptIn())
                .smsOptIn(customer.getSmsOptIn())
                .whatsappOptIn(customer.getWhatsappOptIn())
                .tags(customer.getTags())
                .notes(customer.getNotes())
                .createdAt(customer.getCreatedAt())
                .build();
    }
}
