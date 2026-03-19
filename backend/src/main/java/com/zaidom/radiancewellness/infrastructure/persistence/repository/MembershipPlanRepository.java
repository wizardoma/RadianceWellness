package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.MembershipTier;
import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.model.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, String> {

    Optional<MembershipPlan> findBySlug(String slug);

    List<MembershipPlan> findByStatus(ServiceStatus status);

    List<MembershipPlan> findByTier(MembershipTier tier);
}
