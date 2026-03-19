package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.StockMovementReason;
import com.zaidom.radiancewellness.domain.enums.StockMovementType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_movements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class StockMovement extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_item_id", nullable = false)
    @ToString.Exclude
    private InventoryItem inventoryItem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StockMovementType type;

    @Column(nullable = false)
    private Integer quantity;

    @Column
    private String reference;

    @Enumerated(EnumType.STRING)
    @Column
    private StockMovementReason reason;

    @Column(columnDefinition = "text")
    private String notes;

    @Column(name = "from_location")
    private String fromLocation;

    @Column(name = "to_location")
    private String toLocation;

    @Column(name = "cost_price", precision = 19, scale = 2)
    private BigDecimal costPrice;

    @Column(name = "moved_by")
    private String movedBy;

    @Column(name = "moved_at", nullable = false)
    private LocalDateTime movedAt;
}
