import type { Package } from "@radiance/types";

export const packages: Package[] = [
  {
    id: "relaxation-package",
    name: "Relaxation Package",
    slug: "relaxation-package",
    description: "The perfect escape from daily stress. Enjoy a Swedish massage followed by a calming sauna session to leave you feeling completely renewed.",
    services: [
      { serviceId: "swedish-massage", serviceName: "Swedish Massage", duration: 60 },
      { serviceId: "sauna-session", serviceName: "Sauna Session", duration: 30 },
    ],
    originalPrice: 35000,
    price: 30000,
    savings: 5000,
    savingsPercentage: 14,
    image: "/images/packages/relaxation.jpg",
    duration: 90,
    isPopular: true,
    validFor: "Individual",
  },
  {
    id: "couples-retreat",
    name: "Couples Retreat",
    slug: "couples-retreat",
    description: "A romantic wellness experience for two. Enjoy side-by-side massages in our private couples suite, complete with champagne and fresh fruits.",
    services: [
      { serviceId: "couples-massage", serviceName: "Couples Massage", duration: 60 },
      { serviceId: "champagne", serviceName: "Champagne & Fruits", duration: 0 },
    ],
    originalPrice: 65000,
    price: 55000,
    savings: 10000,
    savingsPercentage: 15,
    image: "/images/packages/couples.jpg",
    duration: 90,
    isPopular: true,
    validFor: "Couples",
  },
  {
    id: "spa-day",
    name: "Full Spa Day",
    slug: "spa-day",
    description: "The ultimate wellness experience. Spend the day enjoying our thermal facilities, a signature massage, and a revitalizing facial treatment.",
    services: [
      { serviceId: "hammam-experience", serviceName: "Hammam Experience", duration: 60 },
      { serviceId: "deep-tissue-massage", serviceName: "Deep Tissue Massage", duration: 60 },
      { serviceId: "signature-facial", serviceName: "Signature Facial", duration: 60 },
    ],
    originalPrice: 70000,
    price: 60000,
    savings: 10000,
    savingsPercentage: 14,
    image: "/images/packages/spa-day.jpg",
    duration: 180,
    isPopular: true,
    validFor: "Individual",
  },
  {
    id: "beauty-day",
    name: "Beauty Day",
    slug: "beauty-day",
    description: "Complete beauty transformation. Get pampered with our signature facial, manicure, pedicure, and professional hair styling.",
    services: [
      { serviceId: "signature-facial", serviceName: "Signature Facial", duration: 60 },
      { serviceId: "manicure-pedicure", serviceName: "Manicure & Pedicure", duration: 60 },
      { serviceId: "hair-styling", serviceName: "Hair Styling", duration: 60 },
    ],
    originalPrice: 47000,
    price: 40000,
    savings: 7000,
    savingsPercentage: 15,
    image: "/images/packages/beauty.jpg",
    duration: 180,
    validFor: "Individual",
  },
  {
    id: "detox-renewal",
    name: "Detox & Renewal",
    slug: "detox-renewal",
    description: "Cleanse and rejuvenate with our detox-focused package. Includes steam bath, hammam experience, and aromatherapy massage.",
    services: [
      { serviceId: "steam-bath", serviceName: "Steam Bath", duration: 30 },
      { serviceId: "hammam-experience", serviceName: "Hammam Experience", duration: 45 },
      { serviceId: "aromatherapy-massage", serviceName: "Aromatherapy Massage", duration: 60 },
    ],
    originalPrice: 53000,
    price: 45000,
    savings: 8000,
    savingsPercentage: 15,
    image: "/images/packages/detox.jpg",
    duration: 135,
    validFor: "Individual",
  },
  {
    id: "stress-relief",
    name: "Stress Relief",
    slug: "stress-relief",
    description: "Targeted stress relief combining deep tissue massage with hot stone therapy for maximum tension release.",
    services: [
      { serviceId: "deep-tissue-massage", serviceName: "Deep Tissue Massage", duration: 60 },
      { serviceId: "hot-stone-massage", serviceName: "Hot Stone Therapy", duration: 30 },
    ],
    originalPrice: 50000,
    price: 42000,
    savings: 8000,
    savingsPercentage: 16,
    image: "/images/packages/stress-relief.jpg",
    duration: 90,
    validFor: "Individual",
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPopularPackages(): Package[] {
  return packages.filter((p) => p.isPopular);
}
