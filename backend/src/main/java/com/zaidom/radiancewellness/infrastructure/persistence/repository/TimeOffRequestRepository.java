package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.TimeOffStatus;
import com.zaidom.radiancewellness.domain.model.TimeOffRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeOffRequestRepository extends JpaRepository<TimeOffRequest, String> {

    List<TimeOffRequest> findByStaffId(String staffId);

    List<TimeOffRequest> findByStaffIdAndStatus(String staffId, TimeOffStatus status);
}
