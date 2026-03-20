package com.zaidom.radiancewellness.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAddOnRequest {

    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;
    private String status;
}
