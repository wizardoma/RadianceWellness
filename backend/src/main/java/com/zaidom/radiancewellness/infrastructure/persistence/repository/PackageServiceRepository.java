package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.PackageService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageServiceRepository extends JpaRepository<PackageService, String> {

    List<PackageService> findByServicePackageId(String servicePackageId);
}
