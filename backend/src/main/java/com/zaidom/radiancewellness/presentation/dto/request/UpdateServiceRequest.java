package com.zaidom.radiancewellness.presentation.dto.request;

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
public class UpdateServiceRequest {

    private String name;
    private String categoryId;
    private String description;
    private String shortDescription;
    private Map<Integer, BigDecimal> pricing;
    private List<Integer> duration;
    private List<String> benefits;
    private List<String> images;
    private String thumbnail;
    private Boolean isPopular;
    private String preparation;
    private String whatToExpect;
    private String contraindications;
    private Integer bufferTime;
    private Integer maxCapacity;
    private String status;
    private List<String> addOnIds;
}
