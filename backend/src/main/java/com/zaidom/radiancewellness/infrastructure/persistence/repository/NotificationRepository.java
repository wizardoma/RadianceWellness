package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {

    List<Notification> findByCustomerIdAndIsReadFalse(String customerId);

    List<Notification> findByUserIdAndIsReadFalse(String userId);

    List<Notification> findByCustomerId(String customerId);

    Page<Notification> findByCustomerId(String customerId, Pageable pageable);
}
