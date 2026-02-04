"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Sparkles,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  Clock,
  CheckSquare,
} from "lucide-react";
import { cn } from "@radiance/utils";
import { Button, Badge } from "@radiance/ui";

type UserRole = "admin" | "staff";

// Navigation items for Admin
const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Check-in", href: "/check-in", icon: CheckSquare, badge: "6" },
  { name: "Bookings", href: "/bookings", icon: Calendar, badge: "12" },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Services", href: "/services", icon: Sparkles },
  { name: "Staff", href: "/staff", icon: UserCog },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

// Navigation items for Staff (limited)
const staffNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Schedule", href: "/bookings", icon: Calendar, badge: "5" },
  { name: "Check-in", href: "/check-in", icon: CheckSquare },
  { name: "Customers", href: "/customers", icon: Users },
];

// Mock user data
const users = {
  admin: {
    name: "Dr. Amara Okonkwo",
    email: "amara@radiancewellness.com",
    role: "Administrator",
    avatar: null,
  },
  staff: {
    name: "Chidi Eze",
    email: "chidi@radiancewellness.com",
    role: "Senior Therapist",
    avatar: null,
  },
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("admin");

  useEffect(() => {
    // Get role from localStorage (set during login)
    const role = localStorage.getItem("userRole") as UserRole;
    if (role) {
      setUserRole(role);
    }
  }, []);

  const navigation = userRole === "admin" ? adminNavigation : staffNavigation;
  const user = users[userRole];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-md"
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
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-primary-900 text-white transition-transform lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-800">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">R</span>
              </div>
              <div>
                <span className="font-display text-lg font-semibold text-white block">
                  Radiance
                </span>
                <span className="text-xs text-primary-300">
                  {userRole === "admin" ? "Admin Portal" : "Staff Portal"}
                </span>
              </div>
            </Link>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-primary-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
                {userRole === "admin" ? (
                  <Shield className="h-5 w-5 text-primary-300" />
                ) : (
                  <Clock className="h-5 w-5 text-primary-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-primary-300 truncate">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-primary-200 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-primary-400")} />
                  {item.name}
                  {item.badge && (
                    <Badge className="ml-auto bg-accent-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Role indicator for admin */}
          {userRole === "admin" && (
            <div className="px-4 pb-2">
              <div className="bg-primary-800 rounded-lg p-3">
                <p className="text-xs text-primary-300 mb-1">Quick Stats</p>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-white">24</p>
                    <p className="text-xs text-primary-300">Today</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-accent-400">₦485K</p>
                    <p className="text-xs text-primary-300">Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Logout */}
          <div className="p-4 border-t border-primary-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary-200 hover:bg-white/5 hover:text-white transition-all w-full"
            >
              <LogOut className="h-5 w-5 text-primary-400" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
