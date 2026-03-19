package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.GiftCardStatus;
import com.zaidom.radiancewellness.domain.model.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GiftCardRepository extends JpaRepository<GiftCard, String> {

    Optional<GiftCard> findByCode(String code);

    List<GiftCard> findByStatus(GiftCardStatus status);
}
