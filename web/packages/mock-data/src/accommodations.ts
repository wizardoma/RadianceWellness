import type { Accommodation } from "@radiance/types";

export const accommodations: Accommodation[] = [
  {
    id: "premium-apartment",
    name: "Premium Apartment",
    slug: "premium-apartment",
    type: "premium",
    description: "Our luxury premium apartment offers the ultimate in comfort and style. Featuring a spacious living area, fully equipped modern kitchen, and stunning views. Perfect for those seeking an elevated wellness retreat experience.",
    shortDescription: "Luxurious apartment with premium amenities and stunning views.",
    amenities: [
      {
        category: "Bedroom",
        items: ["King-size bed", "Premium linens", "Blackout curtains", "Walk-in closet", "Safe"],
      },
      {
        category: "Bathroom",
        items: ["Rain shower", "Soaking tub", "Heated floors", "Luxury toiletries", "Bathrobes & slippers"],
      },
      {
        category: "Kitchen",
        items: ["Full kitchen", "Coffee machine", "Microwave", "Dishwasher", "Cookware & utensils"],
      },
      {
        category: "Living",
        items: ["Spacious living area", "Dining table", "Comfortable sofa", "Work desk"],
      },
      {
        category: "Entertainment",
        items: ["55\" Smart TV", "Netflix included", "Bluetooth speaker", "High-speed WiFi"],
      },
      {
        category: "Wellness",
        items: ["Complimentary spa access", "Yoga mat", "Fitness equipment access", "Welcome amenities"],
      },
    ],
    images: [
      "/images/accommodations/premium-1.jpg",
      "/images/accommodations/premium-2.jpg",
      "/images/accommodations/premium-3.jpg",
      "/images/accommodations/premium-4.jpg",
    ],
    thumbnail: "/images/accommodations/premium-thumb.jpg",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 85000,
    pricePerWeek: 500000,
    pricePerMonth: 1800000,
    rating: 4.9,
    reviewCount: 34,
  },
  {
    id: "standard-apartment",
    name: "Standard Apartment",
    slug: "standard-apartment",
    type: "standard",
    description: "Our comfortable standard apartment provides everything you need for a relaxing stay. Thoughtfully designed with modern amenities, it's the perfect base for your wellness journey.",
    shortDescription: "Comfortable apartment with all essential amenities for a relaxing stay.",
    amenities: [
      {
        category: "Bedroom",
        items: ["Queen-size bed", "Quality linens", "Curtains", "Closet space", "Safe"],
      },
      {
        category: "Bathroom",
        items: ["Shower", "Quality toiletries", "Towels", "Hair dryer"],
      },
      {
        category: "Kitchen",
        items: ["Kitchenette", "Coffee maker", "Microwave", "Mini fridge", "Basic utensils"],
      },
      {
        category: "Living",
        items: ["Living area", "Small dining table", "Comfortable seating"],
      },
      {
        category: "Entertainment",
        items: ["43\" Smart TV", "High-speed WiFi"],
      },
      {
        category: "Wellness",
        items: ["Discounted spa access", "Fitness center access"],
      },
    ],
    images: [
      "/images/accommodations/standard-1.jpg",
      "/images/accommodations/standard-2.jpg",
      "/images/accommodations/standard-3.jpg",
    ],
    thumbnail: "/images/accommodations/standard-thumb.jpg",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 55000,
    pricePerWeek: 330000,
    pricePerMonth: 1200000,
    rating: 4.7,
    reviewCount: 52,
  },
];

export function getAccommodationById(id: string): Accommodation | undefined {
  return accommodations.find((a) => a.id === id);
}

export function getAccommodationBySlug(slug: string): Accommodation | undefined {
  return accommodations.find((a) => a.slug === slug);
}
