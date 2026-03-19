package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.ServiceStaffAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceStaffAssignmentRepository extends JpaRepository<ServiceStaffAssignment, String> {

    List<ServiceStaffAssignment> findByServiceId(String serviceId);

    List<ServiceStaffAssignment> findByStaffId(String staffId);

    boolean existsByServiceIdAndStaffId(String serviceId, String staffId);
}
