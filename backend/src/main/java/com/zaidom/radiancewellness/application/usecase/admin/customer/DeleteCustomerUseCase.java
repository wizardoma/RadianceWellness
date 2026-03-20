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
@Transactional
public class DeleteCustomerUseCase {

    private final CustomerRepository customerRepository;

    public void execute(String id) {
        log.info("Deleting customer with id: {}", id);

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", id));

        customer.softDelete();
        customerRepository.save(customer);

        log.info("Customer soft-deleted successfully with id: {}", id);
    }
}
