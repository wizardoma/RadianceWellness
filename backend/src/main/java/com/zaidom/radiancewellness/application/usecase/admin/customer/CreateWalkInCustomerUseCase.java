package com.zaidom.radiancewellness.application.usecase.admin.customer;

import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.enums.Gender;
import com.zaidom.radiancewellness.domain.enums.RegistrationSource;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.infrastructure.exception.ConflictException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.presentation.dto.request.CreateWalkInCustomerRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CreateWalkInCustomerUseCase {

    private final CustomerRepository customerRepository;

    public Customer execute(CreateWalkInCustomerRequest request) {
        log.info("Creating walk-in customer with email: {}", request.getEmail());

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already registered");
        }

        if (customerRepository.existsByPhone(request.getPhone())) {
            throw new ConflictException("Phone number already registered");
        }

        Customer customer = Customer.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .gender(request.getGender() != null ? Gender.valueOf(request.getGender()) : null)
                .dateOfBirth(request.getDateOfBirth() != null ? LocalDate.parse(request.getDateOfBirth()) : null)
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .notes(request.getNotes())
                .tags(request.getTags())
                .status(CustomerStatus.ACTIVE)
                .registrationSource(RegistrationSource.WALK_IN)
                .emailVerified(false)
                .emailOptIn(request.getEmailOptIn() != null ? request.getEmailOptIn() : true)
                .smsOptIn(request.getSmsOptIn() != null ? request.getSmsOptIn() : true)
                .whatsappOptIn(request.getWhatsappOptIn() != null ? request.getWhatsappOptIn() : false)
                .build();

        customer = customerRepository.save(customer);

        log.info("Walk-in customer created with id: {}", customer.getId());
        return customer;
    }
}
