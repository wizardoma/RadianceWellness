import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string | null;
  displayOrder: number;
  serviceCount: number;
}

export interface ServiceSummary {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  pricing: Record<number, number>;
  duration: number[];
  thumbnail: string | null;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
}

export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  category: { id: string; name: string; slug: string };
  shortDescription: string;
  description: string;
  pricing: Record<number, number>;
  duration: number[];
  images: string[];
  thumbnail: string | null;
  rating: number;
  reviewCount: number;
  benefits: string[];
  isPopular: boolean;
  preparation: string | null;
  whatToExpect: string | null;
  contraindications: string | null;
  bufferTime: number | null;
  maxCapacity: number | null;
  status: string;
  addOns: ServiceAddOn[];
  createdAt: string;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number | null;
}

export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface CategoryWithServices {
  category: ServiceCategory;
  services: ServiceSummary[];
}

export interface CreateServicePayload {
  name: string;
  categoryId: string;
  description: string;
  shortDescription?: string;
  pricing: Record<number, number>;
  duration: number[];
  benefits?: string[];
  images?: string[];
  thumbnail?: string;
  isPopular?: boolean;
  preparation?: string;
  whatToExpect?: string;
  addOnIds?: string[];
}

export interface UpdateServicePayload extends Partial<CreateServicePayload> {
  status?: string;
}

// ── Client ───────────────────────────────────────────────────────────────────

const client = ApiClient.getDefaultClient();

export const ServicesApiClient = {
  // ── Public endpoints ─────────────────────────────────────────────────────

  getServices(params?: {
    category?: string;
    page?: number;
    size?: number;
  }): Promise<PaginatedResponse<ServiceSummary>> {
    return client
      .get("/api/v1/services", { params })
      .then((res) => res.data);
  },

  getServiceBySlug(
    idOrSlug: string
  ): Promise<ResponseEntity<ServiceDetail>> {
    return ApiClient.handleRequest<ServiceDetail>(
      client.get(`/api/v1/services/${idOrSlug}`)
    );
  },

  searchServices(params: {
    q?: string;
    page?: number;
    size?: number;
  }): Promise<PaginatedResponse<ServiceSummary>> {
    return client
      .get("/api/v1/services/search", { params })
      .then((res) => res.data);
  },

  getCategories(): Promise<ResponseEntity<ServiceCategory[]>> {
    return ApiClient.handleRequest<ServiceCategory[]>(
      client.get("/api/v1/services/categories")
    );
  },

  getCategoryWithServices(
    slug: string
  ): Promise<ResponseEntity<CategoryWithServices>> {
    return ApiClient.handleRequest<CategoryWithServices>(
      client.get(`/api/v1/services/categories/${slug}`)
    );
  },

  getAddOns(): Promise<ResponseEntity<ServiceAddOn[]>> {
    return ApiClient.handleRequest<ServiceAddOn[]>(
      client.get("/api/v1/services/add-ons")
    );
  },

  // ── Admin endpoints ──────────────────────────────────────────────────────

  createService(
    data: CreateServicePayload
  ): Promise<ResponseEntity<ServiceDetail>> {
    return ApiClient.handleRequest<ServiceDetail>(
      client.post("/api/v1/admin/services", data)
    );
  },

  updateService(
    id: string,
    data: UpdateServicePayload
  ): Promise<ResponseEntity<ServiceDetail>> {
    return ApiClient.handleRequest<ServiceDetail>(
      client.put(`/api/v1/admin/services/${id}`, data)
    );
  },

  deleteService(id: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.delete(`/api/v1/admin/services/${id}`)
    );
  },

  createCategory(data: {
    name: string;
    description?: string;
    icon?: string;
    image?: string;
    displayOrder?: number;
  }): Promise<ResponseEntity<ServiceCategory>> {
    return ApiClient.handleRequest<ServiceCategory>(
      client.post("/api/v1/admin/categories", data)
    );
  },

  updateCategory(
    id: string,
    data: {
      name?: string;
      description?: string;
      icon?: string;
      image?: string;
      displayOrder?: number;
      status?: string;
    }
  ): Promise<ResponseEntity<ServiceCategory>> {
    return ApiClient.handleRequest<ServiceCategory>(
      client.put(`/api/v1/admin/categories/${id}`, data)
    );
  },

  deleteCategory(id: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.delete(`/api/v1/admin/categories/${id}`)
    );
  },

  createAddOn(data: {
    name: string;
    description?: string;
    price: number;
    duration?: number;
  }): Promise<ResponseEntity<ServiceAddOn>> {
    return ApiClient.handleRequest<ServiceAddOn>(
      client.post("/api/v1/admin/add-ons", data)
    );
  },

  updateAddOn(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      duration?: number;
      status?: string;
    }
  ): Promise<ResponseEntity<ServiceAddOn>> {
    return ApiClient.handleRequest<ServiceAddOn>(
      client.put(`/api/v1/admin/add-ons/${id}`, data)
    );
  },

  deleteAddOn(id: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.delete(`/api/v1/admin/add-ons/${id}`)
    );
  },
};
