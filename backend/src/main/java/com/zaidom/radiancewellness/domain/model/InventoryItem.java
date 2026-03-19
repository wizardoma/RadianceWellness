package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.InventoryItemType;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "inventory_items", uniqueConstraints = {
        @UniqueConstraint(name = "uk_inventory_items_sku", columnNames = "sku")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class InventoryItem extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column
    private String barcode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InventoryItemType type;

    @Column
    private String description;

    @Column(name = "track_quantity", nullable = false)
    @Builder.Default
    private Boolean trackQuantity = true;

    @Column(name = "current_stock", nullable = false)
    @Builder.Default
    private Integer currentStock = 0;

    @Column(name = "reorder_level", nullable = false)
    private Integer reorderLevel;

    @Column(name = "reorder_quantity")
    private Integer reorderQuantity;

    @Column(name = "storage_location")
    private String storageLocation;

    @Column(name = "cost_price", precision = 19, scale = 2)
    private BigDecimal costPrice;

    @Column(name = "selling_price", precision = 19, scale = 2)
    private BigDecimal sellingPrice;

    @Column(name = "supplier_sku")
    private String supplierSku;

    @Column(name = "lead_time")
    private Integer leadTime;

    @Column(name = "minimum_order_qty")
    private Integer minimumOrderQty;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    @ToString.Exclude
    private Supplier supplier;
}
