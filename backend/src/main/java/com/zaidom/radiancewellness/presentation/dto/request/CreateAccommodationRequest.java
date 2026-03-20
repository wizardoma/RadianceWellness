package com.zaidom.radiancewellness.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class CreateAccommodationRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Short description is required")
    private String shortDescription;

    private String coverImage;
    private List<String> images;
    private String thumbnail;

    @NotNull(message = "Capacity is required")
    private Integer capacity;

    @NotNull(message = "Bedrooms count is required")
    private Integer bedrooms;

    @NotNull(message = "Bathrooms count is required")
    private Integer bathrooms;

    private Integer size;

    @NotNull(message = "Price per night is required")
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
}
