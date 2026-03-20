"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/application/user/user.store";

/**
 * Redirects to /login if no access token found.
 * Fetches user profile on mount if authenticated.
 * Returns true once auth check is complete and user is authenticated.
 */
export function useRequireAuth(): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const fetchProfile = useUserStore((s) => s.fetchProfile);
  const profile = useUserStore((s) => s.profile);

  useEffect(() => {
    const token = localStorage.getItem("radiance_access_token");
    if (!token) {
      router.replace("/login");
    } else {
      // Fetch profile on every mount (page refresh, navigation)
      if (!profile) {
        fetchProfile();
      }
      setReady(true);
    }
  }, [router, fetchProfile, profile]);

  return ready;
}

/**
 * Redirects to /dashboard if user is already logged in.
 * Returns true once auth check is complete.
 */
export function useRedirectIfAuthenticated(): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("radiance_access_token");
    if (token) {
      router.replace("/dashboard");
    } else {
      setReady(true);
    }
  }, [router]);

  return ready;
}
