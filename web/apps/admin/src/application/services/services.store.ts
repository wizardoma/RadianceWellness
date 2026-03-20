"use client";

import { create } from "zustand";
import {
  ServicesApiClient,
  type ServiceSummary,
  type ServiceCategory,
  type ServiceAddOn,
  type ServiceDetail,
  type CreateServicePayload,
  type UpdateServicePayload,
} from "@/infrastructure/api/services.client";

interface ServicesState {
  // Data
  services: ServiceSummary[];
  categories: ServiceCategory[];
  addOns: ServiceAddOn[];
  selectedService: ServiceDetail | null;

  // Pagination
  page: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;

  // Filters
  categoryFilter: string | null;
  searchQuery: string;

  // Loading states
  isLoading: boolean;
  isCategoriesLoading: boolean;
  isDetailLoading: boolean;
  isSaving: boolean;

  // Error
  error: string | null;

  // Actions — Fetch
  fetchServices: (params?: { category?: string; page?: number; size?: number }) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchAddOns: () => Promise<void>;
  fetchServiceDetail: (idOrSlug: string) => Promise<void>;
  searchServices: (query: string) => Promise<void>;

  // Actions — Mutate
  createService: (data: CreateServicePayload) => Promise<boolean>;
  updateService: (id: string, data: UpdateServicePayload) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;

  // Actions — Local state
  setCategoryFilter: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearSelectedService: () => void;
  clearError: () => void;
}

export const useServicesStore = create<ServicesState>((set, get) => ({
  // Initial state
  services: [],
  categories: [],
  addOns: [],
  selectedService: null,

  page: 0,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,

  categoryFilter: null,
  searchQuery: "",

  isLoading: false,
  isCategoriesLoading: false,
  isDetailLoading: false,
  isSaving: false,

  error: null,

  // ── Fetch services (paginated, with optional category filter) ────────────

  fetchServices: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const result = await ServicesApiClient.getServices({
        category: params?.category ?? get().categoryFilter ?? undefined,
        page: params?.page ?? 1,
        size: params?.size ?? 50,
      });

      set({
        services: result.data,
        page: result.page,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        hasNext: result.hasNext,
        isLoading: false,
      });
    } catch {
      set({ error: "Failed to fetch services", isLoading: false });
    }
  },

  // ── Fetch categories ─────────────────────────────────────────────────────

  fetchCategories: async () => {
    set({ isCategoriesLoading: true });
    try {
      const result = await ServicesApiClient.getCategories();
      if (!result.isError && result.data) {
        set({ categories: result.data, isCategoriesLoading: false });
      } else {
        set({ error: result.errorMessage, isCategoriesLoading: false });
      }
    } catch {
      set({ error: "Failed to fetch categories", isCategoriesLoading: false });
    }
  },

  // ── Fetch add-ons ────────────────────────────────────────────────────────

  fetchAddOns: async () => {
    try {
      const result = await ServicesApiClient.getAddOns();
      if (!result.isError && result.data) {
        set({ addOns: result.data });
      }
    } catch {
      // Silent fail — add-ons are supplementary
    }
  },

  // ── Fetch single service detail ──────────────────────────────────────────

  fetchServiceDetail: async (idOrSlug) => {
    set({ isDetailLoading: true, error: null });
    try {
      const result = await ServicesApiClient.getServiceBySlug(idOrSlug);
      if (!result.isError && result.data) {
        set({ selectedService: result.data, isDetailLoading: false });
      } else {
        set({ error: result.errorMessage, isDetailLoading: false });
      }
    } catch {
      set({ error: "Failed to fetch service", isDetailLoading: false });
    }
  },

  // ── Search services ──────────────────────────────────────────────────────

  searchServices: async (query) => {
    set({ isLoading: true, searchQuery: query, error: null });
    try {
      const result = await ServicesApiClient.searchServices({
        q: query,
        size: 50,
      });

      set({
        services: result.data,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        hasNext: result.hasNext,
        isLoading: false,
      });
    } catch {
      set({ error: "Search failed", isLoading: false });
    }
  },

  // ── Create service ───────────────────────────────────────────────────────

  createService: async (data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await ServicesApiClient.createService(data);
      if (!result.isError) {
        // Refresh the list
        await get().fetchServices();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to create service", isSaving: false });
      return false;
    }
  },

  // ── Update service ───────────────────────────────────────────────────────

  updateService: async (id, data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await ServicesApiClient.updateService(id, data);
      if (!result.isError) {
        await get().fetchServices();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to update service", isSaving: false });
      return false;
    }
  },

  // ── Delete service ───────────────────────────────────────────────────────

  deleteService: async (id) => {
    set({ isSaving: true, error: null });
    try {
      const result = await ServicesApiClient.deleteService(id);
      if (!result.isError) {
        // Remove from local state immediately
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
          totalElements: state.totalElements - 1,
          isSaving: false,
        }));
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to delete service", isSaving: false });
      return false;
    }
  },

  // ── Local state setters ──────────────────────────────────────────────────

  setCategoryFilter: (category) => {
    set({ categoryFilter: category });
    get().fetchServices({ category: category ?? undefined });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    if (query.trim()) {
      get().searchServices(query);
    } else {
      get().fetchServices();
    }
  },

  clearSelectedService: () => set({ selectedService: null }),
  clearError: () => set({ error: null }),
}));
