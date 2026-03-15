import type { Service } from "@radiance/types";

export const services: Service[] = [
  // ─── SPA ──────────────────────────────────────────────────────────────────────

  {
    id: "sauna-session",
    name: "Sauna Session",
    slug: "sauna-session",
    category: "spa",
    description:
      "Experience the traditional Finnish sauna, heated to the perfect temperature for deep relaxation and detoxification. Our wood-lined sauna room provides an authentic experience that helps cleanse your body of toxins, improve circulation, and relieve muscle tension.",
    shortDescription:
      "Traditional Finnish sauna for deep relaxation and detoxification.",
    benefits: [
      "Detoxifies the body through sweating",
      "Improves blood circulation",
      "Relieves muscle tension and pain",
      "Promotes better sleep",
    ],
    duration: [30, 45],
    price: { 30: 10000, 45: 14000 },
    images: ["/images/services/sauna-1.jpg", "/images/services/sauna-2.jpg"],
    thumbnail: "/images/services/sauna-thumb.jpg",
    rating: 4.8,
    reviewCount: 89,
    addOns: ["aromatherapy", "cold-plunge"],
    isPopular: true,
    preparation: "Please hydrate well before your session. Avoid heavy meals 1-2 hours before.",
    whatToExpect:
      "You'll be provided with towels and slippers. The sauna is maintained at 80-100°C. Sessions include a cool-down period.",
  },
  {
    id: "hammam-experience",
    name: "Hammam Experience",
    slug: "hammam-experience",
    category: "spa",
    description:
      "Immerse yourself in the centuries-old tradition of the Turkish bath. Our Hammam experience includes steam bathing, exfoliation with a traditional kessa glove, and a rejuvenating black soap treatment.",
    shortDescription:
      "Traditional Turkish bath with steam, exfoliation, and black soap treatment.",
    benefits: [
      "Deep cleanses and exfoliates skin",
      "Opens pores and removes impurities",
      "Improves skin texture and glow",
      "Relaxes muscles and joints",
    ],
    duration: [45, 60],
    price: { 45: 15000, 60: 20000 },
    images: ["/images/services/hammam-1.jpg", "/images/services/hammam-2.jpg"],
    thumbnail: "/images/services/hammam-thumb.jpg",
    rating: 4.9,
    reviewCount: 67,
    addOns: ["aromatherapy", "body-mask"],
    isPopular: true,
    preparation:
      "Come with clean skin. Remove all jewelry before the treatment.",
    whatToExpect:
      "The experience includes steam room, body scrub, and relaxation in our rest area. Towels and robes are provided.",
  },
  {
    id: "steam-bath",
    name: "Steam Bath",
    slug: "steam-bath",
    category: "spa",
    description:
      "Our eucalyptus-infused steam bath provides a gentle yet effective way to relax and cleanse. The warm, moist air opens your pores, clears your sinuses, and leaves you feeling refreshed and revitalized.",
    shortDescription:
      "Eucalyptus-infused steam bath for gentle cleansing and relaxation.",
    benefits: [
      "Clears respiratory system",
      "Opens pores for deep cleansing",
      "Hydrates and softens skin",
      "Promotes relaxation",
    ],
    duration: [30, 45],
    price: { 30: 10000, 45: 14000 },
    images: ["/images/services/steam-1.jpg"],
    thumbnail: "/images/services/steam-thumb.jpg",
    rating: 4.7,
    reviewCount: 54,
    addOns: ["aromatherapy"],
    preparation:
      "Stay hydrated. Best enjoyed before a massage treatment.",
    whatToExpect:
      "Our steam room is maintained at 40-45°C with 100% humidity. Towels and water are provided throughout the session.",
  },
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    slug: "swedish-massage",
    category: "spa",
    description:
      "Our signature Swedish massage uses long, flowing strokes combined with kneading and circular movements to promote total relaxation. This classic technique improves circulation, eases muscle tension, and creates a sense of overall well-being.",
    shortDescription:
      "Classic relaxation massage with long, flowing strokes for total well-being.",
    benefits: [
      "Promotes deep relaxation",
      "Improves blood circulation",
      "Reduces muscle tension",
      "Decreases stress hormones",
    ],
    duration: [60, 90],
    price: { 60: 25000, 90: 35000 },
    images: ["/images/services/swedish-1.jpg", "/images/services/swedish-2.jpg"],
    thumbnail: "/images/services/swedish-thumb.jpg",
    rating: 4.9,
    reviewCount: 156,
    addOns: ["aromatherapy", "hot-stones", "scalp-massage"],
    isPopular: true,
    preparation:
      "Arrive 10 minutes early to relax. Communicate any areas of concern to your therapist.",
    whatToExpect:
      "You'll be draped for privacy. Pressure can be adjusted to your preference. A brief consultation precedes the session.",
  },
  {
    id: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    slug: "deep-tissue-massage",
    category: "spa",
    description:
      "Targeted deep tissue work focuses on the deeper layers of muscle and connective tissue. Using firm pressure and slow strokes, this massage is ideal for chronic pain, muscle knots, and areas of tension.",
    shortDescription:
      "Intensive massage targeting deep muscle layers for chronic tension relief.",
    benefits: [
      "Relieves chronic muscle pain",
      "Breaks down scar tissue",
      "Improves posture",
      "Increases range of motion",
    ],
    duration: [60, 90],
    price: { 60: 30000, 90: 42000 },
    images: ["/images/services/deep-tissue-1.jpg"],
    thumbnail: "/images/services/deep-tissue-thumb.jpg",
    rating: 4.8,
    reviewCount: 98,
    addOns: ["hot-stones", "cupping"],
    isPopular: true,
    preparation:
      "Drink plenty of water before and after. Inform therapist of any injuries.",
    whatToExpect:
      "Expect firm pressure. Some areas may feel tender during treatment. Soreness may last a day or two after the session.",
  },
  {
    id: "hot-stone-massage",
    name: "Hot Stone Massage",
    slug: "hot-stone-massage",
    category: "spa",
    description:
      "Smooth, heated basalt stones are placed on key points of the body and used as massage tools. The penetrating heat relaxes muscles deeply, allowing the therapist to work more effectively.",
    shortDescription:
      "Heated basalt stones combined with massage for deep muscle relaxation.",
    benefits: [
      "Deep muscle relaxation",
      "Improves blood flow",
      "Reduces stress and anxiety",
      "Eases muscle stiffness",
    ],
    duration: [75, 90],
    price: { 75: 35000, 90: 45000 },
    images: ["/images/services/hot-stone-1.jpg"],
    thumbnail: "/images/services/hot-stone-thumb.jpg",
    rating: 4.9,
    reviewCount: 72,
    addOns: ["aromatherapy", "scalp-massage"],
    preparation: "Avoid caffeine before treatment. Wear loose clothing.",
    whatToExpect:
      "Stones are heated to 50-55°C. The warmth penetrates deeply into muscles. You will feel immediate tension relief.",
  },
  {
    id: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    slug: "aromatherapy-massage",
    category: "spa",
    description:
      "This sensory journey combines the power of touch with therapeutic essential oils. Choose from our selection of oil blends designed for relaxation, energy, or balance.",
    shortDescription:
      "Sensory massage experience with therapeutic essential oils of your choice.",
    benefits: [
      "Enhances mood and emotions",
      "Promotes deep relaxation",
      "Reduces anxiety",
      "Nourishes skin",
    ],
    duration: [60, 90],
    price: { 60: 28000, 90: 40000 },
    images: ["/images/services/aromatherapy-1.jpg"],
    thumbnail: "/images/services/aromatherapy-thumb.jpg",
    rating: 4.8,
    reviewCount: 84,
    addOns: ["scalp-massage"],
    preparation:
      "Let us know if you have any allergies or sensitivities to scents.",
    whatToExpect:
      "You'll choose your essential oil blend before the treatment begins. The room is dimly lit with soothing music.",
  },
  {
    id: "couples-massage",
    name: "Couples Massage",
    slug: "couples-massage",
    category: "spa",
    description:
      "Share a relaxing experience with your partner in our private couples suite. Two therapists work simultaneously, allowing you to enjoy the benefits of massage together.",
    shortDescription:
      "Side-by-side massage experience for two in our private couples suite.",
    benefits: [
      "Shared relaxation experience",
      "Strengthens connection",
      "Individual attention from two therapists",
      "Private romantic atmosphere",
    ],
    duration: [60, 90],
    price: { 60: 50000, 90: 70000 },
    images: ["/images/services/couples-1.jpg"],
    thumbnail: "/images/services/couples-thumb.jpg",
    rating: 5.0,
    reviewCount: 45,
    addOns: ["champagne", "aromatherapy", "hot-stones"],
    isPopular: true,
    preparation: "Arrive 15 minutes early to settle in together.",
    whatToExpect:
      "Private suite with two massage tables. Choose your preferred massage style. Refreshments are provided after the session.",
  },
  {
    id: "signature-facial",
    name: "Signature Facial",
    slug: "signature-facial",
    category: "spa",
    description:
      "Our signature facial is customized to your skin type and concerns. Includes deep cleansing, exfoliation, extraction, mask, and hydration for glowing, healthy skin.",
    shortDescription:
      "Customized facial treatment for your specific skin type and concerns.",
    benefits: [
      "Deep cleanses pores",
      "Improves skin texture",
      "Hydrates and nourishes",
      "Reduces signs of aging",
    ],
    duration: [60, 90],
    price: { 60: 20000, 90: 30000 },
    images: ["/images/services/facial-1.jpg"],
    thumbnail: "/images/services/facial-thumb.jpg",
    rating: 4.8,
    reviewCount: 92,
    addOns: ["eye-treatment", "lip-treatment"],
    isPopular: true,
    preparation: "Come with clean skin. Avoid exfoliating 24 hours before.",
    whatToExpect:
      "Your esthetician will analyze your skin and customize the treatment. Expect cleansing, exfoliation, extraction, and a nourishing mask.",
  },
  {
    id: "body-scrub",
    name: "Body Scrub",
    slug: "body-scrub",
    category: "spa",
    description:
      "Reveal smoother, more radiant skin with our invigorating body scrub treatments. Using natural exfoliating ingredients, we gently remove dead skin cells, stimulate circulation, and leave your skin feeling silky soft.",
    shortDescription:
      "Invigorating body exfoliation for smoother, more radiant skin.",
    benefits: [
      "Removes dead skin cells",
      "Stimulates blood circulation",
      "Leaves skin silky smooth",
      "Prepares skin for better product absorption",
    ],
    duration: [30, 45],
    price: { 30: 12000, 45: 18000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 41,
    addOns: ["body-mask", "aromatherapy"],
    preparation:
      "Avoid shaving or waxing 24 hours before your appointment. Hydrate well beforehand.",
    whatToExpect:
      "A full-body exfoliation using premium natural scrubs. Followed by a rinse and moisturizing application. You will feel refreshed and rejuvenated.",
  },
  {
    id: "hair-removal",
    name: "Hair Removal",
    slug: "hair-removal",
    category: "spa",
    description:
      "Professional hair removal services using premium waxing products for smooth, long-lasting results. Our trained therapists ensure minimal discomfort while delivering excellent results across all body areas.",
    shortDescription:
      "Professional waxing and hair removal for smooth, lasting results.",
    benefits: [
      "Smooth, hair-free skin",
      "Long-lasting results",
      "Exfoliates skin during treatment",
      "Finer regrowth over time",
    ],
    duration: [30, 60],
    price: { 30: 8000, 60: 15000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.6,
    reviewCount: 37,
    addOns: ["soothing-lotion"],
    preparation:
      "Hair should be at least 5mm long. Avoid sun exposure and exfoliation 24 hours prior.",
    whatToExpect:
      "Your therapist will cleanse the area, apply wax, and remove hair swiftly. A soothing lotion is applied afterwards to calm the skin.",
  },

  // ─── TREATMENTS ───────────────────────────────────────────────────────────────

  {
    id: "hair-transplant",
    name: "Hair Transplant",
    slug: "hair-transplant",
    category: "treatments",
    description:
      "Advanced hair restoration procedure performed by experienced specialists using the latest FUE techniques. Our hair transplant service offers natural-looking results with minimal downtime, helping you regain a fuller head of hair and renewed confidence.",
    shortDescription:
      "Advanced FUE hair restoration for natural-looking, permanent results.",
    benefits: [
      "Permanent, natural-looking results",
      "Minimally invasive FUE technique",
      "Boosts confidence and self-esteem",
      "No visible scarring",
    ],
    duration: [120],
    price: { 120: 250000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.9,
    reviewCount: 18,
    addOns: ["prp-addon", "scalp-treatment"],
    isPopular: true,
    preparation:
      "Avoid blood thinners for 7 days. Do not smoke for at least 48 hours before the procedure. A consultation is required beforehand.",
    whatToExpect:
      "The procedure involves extracting individual follicles and transplanting them to thinning areas. Local anesthesia ensures comfort throughout. Recovery instructions will be provided.",
  },
  {
    id: "iv-skin-therapy",
    name: "IV Skin Therapy",
    slug: "iv-skin-therapy",
    category: "treatments",
    description:
      "Revitalize your skin from the inside out with our intravenous vitamin and nutrient therapy. Custom formulations deliver antioxidants, vitamins, and minerals directly into your bloodstream for maximum absorption and visible results.",
    shortDescription:
      "Intravenous vitamin infusion for radiant, rejuvenated skin from within.",
    benefits: [
      "Direct nutrient delivery for maximum absorption",
      "Promotes collagen production",
      "Brightens and evens skin tone",
      "Boosts overall skin health",
    ],
    duration: [45, 60],
    price: { 45: 45000, 60: 65000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.8,
    reviewCount: 29,
    addOns: ["glutathione-boost"],
    isPopular: true,
    preparation:
      "Eat a light meal before your session. Stay well hydrated. Inform staff of any medical conditions or medications.",
    whatToExpect:
      "A small IV line is placed in your arm. The infusion takes 30-60 minutes during which you can relax comfortably. Results are often noticeable within a few days.",
  },
  {
    id: "micropigmentation",
    name: "Micropigmentation / Tattoos",
    slug: "micropigmentation",
    category: "treatments",
    description:
      "Semi-permanent cosmetic tattooing for eyebrows, lips, and other areas. Our skilled artists use precision techniques to enhance your natural features with long-lasting, subtle color that saves you time on daily makeup routines.",
    shortDescription:
      "Semi-permanent cosmetic tattooing for beautifully enhanced natural features.",
    benefits: [
      "Long-lasting results up to 2-3 years",
      "Saves daily makeup time",
      "Enhances natural features subtly",
      "Customized to your skin tone",
    ],
    duration: [60, 90],
    price: { 60: 35000, 90: 50000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 22,
    addOns: ["numbing-cream"],
    preparation:
      "Avoid caffeine and alcohol 24 hours before. Do not take aspirin or blood thinners. Come with a clean face.",
    whatToExpect:
      "A consultation to select shape and color is followed by the procedure. Topical numbing is applied for comfort. Aftercare instructions will be provided for best results.",
  },
  {
    id: "acupuncture",
    name: "Acupuncture",
    slug: "acupuncture",
    category: "treatments",
    description:
      "Traditional Chinese acupuncture therapy performed by certified practitioners. Fine, sterile needles are placed at specific meridian points to restore energy balance, relieve pain, and promote natural healing throughout the body.",
    shortDescription:
      "Traditional needle therapy to restore energy balance and relieve pain.",
    benefits: [
      "Relieves chronic pain naturally",
      "Reduces stress and anxiety",
      "Improves energy and sleep quality",
      "Supports the body's natural healing",
    ],
    duration: [45, 60],
    price: { 45: 20000, 60: 30000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.8,
    reviewCount: 34,
    addOns: ["cupping", "moxibustion"],
    preparation:
      "Eat a light meal before your session. Wear loose, comfortable clothing. Avoid alcohol on the day of treatment.",
    whatToExpect:
      "Your practitioner will assess your condition and place thin needles at specific points. Most people feel minimal discomfort. You may feel deeply relaxed or energized after the session.",
  },
  {
    id: "prp-therapy",
    name: "Platelet-Rich Plasma (PRP)",
    slug: "prp-therapy",
    category: "treatments",
    description:
      "Harness your body's own healing power with PRP therapy. A small blood sample is processed to concentrate growth factors, which are then injected into targeted areas to stimulate collagen production, skin rejuvenation, and hair growth.",
    shortDescription:
      "Growth-factor therapy using your own blood to rejuvenate skin and stimulate hair growth.",
    benefits: [
      "Uses your body's natural growth factors",
      "Stimulates collagen and elastin production",
      "Effective for skin rejuvenation and hair loss",
      "Minimal risk of allergic reaction",
    ],
    duration: [60],
    price: { 60: 85000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.9,
    reviewCount: 15,
    addOns: ["microneedling-addon"],
    isPopular: true,
    preparation:
      "Stay hydrated. Avoid anti-inflammatory medications for 48 hours. Do not apply topical products on the treatment day.",
    whatToExpect:
      "A small blood draw is taken and processed in a centrifuge. The concentrated plasma is then applied or injected into the target area. Mild redness is normal and subsides within a day.",
  },
  {
    id: "cosmetic-camouflage",
    name: "Cosmetic Camouflage",
    slug: "cosmetic-camouflage",
    category: "treatments",
    description:
      "Specialized skin camouflage techniques to conceal scars, vitiligo, birthmarks, and other skin irregularities. Our trained therapists use medical-grade products that are waterproof, long-lasting, and perfectly matched to your skin tone.",
    shortDescription:
      "Medical-grade skin camouflage to conceal scars, vitiligo, and skin irregularities.",
    benefits: [
      "Conceals scars, vitiligo, and birthmarks",
      "Waterproof and long-lasting coverage",
      "Perfectly matched to your skin tone",
      "Boosts confidence and self-image",
    ],
    duration: [45, 60],
    price: { 45: 25000, 60: 40000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 12,
    addOns: ["setting-spray"],
    preparation:
      "Come with clean, moisturized skin on the treatment area. Avoid fake tan products for 48 hours before.",
    whatToExpect:
      "Your therapist will color-match products to your skin and apply layers for seamless coverage. You'll also receive tips on how to maintain and reapply at home.",
  },
  {
    id: "halo-therapy",
    name: "Halo Therapy",
    slug: "halo-therapy",
    category: "treatments",
    description:
      "Breathe easier in our specially designed salt therapy room. Micro-particles of pharmaceutical-grade salt are dispersed into the air, providing natural relief for respiratory conditions, allergies, and skin issues while promoting deep relaxation.",
    shortDescription:
      "Salt-infused air therapy for respiratory relief and deep relaxation.",
    benefits: [
      "Improves respiratory function",
      "Reduces allergy symptoms",
      "Promotes skin healing",
      "Deeply calming and meditative",
    ],
    duration: [30, 45],
    price: { 30: 15000, 45: 22000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.6,
    reviewCount: 26,
    addOns: ["guided-meditation"],
    preparation:
      "Wear comfortable, light-colored clothing. Avoid wearing perfume or strong fragrances.",
    whatToExpect:
      "You'll relax in a reclining chair inside our salt room while a halogenerator disperses fine salt particles. Sessions are quiet and meditative. Many guests notice clearer breathing immediately.",
  },
  {
    id: "salt-therapy",
    name: "Salt Therapy",
    slug: "salt-therapy",
    category: "treatments",
    description:
      "Immerse yourself in the healing properties of Himalayan salt in our dedicated salt cave. The mineral-rich environment helps detoxify the body, improve skin conditions, and provide relief from stress and fatigue.",
    shortDescription:
      "Himalayan salt cave experience for detoxification and holistic healing.",
    benefits: [
      "Detoxifies through mineral absorption",
      "Alleviates skin conditions like eczema",
      "Reduces stress and mental fatigue",
      "Supports immune system function",
    ],
    duration: [30, 45],
    price: { 30: 12000, 45: 18000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 31,
    addOns: ["guided-meditation"],
    preparation:
      "Drink water before and after your session. Wear comfortable clothes. Remove jewelry.",
    whatToExpect:
      "Relax on a comfortable lounger surrounded by Himalayan salt walls and floor. Soft lighting and gentle music create a serene atmosphere. Sessions are suitable for all ages.",
  },

  // ─── SALON ────────────────────────────────────────────────────────────────────

  {
    id: "hair-styling",
    name: "Hair Styling",
    slug: "hair-styling",
    category: "salon",
    description:
      "Professional hair styling services including wash, cut, blow dry, and styling. Our expert stylists will help you achieve your desired look with quality products and personalized attention.",
    shortDescription:
      "Professional hair wash, cut, and styling by expert stylists.",
    benefits: [
      "Fresh, polished look",
      "Professional expertise",
      "Personalized consultation",
      "Quality products used",
    ],
    duration: [45, 60, 90],
    price: { 45: 8000, 60: 12000, 90: 18000 },
    images: ["/images/services/hair-1.jpg"],
    thumbnail: "/images/services/hair-thumb.jpg",
    rating: 4.6,
    reviewCount: 54,
    addOns: ["deep-conditioning", "scalp-treatment"],
    isPopular: true,
    preparation: "Bring reference photos of styles you like.",
    whatToExpect:
      "Consultation, wash, cut, blow dry, and styling included. Your stylist will recommend the best approach for your hair type.",
  },
  {
    id: "barbing-shaving",
    name: "Barbing / Shaving",
    slug: "barbing-shaving",
    category: "salon",
    description:
      "Classic gentleman's grooming at its finest. Our skilled barbers deliver precision haircuts, clean shaves, and beard trims using premium tools and products for a sharp, polished finish.",
    shortDescription:
      "Expert barbing and shaving services for a sharp, polished gentleman's look.",
    benefits: [
      "Precision cuts and clean lines",
      "Professional-grade tools and products",
      "Relaxing grooming experience",
      "Includes hot towel treatment",
    ],
    duration: [30],
    price: { 30: 5000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 48,
    addOns: ["beard-oil"],
    preparation:
      "No special preparation needed. Let your barber know your preferred style.",
    whatToExpect:
      "A comfortable chair, precision clippers, and expert hands. Includes a hot towel finish and aftershave balm application.",
  },
  {
    id: "hair-dye",
    name: "Hair Dye",
    slug: "hair-dye",
    category: "salon",
    description:
      "Transform your look with professional hair coloring services. From subtle highlights to bold full-color transformations, our colorists use premium dyes that nourish while they color for vibrant, long-lasting results.",
    shortDescription:
      "Professional hair coloring with premium, nourishing dye products.",
    benefits: [
      "Vibrant, long-lasting color",
      "Nourishing formula protects hair",
      "Wide range of shades available",
      "Expert color matching to your skin tone",
    ],
    duration: [60, 90],
    price: { 60: 15000, 90: 25000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.6,
    reviewCount: 35,
    addOns: ["deep-conditioning", "toner-treatment"],
    preparation:
      "Do not wash hair on the day of your appointment. Bring reference photos of desired color.",
    whatToExpect:
      "A color consultation followed by application. Processing time varies by technique. A wash, condition, and blow-dry finishes the service.",
  },
  {
    id: "braids",
    name: "Braids",
    slug: "braids",
    category: "salon",
    description:
      "Beautiful, expertly crafted braids in a variety of styles including box braids, cornrows, goddess locs, and more. Our braiders take pride in neat, long-lasting protective styles that keep your hair healthy and looking stunning.",
    shortDescription:
      "Expertly crafted protective braiding styles to suit every taste.",
    benefits: [
      "Protects natural hair from damage",
      "Low-maintenance styling option",
      "Wide variety of styles available",
      "Long-lasting results up to 6-8 weeks",
    ],
    duration: [60, 120],
    price: { 60: 8000, 120: 15000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.8,
    reviewCount: 62,
    addOns: ["edge-control", "scalp-treatment"],
    isPopular: true,
    preparation:
      "Come with clean, detangled hair. Bring your preferred braiding hair or extensions if desired.",
    whatToExpect:
      "Your stylist will discuss the desired pattern and size. Braiding is done neatly section by section. Finishing touches include edge styling and a light hold spray.",
  },
  {
    id: "hair-washing",
    name: "Hair Washing",
    slug: "hair-washing",
    category: "salon",
    description:
      "A relaxing professional hair wash that goes beyond the ordinary. Enjoy a soothing scalp massage, premium shampoo and conditioner tailored to your hair type, and a gentle blow-dry for soft, refreshed locks.",
    shortDescription:
      "Relaxing professional hair wash with scalp massage and conditioning.",
    benefits: [
      "Thoroughly cleanses hair and scalp",
      "Relaxing scalp massage included",
      "Products matched to your hair type",
      "Leaves hair soft and refreshed",
    ],
    duration: [30],
    price: { 30: 3000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.5,
    reviewCount: 28,
    addOns: ["deep-conditioning"],
    preparation: "No special preparation needed.",
    whatToExpect:
      "A double wash with premium shampoo, followed by conditioner and a relaxing scalp massage. Finished with a gentle towel dry or blow-dry.",
  },
  {
    id: "weave-wig",
    name: "Weave / Wig Installation",
    slug: "weave-wig",
    category: "salon",
    description:
      "Expert weave sew-ins and wig installations for a flawless, natural-looking finish. Whether you prefer a full sew-in, closure, or frontal wig, our stylists ensure secure placement, comfortable wear, and a seamless blend with your natural hairline.",
    shortDescription:
      "Flawless weave and wig installations for a natural, seamless look.",
    benefits: [
      "Natural-looking, seamless finish",
      "Protects natural hair underneath",
      "Versatile styling options",
      "Secure and comfortable placement",
    ],
    duration: [60, 90],
    price: { 60: 12000, 90: 20000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 44,
    addOns: ["wig-customization", "edge-control"],
    preparation:
      "Come with clean, braided-down hair. Bring your wig or weave bundles. Closures and frontals should be pre-cut if possible.",
    whatToExpect:
      "Your stylist will prepare your natural hair, install the weave or wig securely, and style to your preference. Custom blending and baby hair styling are included.",
  },
  {
    id: "dreadlocks",
    name: "Dreadlocks",
    slug: "dreadlocks",
    category: "salon",
    description:
      "Professional dreadlock creation, maintenance, and styling services. From starter locs to mature dreadlock retwists and styling, our locticians bring expertise in all textures and lengths for healthy, well-maintained locs.",
    shortDescription:
      "Professional dreadlock creation, maintenance, and styling for all hair types.",
    benefits: [
      "Expert loctician techniques",
      "Suitable for all hair textures",
      "Promotes healthy loc growth",
      "Retwist and maintenance options available",
    ],
    duration: [90, 120],
    price: { 90: 15000, 120: 25000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.8,
    reviewCount: 30,
    addOns: ["scalp-treatment", "loc-oil"],
    preparation:
      "Come with clean hair. For retwists, avoid washing for 3-5 days before your appointment.",
    whatToExpect:
      "Starter locs involve sectioning and twisting or interlocking. Retwists include a scalp cleanse, retwist, and styling. Duration varies based on length and density.",
  },
  {
    id: "nail-art",
    name: "Nail Polish / Fixing & Art",
    slug: "nail-art",
    category: "salon",
    description:
      "Express your personal style with our professional nail services. From classic polish and gel extensions to intricate nail art designs, our nail technicians deliver beautiful, long-lasting results that make a statement.",
    shortDescription:
      "Professional nail polish, extensions, and creative nail art designs.",
    benefits: [
      "Wide range of colors and designs",
      "Long-lasting gel and acrylic options",
      "Creative custom art designs",
      "Strengthens and protects natural nails",
    ],
    duration: [30, 60],
    price: { 30: 5000, 60: 10000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 52,
    addOns: ["gel-polish", "nail-charms"],
    isPopular: true,
    preparation:
      "Remove any existing polish before your appointment. Avoid soaking nails in water beforehand.",
    whatToExpect:
      "Nail shaping and prep, followed by base coat, color application, and design work. A top coat and quick-dry finish seal the look. Aftercare tips will be shared.",
  },
  {
    id: "eyebrow-tinting",
    name: "Eyebrow Tinting / Tattoo",
    slug: "eyebrow-tinting",
    category: "salon",
    description:
      "Define and enhance your eyebrows with professional tinting or semi-permanent tattooing. Our brow specialists create perfectly shaped, fuller-looking brows that frame your face beautifully and reduce the need for daily brow makeup.",
    shortDescription:
      "Professional eyebrow tinting and semi-permanent tattooing for defined brows.",
    benefits: [
      "Fuller, more defined brows",
      "Saves daily makeup time",
      "Customized shape to suit your face",
      "Results last weeks to months",
    ],
    duration: [30, 45],
    price: { 30: 8000, 45: 12000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.6,
    reviewCount: 38,
    addOns: ["brow-lamination"],
    preparation:
      "Avoid tweezing or threading for one week before. Come with a clean face, free of brow makeup.",
    whatToExpect:
      "A consultation to map your ideal brow shape, followed by tinting or tattooing. Mild redness may occur with tattooing and subsides quickly. Aftercare instructions provided.",
  },
  {
    id: "eyelash-fixing",
    name: "Eyelash Fixing",
    slug: "eyelash-fixing",
    category: "salon",
    description:
      "Achieve stunning, voluminous lashes with our professional eyelash extension and fixing services. We offer individual lash extensions, strip lashes, and lash lifts for a dramatic or natural look tailored to your preference.",
    shortDescription:
      "Professional eyelash extensions and fixing for stunning, voluminous lashes.",
    benefits: [
      "Fuller, more dramatic lash look",
      "Eliminates need for daily mascara",
      "Lightweight and comfortable to wear",
      "Customizable length and volume",
    ],
    duration: [30, 45],
    price: { 30: 6000, 45: 10000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 40,
    addOns: ["lash-serum"],
    preparation:
      "Come with clean, makeup-free eyes. Avoid using oil-based products around the eye area.",
    whatToExpect:
      "Lashes are applied one by one or in clusters for a natural or dramatic effect. The process is relaxing and painless. You'll receive aftercare tips for long-lasting wear.",
  },
  {
    id: "pedicure",
    name: "Pedicure",
    slug: "pedicure",
    category: "salon",
    description:
      "Treat your feet to a luxurious pedicure experience. Includes a warm soak, exfoliation, cuticle care, nail shaping, callus removal, a soothing foot massage, and polish application for beautifully groomed, refreshed feet.",
    shortDescription:
      "Luxurious foot care with soak, exfoliation, massage, and polish.",
    benefits: [
      "Softens and smooths rough skin",
      "Improves foot circulation",
      "Promotes healthy toenail growth",
      "Deeply relaxing foot massage",
    ],
    duration: [30, 45],
    price: { 30: 6000, 45: 10000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 55,
    addOns: ["gel-polish", "paraffin-treatment"],
    preparation:
      "Remove any existing toenail polish before your appointment. Wear open-toed shoes for afterwards.",
    whatToExpect:
      "A warm foot soak, cuticle care, callus removal, scrub, massage, and your choice of polish. You'll leave with beautifully groomed, refreshed feet.",
  },
  {
    id: "manicure",
    name: "Manicure",
    slug: "manicure",
    category: "salon",
    description:
      "Pamper your hands with our professional manicure service. Enjoy nail shaping, cuticle care, exfoliation, a relaxing hand massage, and polish application using premium products for elegant, well-groomed hands.",
    shortDescription:
      "Professional hand and nail care with shaping, massage, and polish.",
    benefits: [
      "Well-groomed, elegant nails",
      "Soft, smooth hands",
      "Improved circulation from hand massage",
      "Strengthens and protects nails",
    ],
    duration: [30, 45],
    price: { 30: 5000, 45: 8000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 60,
    addOns: ["gel-polish", "paraffin-treatment"],
    preparation:
      "Remove any existing nail polish before your appointment.",
    whatToExpect:
      "Includes soak, nail shaping, cuticle care, hand scrub, relaxing massage, and polish application. Choose from our wide selection of colors.",
  },

  // ─── GYM ──────────────────────────────────────────────────────────────────────

  {
    id: "gym-access",
    name: "Gym Access",
    slug: "gym-access",
    category: "gym",
    description:
      "Access our state-of-the-art gym facility equipped with modern cardio machines, free weights, resistance equipment, and more. Perfect for your daily workout routine in a clean, climate-controlled environment.",
    shortDescription:
      "Full access to our state-of-the-art gym and fitness equipment.",
    benefits: [
      "Modern cardio and strength equipment",
      "Climate-controlled environment",
      "Clean facilities with locker rooms",
      "Towel service included",
    ],
    duration: [60, 120],
    price: { 60: 5000, 120: 8000 },
    images: ["/images/services/gym-1.jpg"],
    thumbnail: "/images/services/gym-thumb.jpg",
    rating: 4.5,
    reviewCount: 42,
    addOns: ["personal-training"],
    isPopular: true,
    preparation: "Bring appropriate workout attire and shoes.",
    whatToExpect:
      "Full access to all gym equipment. Towels and water provided. Staff are available to assist with equipment setup.",
  },
  {
    id: "aerobics-class",
    name: "Aerobics Class",
    slug: "aerobics-class",
    category: "gym",
    description:
      "High-energy group fitness classes led by certified instructors. Join us for fun, effective workouts that improve cardiovascular health, burn calories, and keep you motivated in a group setting.",
    shortDescription:
      "Fun, high-energy group fitness classes for all levels.",
    benefits: [
      "Improves cardiovascular health",
      "Burns calories effectively",
      "Group motivation and energy",
      "Improved coordination and stamina",
    ],
    duration: [45, 60],
    price: { 45: 5000, 60: 6000 },
    images: ["/images/services/aerobics-1.jpg"],
    thumbnail: "/images/services/aerobics-thumb.jpg",
    rating: 4.7,
    reviewCount: 38,
    addOns: [],
    isPopular: true,
    preparation: "Wear comfortable workout clothes. Bring water.",
    whatToExpect:
      "Instructor-led class with warm-up, main workout, and cool-down. Suitable for beginners and experienced participants alike.",
  },
  {
    id: "exercise-studio",
    name: "Exercise Studio",
    slug: "exercise-studio",
    category: "gym",
    description:
      "Book our private exercise studio for solo or small-group workouts. Fully equipped with mats, resistance bands, stability balls, and a sound system, it is the perfect space for yoga, pilates, or personalized training sessions.",
    shortDescription:
      "Private studio space for yoga, pilates, and personalized training sessions.",
    benefits: [
      "Private, distraction-free environment",
      "Fully equipped with mats and accessories",
      "Ideal for yoga, pilates, and stretching",
      "Perfect for small group sessions",
    ],
    duration: [45, 60],
    price: { 45: 5000, 60: 8000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.6,
    reviewCount: 20,
    addOns: ["personal-training"],
    preparation:
      "Wear comfortable workout attire. Bring your own yoga mat if preferred.",
    whatToExpect:
      "A clean, well-lit studio with mirrors, mats, and equipment. Music can be customized. A staff member will help you get set up if needed.",
  },
  {
    id: "tabata",
    name: "Tabata",
    slug: "tabata",
    category: "gym",
    description:
      "Push your limits with our high-intensity Tabata interval training classes. Alternating between 20 seconds of all-out effort and 10 seconds of rest, this workout maximizes calorie burn and builds endurance in a short, efficient session.",
    shortDescription:
      "High-intensity interval training for maximum calorie burn in minimal time.",
    benefits: [
      "Maximum calorie burn in short sessions",
      "Boosts metabolism for hours after",
      "Builds cardiovascular endurance",
      "Improves strength and speed",
    ],
    duration: [30, 45],
    price: { 30: 4000, 45: 6000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.8,
    reviewCount: 33,
    addOns: ["protein-shake"],
    preparation:
      "Eat a light snack 1 hour before. Bring water and a towel. Suitable for intermediate to advanced fitness levels.",
    whatToExpect:
      "A trainer guides you through rounds of 20-second max-effort bursts followed by 10-second rest periods. The session includes a warm-up and cool-down stretch.",
  },
  {
    id: "bungee-fly",
    name: "Bungee Fly",
    slug: "bungee-fly",
    category: "gym",
    description:
      "Experience the thrill of aerial fitness with our Bungee Fly classes. Harnessed to a bungee cord suspended from the ceiling, you will fly, bounce, and perform gravity-defying moves that combine cardio, strength, and pure fun.",
    shortDescription:
      "Aerial bungee fitness combining cardio, strength, and exhilarating fun.",
    benefits: [
      "Full-body low-impact workout",
      "Builds core strength and balance",
      "Burns calories while having fun",
      "Unique and exciting experience",
    ],
    duration: [45],
    price: { 45: 10000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.9,
    reviewCount: 25,
    addOns: [],
    isPopular: true,
    preparation:
      "Wear fitted workout clothes (no loose fabric). Weight limit applies — please check at booking. Remove all jewelry.",
    whatToExpect:
      "A safety briefing and harness fitting, followed by a guided class of aerial moves, bouncing, and flying. No prior experience needed. You will leave smiling.",
  },
  {
    id: "dance-class",
    name: "Dance Class",
    slug: "dance-class",
    category: "gym",
    description:
      "Move your body to the rhythm in our energizing dance fitness classes. From Afrobeats to contemporary and dancehall, our instructors make fitness feel like a party while you burn calories and improve coordination.",
    shortDescription:
      "Energizing dance fitness classes in Afrobeats, contemporary, and more.",
    benefits: [
      "Burns calories through fun movement",
      "Improves coordination and rhythm",
      "Boosts mood and energy levels",
      "Builds community and social connection",
    ],
    duration: [45, 60],
    price: { 45: 5000, 60: 7000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.8,
    reviewCount: 46,
    addOns: [],
    preparation:
      "Wear comfortable clothes that allow free movement. Bring water. All skill levels welcome.",
    whatToExpect:
      "A high-energy instructor leads choreography broken down step by step. Classes include a warm-up, main routine, and cool-down. Expect lots of music and laughter.",
  },
  {
    id: "water-therapy",
    name: "Water Therapy",
    slug: "water-therapy",
    category: "gym",
    description:
      "Therapeutic aquatic exercises performed in our heated pool under professional guidance. Water therapy is excellent for rehabilitation, joint pain relief, and low-impact fitness, making it suitable for all ages and fitness levels.",
    shortDescription:
      "Guided aquatic exercises for rehabilitation, pain relief, and low-impact fitness.",
    benefits: [
      "Low impact on joints and bones",
      "Excellent for injury rehabilitation",
      "Improves flexibility and range of motion",
      "Warm water soothes aches and pains",
    ],
    duration: [30, 45],
    price: { 30: 8000, 45: 12000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 19,
    addOns: ["physiotherapy-consultation"],
    preparation:
      "Bring swimwear and a towel. Shower before entering the pool. Inform staff of any medical conditions.",
    whatToExpect:
      "A therapist guides you through gentle exercises in warm water. Sessions are tailored to your needs — whether rehabilitation, pain management, or general fitness.",
  },
  {
    id: "swimming-classes",
    name: "Swimming Classes",
    slug: "swimming-classes",
    category: "gym",
    description:
      "Learn to swim or refine your technique with our professional swimming instructors. We offer classes for beginners through advanced swimmers, including stroke correction, endurance training, and water safety skills.",
    shortDescription:
      "Professional swimming lessons for beginners through advanced swimmers.",
    benefits: [
      "Learn essential water safety skills",
      "Full-body cardiovascular workout",
      "Builds endurance and lung capacity",
      "Suitable for all ages and levels",
    ],
    duration: [45, 60],
    price: { 45: 6000, 60: 10000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.6,
    reviewCount: 24,
    addOns: [],
    preparation:
      "Bring swimwear, goggles, and a swim cap. Shower before entering the pool. Eat at least 1 hour before class.",
    whatToExpect:
      "A certified instructor assesses your level and tailors the lesson. Classes cover strokes, breathing technique, and water confidence. Pool depth is suitable for all levels.",
  },
  {
    id: "water-aerobics",
    name: "Water Aerobics",
    slug: "water-aerobics",
    category: "gym",
    description:
      "A fun, energizing group fitness class performed in our pool. Water aerobics combines cardiovascular exercise with the natural resistance of water, providing an effective full-body workout that is gentle on the joints.",
    shortDescription:
      "Fun pool-based group fitness with the natural resistance of water.",
    benefits: [
      "Full-body workout with low joint impact",
      "Natural water resistance builds strength",
      "Improves cardiovascular fitness",
      "Social and enjoyable group atmosphere",
    ],
    duration: [45],
    price: { 45: 7000 },
    images: ["/images/services/placeholder.jpg"],
    thumbnail: "/images/services/placeholder.jpg",
    rating: 4.7,
    reviewCount: 21,
    addOns: [],
    preparation:
      "Bring swimwear and a towel. Water shoes are recommended. No swimming ability required — exercises are performed in shallow water.",
    whatToExpect:
      "An instructor leads the class through a series of aerobic moves in waist-to-chest-deep water. Music keeps the energy up. Equipment like pool noodles may be used.",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter((s) => s.category === categoryId);
}

export function getPopularServices(): Service[] {
  return services.filter((s) => s.isPopular);
}

export function getFeaturedServices(limit: number = 6): Service[] {
  return services.slice(0, limit);
}
