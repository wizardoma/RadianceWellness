package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceResponse {

    private String id;
    private String name;
    private String slug;
    private CategoryInfo category;
    private String shortDescription;
    private String description;
    private Map<Integer, BigDecimal> pricing;
    private List<Integer> duration;
    private List<String> images;
    private String thumbnail;
    private BigDecimal rating;
    private Integer reviewCount;
    private List<String> benefits;
    private Boolean isPopular;
    private String preparation;
    private String whatToExpect;
    private String contraindications;
    private Integer bufferTime;
    private Integer maxCapacity;
    private String status;
    private List<ServiceAddOnResponse> addOns;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryInfo {
        private String id;
        private String name;
        private String slug;
    }

    public static ServiceResponse fromEntity(Service service, List<ServiceAddOn> addOns) {
        CategoryInfo categoryInfo = null;
        if (service.getCategory() != null) {
            categoryInfo = CategoryInfo.builder()
                    .id(service.getCategory().getId())
                    .name(service.getCategory().getName())
                    .slug(service.getCategory().getSlug())
                    .build();
        }

        List<ServiceAddOnResponse> addOnResponses = addOns != null
                ? addOns.stream().map(ServiceAddOnResponse::fromEntity).toList()
                : List.of();

        return ServiceResponse.builder()
                .id(service.getId())
                .name(service.getName())
                .slug(service.getSlug())
                .category(categoryInfo)
                .shortDescription(service.getShortDescription())
                .description(service.getDescription())
                .pricing(service.getPricing())
                .duration(service.getDuration())
                .images(service.getImages())
                .thumbnail(service.getThumbnail())
                .rating(service.getRating())
                .reviewCount(service.getReviewCount())
                .benefits(service.getBenefits())
                .isPopular(service.getIsPopular())
                .preparation(service.getPreparation())
                .whatToExpect(service.getWhatToExpect())
                .contraindications(service.getContraindications())
                .bufferTime(service.getBufferTime())
                .maxCapacity(service.getMaxCapacity())
                .status(service.getStatus() != null ? service.getStatus().name() : null)
                .addOns(addOnResponses)
                .createdAt(service.getCreatedAt())
                .build();
    }
}
