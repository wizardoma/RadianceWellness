package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceAddOnResponse {

    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;

    public static ServiceAddOnResponse fromEntity(ServiceAddOn addOn) {
        return ServiceAddOnResponse.builder()
                .id(addOn.getId())
                .name(addOn.getName())
                .description(addOn.getDescription())
                .price(addOn.getPrice())
                .duration(addOn.getDuration())
                .build();
    }
}
