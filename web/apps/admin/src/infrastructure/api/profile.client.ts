import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

export interface AdminProfile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string | null;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

const client = ApiClient.getDefaultClient();

export const ProfileApiClient = {
  getProfile(): Promise<ResponseEntity<AdminProfile>> {
    return ApiClient.handleRequest<AdminProfile>(
      client.get("/api/v1/admin/profile")
    );
  },
};
