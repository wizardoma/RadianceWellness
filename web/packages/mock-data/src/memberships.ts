import type { MembershipPlan } from "@radiance/types";

export const membershipPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Basic",
    slug: "basic",
    description: "Perfect for those starting their wellness journey. Get gym access and essential benefits.",
    monthlyPrice: 50000,
    annualPrice: 500000,
    annualSavings: 100000,
    features: [
      { name: "Gym Access", included: true, detail: "Unlimited access during operating hours" },
      { name: "Aerobics Classes", included: true, detail: "4 classes per month" },
      { name: "Spa Discount", included: true, detail: "10% off all spa services" },
      { name: "Priority Booking", included: false },
      { name: "Guest Passes", included: false },
      { name: "Complimentary Services", included: false },
      { name: "Locker Rental", included: true, detail: "Shared locker included" },
      { name: "Towel Service", included: true },
    ],
    color: "gray",
  },
  {
    id: "premium",
    name: "Premium",
    slug: "premium",
    description: "Our most popular plan. Enjoy unlimited classes, bigger discounts, and priority booking.",
    monthlyPrice: 100000,
    annualPrice: 1000000,
    annualSavings: 200000,
    features: [
      { name: "Gym Access", included: true, detail: "Unlimited access during operating hours" },
      { name: "Aerobics Classes", included: true, detail: "Unlimited classes" },
      { name: "Spa Discount", included: true, detail: "15% off all spa services" },
      { name: "Priority Booking", included: true, detail: "Book 48 hours before non-members" },
      { name: "Guest Passes", included: true, detail: "2 passes per month" },
      { name: "Complimentary Services", included: false },
      { name: "Locker Rental", included: true, detail: "Personal locker included" },
      { name: "Towel Service", included: true },
    ],
    isPopular: true,
    color: "primary",
  },
  {
    id: "vip",
    name: "VIP",
    slug: "vip",
    description: "The ultimate wellness membership. Enjoy all benefits plus complimentary monthly treatments.",
    monthlyPrice: 200000,
    annualPrice: 2000000,
    annualSavings: 400000,
    features: [
      { name: "Gym Access", included: true, detail: "24/7 access with exclusive VIP hours" },
      { name: "Aerobics Classes", included: true, detail: "Unlimited classes + private sessions" },
      { name: "Spa Discount", included: true, detail: "20% off all spa services" },
      { name: "Priority Booking", included: true, detail: "Book 72 hours before non-members" },
      { name: "Guest Passes", included: true, detail: "5 passes per month" },
      { name: "Complimentary Services", included: true, detail: "1 massage per month" },
      { name: "Locker Rental", included: true, detail: "Premium personal locker" },
      { name: "Towel Service", included: true },
    ],
    color: "accent",
  },
];

export function getMembershipById(id: string): MembershipPlan | undefined {
  return membershipPlans.find((m) => m.id === id);
}

export function getPopularMembership(): MembershipPlan | undefined {
  return membershipPlans.find((m) => m.isPopular);
}
