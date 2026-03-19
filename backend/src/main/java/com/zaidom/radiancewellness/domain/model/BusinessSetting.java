package com.zaidom.radiancewellness.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "business_settings", uniqueConstraints = {
        @UniqueConstraint(name = "uk_business_settings_setting_key", columnNames = "setting_key")
})
@SQLRestriction("")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class BusinessSetting extends BaseEntity {

    @Column(name = "setting_key", nullable = false, unique = true)
    private String settingKey;

    @Column(name = "setting_value", nullable = false, columnDefinition = "text")
    private String settingValue;

    @Column(nullable = false)
    private String category;

    @Column
    private String description;
}
