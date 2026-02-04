import type { AddOn } from "@radiance/types";

export const addOns: AddOn[] = [
  {
    id: "aromatherapy",
    name: "Aromatherapy Enhancement",
    description: "Add therapeutic essential oils to enhance your experience",
    price: 5000,
  },
  {
    id: "hot-stones",
    name: "Hot Stone Add-On",
    description: "Include heated basalt stones for deeper muscle relaxation",
    price: 8000,
    duration: 15,
  },
  {
    id: "scalp-massage",
    name: "Scalp Massage",
    description: "Relaxing scalp massage to relieve tension",
    price: 5000,
    duration: 10,
  },
  {
    id: "cold-plunge",
    name: "Cold Plunge",
    description: "Invigorating cold water immersion after heat treatment",
    price: 3000,
  },
  {
    id: "body-mask",
    name: "Detox Body Mask",
    description: "Mineral-rich body mask for deep detoxification",
    price: 10000,
    duration: 20,
  },
  {
    id: "cupping",
    name: "Cupping Therapy",
    description: "Traditional cupping to release muscle tension",
    price: 8000,
    duration: 15,
  },
  {
    id: "champagne",
    name: "Champagne & Fruits",
    description: "Glass of champagne with fresh fruit platter",
    price: 15000,
  },
  {
    id: "eye-treatment",
    name: "Eye Treatment",
    description: "Targeted treatment for the delicate eye area",
    price: 8000,
    duration: 15,
  },
  {
    id: "lip-treatment",
    name: "Lip Treatment",
    description: "Hydrating and plumping lip treatment",
    price: 5000,
  },
  {
    id: "gel-polish",
    name: "Gel Polish Upgrade",
    description: "Long-lasting gel polish instead of regular polish",
    price: 5000,
  },
  {
    id: "nail-art",
    name: "Nail Art",
    description: "Custom nail art design",
    price: 3000,
  },
  {
    id: "paraffin-treatment",
    name: "Paraffin Treatment",
    description: "Warm paraffin wax treatment for extra soft skin",
    price: 5000,
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning",
    description: "Intensive hair conditioning treatment",
    price: 5000,
    duration: 15,
  },
  {
    id: "scalp-treatment",
    name: "Scalp Treatment",
    description: "Nourishing scalp treatment for healthy hair",
    price: 5000,
    duration: 10,
  },
  {
    id: "personal-training",
    name: "Personal Training Session",
    description: "One-on-one session with a certified trainer",
    price: 15000,
    duration: 60,
  },
];

export function getAddOnById(id: string): AddOn | undefined {
  return addOns.find((a) => a.id === id);
}

export function getAddOnsByIds(ids: string[]): AddOn[] {
  return addOns.filter((a) => ids.includes(a.id));
}
