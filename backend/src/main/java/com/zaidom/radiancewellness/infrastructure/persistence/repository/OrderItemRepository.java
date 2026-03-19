package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    List<OrderItem> findByProductOrderId(String productOrderId);
}
