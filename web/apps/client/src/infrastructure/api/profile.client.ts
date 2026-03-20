import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  status: string;
  registrationSource: string | null;
  emailVerified: boolean;
  emailOptIn: boolean;
  smsOptIn: boolean;
  whatsappOptIn: boolean;
  tags: string[] | null;
  createdAt: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  whatsappOptIn?: boolean;
}

const client = ApiClient.getDefaultClient();

export const ProfileApiClient = {
  getProfile(): Promise<ResponseEntity<CustomerProfile>> {
    return ApiClient.handleRequest<CustomerProfile>(
      client.get("/api/v1/customer/profile")
    );
  },

  updateProfile(data: UpdateProfilePayload): Promise<ResponseEntity<CustomerProfile>> {
    return ApiClient.handleRequest<CustomerProfile>(
      client.put("/api/v1/customer/profile", data)
    );
  },
};
