"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Calendar, User } from "lucide-react";
import { cn } from "@radiance/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Sparkles, label: "Services", href: "/services" },
  { icon: Calendar, label: "Bookings", href: "/bookings" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border pb-6 pt-2 px-4 z-40">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors",
                isActive ? "text-primary-600" : "text-gray-400"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary-100")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
