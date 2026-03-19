package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.StockMovement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, String> {

    List<StockMovement> findByInventoryItemId(String inventoryItemId);

    Page<StockMovement> findByInventoryItemId(String inventoryItemId, Pageable pageable);

    List<StockMovement> findByMovedAtBetween(LocalDateTime start, LocalDateTime end);
}
