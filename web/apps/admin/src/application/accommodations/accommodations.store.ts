"use client";

import { create } from "zustand";
import {
  AccommodationsApiClient,
  type Accommodation,
  type CreateAccommodationPayload,
  type UpdateAccommodationPayload,
} from "@/infrastructure/api/accommodations.client";

interface AccommodationsState {
  accommodations: Accommodation[];
  selectedAccommodation: Accommodation | null;

  page: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;

  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  fetchAccommodations: (params?: { status?: string; page?: number; size?: number }) => Promise<void>;
  fetchAccommodationById: (id: string) => Promise<void>;
  createAccommodation: (data: CreateAccommodationPayload) => Promise<boolean>;
  updateAccommodation: (id: string, data: UpdateAccommodationPayload) => Promise<boolean>;
  deleteAccommodation: (id: string) => Promise<boolean>;
  setSelectedAccommodation: (accommodation: Accommodation | null) => void;
  clearError: () => void;
}

export const useAccommodationsStore = create<AccommodationsState>((set, get) => ({
  accommodations: [],
  selectedAccommodation: null,

  page: 1,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,

  isLoading: false,
  isSaving: false,
  error: null,

  fetchAccommodations: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const result = await AccommodationsApiClient.getAccommodations({
        status: params?.status,
        page: params?.page ?? 1,
        size: params?.size ?? 50,
      });

      set({
        accommodations: result.data,
        page: result.page,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        hasNext: result.hasNext,
        isLoading: false,
      });
    } catch {
      set({ error: "Failed to fetch accommodations", isLoading: false });
    }
  },

  fetchAccommodationById: async (id) => {
    try {
      const result = await AccommodationsApiClient.getAccommodationById(id);
      if (!result.isError && result.data) {
        set({ selectedAccommodation: result.data });
      }
    } catch {
      // Silent
    }
  },

  createAccommodation: async (data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await AccommodationsApiClient.createAccommodation(data);
      if (!result.isError) {
        await get().fetchAccommodations();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to create accommodation", isSaving: false });
      return false;
    }
  },

  updateAccommodation: async (id, data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await AccommodationsApiClient.updateAccommodation(id, data);
      if (!result.isError) {
        await get().fetchAccommodations();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to update accommodation", isSaving: false });
      return false;
    }
  },

  deleteAccommodation: async (id) => {
    set({ isSaving: true, error: null });
    try {
      const result = await AccommodationsApiClient.deleteAccommodation(id);
      if (!result.isError) {
        set((state) => ({
          accommodations: state.accommodations.filter((a) => a.id !== id),
          totalElements: state.totalElements - 1,
          isSaving: false,
        }));
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to delete accommodation", isSaving: false });
      return false;
    }
  },

  setSelectedAccommodation: (accommodation) => set({ selectedAccommodation: accommodation }),
  clearError: () => set({ error: null }),
}));
