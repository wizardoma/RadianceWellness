import type { Testimonial } from "@radiance/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Adaeze Okonkwo",
    role: "Marketing Executive",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    comment: "Radiance Wellness has become my sanctuary. The Swedish massage was absolutely divine, and the atmosphere is so calming. I leave feeling completely renewed every time.",
    service: "Swedish Massage",
    date: "2026-01-15",
  },
  {
    id: "2",
    name: "Chukwuemeka Adeleke",
    role: "Business Owner",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 5,
    comment: "As someone who works long hours, the deep tissue massage here is exactly what I need. The therapists are highly skilled and really understand how to target problem areas.",
    service: "Deep Tissue Massage",
    date: "2026-01-20",
  },
  {
    id: "3",
    name: "Folake Adeyemi",
    role: "Interior Designer",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    comment: "My husband and I had the couples retreat package for our anniversary. It was absolutely magical! The private suite, the champagne, everything was perfect.",
    service: "Couples Retreat",
    date: "2026-01-10",
  },
  {
    id: "4",
    name: "Olumide Johnson",
    role: "Software Engineer",
    avatar: "/images/avatars/avatar-4.jpg",
    rating: 4,
    comment: "The gym facilities are top-notch and always clean. I appreciate that it's never too crowded and the equipment is well-maintained. Great value with the membership.",
    service: "Gym Access",
    date: "2026-01-22",
  },
  {
    id: "5",
    name: "Ngozi Eze",
    role: "Doctor",
    avatar: "/images/avatars/avatar-5.jpg",
    rating: 5,
    comment: "The hammam experience transported me to another world. The attention to detail and the traditional techniques used were impressive. A must-try!",
    service: "Hammam Experience",
    date: "2026-01-18",
  },
  {
    id: "6",
    name: "Tunde Bakare",
    role: "Entrepreneur",
    avatar: "/images/avatars/avatar-6.jpg",
    rating: 5,
    comment: "I've stayed at the premium apartment twice now. It's like a home away from home, but better! The complimentary spa access is the cherry on top.",
    service: "Premium Apartment",
    date: "2026-01-25",
  },
  {
    id: "7",
    name: "Amara Obi",
    role: "Fashion Designer",
    avatar: "/images/avatars/avatar-7.jpg",
    rating: 5,
    comment: "The signature facial left my skin glowing for days! The esthetician really took time to understand my skin concerns and customized the treatment perfectly.",
    service: "Signature Facial",
    date: "2026-01-12",
  },
  {
    id: "8",
    name: "Kemi Adebayo",
    role: "Lawyer",
    avatar: "/images/avatars/avatar-8.jpg",
    rating: 5,
    comment: "I gifted my mother the spa day package for her birthday. She couldn't stop talking about how wonderful the experience was. Thank you, Radiance!",
    service: "Full Spa Day",
    date: "2026-01-08",
  },
];

export function getTestimonials(limit?: number): Testimonial[] {
  if (limit) {
    return testimonials.slice(0, limit);
  }
  return testimonials;
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.rating === 5).slice(0, 3);
}
