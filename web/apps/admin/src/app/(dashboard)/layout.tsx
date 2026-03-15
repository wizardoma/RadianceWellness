"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";

const staffAllowedPaths = ["/dashboard", "/bookings", "/check-in", "/customers", "/my-profile"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "staff") {
      const allowed = staffAllowedPaths.some(path => pathname === path || pathname.startsWith(path + "/"));
      if (!allowed) {
        router.replace("/dashboard");
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    }
  }, [pathname, router]);

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
