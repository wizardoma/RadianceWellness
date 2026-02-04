"use client";

import Link from "next/link";
import { 
  User, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Star,
  Gift,
  Settings,
  Shield,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Badge, Separator } from "@radiance/ui";

const user = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+234 812 345 6789",
  memberTier: "Gold",
  memberSince: "January 2024",
  points: 2450,
  totalVisits: 24,
};

const menuItems = [
  {
    section: "Account",
    items: [
      { icon: User, label: "Personal Information", href: "/profile/edit" },
      { icon: CreditCard, label: "Payment Methods", href: "/profile/payments" },
      { icon: Bell, label: "Notifications", href: "/profile/notifications" },
      { icon: Shield, label: "Privacy & Security", href: "/profile/security" },
    ],
  },
  {
    section: "Membership",
    items: [
      { icon: Star, label: "Membership Benefits", href: "/membership" },
      { icon: Gift, label: "Gift Cards", href: "/gift-cards" },
      { icon: Heart, label: "Favorites", href: "/favorites" },
    ],
  },
  {
    section: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", href: "/help" },
      { icon: MessageCircle, label: "Contact Us", href: "/contact" },
      { icon: Settings, label: "App Settings", href: "/settings" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6 px-4 pt-4">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
          <span className="text-2xl font-bold text-primary-700">SJ</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mt-3">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge className="bg-amber-100 text-amber-700">{user.memberTier} Member</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-primary-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-primary-700">{user.points}</p>
          <p className="text-xs text-gray-500">Points</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-green-700">{user.totalVisits}</p>
          <p className="text-xs text-gray-500">Visits</p>
        </div>
        <div className="bg-accent-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-accent-700">15%</p>
          <p className="text-xs text-gray-500">Discount</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {section.section}
            </h3>
            <div className="bg-white rounded-xl border border-border overflow-hidden divide-y">
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium">
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>

      {/* Version */}
      <p className="text-center text-xs text-gray-400 pb-4">
        Radiance Wellness v1.0.0
      </p>
    </div>
  );
}
