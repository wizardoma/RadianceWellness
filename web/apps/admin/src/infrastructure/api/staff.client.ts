import ApiClient from "./config/axios.instance";
import { ResponseEntity, type Pagination } from "./config/response.types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string | null;
  position: string | null;
  department: string | null;
  role: string;
  status: string;
  avatar: string | null;
  startDate: string | null;
  displayOnWebsite: boolean;
  customerCanRequest: boolean;
  rating: number;
  totalBookings: number;
  hasLoginAccount: boolean;
  createdAt: string;
}

export interface PaginatedStaffResponse {
  status: boolean;
  message: string;
  data: StaffMember[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CreateStaffPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio?: string;
  position?: string;
  department?: string;
  role: string;
  avatar?: string;
  startDate?: string;
  displayOnWebsite?: boolean;
  customerCanRequest?: boolean;
  createLoginAccount?: boolean;
  password?: string;
}

export interface UpdateStaffPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  position?: string;
  department?: string;
  role?: string;
  status?: string;
  avatar?: string;
  startDate?: string;
  displayOnWebsite?: boolean;
  customerCanRequest?: boolean;
}

// ── Friendly role labels ─────────────────────────────────────────────────────

export const STAFF_ROLES: { value: string; label: string }[] = [
  { value: "THERAPIST", label: "Therapist" },
  { value: "SENIOR_THERAPIST", label: "Senior Therapist" },
  { value: "BEAUTY_SPECIALIST", label: "Beauty Specialist" },
  { value: "NAIL_TECHNICIAN", label: "Nail Technician" },
  { value: "FITNESS_TRAINER", label: "Fitness Trainer" },
  { value: "RECEPTIONIST", label: "Receptionist" },
  { value: "SALON_STYLIST", label: "Salon Stylist" },
];

export const STAFF_STATUS: { value: string; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "ON_LEAVE", label: "On Leave" },
  { value: "INACTIVE", label: "Inactive" },
];

export function getStaffRoleLabel(role: string): string {
  return STAFF_ROLES.find((r) => r.value === role)?.label ?? role;
}

export function getStaffStatusLabel(status: string): string {
  return STAFF_STATUS.find((s) => s.value === status)?.label ?? status;
}

// ── Client ───────────────────────────────────────────────────────────────────

const client = ApiClient.getDefaultClient();

export const StaffApiClient = {
  getStaffList(params?: {
    status?: string;
    page?: number;
    size?: number;
  }): Promise<PaginatedStaffResponse> {
    return client
      .get("/api/v1/admin/staff", { params })
      .then((res) => res.data);
  },

  getStaffById(id: string): Promise<ResponseEntity<StaffMember>> {
    return ApiClient.handleRequest<StaffMember>(
      client.get(`/api/v1/admin/staff/${id}`)
    );
  },

  createStaff(data: CreateStaffPayload): Promise<ResponseEntity<StaffMember>> {
    return ApiClient.handleRequest<StaffMember>(
      client.post("/api/v1/admin/staff", data)
    );
  },

  updateStaff(
    id: string,
    data: UpdateStaffPayload
  ): Promise<ResponseEntity<StaffMember>> {
    return ApiClient.handleRequest<StaffMember>(
      client.put(`/api/v1/admin/staff/${id}`, data)
    );
  },

  deleteStaff(id: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.delete(`/api/v1/admin/staff/${id}`)
    );
  },
};
