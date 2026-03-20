package com.zaidom.radiancewellness.application.usecase.admin.customer;

import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.enums.Gender;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import com.zaidom.radiancewellness.presentation.dto.request.UpdateCustomerRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UpdateCustomerUseCase {

    private final CustomerRepository customerRepository;

    public Customer execute(String id, UpdateCustomerRequest request) {
        log.info("Updating customer with id: {}", id);

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", id));

        if (request.getFirstName() != null) {
            customer.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            customer.setLastName(request.getLastName());
        }
        if (request.getPhone() != null) {
            customer.setPhone(request.getPhone());
        }
        if (request.getGender() != null) {
            customer.setGender(Gender.valueOf(request.getGender()));
        }
        if (request.getDateOfBirth() != null) {
            customer.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
        }
        if (request.getAddress() != null) {
            customer.setAddress(request.getAddress());
        }
        if (request.getCity() != null) {
            customer.setCity(request.getCity());
        }
        if (request.getState() != null) {
            customer.setState(request.getState());
        }
        if (request.getStatus() != null) {
            customer.setStatus(CustomerStatus.valueOf(request.getStatus()));
        }
        if (request.getNotes() != null) {
            customer.setNotes(request.getNotes());
        }
        if (request.getTags() != null) {
            customer.setTags(request.getTags());
        }
        if (request.getEmailOptIn() != null) {
            customer.setEmailOptIn(request.getEmailOptIn());
        }
        if (request.getSmsOptIn() != null) {
            customer.setSmsOptIn(request.getSmsOptIn());
        }
        if (request.getWhatsappOptIn() != null) {
            customer.setWhatsappOptIn(request.getWhatsappOptIn());
        }

        Customer updated = customerRepository.save(customer);
        log.info("Customer updated successfully with id: {}", updated.getId());
        return updated;
    }
}
