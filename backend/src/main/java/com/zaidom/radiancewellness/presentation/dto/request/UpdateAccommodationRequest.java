package com.zaidom.radiancewellness.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccommodationRequest {

    private String name;
    private String type;
    private String description;
    private String shortDescription;
    private String coverImage;
    private List<String> images;
    private String thumbnail;
    private Integer capacity;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer size;
    private BigDecimal pricePerNight;
    private BigDecimal pricePerWeek;
    private BigDecimal pricePerMonth;
    private BigDecimal cleaningFee;
    private BigDecimal securityDeposit;
    private List<String> amenities;
    private String checkInTime;
    private String checkOutTime;
    private Integer minStay;
    private Integer maxStay;
    private String status;
    private Boolean airbnbSyncEnabled;
    private String airbnbIcalUrl;
}
