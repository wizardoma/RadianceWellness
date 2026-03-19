package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findBySlug(String slug);

    Optional<Product> findBySku(String sku);

    List<Product> findByCategoryIdAndStatus(String categoryId, ServiceStatus status);

    Page<Product> findByCategoryIdAndStatus(String categoryId, ServiceStatus status, Pageable pageable);

    List<Product> findByNameContainingIgnoreCaseAndStatus(String name, ServiceStatus status);

    Page<Product> findByNameContainingIgnoreCaseAndStatus(String name, ServiceStatus status, Pageable pageable);
}
