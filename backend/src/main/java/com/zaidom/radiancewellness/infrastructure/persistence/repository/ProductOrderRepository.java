package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.OrderStatus;
import com.zaidom.radiancewellness.domain.model.ProductOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, String> {

    List<ProductOrder> findByCustomerId(String customerId);

    Page<ProductOrder> findByCustomerId(String customerId, Pageable pageable);

    Optional<ProductOrder> findByOrderNumber(String orderNumber);

    List<ProductOrder> findByStatus(OrderStatus status);
}
