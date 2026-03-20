package com.zaidom.radiancewellness.infrastructure.config.seed;

import com.zaidom.radiancewellness.domain.enums.ServiceStatus;
import com.zaidom.radiancewellness.domain.enums.UserRole;
import com.zaidom.radiancewellness.domain.enums.UserStatus;
import com.zaidom.radiancewellness.domain.model.Service;
import com.zaidom.radiancewellness.domain.model.ServiceAddOn;
import com.zaidom.radiancewellness.domain.model.ServiceCategory;
import com.zaidom.radiancewellness.domain.model.User;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceAddOnRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceCategoryRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.ServiceRepository;
import com.zaidom.radiancewellness.infrastructure.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(1)
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceAddOnRepository serviceAddOnRepository;

    @Override
    public void run(ApplicationArguments args) {
        seedAdminUser();
        seedServiceData();
    }

    private void seedAdminUser() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .email("admin@radiancewellness.com")
                    .password(passwordEncoder.encode("Admin@2026!"))
                    .firstName("Admin")
                    .lastName("Radiance")
                    .phone("+2340000000000")
                    .role(UserRole.SUPER_ADMIN)
                    .status(UserStatus.ACTIVE)
                    .build();

            userRepository.save(admin);
            log.info("Admin user seeded: admin@radiancewellness.com");
        } else {
            log.info("Users already exist, skipping seed");
        }
    }

    private void seedServiceData() {
        if (serviceCategoryRepository.count() == 0) {
            log.info("Seeding service categories, add-ons, and services...");

            // --- Seed Categories ---
            ServiceCategory spa = serviceCategoryRepository.save(ServiceCategory.builder()
                    .name("Spa")
                    .slug("spa")
                    .description("Indulge in premium spa experiences including body scrubs, hammam baths, facials, massages, and steam & sauna sessions.")
                    .icon("Sparkles")
                    .displayOrder(1)
                    .status(ServiceStatus.ACTIVE)
                    .build());

            ServiceCategory treatments = serviceCategoryRepository.save(ServiceCategory.builder()
                    .name("Treatments")
                    .slug("treatments")
                    .description("Advanced wellness and aesthetic treatments including IV therapy, acupuncture, hair transplant, and specialized skin therapies.")
                    .icon("Stethoscope")
                    .displayOrder(2)
                    .status(ServiceStatus.ACTIVE)
                    .build());

            ServiceCategory gym = serviceCategoryRepository.save(ServiceCategory.builder()
                    .name("Gym")
                    .slug("gym")
                    .description("State-of-the-art gym facilities, group fitness classes, water therapy, and specialized workout programs for all levels.")
                    .icon("Dumbbell")
                    .displayOrder(3)
                    .status(ServiceStatus.ACTIVE)
                    .build());

            ServiceCategory salon = serviceCategoryRepository.save(ServiceCategory.builder()
                    .name("Salon")
                    .slug("salon")
                    .description("Full-service salon offering professional hair styling, braids, nail care, eyebrow treatments, and grooming services.")
                    .icon("Scissors")
                    .displayOrder(4)
                    .status(ServiceStatus.ACTIVE)
                    .build());

            log.info("Seeded 4 service categories");

            // --- Seed Add-Ons ---
            ServiceAddOn aromatherapyEnhancement = saveAddOn("Aromatherapy Enhancement", new BigDecimal("5000"), null,
                    "Add therapeutic essential oils to enhance your experience");
            ServiceAddOn hotStoneAddOn = saveAddOn("Hot Stone Add-On", new BigDecimal("8000"), 15,
                    "Include heated basalt stones for deeper muscle relaxation");
            ServiceAddOn scalpMassage = saveAddOn("Scalp Massage", new BigDecimal("5000"), 10,
                    "Relaxing scalp massage to relieve tension");
            ServiceAddOn coldPlunge = saveAddOn("Cold Plunge", new BigDecimal("3000"), null,
                    "Invigorating cold water immersion after heat treatment");
            ServiceAddOn detoxBodyMask = saveAddOn("Detox Body Mask", new BigDecimal("10000"), 20,
                    "Mineral-rich body mask for deep detoxification");
            ServiceAddOn cuppingTherapy = saveAddOn("Cupping Therapy", new BigDecimal("8000"), 15,
                    "Traditional cupping to release muscle tension");
            ServiceAddOn champagneAndFruits = saveAddOn("Champagne & Fruits", new BigDecimal("15000"), null,
                    "Glass of champagne with fresh fruit platter");
            ServiceAddOn eyeTreatment = saveAddOn("Eye Treatment", new BigDecimal("8000"), 15,
                    "Targeted treatment for the delicate eye area");
            ServiceAddOn lipTreatment = saveAddOn("Lip Treatment", new BigDecimal("5000"), null,
                    "Hydrating and plumping lip treatment");
            ServiceAddOn gelPolishUpgrade = saveAddOn("Gel Polish Upgrade", new BigDecimal("5000"), null,
                    "Long-lasting gel polish instead of regular polish");
            ServiceAddOn nailArt = saveAddOn("Nail Art", new BigDecimal("3000"), null,
                    "Custom nail art design");
            ServiceAddOn paraffinTreatment = saveAddOn("Paraffin Treatment", new BigDecimal("5000"), null,
                    "Warm paraffin wax treatment for extra soft skin");
            ServiceAddOn deepConditioning = saveAddOn("Deep Conditioning", new BigDecimal("5000"), 15,
                    "Intensive hair conditioning treatment");
            ServiceAddOn scalpTreatment = saveAddOn("Scalp Treatment", new BigDecimal("5000"), 10,
                    "Nourishing scalp treatment for healthy hair");
            ServiceAddOn personalTraining = saveAddOn("Personal Training Session", new BigDecimal("15000"), 60,
                    "One-on-one session with a certified trainer");

            log.info("Seeded 15 service add-ons");

            // --- Seed SPA Services (11) ---
            Service saunaSession = createService("Sauna Session", spa,
                    Map.of(30, new BigDecimal("10000"), 45, new BigDecimal("14000")),
                    List.of(30, 45), "Relax and detox in our premium sauna facilities", true);

            Service hammamExperience = createService("Hammam Experience", spa,
                    Map.of(45, new BigDecimal("15000"), 60, new BigDecimal("20000")),
                    List.of(45, 60), "Traditional hammam bath for deep cleansing and relaxation", true);

            Service steamBath = createService("Steam Bath", spa,
                    Map.of(30, new BigDecimal("10000"), 45, new BigDecimal("14000")),
                    List.of(30, 45), "Soothing steam bath to open pores and relieve tension", false);

            Service swedishMassage = createService("Swedish Massage", spa,
                    Map.of(60, new BigDecimal("25000"), 90, new BigDecimal("35000")),
                    List.of(60, 90), "Classic full-body massage for ultimate relaxation", true);

            Service deepTissueMassage = createService("Deep Tissue Massage", spa,
                    Map.of(60, new BigDecimal("30000"), 90, new BigDecimal("42000")),
                    List.of(60, 90), "Targeted deep pressure massage for chronic muscle tension", true);

            Service hotStoneMassage = createService("Hot Stone Massage", spa,
                    Map.of(75, new BigDecimal("35000"), 90, new BigDecimal("45000")),
                    List.of(75, 90), "Heated stone therapy combined with massage techniques", false);

            Service aromatherapyMassage = createService("Aromatherapy Massage", spa,
                    Map.of(60, new BigDecimal("28000"), 90, new BigDecimal("40000")),
                    List.of(60, 90), "Therapeutic massage with essential oils for mind and body", false);

            Service couplesMassage = createService("Couples Massage", spa,
                    Map.of(60, new BigDecimal("50000"), 90, new BigDecimal("70000")),
                    List.of(60, 90), "Side-by-side massage experience for couples", true);

            Service signatureFacial = createService("Signature Facial", spa,
                    Map.of(60, new BigDecimal("20000"), 90, new BigDecimal("30000")),
                    List.of(60, 90), "Customized facial treatment for radiant glowing skin", true);

            Service bodyScrub = createService("Body Scrub", spa,
                    Map.of(30, new BigDecimal("12000"), 45, new BigDecimal("18000")),
                    List.of(30, 45), "Exfoliating body scrub for smooth refreshed skin", false);

            Service hairRemoval = createService("Hair Removal", spa,
                    Map.of(30, new BigDecimal("8000"), 60, new BigDecimal("15000")),
                    List.of(30, 60), "Professional hair removal for smooth lasting results", false);

            log.info("Seeded 11 spa services");

            // --- Seed TREATMENT Services (8) ---
            Service hairTransplant = createService("Hair Transplant", treatments,
                    Map.of(120, new BigDecimal("250000")),
                    List.of(120), "Advanced hair restoration procedure for natural results", true);

            Service ivSkinTherapy = createService("IV Skin Therapy", treatments,
                    Map.of(45, new BigDecimal("45000"), 60, new BigDecimal("65000")),
                    List.of(45, 60), "Intravenous therapy delivering nutrients directly for glowing skin", true);

            Service micropigmentation = createService("Micropigmentation / Tattoos", treatments,
                    Map.of(60, new BigDecimal("35000"), 90, new BigDecimal("50000")),
                    List.of(60, 90), "Precision cosmetic tattooing and micropigmentation services", false);

            Service acupuncture = createService("Acupuncture", treatments,
                    Map.of(45, new BigDecimal("20000"), 60, new BigDecimal("30000")),
                    List.of(45, 60), "Traditional acupuncture therapy for pain relief and wellness", false);

            Service prp = createService("Platelet-Rich Plasma (PRP)", treatments,
                    Map.of(60, new BigDecimal("85000")),
                    List.of(60), "PRP therapy using your own blood platelets for rejuvenation", false);

            Service cosmeticCamouflage = createService("Cosmetic Camouflage", treatments,
                    Map.of(45, new BigDecimal("25000"), 60, new BigDecimal("40000")),
                    List.of(45, 60), "Specialized skin camouflage for scars and pigmentation", false);

            Service haloTherapy = createService("Halo Therapy", treatments,
                    Map.of(30, new BigDecimal("15000"), 45, new BigDecimal("22000")),
                    List.of(30, 45), "Salt-infused air therapy for respiratory and skin health", false);

            Service saltTherapy = createService("Salt Therapy", treatments,
                    Map.of(30, new BigDecimal("12000"), 45, new BigDecimal("18000")),
                    List.of(30, 45), "Natural salt therapy session for relaxation and healing", false);

            log.info("Seeded 8 treatment services");

            // --- Seed GYM Services (9) ---
            Service gymAccess = createService("Gym Access", gym,
                    Map.of(60, new BigDecimal("5000"), 120, new BigDecimal("8000")),
                    List.of(60, 120), "Full access to state-of-the-art gym equipment and facilities", false);

            Service aerobicsClass = createService("Aerobics Class", gym,
                    Map.of(45, new BigDecimal("5000"), 60, new BigDecimal("6000")),
                    List.of(45, 60), "Energizing group aerobics session for cardiovascular fitness", false);

            Service exerciseStudio = createService("Exercise Studio", gym,
                    Map.of(45, new BigDecimal("5000"), 60, new BigDecimal("8000")),
                    List.of(45, 60), "Guided workout sessions in our dedicated exercise studio", false);

            Service tabata = createService("Tabata", gym,
                    Map.of(30, new BigDecimal("4000"), 45, new BigDecimal("6000")),
                    List.of(30, 45), "High-intensity interval training for maximum calorie burn", false);

            Service bungeeFly = createService("Bungee Fly", gym,
                    Map.of(45, new BigDecimal("10000")),
                    List.of(45), "Unique bungee-assisted fitness experience for a fun workout", false);

            Service danceClass = createService("Dance Class", gym,
                    Map.of(45, new BigDecimal("5000"), 60, new BigDecimal("7000")),
                    List.of(45, 60), "Fun and engaging dance fitness class for all skill levels", false);

            Service waterTherapy = createService("Water Therapy", gym,
                    Map.of(30, new BigDecimal("8000"), 45, new BigDecimal("12000")),
                    List.of(30, 45), "Therapeutic water-based exercises for recovery and wellness", false);

            Service swimmingClasses = createService("Swimming Classes", gym,
                    Map.of(45, new BigDecimal("6000"), 60, new BigDecimal("10000")),
                    List.of(45, 60), "Professional swimming instruction for all skill levels", false);

            Service waterAerobics = createService("Water Aerobics", gym,
                    Map.of(45, new BigDecimal("7000")),
                    List.of(45), "Low-impact aquatic aerobics for fitness and joint health", false);

            log.info("Seeded 9 gym services");

            // --- Seed SALON Services (12) ---
            Map<Integer, BigDecimal> hairStylingPricing = new HashMap<>();
            hairStylingPricing.put(45, new BigDecimal("8000"));
            hairStylingPricing.put(60, new BigDecimal("12000"));
            hairStylingPricing.put(90, new BigDecimal("18000"));
            Service hairStyling = createService("Hair Styling", salon,
                    hairStylingPricing,
                    List.of(45, 60, 90), "Professional hair styling for any occasion", false);

            Service barbingShaving = createService("Barbing / Shaving", salon,
                    Map.of(30, new BigDecimal("5000")),
                    List.of(30), "Expert barbing and clean shave services", false);

            Service hairDye = createService("Hair Dye", salon,
                    Map.of(60, new BigDecimal("15000"), 90, new BigDecimal("25000")),
                    List.of(60, 90), "Professional hair coloring and dye services", false);

            Service braids = createService("Braids", salon,
                    Map.of(60, new BigDecimal("8000"), 120, new BigDecimal("15000")),
                    List.of(60, 120), "Beautiful braiding styles from classic to modern designs", false);

            Service hairWashing = createService("Hair Washing", salon,
                    Map.of(30, new BigDecimal("3000")),
                    List.of(30), "Thorough hair wash with premium products", false);

            Service weaveWig = createService("Weave / Wig Installation", salon,
                    Map.of(60, new BigDecimal("12000"), 90, new BigDecimal("20000")),
                    List.of(60, 90), "Professional weave and wig installation services", false);

            Service dreadlocks = createService("Dreadlocks", salon,
                    Map.of(90, new BigDecimal("15000"), 120, new BigDecimal("25000")),
                    List.of(90, 120), "Dreadlock creation maintenance and styling services", false);

            Service nailPolish = createService("Nail Polish / Fixing & Art", salon,
                    Map.of(30, new BigDecimal("5000"), 60, new BigDecimal("10000")),
                    List.of(30, 60), "Complete nail care including polish fixing and art designs", false);

            Service eyebrowTinting = createService("Eyebrow Tinting / Tattoo", salon,
                    Map.of(30, new BigDecimal("8000"), 45, new BigDecimal("12000")),
                    List.of(30, 45), "Eyebrow tinting and semi-permanent tattoo services", false);

            Service eyelashFixing = createService("Eyelash Fixing", salon,
                    Map.of(30, new BigDecimal("6000"), 45, new BigDecimal("10000")),
                    List.of(30, 45), "Professional eyelash extension and fixing services", false);

            Service pedicure = createService("Pedicure", salon,
                    Map.of(30, new BigDecimal("6000"), 45, new BigDecimal("10000")),
                    List.of(30, 45), "Relaxing pedicure with nail shaping and polish", false);

            Service manicure = createService("Manicure", salon,
                    Map.of(30, new BigDecimal("5000"), 45, new BigDecimal("8000")),
                    List.of(30, 45), "Complete manicure service for beautiful nails", false);

            log.info("Seeded 12 salon services");

            // --- Associate Add-Ons with Services ---

            // Aromatherapy Enhancement -> spa massages, hammam
            aromatherapyEnhancement.getServices().addAll(List.of(
                    swedishMassage, deepTissueMassage, hotStoneMassage, aromatherapyMassage, couplesMassage, hammamExperience
            ));

            // Hot Stone Add-On -> massages
            hotStoneAddOn.getServices().addAll(List.of(
                    swedishMassage, deepTissueMassage, aromatherapyMassage, couplesMassage
            ));

            // Scalp Massage -> massages, facials
            scalpMassage.getServices().addAll(List.of(
                    swedishMassage, deepTissueMassage, hotStoneMassage, aromatherapyMassage, couplesMassage, signatureFacial
            ));

            // Cold Plunge -> sauna, steam, hammam
            coldPlunge.getServices().addAll(List.of(
                    saunaSession, steamBath, hammamExperience
            ));

            // Detox Body Mask -> body scrub, hammam, facials
            detoxBodyMask.getServices().addAll(List.of(
                    bodyScrub, hammamExperience, signatureFacial
            ));

            // Cupping Therapy -> deep tissue, swedish, acupuncture
            cuppingTherapy.getServices().addAll(List.of(
                    deepTissueMassage, swedishMassage, acupuncture
            ));

            // Champagne & Fruits -> couples massage, signature facial, hammam
            champagneAndFruits.getServices().addAll(List.of(
                    couplesMassage, signatureFacial, hammamExperience
            ));

            // Eye Treatment -> signature facial
            eyeTreatment.getServices().addAll(List.of(
                    signatureFacial
            ));

            // Lip Treatment -> signature facial
            lipTreatment.getServices().addAll(List.of(
                    signatureFacial
            ));

            // Gel Polish Upgrade -> nail polish, manicure, pedicure
            gelPolishUpgrade.getServices().addAll(List.of(
                    nailPolish, manicure, pedicure
            ));

            // Nail Art -> nail polish, manicure, pedicure
            nailArt.getServices().addAll(List.of(
                    nailPolish, manicure, pedicure
            ));

            // Paraffin Treatment -> manicure, pedicure
            paraffinTreatment.getServices().addAll(List.of(
                    manicure, pedicure
            ));

            // Deep Conditioning -> hair styling, hair dye, braids, weave/wig, hair washing
            deepConditioning.getServices().addAll(List.of(
                    hairStyling, hairDye, braids, weaveWig, hairWashing
            ));

            // Scalp Treatment -> hair styling, hair dye, hair washing, dreadlocks
            scalpTreatment.getServices().addAll(List.of(
                    hairStyling, hairDye, hairWashing, dreadlocks
            ));

            // Personal Training Session -> gym access, aerobics, tabata, bungee fly, swimming
            personalTraining.getServices().addAll(List.of(
                    gymAccess, aerobicsClass, tabata, bungeeFly, swimmingClasses
            ));

            serviceAddOnRepository.saveAll(List.of(
                    aromatherapyEnhancement, hotStoneAddOn, scalpMassage, coldPlunge, detoxBodyMask,
                    cuppingTherapy, champagneAndFruits, eyeTreatment, lipTreatment, gelPolishUpgrade,
                    nailArt, paraffinTreatment, deepConditioning, scalpTreatment, personalTraining
            ));

            log.info("Associated add-ons with services");
            log.info("Service data seeding completed successfully");
        } else {
            log.info("Service categories already exist, skipping service data seed");
        }
    }

    private ServiceAddOn saveAddOn(String name, BigDecimal price, Integer duration, String description) {
        return serviceAddOnRepository.save(ServiceAddOn.builder()
                .name(name)
                .price(price)
                .duration(duration)
                .description(description)
                .status(ServiceStatus.ACTIVE)
                .build());
    }

    private Service createService(String name, ServiceCategory category,
                                  Map<Integer, BigDecimal> pricing, List<Integer> durations,
                                  String shortDescription, boolean isPopular) {
        String slug = name.toLowerCase().trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        return serviceRepository.save(Service.builder()
                .name(name)
                .slug(slug)
                .shortDescription(shortDescription)
                .description(shortDescription)
                .category(category)
                .pricing(pricing)
                .duration(durations)
                .images(List.of())
                .benefits(List.of())
                .isPopular(isPopular)
                .status(ServiceStatus.ACTIVE)
                .build());
    }
}
