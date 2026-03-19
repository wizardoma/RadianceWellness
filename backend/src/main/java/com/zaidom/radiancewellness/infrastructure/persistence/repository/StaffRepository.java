package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.StaffStatus;
import com.zaidom.radiancewellness.domain.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {

    Optional<Staff> findByEmail(String email);

    List<Staff> findByStatus(StaffStatus status);

    List<Staff> findByDepartment(String department);
}
