"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin,
  Filter,
  Search,
  CalendarPlus,
  ChevronRight,
  MoreVertical,
  X,
  RefreshCw,
} from "lucide-react";
import { 
  Button, 
  Card, 
  CardContent,
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

// Mock bookings data
const mockBookings = [
  {
    id: "BK001",
    service: "Swedish Massage",
    category: "Massage & Therapy",
    date: "2026-02-08",
    time: "10:00 AM",
    duration: 60,
    therapist: "Chidi Eze",
    price: 25000,
    status: "upcoming",
  },
  {
    id: "BK002",
    service: "Hammam Experience",
    category: "Thermal & Bathing",
    date: "2026-02-15",
    time: "2:00 PM",
    duration: 90,
    therapist: "Fatima Mohammed",
    price: 35000,
    status: "upcoming",
  },
  {
    id: "BK003",
    service: "Deep Tissue Massage",
    category: "Massage & Therapy",
    date: "2026-01-25",
    time: "11:00 AM",
    duration: 60,
    therapist: "Chidi Eze",
    price: 30000,
    status: "completed",
  },
  {
    id: "BK004",
    service: "Sauna Session",
    category: "Thermal & Bathing",
    date: "2026-01-20",
    time: "3:00 PM",
    duration: 45,
    therapist: null,
    price: 14000,
    status: "completed",
  },
  {
    id: "BK005",
    service: "Classic Manicure",
    category: "Beauty & Grooming",
    date: "2026-01-15",
    time: "1:00 PM",
    duration: 45,
    therapist: "Amina Bello",
    price: 8000,
    status: "completed",
  },
  {
    id: "BK006",
    service: "Couples Massage",
    category: "Massage & Therapy",
    date: "2026-01-10",
    time: "4:00 PM",
    duration: 90,
    therapist: "Chidi Eze, Fatima Mohammed",
    price: 55000,
    status: "cancelled",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            My Bookings
          </h1>
          <p className="text-foreground-secondary mt-1">
            View and manage all your appointments
          </p>
        </div>
        <Button asChild>
          <Link href="/book">
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Booking
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-7 w-7 text-primary-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {booking.service}
                            </h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{booking.category}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1.5" />
                              {formatDate(booking.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1.5" />
                              {booking.time} ({booking.duration} min)
                            </span>
                            {booking.therapist && (
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1.5" />
                                {booking.therapist}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-semibold text-primary-600">
                            {formatCurrency(booking.price)}
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <ChevronRight className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <>
                                <DropdownMenuItem>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel Booking
                                </DropdownMenuItem>
                              </>
                            )}
                            {booking.status === "completed" && (
                              <DropdownMenuItem>
                                <CalendarPlus className="h-4 w-4 mr-2" />
                                Book Again
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : "You haven't made any bookings yet"}
                </p>
                <Button asChild>
                  <Link href="/book">Book Your First Service</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
