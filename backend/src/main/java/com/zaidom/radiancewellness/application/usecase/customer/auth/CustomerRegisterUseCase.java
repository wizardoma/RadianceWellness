package com.zaidom.radiancewellness.application.usecase.customer.auth;

import com.zaidom.radiancewellness.application.dto.auth.RegisterResult;
import com.zaidom.radiancewellness.application.service.PasswordValidator;
import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.infrastructure.exception.ConflictException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomerRegisterUseCase {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;

    public RegisterResult execute(String email, String phone, String firstName, String lastName, String password) {
        log.info("Processing customer registration for email: {}", email);

        // Validate password
        passwordValidator.validate(password);

        // Check email uniqueness
        if (customerRepository.existsByEmail(email)) {
            throw new ConflictException("Email already registered");
        }

        // Check phone uniqueness
        if (customerRepository.existsByPhone(phone)) {
            throw new ConflictException("Phone number already registered");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(password);

        // Create customer
        Customer customer = Customer.builder()
                .email(email)
                .phone(phone)
                .firstName(firstName)
                .lastName(lastName)
                .password(hashedPassword)
                .status(CustomerStatus.ACTIVE)
                .emailVerified(false)
                .build();

        customer = customerRepository.save(customer);

        log.info("Customer registered successfully with id: {}", customer.getId());

        return RegisterResult.builder()
                .customerId(customer.getId())
                .email(customer.getEmail())
                .message("Registration successful")
                .build();
    }
}
