package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.InventoryItemType;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, String> {

    Optional<InventoryItem> findBySku(String sku);

    List<InventoryItem> findByCurrentStockLessThanEqualAndStatus(Integer stock, ServiceStatus status);

    List<InventoryItem> findByType(InventoryItemType type);

    List<InventoryItem> findByStatus(ServiceStatus status);
}
