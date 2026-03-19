package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.StaffSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffScheduleRepository extends JpaRepository<StaffSchedule, String> {

    List<StaffSchedule> findByStaffId(String staffId);

    Optional<StaffSchedule> findByStaffIdAndDayOfWeek(String staffId, String dayOfWeek);
}
