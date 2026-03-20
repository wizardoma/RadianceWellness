package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceCategoryResponse {

    private String id;
    private String name;
    private String slug;
    private String description;
    private String icon;
    private String image;
    private Integer displayOrder;
    private Long serviceCount;

    public static ServiceCategoryResponse fromEntity(ServiceCategory category, long serviceCount) {
        return ServiceCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .icon(category.getIcon())
                .image(category.getImage())
                .displayOrder(category.getDisplayOrder())
                .serviceCount(serviceCount)
                .build();
    }
}
