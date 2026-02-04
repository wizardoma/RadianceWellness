import type { Customer } from "@radiance/types";

export const customers: Customer[] = [
  {
    id: "c1",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+234 801 234 5678",
    avatar: "/images/avatars/customer-1.jpg",
    gender: "female",
    dateOfBirth: "1988-03-15",
    membershipId: "m1",
    membershipPlan: "Premium",
    membershipStatus: "active",
    totalBookings: 12,
    totalSpent: 425000,
    lastVisit: "2026-02-02",
    createdAt: "2025-01-15T10:00:00Z",
    tags: ["VIP", "Regular"],
    notes: "Prefers afternoon appointments. Sensitive to strong scents.",
    preferences: {
      preferredStaff: ["s1"],
      preferredTimes: ["afternoon"],
      favoriteServices: ["swedish-massage", "signature-facial"],
      communicationPreferences: {
        email: true,
        sms: true,
        whatsapp: true,
      },
    },
  },
  {
    id: "c2",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+234 802 345 6789",
    gender: "male",
    dateOfBirth: "1985-07-22",
    membershipId: "m2",
    membershipPlan: "Basic",
    membershipStatus: "active",
    totalBookings: 8,
    totalSpent: 280000,
    lastVisit: "2026-02-04",
    createdAt: "2025-03-20T14:30:00Z",
    tags: ["Regular"],
    preferences: {
      preferredTimes: ["morning"],
      favoriteServices: ["deep-tissue-massage", "gym-access"],
      communicationPreferences: {
        email: true,
        sms: false,
        whatsapp: true,
      },
    },
  },
  {
    id: "c3",
    firstName: "Amara",
    lastName: "Okonkwo",
    email: "amara.o@email.com",
    phone: "+234 803 456 7890",
    avatar: "/images/avatars/customer-3.jpg",
    gender: "female",
    totalBookings: 3,
    totalSpent: 95000,
    lastVisit: "2026-01-28",
    createdAt: "2025-11-05T09:15:00Z",
    tags: ["New"],
    preferences: {
      favoriteServices: ["couples-massage"],
      communicationPreferences: {
        email: true,
        sms: true,
        whatsapp: false,
      },
    },
  },
  {
    id: "c4",
    firstName: "Tunde",
    lastName: "Adeleke",
    email: "tunde.a@email.com",
    phone: "+234 804 567 8901",
    gender: "male",
    dateOfBirth: "1990-11-08",
    totalBookings: 5,
    totalSpent: 150000,
    lastVisit: "2026-01-30",
    createdAt: "2025-08-12T16:45:00Z",
    preferences: {
      preferredTimes: ["morning"],
      favoriteServices: ["signature-facial", "manicure-pedicure"],
      communicationPreferences: {
        email: true,
        sms: true,
        whatsapp: true,
      },
    },
  },
  {
    id: "c5",
    firstName: "Mary",
    lastName: "Kalu",
    email: "mary.k@email.com",
    phone: "+234 805 678 9012",
    avatar: "/images/avatars/customer-5.jpg",
    gender: "female",
    dateOfBirth: "1992-05-20",
    membershipId: "m3",
    membershipPlan: "VIP",
    membershipStatus: "active",
    totalBookings: 24,
    totalSpent: 850000,
    lastVisit: "2026-02-03",
    createdAt: "2024-06-01T11:00:00Z",
    tags: ["VIP", "Loyal"],
    notes: "Our most loyal customer. Always book the best therapist available.",
    preferences: {
      preferredStaff: ["s2", "s1"],
      preferredTimes: ["afternoon", "evening"],
      favoriteServices: ["hammam-experience", "hot-stone-massage"],
      communicationPreferences: {
        email: true,
        sms: true,
        whatsapp: true,
      },
    },
  },
];

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function getCustomerByEmail(email: string): Customer | undefined {
  return customers.find((c) => c.email === email);
}

export function getCustomersByTag(tag: string): Customer[] {
  return customers.filter((c) => c.tags?.includes(tag));
}

export function getTopCustomers(limit: number = 5): Customer[] {
  return [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, limit);
}

export function getRecentCustomers(limit: number = 5): Customer[] {
  return [...customers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
