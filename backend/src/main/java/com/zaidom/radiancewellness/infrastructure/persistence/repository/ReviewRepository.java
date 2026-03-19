package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.ReviewStatus;
import com.zaidom.radiancewellness.domain.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    List<Review> findByReviewTypeAndRelatedEntityId(String reviewType, String relatedEntityId);

    Page<Review> findByReviewTypeAndRelatedEntityId(String reviewType, String relatedEntityId, Pageable pageable);

    List<Review> findByCustomerId(String customerId);

    List<Review> findByStatus(ReviewStatus status);
}
