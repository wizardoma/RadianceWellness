package com.zaidom.radiancewellness.domain.model;

import com.zaidom.radiancewellness.domain.enums.ReviewStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @ToString.Exclude
    private Customer customer;

    @Column(name = "review_type", nullable = false)
    private String reviewType;

    @Column(name = "related_entity_id", nullable = false)
    private String relatedEntityId;

    @Column(name = "related_entity_name", nullable = false)
    private String relatedEntityName;

    @Column(nullable = false)
    private Integer rating;

    @Column
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String comment;

    @Column(name = "is_verified", nullable = false)
    @Builder.Default
    private Boolean isVerified = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ReviewStatus status = ReviewStatus.PENDING;
}
