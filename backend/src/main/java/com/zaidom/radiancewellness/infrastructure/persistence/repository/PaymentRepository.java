package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.PaymentStatus;
import com.zaidom.radiancewellness.domain.model.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    List<Payment> findByCustomerId(String customerId);

    Page<Payment> findByCustomerId(String customerId, Pageable pageable);

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findByRelatedEntityTypeAndRelatedEntityId(String relatedEntityType, String relatedEntityId);
}
