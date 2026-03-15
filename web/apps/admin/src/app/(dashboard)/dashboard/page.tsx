"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  UserPlus,
  ShoppingBag,
  Package,
  CalendarOff,
  User,
  Star,
  Timer,
} from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

type UserRole = "admin" | "staff";

// Mock data for today's bookings
const todaysBookings = [
  { id: "1", time: "09:00", customer: "Ngozi Adekunle", service: "Swedish Massage", therapist: "Chidi Eze", status: "completed", duration: 60 },
  { id: "2", time: "10:30", customer: "Emeka Obi", service: "Deep Tissue Massage", therapist: "Chidi Eze", status: "in-progress", duration: 90 },
  { id: "3", time: "11:00", customer: "Fatima Bello", service: "Hammam Experience", therapist: "Fatima Mohammed", status: "checked-in", duration: 60 },
  { id: "4", time: "12:00", customer: "Adaora Nwachukwu", service: "Classic Facial", therapist: "Amina Bello", status: "upcoming", duration: 45 },
  { id: "5", time: "14:00", customer: "Chukwuma Okoro", service: "Hot Stone Massage", therapist: "Chidi Eze", status: "upcoming", duration: 90 },
  { id: "6", time: "15:30", customer: "Yetunde Afolabi", service: "Manicure & Pedicure", therapist: "Grace Okafor", status: "upcoming", duration: 75 },
];

const recentCustomers = [
  { name: "Ngozi Adekunle", email: "ngozi@email.com", visits: 12, lastVisit: "Today" },
  { name: "Emeka Obi", email: "emeka@email.com", visits: 8, lastVisit: "Today" },
  { name: "Fatima Bello", email: "fatima@email.com", visits: 15, lastVisit: "Today" },
  { name: "Adaora Nwachukwu", email: "adaora@email.com", visits: 3, lastVisit: "Yesterday" },
];

const weeklyRevenue = [
  { day: "Mon", amount: 380000 },
  { day: "Tue", amount: 425000 },
  { day: "Wed", amount: 395000 },
  { day: "Thu", amount: 510000 },
  { day: "Fri", amount: 485000 },
  { day: "Sat", amount: 620000 },
  { day: "Sun", amount: 340000 },
];

const maxRevenue = Math.max(...weeklyRevenue.map(d => d.amount));

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
    case "checked-in":
      return <Badge className="bg-purple-100 text-purple-700"><CheckCircle className="h-3 w-3 mr-1" />Checked In</Badge>;
    case "upcoming":
      return <Badge className="bg-gray-100 text-gray-700"><Clock className="h-3 w-3 mr-1" />Upcoming</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>("admin");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as UserRole;
    if (role) setUserRole(role);
  }, []);

  const isAdmin = userRole === "admin";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            {isAdmin ? "Admin Dashboard" : "Welcome, Chidi!"}
          </h1>
          <p className="text-foreground-secondary mt-1">
            {isAdmin ? "Overview of your wellness spa" : "Here's your schedule for today"}
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="outline" asChild>
              <Link href="/reports">
                Download Report
              </Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/bookings">
              View All Bookings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards - Admin Only */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted">Today's Bookings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12% from yesterday
                  </p>
                </div>
                <div className="p-3 bg-primary-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(485000)}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8% from yesterday
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted">New Customers</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3 from yesterday
                  </p>
                </div>
                <div className="p-3 bg-accent-100 rounded-xl">
                  <Users className="h-6 w-6 text-accent-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">78%</p>
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -5% from yesterday
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions - Admin Only */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/bookings"
                className="flex flex-col items-center gap-3 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-primary-100 rounded-xl">
                  <Plus className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">+ New Booking</span>
              </Link>
              <Link
                href="/check-in?walkin=true"
                className="flex flex-col items-center gap-3 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-green-100 rounded-xl">
                  <UserPlus className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Walk-in Customer</span>
              </Link>
              <Link
                href="/products"
                className="flex flex-col items-center gap-3 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-accent-100 rounded-xl">
                  <ShoppingBag className="h-6 w-6 text-accent-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">View Products</span>
              </Link>
              <Link
                href="/inventory"
                className="flex flex-col items-center gap-3 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Package className="h-6 w-6 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Inventory Alerts</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Staff Quick Stats */}
      {!isAdmin && (() => {
        const myBookings = todaysBookings.filter(b => b.therapist === "Chidi Eze");
        const totalAppointments = myBookings.length;
        const completedCount = myBookings.filter(b => b.status === "completed").length;
        const remainingCount = totalAppointments - completedCount;
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary-700">{totalAppointments}</p>
                <p className="text-sm text-primary-600">Appointments Today</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-700">{completedCount}</p>
                <p className="text-sm text-green-600">Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-accent-50 border-accent-200">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-accent-700">{remainingCount}</p>
                <p className="text-sm text-accent-600">Remaining</p>
              </CardContent>
            </Card>
          </div>
        );
      })()}

      {/* Quick Actions - Staff Only */}
      {!isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/my-profile"
                className="flex flex-col items-center gap-3 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-primary-100 rounded-xl">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">My Profile</span>
              </Link>
              <Link
                href="/check-in"
                className="flex flex-col items-center gap-3 p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Check-In Station</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className={isAdmin ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Link href="/bookings" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysBookings
                  .filter(b => !isAdmin ? b.therapist === "Chidi Eze" : true)
                  .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="font-semibold text-gray-900">{booking.time}</p>
                        <p className="text-xs text-gray-500">{booking.duration}min</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.customer}</p>
                        <p className="text-sm text-gray-500">{booking.service}</p>
                        {isAdmin && (
                          <p className="text-xs text-gray-400">with {booking.therapist}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(booking.status)}
                      {booking.status === "upcoming" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push("/check-in")}
                        >
                          Check In
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Customers - Admin Only */}
        {isAdmin && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Customers</CardTitle>
              <Link href="/customers" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.visits} visits</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{customer.lastVisit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Personal Performance - Staff Only */}
      {!isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>My Performance This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-primary-50 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary-700">18</p>
                <p className="text-sm text-primary-600">Bookings Completed</p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-700">{formatCurrency(540000)}</p>
                <p className="text-sm text-green-600">Revenue Generated</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-amber-700">4.9</p>
                <p className="text-sm text-amber-600">Customer Rating</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Timer className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-700">96%</p>
                <p className="text-sm text-purple-600">On-Time Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue Trend - Admin Only */}
      {isAdmin && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
            <Link href="/reports" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              Full Report <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-3 h-48">
              {weeklyRevenue.map((day) => (
                <div key={day.day} className="flex flex-col items-center flex-1 gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    {formatCurrency(day.amount)}
                  </span>
                  <div
                    className="w-full bg-primary-500 rounded-t-lg min-h-[8px] transition-all"
                    style={{ height: `${(day.amount / maxRevenue) * 160}px` }}
                  />
                  <span className="text-sm font-medium text-gray-700">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts - Admin Only */}
      {isAdmin && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Attention Required</p>
                <p className="text-sm text-amber-700 mt-1">
                  3 bookings are pending confirmation. 2 customers have outstanding balances.
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100" asChild>
                    <Link href="/bookings">
                      View Pending
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100" asChild>
                    <Link href="/payments">
                      View Balances
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
