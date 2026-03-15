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
    id: "spa",
    name: "Spa",
    description:
      "Indulge in premium spa experiences including body scrubs, hammam baths, facials, massages, and steam & sauna sessions.",
    icon: "Sparkles",
    image: "/images/categories/spa.jpg",
    slug: "spa",
  },
  {
    id: "treatments",
    name: "Treatments",
    description:
      "Advanced wellness and aesthetic treatments including IV therapy, acupuncture, hair transplant, and specialized skin therapies.",
    icon: "Stethoscope",
    image: "/images/categories/treatments.jpg",
    slug: "treatments",
  },
  {
    id: "gym",
    name: "Gym",
    description:
      "State-of-the-art gym facilities, group fitness classes, water therapy, and specialized workout programs for all levels.",
    icon: "Dumbbell",
    image: "/images/categories/gym.jpg",
    slug: "gym",
  },
  {
    id: "salon",
    name: "Salon",
    description:
      "Full-service salon offering professional hair styling, braids, nail care, eyebrow treatments, and grooming services for men and women.",
    icon: "Scissors",
    image: "/images/categories/salon.jpg",
    slug: "salon",
  },
];

export function getCategoryById(id: string): ServiceCategoryData | undefined {
  return serviceCategories.find((cat) => cat.id === id);
}

export function getCategoryBySlug(slug: string): ServiceCategoryData | undefined {
  return serviceCategories.find((cat) => cat.slug === slug);
}
