package com.zaidom.radiancewellness.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class CreateServiceRequest {

    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Category ID is required")
    private String categoryId;

    @NotBlank(message = "Description is required")
    private String description;

    private String shortDescription;

    @NotNull(message = "Pricing is required")
    @NotEmpty(message = "At least one pricing option is required")
    private Map<Integer, BigDecimal> pricing;

    @NotNull(message = "Duration is required")
    @NotEmpty(message = "At least one duration is required")
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
    private List<String> addOnIds;
}
