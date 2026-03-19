package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.MembershipStatus;
import com.zaidom.radiancewellness.domain.model.CustomerMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerMembershipRepository extends JpaRepository<CustomerMembership, String> {

    List<CustomerMembership> findByCustomerId(String customerId);

    Optional<CustomerMembership> findByCustomerIdAndStatus(String customerId, MembershipStatus status);

    List<CustomerMembership> findByRenewalDateBefore(LocalDate date);
}
