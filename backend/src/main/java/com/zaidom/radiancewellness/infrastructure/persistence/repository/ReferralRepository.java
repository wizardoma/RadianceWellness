package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.Referral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, String> {

    Optional<Referral> findByReferralCode(String referralCode);

    List<Referral> findByReferrerCustomerId(String referrerCustomerId);
}
