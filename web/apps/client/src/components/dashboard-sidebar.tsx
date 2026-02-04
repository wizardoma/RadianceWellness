"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  CalendarPlus,
  User,
  CreditCard,
  Gift,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@radiance/utils";
import { Button } from "@radiance/ui";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Bookings", href: "/bookings", icon: Calendar },
  { name: "Book a Service", href: "/book", icon: CalendarPlus },
  { name: "Memberships", href: "/memberships", icon: CreditCard },
  { name: "Gift Cards", href: "/gift-cards", icon: Gift },
  { name: "My Profile", href: "/profile", icon: User },
];

// Mock user data
const user = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: null,
  memberSince: "2024",
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-border transition-transform lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">R</span>
              </div>
              <span className="font-display text-xl font-semibold text-primary-700">
                Radiance
              </span>
            </Link>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 font-medium">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary-600" : "text-gray-400")} />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Book CTA */}
          <div className="p-4 border-t border-border">
            <Link href="/book">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 text-white">
                <p className="font-medium mb-1">Ready for relaxation?</p>
                <p className="text-sm text-primary-100 mb-3">Book your next wellness experience</p>
                <Button size="sm" variant="secondary" className="w-full bg-white text-primary-600 hover:bg-primary-50">
                  Book Now
                </Button>
              </div>
            </Link>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              <LogOut className="h-5 w-5 text-gray-400" />
              Sign out
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
