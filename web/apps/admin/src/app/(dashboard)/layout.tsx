"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useRequireAuth } from "@/application/hooks/useAuthGuard";
import { useUserStore } from "@/application/user/user.store";

const staffAllowedPaths = ["/dashboard", "/bookings", "/check-in", "/customers", "/my-profile"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const ready = useRequireAuth();
  const profile = useUserStore((s) => s.profile);
  const [isAllowed, setIsAllowed] = useState(true);

  const userRole = profile?.role?.toLowerCase();

  useEffect(() => {
    if (!ready) return;
    if (userRole === "staff" || userRole === "receptionist") {
      const allowed = staffAllowedPaths.some(path => pathname === path || pathname.startsWith(path + "/"));
      if (!allowed) {
        router.replace("/dashboard");
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    }
  }, [pathname, router, ready, userRole]);

  if (!ready) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {isAllowed ? children : null}
        </div>
      </main>
    </div>
  );
}
