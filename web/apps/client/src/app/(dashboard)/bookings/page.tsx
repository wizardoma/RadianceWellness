"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  FileText,
  User,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

interface Booking {
  id: string;
  service: string;
  category: string;
  date: string;
  time: string;
  duration: number;
  therapist: string | null;
  price: number;
  status: string;
  paymentMethod?: string;
  notes?: string;
  createdAt?: string;
  confirmedAt?: string;
}

// Mock bookings data
const initialBookings: Booking[] = [
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
    paymentMethod: "Card ending 4521",
    notes: "Prefer medium pressure. Sensitive lower back area.",
    createdAt: "2026-01-28",
    confirmedAt: "2026-01-28",
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
    paymentMethod: "Card ending 4521",
    notes: "",
    createdAt: "2026-02-01",
    confirmedAt: "2026-02-01",
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
    paymentMethod: "Card ending 4521",
    notes: "Focus on shoulders and neck.",
    createdAt: "2026-01-15",
    confirmedAt: "2026-01-15",
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
    paymentMethod: "Gift Card GC-RW-001",
    notes: "",
    createdAt: "2026-01-18",
    confirmedAt: "2026-01-18",
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
    paymentMethod: "Card ending 7832",
    notes: "",
    createdAt: "2026-01-10",
    confirmedAt: "2026-01-10",
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
    paymentMethod: "Card ending 4521",
    notes: "Anniversary celebration.",
    createdAt: "2026-01-02",
    confirmedAt: "2026-01-02",
  },
];

const serviceCategories = [
  "All",
  "Massage & Therapy",
  "Thermal & Bathing",
  "Beauty & Grooming",
  "Facial",
  "Sauna",
];

const cancellationReasons = [
  "Change of plans",
  "Found alternative",
  "Scheduling conflict",
  "Other",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM",
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

const getNext14Days = (): string[] => {
  const days: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");

  // Details dialog
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Reschedule dialog
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  // Cancel dialog
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const hasActiveFilters =
    filterCategory !== "All" || filterDateFrom || filterDateTo || filterPriceMin || filterPriceMax;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesCategory =
      filterCategory === "All" || booking.category === filterCategory;
    const matchesDateFrom = !filterDateFrom || booking.date >= filterDateFrom;
    const matchesDateTo = !filterDateTo || booking.date <= filterDateTo;
    const matchesPriceMin = !filterPriceMin || booking.price >= Number(filterPriceMin);
    const matchesPriceMax = !filterPriceMax || booking.price <= Number(filterPriceMax);
    return (
      matchesSearch &&
      matchesTab &&
      matchesCategory &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesPriceMin &&
      matchesPriceMax
    );
  });

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterPriceMin("");
    setFilterPriceMax("");
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const handleRescheduleOpen = (booking: Booking) => {
    setRescheduleBooking(booking);
    setRescheduleDate("");
    setRescheduleTime("");
    setRescheduleOpen(true);
  };

  const handleRescheduleConfirm = () => {
    if (!rescheduleBooking || !rescheduleDate || !rescheduleTime) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === rescheduleBooking.id
          ? { ...b, date: rescheduleDate, time: rescheduleTime }
          : b
      )
    );
    setRescheduleOpen(false);
    setRescheduleBooking(null);
  };

  const handleCancelOpen = (booking: Booking) => {
    setCancelBooking(booking);
    setCancelReason("");
    setCancelOpen(true);
  };

  const handleCancelConfirm = () => {
    if (!cancelBooking || !cancelReason) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === cancelBooking.id ? { ...b, status: "cancelled" } : b
      )
    );
    setCancelOpen(false);
    setCancelBooking(null);
  };

  const handleBookAgain = () => {
    router.push("/book");
  };

  const isMember = true; // mock membership
  const memberDiscount = 0.15;

  const getBreakdown = (booking: Booking) => {
    const subtotal = booking.price;
    const discount = isMember ? Math.round(subtotal * memberDiscount) : 0;
    const afterDiscount = subtotal - discount;
    const tax = Math.round(afterDiscount * 0.075);
    const total = afterDiscount + tax;
    return { subtotal, discount, afterDiscount, tax, total };
  };

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
        <Button
          variant="outline"
          onClick={() => setFiltersOpen(true)}
          className={hasActiveFilters ? "border-primary-500 text-primary-600" : ""}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-2 bg-primary-500 text-white text-xs px-1.5 py-0">
              On
            </Badge>
          )}
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
                            <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                              <ChevronRight className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {booking.status === "upcoming" && (
                              <>
                                <DropdownMenuItem onClick={() => handleRescheduleOpen(booking)}>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleCancelOpen(booking)}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel Booking
                                </DropdownMenuItem>
                              </>
                            )}
                            {booking.status === "completed" && (
                              <DropdownMenuItem onClick={handleBookAgain}>
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

      {/* ===================== FILTERS DIALOG ===================== */}
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Bookings</DialogTitle>
            <DialogDescription>
              Narrow down your bookings by service, date, or price.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Service Type */}
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">From</Label>
                  <Input
                    type="date"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">To</Label>
                  <Input
                    type="date"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">Min (NGN)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filterPriceMin}
                    onChange={(e) => setFilterPriceMin(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Max (NGN)</Label>
                  <Input
                    type="number"
                    placeholder="Any"
                    value={filterPriceMax}
                    onChange={(e) => setFilterPriceMax(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== VIEW DETAILS DIALOG ===================== */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedBooking && (() => {
            const breakdown = getBreakdown(selectedBooking);
            return (
              <>
                <DialogHeader>
                  <DialogTitle>Booking Details</DialogTitle>
                  <DialogDescription>
                    Reference: {selectedBooking.id}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                  {/* Status & Service */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {selectedBooking.service}
                    </h3>
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                  </div>

                  <Separator />

                  {/* Booking Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-500 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> Date
                      </p>
                      <p className="font-medium">{formatDate(selectedBooking.date)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> Time
                      </p>
                      <p className="font-medium">
                        {selectedBooking.time} ({selectedBooking.duration} min)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" /> Category
                      </p>
                      <p className="font-medium">{selectedBooking.category}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> Therapist
                      </p>
                      <p className="font-medium">
                        {selectedBooking.therapist || "Self-service"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Price Breakdown</h4>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(breakdown.subtotal)}</span>
                      </div>
                      {breakdown.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Member Discount (15%)</span>
                          <span>-{formatCurrency(breakdown.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT (7.5%)</span>
                        <span>{formatCurrency(breakdown.tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span className="text-primary-600">
                          {formatCurrency(breakdown.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Payment</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span>
                        {selectedBooking.status === "cancelled"
                          ? "Refunded"
                          : "Paid"}{" "}
                        via {selectedBooking.paymentMethod || "Card"}
                      </span>
                      <Badge
                        className={
                          selectedBooking.status === "cancelled"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {selectedBooking.status === "cancelled" ? "Refunded" : "Paid"}
                      </Badge>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedBooking.notes && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Special Requests / Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
                        {selectedBooking.notes}
                      </p>
                    </div>
                  )}

                  {/* Booking Timeline */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Booking Timeline</h4>
                    <div className="space-y-3 pl-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-600">Created</span>
                        <span className="ml-auto text-gray-500">
                          {selectedBooking.createdAt
                            ? formatDate(selectedBooking.createdAt)
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-600">Confirmed</span>
                        <span className="ml-auto text-gray-500">
                          {selectedBooking.confirmedAt
                            ? formatDate(selectedBooking.confirmedAt)
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedBooking.status === "completed"
                              ? "bg-green-500"
                              : selectedBooking.status === "cancelled"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <span className="text-gray-600">
                          {selectedBooking.status === "completed"
                            ? "Completed"
                            : selectedBooking.status === "cancelled"
                            ? "Cancelled"
                            : "Upcoming"}
                        </span>
                        <span className="ml-auto text-gray-500">
                          {selectedBooking.status === "upcoming"
                            ? formatDate(selectedBooking.date)
                            : selectedBooking.status === "completed"
                            ? formatDate(selectedBooking.date)
                            : "---"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <DialogFooter className="gap-2 sm:gap-2">
                  {selectedBooking.status === "upcoming" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDetailsOpen(false);
                          handleRescheduleOpen(selectedBooking);
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          setDetailsOpen(false);
                          handleCancelOpen(selectedBooking);
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {selectedBooking.status === "completed" && (
                    <Button onClick={handleBookAgain}>
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      Book Again
                    </Button>
                  )}
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* ===================== RESCHEDULE DIALOG ===================== */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {rescheduleBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Reschedule Booking</DialogTitle>
                <DialogDescription>
                  Choose a new date and time for your appointment.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
                {/* Current Booking Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Current Booking</p>
                  <p className="font-semibold text-gray-900">
                    {rescheduleBooking.service}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(rescheduleBooking.date)} at{" "}
                    {rescheduleBooking.time} ({rescheduleBooking.duration} min)
                  </p>
                  {rescheduleBooking.therapist && (
                    <p className="text-sm text-gray-600">
                      with {rescheduleBooking.therapist}
                    </p>
                  )}
                </div>

                {/* New Date */}
                <div className="space-y-2">
                  <Label>New Date</Label>
                  <Select value={rescheduleDate} onValueChange={setRescheduleDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {getNext14Days().map((day) => (
                        <SelectItem key={day} value={day}>
                          {formatDate(day)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slot Grid */}
                <div className="space-y-2">
                  <Label>New Time Slot</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={rescheduleTime === slot ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => setRescheduleTime(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setRescheduleOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!rescheduleDate || !rescheduleTime}
                  onClick={handleRescheduleConfirm}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Confirm Reschedule
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ===================== CANCEL DIALOG ===================== */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="max-w-md">
          {cancelBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Cancel Booking</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this booking?
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
                {/* Booking Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-900">
                    {cancelBooking.service}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(cancelBooking.date)} at {cancelBooking.time} (
                    {cancelBooking.duration} min)
                  </p>
                  {cancelBooking.therapist && (
                    <p className="text-sm text-gray-600">
                      with {cancelBooking.therapist}
                    </p>
                  )}
                  <p className="text-sm font-medium text-primary-600 mt-1">
                    {formatCurrency(cancelBooking.price)}
                  </p>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <Label>Cancellation Reason</Label>
                  <Select value={cancelReason} onValueChange={setCancelReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {cancellationReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Note: Cancellations made less than 24 hours before the
                    appointment may incur a fee.
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setCancelOpen(false)}
                >
                  Keep Booking
                </Button>
                <Button
                  variant="destructive"
                  disabled={!cancelReason}
                  onClick={handleCancelConfirm}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Confirm Cancellation
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
