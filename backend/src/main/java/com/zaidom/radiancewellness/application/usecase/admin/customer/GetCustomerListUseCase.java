package com.zaidom.radiancewellness.application.usecase.admin.customer;

import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.model.Customer;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class GetCustomerListUseCase {

    private final CustomerRepository customerRepository;

    public Page<Customer> execute(String status, String search, Pageable pageable) {
        log.info("Fetching customer list — status: {}, search: {}", status, search);

        boolean hasStatus = status != null && !status.isBlank();
        boolean hasSearch = search != null && !search.isBlank();

        if (hasStatus && hasSearch) {
            return customerRepository.searchByStatus(search, CustomerStatus.valueOf(status), pageable);
        }

        if (hasSearch) {
            return customerRepository.search(search, pageable);
        }

        if (hasStatus) {
            return customerRepository.findByStatus(CustomerStatus.valueOf(status), pageable);
        }

        return customerRepository.findAll(pageable);
    }
}
