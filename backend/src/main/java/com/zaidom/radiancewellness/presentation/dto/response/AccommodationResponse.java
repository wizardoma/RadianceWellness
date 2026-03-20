package com.zaidom.radiancewellness.presentation.dto.response;

import com.zaidom.radiancewellness.domain.model.Accommodation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationResponse {

    private String id;
    private String name;
    private String slug;
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
    private BigDecimal rating;
    private Integer reviewCount;
    private String status;
    private Boolean airbnbSyncEnabled;
    private String airbnbIcalUrl;
    private LocalDateTime lastAirbnbSync;
    private LocalDateTime createdAt;

    public static AccommodationResponse fromEntity(Accommodation a) {
        return AccommodationResponse.builder()
                .id(a.getId())
                .name(a.getName())
                .slug(a.getSlug())
                .type(a.getType().name())
                .description(a.getDescription())
                .shortDescription(a.getShortDescription())
                .coverImage(a.getCoverImage())
                .images(a.getImages())
                .thumbnail(a.getThumbnail())
                .capacity(a.getCapacity())
                .bedrooms(a.getBedrooms())
                .bathrooms(a.getBathrooms())
                .size(a.getSize())
                .pricePerNight(a.getPricePerNight())
                .pricePerWeek(a.getPricePerWeek())
                .pricePerMonth(a.getPricePerMonth())
                .cleaningFee(a.getCleaningFee())
                .securityDeposit(a.getSecurityDeposit())
                .amenities(a.getAmenities())
                .checkInTime(a.getCheckInTime())
                .checkOutTime(a.getCheckOutTime())
                .minStay(a.getMinStay())
                .maxStay(a.getMaxStay())
                .rating(a.getRating())
                .reviewCount(a.getReviewCount())
                .status(a.getStatus().name())
                .airbnbSyncEnabled(a.getAirbnbSyncEnabled())
                .airbnbIcalUrl(a.getAirbnbIcalUrl())
                .lastAirbnbSync(a.getLastAirbnbSync())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
