package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, String> {

    Optional<Supplier> findByCompanyName(String companyName);

    List<Supplier> findByStatus(ServiceStatus status);
}
