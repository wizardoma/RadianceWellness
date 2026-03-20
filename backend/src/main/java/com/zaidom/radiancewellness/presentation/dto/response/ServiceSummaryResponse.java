package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.Service;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceSummaryResponse {

    private String id;
    private String name;
    private String slug;
    private String categorySlug;
    private String categoryName;
    private String shortDescription;
    private Map<Integer, BigDecimal> pricing;
    private List<Integer> duration;
    private String thumbnail;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean isPopular;

    public static ServiceSummaryResponse fromEntity(Service service) {
        return ServiceSummaryResponse.builder()
                .id(service.getId())
                .name(service.getName())
                .slug(service.getSlug())
                .categorySlug(service.getCategory() != null ? service.getCategory().getSlug() : null)
                .categoryName(service.getCategory() != null ? service.getCategory().getName() : null)
                .shortDescription(service.getShortDescription())
                .pricing(service.getPricing())
                .duration(service.getDuration())
                .thumbnail(service.getThumbnail())
                .rating(service.getRating())
                .reviewCount(service.getReviewCount())
                .isPopular(service.getIsPopular())
                .build();
    }
}
