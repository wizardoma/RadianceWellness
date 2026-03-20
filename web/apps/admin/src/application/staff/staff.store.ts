"use client";

import { create } from "zustand";
import {
  StaffApiClient,
  type StaffMember,
  type CreateStaffPayload,
  type UpdateStaffPayload,
} from "@/infrastructure/api/staff.client";

interface StaffState {
  // Data
  staff: StaffMember[];
  selectedStaff: StaffMember | null;

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
  fetchStaff: (params?: { status?: string; page?: number; size?: number }) => Promise<void>;
  fetchStaffById: (id: string) => Promise<void>;
  createStaff: (data: CreateStaffPayload) => Promise<boolean>;
  updateStaff: (id: string, data: UpdateStaffPayload) => Promise<boolean>;
  deleteStaff: (id: string) => Promise<boolean>;
  setSelectedStaff: (staff: StaffMember | null) => void;
  clearError: () => void;
}

export const useStaffStore = create<StaffState>((set, get) => ({
  staff: [],
  selectedStaff: null,

  page: 1,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,

  isLoading: false,
  isSaving: false,

  error: null,

  fetchStaff: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const result = await StaffApiClient.getStaffList({
        status: params?.status,
        page: params?.page ?? 1,
        size: params?.size ?? 50,
      });

      set({
        staff: result.data,
        page: result.page,
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        hasNext: result.hasNext,
        isLoading: false,
      });
    } catch {
      set({ error: "Failed to fetch staff", isLoading: false });
    }
  },

  fetchStaffById: async (id) => {
    try {
      const result = await StaffApiClient.getStaffById(id);
      if (!result.isError && result.data) {
        set({ selectedStaff: result.data });
      }
    } catch {
      // Silent
    }
  },

  createStaff: async (data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await StaffApiClient.createStaff(data);
      if (!result.isError) {
        await get().fetchStaff();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to create staff member", isSaving: false });
      return false;
    }
  },

  updateStaff: async (id, data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await StaffApiClient.updateStaff(id, data);
      if (!result.isError) {
        await get().fetchStaff();
        set({ isSaving: false });
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to update staff member", isSaving: false });
      return false;
    }
  },

  deleteStaff: async (id) => {
    set({ isSaving: true, error: null });
    try {
      const result = await StaffApiClient.deleteStaff(id);
      if (!result.isError) {
        set((state) => ({
          staff: state.staff.filter((s) => s.id !== id),
          totalElements: state.totalElements - 1,
          isSaving: false,
        }));
        return true;
      } else {
        set({ error: result.errorMessage, isSaving: false });
        return false;
      }
    } catch {
      set({ error: "Failed to delete staff member", isSaving: false });
      return false;
    }
  },

  setSelectedStaff: (staff) => set({ selectedStaff: staff }),
  clearError: () => set({ error: null }),
}));
