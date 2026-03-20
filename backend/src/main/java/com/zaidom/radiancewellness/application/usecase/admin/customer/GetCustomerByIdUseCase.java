package com.zaidom.radiancewellness.application.usecase.admin.customer;

import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.infrastructure.exception.ResourceNotFoundException;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class GetCustomerByIdUseCase {

    private final CustomerRepository customerRepository;

    public Customer execute(String id) {
        log.info("Fetching customer with id: {}", id);

        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", id));
    }
}
