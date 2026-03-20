package com.zaidom.radiancewellness.application.usecase.customer.profile;

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
public class GetCustomerProfileUseCase {

    private final CustomerRepository customerRepository;

    @Transactional(readOnly = true)
    public Customer execute(String customerId) {
        log.info("Fetching customer profile for customerId: {}", customerId);

        return customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", customerId));
    }
}
