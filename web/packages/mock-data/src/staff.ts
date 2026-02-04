import type { Staff } from "@radiance/types";

export const staff: Staff[] = [
  {
    id: "s1",
    name: "Michael Kalu",
    email: "michael.k@radiancewellness.com",
    phone: "+234 810 111 2222",
    avatar: "/images/staff/michael.jpg",
    role: "Senior Massage Therapist",
    department: "Massage & Therapy",
    services: ["swedish-massage", "deep-tissue-massage", "hot-stone-massage", "aromatherapy-massage"],
    bio: "Michael is a certified massage therapist with over 8 years of experience. He specializes in deep tissue and sports massage techniques.",
    isActive: true,
  },
  {
    id: "s2",
    name: "Sarah Thompson",
    email: "sarah.t@radiancewellness.com",
    phone: "+234 810 222 3333",
    avatar: "/images/staff/sarah.jpg",
    role: "Spa Therapist",
    department: "Massage & Therapy",
    services: ["swedish-massage", "couples-massage", "hammam-experience", "aromatherapy-massage"],
    bio: "Sarah brings a gentle, nurturing approach to her treatments. She is trained in traditional hammam techniques and couples massage.",
    isActive: true,
  },
  {
    id: "s3",
    name: "Ada Obi",
    email: "ada.o@radiancewellness.com",
    phone: "+234 810 333 4444",
    avatar: "/images/staff/ada.jpg",
    role: "Beauty Specialist",
    department: "Beauty & Grooming",
    services: ["signature-facial", "manicure-pedicure", "hair-styling"],
    bio: "Ada is a licensed esthetician with expertise in skincare and beauty treatments. She stays current with the latest techniques and products.",
    isActive: true,
  },
  {
    id: "s4",
    name: "Emeka Eze",
    email: "emeka.e@radiancewellness.com",
    phone: "+234 810 444 5555",
    avatar: "/images/staff/emeka.jpg",
    role: "Fitness Trainer",
    department: "Fitness",
    services: ["gym-access", "aerobics-class"],
    bio: "Emeka is a certified personal trainer passionate about helping clients achieve their fitness goals. He leads our popular aerobics classes.",
    isActive: true,
  },
  {
    id: "s5",
    name: "Chioma Nwosu",
    email: "chioma.n@radiancewellness.com",
    phone: "+234 810 555 6666",
    avatar: "/images/staff/chioma.jpg",
    role: "Thermal Specialist",
    department: "Thermal & Bathing",
    services: ["sauna-session", "steam-bath", "hammam-experience"],
    bio: "Chioma oversees our thermal facilities and ensures every guest has a perfect thermal bathing experience.",
    isActive: true,
  },
];

export function getStaffById(id: string): Staff | undefined {
  return staff.find((s) => s.id === id);
}

export function getStaffByDepartment(department: string): Staff[] {
  return staff.filter((s) => s.department === department);
}

export function getStaffByService(serviceId: string): Staff[] {
  return staff.filter((s) => s.services.includes(serviceId));
}

export function getActiveStaff(): Staff[] {
  return staff.filter((s) => s.isActive);
}
