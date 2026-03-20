"use client";

import { create } from "zustand";
import { ProfileApiClient, type CustomerProfile, type UpdateProfilePayload } from "@/infrastructure/api/profile.client";
import { useAuthStore } from "@/application/auth/auth.store";

interface UserState {
  profile: CustomerProfile | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<{ success: boolean; error?: string }>;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  isSaving: false,
  error: null,

  fetchProfile: async () => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("radiance_access_token")
      : null;

    if (!token) {
      set({ profile: null, isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const result = await ProfileApiClient.getProfile();

      if (result.isError) {
        set({ error: result.errorMessage, isLoading: false });

        // If 401, auth is invalid — clear everything
        if (result.statusCode === 401) {
          useAuthStore.getState().clearAuth();
        }
        return;
      }

      set({ profile: result.data, isLoading: false });
    } catch {
      set({ error: "Failed to fetch profile", isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isSaving: true, error: null });
    try {
      const result = await ProfileApiClient.updateProfile(data);
      if (result.isError) {
        set({ isSaving: false });
        return { success: false, error: result.errorMessage ?? "Failed to update profile" };
      }
      set({ profile: result.data, isSaving: false });
      return { success: true };
    } catch {
      set({ isSaving: false });
      return { success: false, error: "Failed to update profile" };
    }
  },

  clearProfile: () => {
    set({ profile: null, isLoading: false, isSaving: false, error: null });
  },
}));
