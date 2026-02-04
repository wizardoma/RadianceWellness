export interface ServiceCategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
}

export const serviceCategories: ServiceCategoryData[] = [
  {
    id: "thermal-bathing",
    name: "Thermal & Bathing",
    description: "Rejuvenate your body with our premium thermal experiences including sauna, hammam, and steam bath.",
    icon: "Flame",
    image: "/images/categories/thermal.jpg",
    slug: "thermal-bathing",
  },
  {
    id: "massage-therapy",
    name: "Massage & Therapy",
    description: "Expert massage treatments designed to relieve stress, ease tension, and restore balance.",
    icon: "Hand",
    image: "/images/categories/massage.jpg",
    slug: "massage-therapy",
  },
  {
    id: "beauty-grooming",
    name: "Beauty & Grooming",
    description: "Full-service salon offering professional hair, skin, and beauty treatments.",
    icon: "Sparkles",
    image: "/images/categories/beauty.jpg",
    slug: "beauty-grooming",
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "State-of-the-art gym facilities and group fitness classes for all levels.",
    icon: "Dumbbell",
    image: "/images/categories/fitness.jpg",
    slug: "fitness",
  },
];

export function getCategoryById(id: string): ServiceCategoryData | undefined {
  return serviceCategories.find((cat) => cat.id === id);
}

export function getCategoryBySlug(slug: string): ServiceCategoryData | undefined {
  return serviceCategories.find((cat) => cat.slug === slug);
}
