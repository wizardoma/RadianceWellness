import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

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
  createdAt: string;
}

const client = ApiClient.getDefaultClient();

export const AccommodationsApiClient = {
  getAccommodations(): Promise<ResponseEntity<Accommodation[]>> {
    return ApiClient.handleRequest<Accommodation[]>(
      client.get("/api/v1/accommodations")
    );
  },

  getAccommodationBySlug(slug: string): Promise<ResponseEntity<Accommodation>> {
    return ApiClient.handleRequest<Accommodation>(
      client.get(`/api/v1/accommodations/${slug}`)
    );
  },
};
