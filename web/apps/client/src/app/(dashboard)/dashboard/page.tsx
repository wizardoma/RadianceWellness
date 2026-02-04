"use client";

import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Gift,
  ArrowRight,
  CalendarPlus,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Mock data
const upcomingBookings = [
  {
    id: "1",
    service: "Swedish Massage",
    date: "Feb 8, 2026",
    time: "10:00 AM",
    duration: "60 min",
    therapist: "Chidi Eze",
    status: "confirmed",
  },
  {
    id: "2",
    service: "Hammam Experience",
    date: "Feb 15, 2026",
    time: "2:00 PM",
    duration: "90 min",
    therapist: "Fatima Mohammed",
    status: "confirmed",
  },
];

const recentActivity = [
  { type: "booking", message: "Booked Swedish Massage for Feb 8", time: "2 days ago" },
  { type: "review", message: "Left a 5-star review for Deep Tissue Massage", time: "1 week ago" },
  { type: "membership", message: "Renewed Gold membership", time: "2 weeks ago" },
];

const recommendedServices = [
  { name: "Hot Stone Massage", price: 35000, rating: 4.9 },
  { name: "Aromatherapy Facial", price: 25000, rating: 4.8 },
  { name: "Couples Spa Package", price: 65000, rating: 5.0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-foreground-secondary mt-1">
            Here's what's happening with your wellness journey
          </p>
        </div>
        <Button asChild>
          <Link href="/book">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Book a Service
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-xl">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-100 rounded-xl">
                <Clock className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Membership</p>
                <p className="text-2xl font-bold text-gray-900">Gold</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Points Balance</p>
                <p className="text-2xl font-bold text-gray-900">2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Bookings</CardTitle>
              <Link href="/bookings" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.service}</p>
                          <p className="text-sm text-gray-500">
                            {booking.date} at {booking.time} • {booking.duration}
                          </p>
                          <p className="text-sm text-gray-500">with {booking.therapist}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {booking.status}
                        </Badge>
                        <div className="mt-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No upcoming bookings</p>
                  <Button asChild>
                    <Link href="/book">Book Your First Session</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-500" />
                  <div>
                    <p className="text-sm text-gray-700">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Services */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <CardTitle>Recommended for You</CardTitle>
          </div>
          <Link href="/book" className="text-sm text-primary-600 hover:text-primary-700">
            Browse all
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {recommendedServices.map((service, index) => (
              <Link
                key={index}
                href="/book"
                className="group block p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-700">
                    {service.name}
                  </h4>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    {service.rating}
                  </div>
                </div>
                <p className="text-primary-600 font-semibold">
                  {formatCurrency(service.price)}
                </p>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  Book now <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Membership Banner */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-white">
              <h3 className="font-display text-xl font-semibold mb-1">
                You're a Gold Member! 🏆
              </h3>
              <p className="text-primary-100">
                Enjoy 15% off all services and priority booking
              </p>
            </div>
            <Button variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50">
              View Benefits
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
