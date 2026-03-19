package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.model.BusinessSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessSettingRepository extends JpaRepository<BusinessSetting, String> {

    Optional<BusinessSetting> findBySettingKey(String settingKey);

    List<BusinessSetting> findByCategory(String category);
}
