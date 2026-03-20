"use client";

import { create } from "zustand";
import type { AuthResponse } from "@/infrastructure/api/auth.client";

export interface AuthUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userType: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (response: AuthResponse) => void;
  clearAuth: () => void;
}

function loadPersistedState(): Partial<AuthState> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("radiance_access_token");
  const userStr = localStorage.getItem("radiance_user");
  if (token && userStr) {
    try {
      const refreshToken = localStorage.getItem("radiance_refresh_token");
      return {
        user: JSON.parse(userStr),
        accessToken: token,
        refreshToken,
        isAuthenticated: true,
      };
    } catch {
      return {};
    }
  }
  return {};
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  ...loadPersistedState(),

  setAuth: (response: AuthResponse) => {
    const user: AuthUser = {
      userId: response.userId,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.role,
      userType: response.userType,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("radiance_access_token", response.accessToken);
      localStorage.setItem("radiance_refresh_token", response.refreshToken);
      localStorage.setItem("radiance_user", JSON.stringify(user));
    }

    set({
      user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("radiance_access_token");
      localStorage.removeItem("radiance_refresh_token");
      localStorage.removeItem("radiance_user");
    }
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));
