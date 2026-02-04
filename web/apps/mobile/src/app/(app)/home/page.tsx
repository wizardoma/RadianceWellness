"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Bell, 
  Search, 
  ChevronRight, 
  Clock, 
  MapPin,
  Star,
  Gift,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button, Badge } from "@radiance/ui";
import { services, serviceCategories } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

// Mock user data
const user = {
  name: "Sarah",
  memberTier: "Gold",
  points: 2450,
  upcomingBooking: {
    service: "Swedish Massage",
    date: "Today",
    time: "3:00 PM",
    therapist: "Chidi Eze",
  },
};

const quickActions = [
  { icon: Calendar, label: "Book Now", href: "/book", color: "bg-primary-500" },
  { icon: Gift, label: "Gift Cards", href: "/gift-cards", color: "bg-accent-500" },
  { icon: Star, label: "Rewards", href: "/rewards", color: "bg-purple-500" },
  { icon: Clock, label: "History", href: "/bookings", color: "bg-blue-500" },
];

export default function HomePage() {
  const popularServices = services.filter(s => s.isPopular).slice(0, 4);

  return (
    <div className="space-y-6 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Good afternoon,</p>
          <h1 className="text-xl font-bold text-gray-900">{user.name} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-full bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-700 font-semibold">S</span>
          </div>
        </div>
      </div>

      {/* Membership Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 text-white"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Star className="h-4 w-4" />
            </div>
            <span className="font-semibold">{user.memberTier} Member</span>
          </div>
          <Badge className="bg-white/20 text-white border-0">{user.points} pts</Badge>
        </div>
        <p className="text-sm text-primary-100">
          You're 550 points away from a free massage!
        </p>
        <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white w-4/5 rounded-full" />
        </div>
      </motion.div>

      {/* Upcoming Booking */}
      {user.upcomingBooking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Next Appointment</h2>
            <Link href="/bookings" className="text-sm text-primary-600">View all</Link>
          </div>
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{user.upcomingBooking.service}</h3>
                <p className="text-sm text-gray-500">
                  {user.upcomingBooking.date} at {user.upcomingBooking.time}
                </p>
                <p className="text-sm text-gray-500">with {user.upcomingBooking.therapist}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-1`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-gray-600">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Categories</h2>
          <Link href="/services" className="text-sm text-primary-600">See all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {serviceCategories.map((category) => (
            <Link
              key={category.id}
              href={`/services?category=${category.id}`}
              className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Popular Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Popular Services</h2>
          <Link href="/services" className="text-sm text-primary-600">See all</Link>
        </div>
        <div className="space-y-3">
          {popularServices.map((service) => (
            <Link
              key={service.id}
              href={`/book?service=${service.id}`}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border hover:border-primary-200 transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.duration[0]} min</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-600">{service.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-600">{formatCurrency(Object.values(service.price)[0])}</p>
                <ChevronRight className="h-5 w-5 text-gray-300 ml-auto" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-100 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Visit Us</h3>
            <p className="text-sm text-gray-500 mt-1">
              1 Setif Close, Adzope Crescent, Off Kumasi Crescent, Wuse 2, Abuja
            </p>
            <button className="text-sm text-primary-600 font-medium mt-2">
              Get Directions →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
