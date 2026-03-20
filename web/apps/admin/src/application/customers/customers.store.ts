"use client";

import { create } from "zustand";
import {
  CustomersApiClient,
  type Customer,
  type CreateCustomerPayload,
  type UpdateCustomerPayload,
} from "@/infrastructure/api/customers.client";

interface CustomersState {
  // Data
  customers: Customer[];
  selectedCustomer: Customer | null;

  // Pagination
  page: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;

  // Loading
  isLoading: boolean;
  isSaving: boolean;

  // Error
  error: string | null;

  // Actions
  fetchCustomers: (params?: {
    status?: string;
    search?: string;
    page?: number;
    size?: number;
  }) => Promise<void>;
  fetchCustomerById: (id: string) => Promise<void>;
  createCustomer: (data: CreateCustomerPayload) => Promise<boolean>;
  updateCustomer: (id: string, data: UpdateCustomerPayload) => Promise<boolean>;
  deleteCustomer: (id: string) => Promise<boolean>;
  setSelectedCustomer: (customer: Customer | null) => void;
  clearError: () => void;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
  customers: [],
  selectedCustomer: null,

  page: 1,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,

  isLoading: false,
  isSaving: false,

  error: null,

  fetchCustomers: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const result = await CustomersApiClient.getCustomers({
        status: params?.status,
        search: params?.search,
        page: params?.page ?? 1,
        size: params?.size ?? 50,
      });

      set({
        customers: result.data,
        page: result.page,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        hasNext: result.hasNext,
        isLoading: false,
      });
    } catch {
      set({ error: "Failed to fetch customers", isLoading: false });
    }
  },

  fetchCustomerById: async (id) => {
    try {
      const result = await CustomersApiClient.getCustomerById(id);
      if (!result.isError && result.data) {
        set({ selectedCustomer: result.data });
      }
    } catch {
      // Silent
    }
  },

  createCustomer: async (data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await CustomersApiClient.createCustomer(data);
      if (!result.isError) {
        await get().fetchCustomers();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to create customer", isSaving: false });
      return false;
    }
  },

  updateCustomer: async (id, data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await CustomersApiClient.updateCustomer(id, data);
      if (!result.isError) {
        await get().fetchCustomers();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to update customer", isSaving: false });
      return false;
    }
  },

  deleteCustomer: async (id) => {
    set({ isSaving: true, error: null });
    try {
      const result = await CustomersApiClient.deleteCustomer(id);
      if (!result.isError) {
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
          totalElements: state.totalElements - 1,
          isSaving: false,
        }));
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to delete customer", isSaving: false });
      return false;
    }
  },

  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  clearError: () => set({ error: null }),
}));
