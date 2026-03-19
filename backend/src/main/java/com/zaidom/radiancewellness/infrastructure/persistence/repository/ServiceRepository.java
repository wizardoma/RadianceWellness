package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, String> {

    Optional<Service> findBySlug(String slug);

    List<Service> findByCategoryIdAndStatus(String categoryId, ServiceStatus status);

    Page<Service> findByStatusOrderByRatingDesc(ServiceStatus status, Pageable pageable);

    List<Service> findByNameContainingIgnoreCaseAndStatus(String name, ServiceStatus status);

    Page<Service> findByNameContainingIgnoreCaseAndStatus(String name, ServiceStatus status, Pageable pageable);
}
