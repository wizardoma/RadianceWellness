// Service Types
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategoryType;
  description: string;
  shortDescription: string;
  benefits: string[];
  duration: number[]; // in minutes, e.g., [30, 60, 90]
  price: Record<number, number>; // duration -> price mapping
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  addOns: string[];
  isPopular?: boolean;
  isNew?: boolean;
  preparation?: string;
  whatToExpect?: string;
}

export type ServiceCategoryType =
  | "thermal-bathing"
  | "massage-therapy"
  | "beauty-grooming"
  | "fitness";

export interface ServiceCategory {
  id: ServiceCategoryType;
  name: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: number; // additional minutes
}

// Package Types
export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  services: PackageService[];
  originalPrice: number;
  price: number;
  savings: number;
  savingsPercentage: number;
  image: string;
  duration: number; // total duration in minutes
  isPopular?: boolean;
  validFor?: string; // e.g., "Couples", "Individual"
}

export interface PackageService {
  serviceId: string;
  serviceName: string;
  duration: number;
}

// Membership Types
export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  annualSavings: number;
  features: MembershipFeature[];
  isPopular?: boolean;
  color?: string;
}

export interface MembershipFeature {
  name: string;
  included: boolean;
  detail?: string;
}

// Accommodation Types
export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: "premium" | "standard";
  description: string;
  shortDescription: string;
  amenities: AccommodationAmenity[];
  images: string[];
  thumbnail: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth?: number;
  rating: number;
  reviewCount: number;
}

export interface AccommodationAmenity {
  category: string;
  items: string[];
}

// Booking Types
export interface Booking {
  id: string;
  reference: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: "service" | "accommodation" | "package";
  items: BookingItem[];
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  notes?: string;
  staffId?: string;
  staffName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingItem {
  type: "service" | "addon" | "package";
  id: string;
  name: string;
  duration: number;
  price: number;
  quantity: number;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked-in"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show";

export type PaymentStatus = "pending" | "paid" | "partial" | "refunded" | "failed";

// Customer Types
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  membershipId?: string;
  membershipPlan?: string;
  membershipStatus?: "active" | "paused" | "expired" | "cancelled";
  totalBookings: number;
  totalSpent: number;
  lastVisit?: string;
  createdAt: string;
  tags?: string[];
  notes?: string;
  preferences?: CustomerPreferences;
}

export interface CustomerPreferences {
  preferredStaff?: string[];
  preferredTimes?: string[];
  favoriteServices?: string[];
  communicationPreferences?: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
}

// Review Types
export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  serviceId?: string;
  serviceName?: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  isVerified: boolean;
  helpful?: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  comment: string;
  service?: string;
  date: string;
}

// Gift Card Types
export interface GiftCard {
  id: string;
  code: string;
  type: "fixed" | "custom";
  amount: number;
  balance: number;
  purchaserName: string;
  purchaserEmail: string;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  status: "active" | "used" | "expired";
  purchaseDate: string;
  expiryDate: string;
}

// Staff Types
export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  department: string;
  services: string[];
  bio?: string;
  isActive: boolean;
}

// Time Slot Types
export interface TimeSlot {
  time: string;
  available: boolean;
  staffId?: string;
}

// Dashboard Stats
export interface DashboardStats {
  todayBookings: number;
  todayRevenue: number;
  pendingConfirmations: number;
  occupancyRate: number;
  newCustomersThisWeek: number;
  revenueChange: number;
  bookingsChange: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  serviceId: string;
  duration: number;
  date: string;
  time: string;
  addOns: string[];
  notes?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
}
