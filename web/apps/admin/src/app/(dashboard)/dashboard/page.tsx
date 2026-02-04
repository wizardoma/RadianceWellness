"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
            {isAdmin ? "Overview of your wellness center" : "Here's your schedule for today"}
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="outline">
              Download Report
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

      {/* Staff Quick Stats */}
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-primary-50 border-primary-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary-700">6</p>
              <p className="text-sm text-primary-600">Appointments Today</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-700">2</p>
              <p className="text-sm text-green-600">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-accent-50 border-accent-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-accent-700">4</p>
              <p className="text-sm text-accent-600">Remaining</p>
            </CardContent>
          </Card>
        </div>
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
                        <Button size="sm" variant="outline">
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
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    View Pending
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    View Balances
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
