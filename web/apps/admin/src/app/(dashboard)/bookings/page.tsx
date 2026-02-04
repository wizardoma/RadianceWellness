"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  MoreVertical,
  Phone,
  Mail,
  UserPlus,
} from "lucide-react";
import { 
  Button, 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Mock bookings
const mockBookings = [
  { id: "BK001", time: "09:00", customer: "Ngozi Adekunle", phone: "+234 812 345 6789", service: "Swedish Massage", duration: 60, therapist: "Chidi Eze", price: 25000, status: "completed", date: "2026-02-04" },
  { id: "BK002", time: "10:30", customer: "Emeka Obi", phone: "+234 809 876 5432", service: "Deep Tissue Massage", duration: 90, therapist: "Chidi Eze", price: 38000, status: "in-progress", date: "2026-02-04" },
  { id: "BK003", time: "11:00", customer: "Fatima Bello", phone: "+234 803 456 7890", service: "Hammam Experience", duration: 60, therapist: "Fatima Mohammed", price: 20000, status: "checked-in", date: "2026-02-04" },
  { id: "BK004", time: "12:00", customer: "Adaora Nwachukwu", phone: "+234 805 234 5678", service: "Classic Facial", duration: 45, therapist: "Amina Bello", price: 18000, status: "upcoming", date: "2026-02-04" },
  { id: "BK005", time: "14:00", customer: "Chukwuma Okoro", phone: "+234 811 987 6543", service: "Hot Stone Massage", duration: 90, therapist: "Chidi Eze", price: 35000, status: "upcoming", date: "2026-02-04" },
  { id: "BK006", time: "15:30", customer: "Yetunde Afolabi", phone: "+234 807 654 3210", service: "Manicure & Pedicure", duration: 75, therapist: "Grace Okafor", price: 12000, status: "upcoming", date: "2026-02-04" },
  { id: "BK007", time: "10:00", customer: "Obioma Eze", phone: "+234 814 321 0987", service: "Swedish Massage", duration: 60, therapist: "Chidi Eze", price: 25000, status: "confirmed", date: "2026-02-05" },
  { id: "BK008", time: "14:00", customer: "Halima Yusuf", phone: "+234 802 109 8765", service: "Sauna Session", duration: 45, therapist: null, price: 14000, status: "confirmed", date: "2026-02-05" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
    case "checked-in":
      return <Badge className="bg-purple-100 text-purple-700">Checked In</Badge>;
    case "upcoming":
      return <Badge className="bg-gray-100 text-gray-700">Upcoming</Badge>;
    case "confirmed":
      return <Badge className="bg-primary-100 text-primary-700">Confirmed</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function BookingsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-02-04");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [userRole, setUserRole] = useState<"admin" | "staff">("admin");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "admin" | "staff";
    if (role) setUserRole(role);
  }, []);

  const handleCheckIn = (bookingId: string) => {
    // Navigate to check-in page - in a real app, this would pass the booking ID
    router.push("/check-in");
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = booking.date === selectedDate;
    const matchesRole = userRole === "admin" || booking.therapist === "Chidi Eze";
    return matchesSearch && matchesDate && matchesRole;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            {userRole === "admin" ? "Bookings" : "My Schedule"}
          </h1>
          <p className="text-foreground-secondary mt-1">
            {userRole === "admin" ? "Manage all appointments" : "View and manage your appointments"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/check-in">
              <CheckCircle className="mr-2 h-4 w-4" />
              Check-In Station
            </Link>
          </Button>
          {userRole === "admin" && (
            <Button asChild>
              <Link href="/check-in?walkin=true">
                <UserPlus className="mr-2 h-4 w-4" />
                Walk-In
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by customer or service..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Date Navigation */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() - 1);
              setSelectedDate(date.toISOString().split("T")[0]);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-4 py-2 bg-white border border-border rounded-lg min-w-[200px] text-center">
            <span className="font-medium">{formatDate(selectedDate)}</span>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() + 1);
              setSelectedDate(date.toISOString().split("T")[0]);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
            <p className="text-sm text-foreground-muted">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {filteredBookings.filter(b => b.status === "completed").length}
            </p>
            <p className="text-sm text-foreground-muted">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {filteredBookings.filter(b => ["upcoming", "confirmed", "checked-in", "in-progress"].includes(b.status)).length}
            </p>
            <p className="text-sm text-foreground-muted">Remaining</p>
          </CardContent>
        </Card>
        {userRole === "admin" && (
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">
                {formatCurrency(filteredBookings.reduce((sum, b) => sum + b.price, 0))}
              </p>
              <p className="text-sm text-foreground-muted">Revenue</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Time</th>
                  <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-600">Service</th>
                  {userRole === "admin" && (
                    <th className="text-left p-4 font-medium text-gray-600">Therapist</th>
                  )}
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  {userRole === "admin" && (
                    <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                  )}
                  <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{booking.time}</div>
                        <div className="text-sm text-gray-500">{booking.duration} min</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{booking.customer}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {booking.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>{booking.service}</div>
                        <div className="text-sm text-gray-500">{booking.id}</div>
                      </td>
                      {userRole === "admin" && (
                        <td className="p-4">
                          {booking.therapist || <span className="text-gray-400">Self-service</span>}
                        </td>
                      )}
                      <td className="p-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      {userRole === "admin" && (
                        <td className="p-4 text-right font-medium">
                          {formatCurrency(booking.price)}
                        </td>
                      )}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {["upcoming", "confirmed"].includes(booking.status) && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCheckIn(booking.id)}
                            >
                              Check In
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 mr-2" />
                                Call Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Reminder
                              </DropdownMenuItem>
                              {userRole === "admin" && booking.status !== "completed" && (
                                <>
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel Booking
                                  </DropdownMenuItem>
                                </>
                              )}
                              {booking.status === "in-progress" && (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Complete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={userRole === "admin" ? 7 : 5} className="p-8 text-center text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No bookings found for this date</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
