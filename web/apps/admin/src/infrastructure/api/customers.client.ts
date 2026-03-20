import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Customer {
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
  notes: string | null;
  createdAt: string;
}

export interface PaginatedCustomerResponse {
  status: boolean;
  message: string;
  data: Customer[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CreateCustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  notes?: string;
  tags?: string[];
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  whatsappOptIn?: boolean;
}

export interface UpdateCustomerPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  status?: string;
  notes?: string;
  tags?: string[];
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  whatsappOptIn?: boolean;
}

// ── Friendly labels ─────────────────────────────────────────────────────────

export const CUSTOMER_STATUS: { value: string; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BLACKLISTED", label: "Blacklisted" },
];

export const REGISTRATION_SOURCES: { value: string; label: string }[] = [
  { value: "SELF_REGISTERED", label: "Self Registered" },
  { value: "WALK_IN", label: "Walk-in" },
  { value: "GOOGLE", label: "Google" },
  { value: "APPLE", label: "Apple" },
];

export function getCustomerStatusLabel(status: string): string {
  return CUSTOMER_STATUS.find((s) => s.value === status)?.label ?? status;
}

export function getRegistrationSourceLabel(source: string): string {
  return REGISTRATION_SOURCES.find((s) => s.value === source)?.label ?? source;
}

// ── Client ───────────────────────────────────────────────────────────────────

const client = ApiClient.getDefaultClient();

export const CustomersApiClient = {
  getCustomers(params?: {
    status?: string;
    search?: string;
    page?: number;
    size?: number;
  }): Promise<PaginatedCustomerResponse> {
    return client
      .get("/api/v1/admin/customers", { params })
      .then((res) => res.data);
  },

  getCustomerById(id: string): Promise<ResponseEntity<Customer>> {
    return ApiClient.handleRequest<Customer>(
      client.get(`/api/v1/admin/customers/${id}`)
    );
  },

  createCustomer(data: CreateCustomerPayload): Promise<ResponseEntity<Customer>> {
    return ApiClient.handleRequest<Customer>(
      client.post("/api/v1/admin/customers", data)
    );
  },

  updateCustomer(
    id: string,
    data: UpdateCustomerPayload
  ): Promise<ResponseEntity<Customer>> {
    return ApiClient.handleRequest<Customer>(
      client.put(`/api/v1/admin/customers/${id}`, data)
    );
  },

  deleteCustomer(id: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.delete(`/api/v1/admin/customers/${id}`)
    );
  },
};
