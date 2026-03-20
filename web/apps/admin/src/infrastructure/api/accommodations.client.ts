import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  shortDescription: string;
  coverImage: string | null;
  images: string[] | null;
  thumbnail: string | null;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  size: number | null;
  pricePerNight: number;
  pricePerWeek: number | null;
  pricePerMonth: number | null;
  cleaningFee: number | null;
  securityDeposit: number | null;
  amenities: string[] | null;
  checkInTime: string;
  checkOutTime: string;
  minStay: number;
  maxStay: number | null;
  rating: number;
  reviewCount: number;
  status: string;
  airbnbSyncEnabled: boolean;
  airbnbIcalUrl: string | null;
  lastAirbnbSync: string | null;
  createdAt: string;
}

export interface PaginatedAccommodationResponse {
  status: boolean;
  message: string;
  data: Accommodation[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CreateAccommodationPayload {
  name: string;
  type: string;
  description: string;
  shortDescription: string;
  coverImage?: string;
  images?: string[];
  thumbnail?: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  pricePerNight: number;
  pricePerWeek?: number;
  pricePerMonth?: number;
  cleaningFee?: number;
  securityDeposit?: number;
  amenities?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  minStay?: number;
  maxStay?: number;
}

export interface UpdateAccommodationPayload {
  name?: string;
  type?: string;
  description?: string;
  shortDescription?: string;
  coverImage?: string;
  images?: string[];
  thumbnail?: string;
  capacity?: number;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  pricePerNight?: number;
  pricePerWeek?: number;
  pricePerMonth?: number;
  cleaningFee?: number;
  securityDeposit?: number;
  amenities?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  minStay?: number;
  maxStay?: number;
  status?: string;
  airbnbSyncEnabled?: boolean;
  airbnbIcalUrl?: string;
}

// ── Labels ───────────────────────────────────────────────────────────────────

export const ACCOMMODATION_TYPES: { value: string; label: string }[] = [
  { value: "PREMIUM", label: "Premium" },
  { value: "STANDARD", label: "Standard" },
];

export const ACCOMMODATION_STATUS: { value: string; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "DRAFT", label: "Draft" },
];

export const COMMON_AMENITIES = [
  "WiFi", "Air Conditioning", "Kitchen", "Washer", "Dryer", "TV",
  "Pool", "Hot Tub", "Parking", "Gym", "Balcony", "Ocean View",
  "Room Service", "Mini Bar", "Safe", "Iron", "Hair Dryer", "Towels",
];

// ── Client ───────────────────────────────────────────────────────────────────

const client = ApiClient.getDefaultClient();

export const AccommodationsApiClient = {
  getAccommodations(params?: {
    status?: string;
    page?: number;
    size?: number;
  }): Promise<PaginatedAccommodationResponse> {
    return client
      .get("/api/v1/admin/accommodations", { params })
      .then((res) => res.data);
  },

  getAccommodationById(id: string): Promise<ResponseEntity<Accommodation>> {
    return ApiClient.handleRequest<Accommodation>(
      client.get(`/api/v1/admin/accommodations/${id}`)
    );
  },

  createAccommodation(data: CreateAccommodationPayload): Promise<ResponseEntity<Accommodation>> {
    return ApiClient.handleRequest<Accommodation>(
      client.post("/api/v1/admin/accommodations", data)
    );
  },

  updateAccommodation(
    id: string,
    data: UpdateAccommodationPayload
  ): Promise<ResponseEntity<Accommodation>> {
    return ApiClient.handleRequest<Accommodation>(
      client.put(`/api/v1/admin/accommodations/${id}`, data)
    );
  },

  deleteAccommodation(id: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.delete(`/api/v1/admin/accommodations/${id}`)
    );
  },
};
