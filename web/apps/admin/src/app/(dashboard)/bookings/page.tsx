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
  User,
  FileText,
  StickyNote,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Label,
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
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Separator,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
interface Booking {
  id: string;
  time: string;
  customer: string;
  phone: string;
  service: string;
  duration: number;
  therapist: string | null;
  price: number;
  status: string;
  date: string;
}

// Mock bookings
const initialBookings: Booking[] = [
  { id: "BK001", time: "09:00", customer: "Ngozi Adekunle", phone: "+234 812 345 6789", service: "Swedish Massage", duration: 60, therapist: "Chidi Eze", price: 25000, status: "completed", date: "2026-02-04" },
  { id: "BK002", time: "10:30", customer: "Emeka Obi", phone: "+234 809 876 5432", service: "Deep Tissue Massage", duration: 90, therapist: "Chidi Eze", price: 38000, status: "in-progress", date: "2026-02-04" },
  { id: "BK003", time: "11:00", customer: "Fatima Bello", phone: "+234 803 456 7890", service: "Hammam Experience", duration: 60, therapist: "Fatima Mohammed", price: 20000, status: "checked-in", date: "2026-02-04" },
  { id: "BK004", time: "12:00", customer: "Adaora Nwachukwu", phone: "+234 805 234 5678", service: "Classic Facial", duration: 45, therapist: "Amina Bello", price: 18000, status: "upcoming", date: "2026-02-04" },
  { id: "BK005", time: "14:00", customer: "Chukwuma Okoro", phone: "+234 811 987 6543", service: "Hot Stone Massage", duration: 90, therapist: "Chidi Eze", price: 35000, status: "upcoming", date: "2026-02-04" },
  { id: "BK006", time: "15:30", customer: "Yetunde Afolabi", phone: "+234 807 654 3210", service: "Manicure & Pedicure", duration: 75, therapist: "Grace Okafor", price: 12000, status: "upcoming", date: "2026-02-04" },
  { id: "BK007", time: "10:00", customer: "Obioma Eze", phone: "+234 814 321 0987", service: "Swedish Massage", duration: 60, therapist: "Chidi Eze", price: 25000, status: "confirmed", date: "2026-02-05" },
  { id: "BK008", time: "14:00", customer: "Halima Yusuf", phone: "+234 802 109 8765", service: "Sauna Session", duration: 45, therapist: null, price: 14000, status: "confirmed", date: "2026-02-05" },
];

// Mock customers for the new booking dialog
const mockCustomers = [
  { id: "C1", name: "Ngozi Adekunle", email: "ngozi@email.com", isMember: true },
  { id: "C2", name: "Emeka Obi", email: "emeka@email.com", isMember: true },
  { id: "C3", name: "Fatima Bello", email: "fatima@email.com", isMember: false },
  { id: "C4", name: "Adaora Nwachukwu", email: "adaora@email.com", isMember: true },
];

// Mock services
const mockServices = [
  { id: "S1", name: "Swedish Massage", duration: 60, price: 25000 },
  { id: "S2", name: "Deep Tissue Massage", duration: 90, price: 38000 },
  { id: "S3", name: "Classic Facial", duration: 45, price: 18000 },
  { id: "S4", name: "Hammam Experience", duration: 60, price: 20000 },
  { id: "S5", name: "Hot Stone Massage", duration: 90, price: 35000 },
  { id: "S6", name: "Manicure & Pedicure", duration: 75, price: 12000 },
];

// Mock therapists
const mockTherapists = [
  { id: "T1", name: "Chidi Eze" },
  { id: "T2", name: "Fatima Mohammed" },
  { id: "T3", name: "Amina Bello" },
];

// Time slots
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM",
];

// Calendar week days for calendar view
const calendarDays = [
  { label: "Mon", date: "2026-02-02" },
  { label: "Tue", date: "2026-02-03" },
  { label: "Wed", date: "2026-02-04" },
  { label: "Thu", date: "2026-02-05" },
  { label: "Fri", date: "2026-02-06" },
  { label: "Sat", date: "2026-02-07" },
];

const calendarTimeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-200 border-green-300 text-green-800";
    case "in-progress": return "bg-blue-200 border-blue-300 text-blue-800";
    case "checked-in": return "bg-purple-200 border-purple-300 text-purple-800";
    case "upcoming": return "bg-gray-200 border-gray-300 text-gray-800";
    case "confirmed": return "bg-primary-200 border-primary-300 text-primary-800";
    case "cancelled": return "bg-red-200 border-red-300 text-red-800";
    default: return "bg-gray-200 border-gray-300 text-gray-800";
  }
};

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-02-04");
  const [userRole, setUserRole] = useState<"admin" | "staff">("admin");

  // New Booking Dialog
  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [isWalkIn, setIsWalkIn] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedBookingDate, setSelectedBookingDate] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState<typeof mockTherapists[0] | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");

  // View Details Dialog
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Cancel Dialog
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Reschedule Dialog
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState<string | null>(null);

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterService, setFilterService] = useState("All");
  const [filterStaff, setFilterStaff] = useState("All");

  // Send Reminder Dialog
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [reminderBooking, setReminderBooking] = useState<Booking | null>(null);
  const [reminderSent, setReminderSent] = useState(false);

  // Service Notes
  const [bookingNotes, setBookingNotes] = useState<Record<string, { treatmentNotes: string; customerFeedback: string; followUpNeeded: boolean }>>({});
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [notesBooking, setNotesBooking] = useState<Booking | null>(null);
  const [notesForm, setNotesForm] = useState({ treatmentNotes: "", customerFeedback: "", followUpNeeded: false });

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "admin" | "staff";
    if (role) setUserRole(role);
  }, []);

  const handleCheckIn = (bookingId: string) => {
    router.push("/check-in");
  };

  const handleMarkComplete = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: "completed" } : b)
    );
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsDialogOpen(true);
  };

  const handleOpenCancel = (booking: Booking) => {
    setCancelBooking(booking);
    setCancelReason("");
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (cancelBooking) {
      setBookings(prev =>
        prev.map(b => b.id === cancelBooking.id ? { ...b, status: "cancelled" } : b)
      );
    }
    setCancelDialogOpen(false);
    setCancelBooking(null);
    setCancelReason("");
  };

  const handleOpenReschedule = (booking: Booking) => {
    setRescheduleBooking(booking);
    setRescheduleDate(booking.date);
    setRescheduleTime(null);
    setRescheduleDialogOpen(true);
  };

  const handleConfirmReschedule = () => {
    if (rescheduleBooking && rescheduleDate && rescheduleTime) {
      // Convert 12-hour format to 24-hour for storage
      const timeParts = rescheduleTime.match(/(\d{2}):(\d{2})\s(AM|PM)/);
      let hours = parseInt(timeParts?.[1] || "0");
      const minutes = timeParts?.[2] || "00";
      const meridiem = timeParts?.[3];
      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      const time24 = `${hours.toString().padStart(2, "0")}:${minutes}`;

      setBookings(prev =>
        prev.map(b =>
          b.id === rescheduleBooking.id
            ? { ...b, date: rescheduleDate, time: time24 }
            : b
        )
      );
    }
    setRescheduleDialogOpen(false);
    setRescheduleBooking(null);
  };

  const handleCallCustomer = (phone: string) => {
    window.open(`tel:${phone.replace(/\s/g, "")}`);
  };

  const handleSendReminder = (booking: Booking) => {
    setReminderBooking(booking);
    setReminderSent(false);
    setReminderDialogOpen(true);
  };

  const handleConfirmReminder = async () => {
    setReminderSent(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setReminderDialogOpen(false);
    setReminderBooking(null);
    setReminderSent(false);
  };

  const handleClearFilters = () => {
    setFilterStatus("All");
    setFilterService("All");
    setFilterStaff("All");
  };

  const handleOpenNotes = (booking: Booking) => {
    setNotesBooking(booking);
    const existing = bookingNotes[booking.id];
    if (existing) {
      setNotesForm({ treatmentNotes: existing.treatmentNotes, customerFeedback: existing.customerFeedback, followUpNeeded: existing.followUpNeeded });
    } else {
      setNotesForm({ treatmentNotes: "", customerFeedback: "", followUpNeeded: false });
    }
    setNotesDialogOpen(true);
  };

  const handleSaveNotes = () => {
    if (notesBooking) {
      setBookingNotes(prev => ({
        ...prev,
        [notesBooking.id]: { ...notesForm },
      }));
    }
    setNotesDialogOpen(false);
    setNotesBooking(null);
  };

  const resetNewBookingForm = () => {
    setBookingStep(1);
    setSelectedCustomer(null);
    setIsWalkIn(false);
    setSelectedService(null);
    setSelectedTimeSlot(null);
    setSelectedBookingDate("");
    setSelectedTherapist(null);
    setCustomerSearch("");
  };

  const handleCreateBooking = () => {
    if (selectedService && selectedTimeSlot && selectedBookingDate) {
      const timeParts = selectedTimeSlot.match(/(\d{2}):(\d{2})\s(AM|PM)/);
      let hours = parseInt(timeParts?.[1] || "0");
      const minutes = timeParts?.[2] || "00";
      const meridiem = timeParts?.[3];
      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      const time24 = `${hours.toString().padStart(2, "0")}:${minutes}`;

      const newBooking: Booking = {
        id: `BK${String(bookings.length + 1).padStart(3, "0")}`,
        time: time24,
        customer: isWalkIn ? "Walk-in Customer" : (selectedCustomer?.name || "Unknown"),
        phone: isWalkIn ? "N/A" : "+234 000 000 0000",
        service: selectedService.name,
        duration: selectedService.duration,
        therapist: selectedTherapist?.name || null,
        price: selectedService.price,
        status: "confirmed",
        date: selectedBookingDate,
      };
      setBookings(prev => [...prev, newBooking]);
    }
    setNewBookingOpen(false);
    resetNewBookingForm();
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = booking.date === selectedDate;
    const matchesRole = userRole === "admin" || booking.therapist === "Chidi Eze";

    let matchesStatus = true;
    if (filterStatus !== "All") {
      matchesStatus = booking.status === filterStatus.toLowerCase();
    }

    let matchesService = true;
    if (filterService !== "All") {
      matchesService = booking.service === filterService;
    }

    let matchesStaff = true;
    if (filterStaff !== "All") {
      matchesStaff = booking.therapist === filterStaff;
    }

    return matchesSearch && matchesDate && matchesRole && matchesStatus && matchesService && matchesStaff;
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

  const filteredMockCustomers = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const taxRate = 0.075;
  const subtotal = selectedService?.price || 0;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  // Get bookings for calendar view
  const getCalendarBookings = (date: string, timeSlot: string) => {
    const hour = parseInt(timeSlot.split(":")[0]);
    return bookings.filter(b => {
      if (b.date !== date) return false;
      if (userRole === "staff" && b.therapist !== "Chidi Eze") return false;
      const bookingHour = parseInt(b.time.split(":")[0]);
      return bookingHour === hour;
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
            <Button variant="outline" asChild>
              <Link href="/check-in?walkin=true">
                <UserPlus className="mr-2 h-4 w-4" />
                Walk-In
              </Link>
            </Button>
          )}
          <Button onClick={() => { resetNewBookingForm(); setNewBookingOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
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

        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {(filterStatus !== "All" || filterService !== "All" || filterStaff !== "All") && (
                <Badge className="ml-2 bg-primary-100 text-primary-700 text-xs">Active</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Filter Bookings</h4>
              <div className="space-y-2">
                <Label className="text-sm">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Service</Label>
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {mockServices.map(s => (
                      <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {userRole === "admin" && (
                <div className="space-y-2">
                  <Label className="text-sm">Staff</Label>
                  <Select value={filterStaff} onValueChange={setFilterStaff}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {mockTherapists.map(t => (
                        <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button size="sm" className="flex-1" onClick={() => setFilterOpen(false)}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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

      {/* List / Calendar Tabs */}
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        {/* List View */}
        <TabsContent value="list">
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
                            <div className="flex items-center gap-1">
                              {booking.service}
                              {bookingNotes[booking.id] && (
                                <span title="Has service notes"><FileText className="h-4 w-4 text-primary-500" /></span>
                              )}
                            </div>
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
                                  <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleCallCustomer(booking.phone)}>
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSendReminder(booking)}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Reminder
                                  </DropdownMenuItem>
                                  {userRole === "admin" && booking.status !== "completed" && booking.status !== "cancelled" && (
                                    <>
                                      <DropdownMenuItem onClick={() => handleOpenReschedule(booking)}>
                                        Reschedule
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => handleOpenCancel(booking)}
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Cancel Booking
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {booking.status === "in-progress" && (
                                    <DropdownMenuItem
                                      className="text-green-600"
                                      onClick={() => handleMarkComplete(booking.id)}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark Complete
                                    </DropdownMenuItem>
                                  )}
                                  {(booking.status === "completed" || booking.status === "in-progress") && (
                                    <DropdownMenuItem onClick={() => handleOpenNotes(booking)}>
                                      <StickyNote className="h-4 w-4 mr-2" />
                                      {bookingNotes[booking.id] ? "Edit Notes" : "Add Notes"}
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
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-20 p-2 text-left text-sm font-medium text-gray-500 border-b border-border">Time</th>
                      {calendarDays.map(day => (
                        <th key={day.date} className="p-2 text-center text-sm font-medium text-gray-700 border-b border-border">
                          <div>{day.label}</div>
                          <div className="text-xs text-gray-400">{day.date.slice(5)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calendarTimeSlots.map(timeSlot => (
                      <tr key={timeSlot} className="border-b border-border">
                        <td className="p-2 text-sm text-gray-500 font-medium align-top">
                          {parseInt(timeSlot) > 12
                            ? `${parseInt(timeSlot) - 12}:00 PM`
                            : parseInt(timeSlot) === 12
                            ? "12:00 PM"
                            : `${parseInt(timeSlot)}:00 AM`}
                        </td>
                        {calendarDays.map(day => {
                          const cellBookings = getCalendarBookings(day.date, timeSlot);
                          return (
                            <td key={day.date} className="p-1 align-top min-h-[60px] h-16 border-l border-border">
                              {cellBookings.map(b => (
                                <div
                                  key={b.id}
                                  className={`text-xs p-1.5 rounded mb-1 border cursor-pointer truncate ${getStatusColor(b.status)}`}
                                  title={`${b.customer} - ${b.service}`}
                                  onClick={() => handleViewDetails(b)}
                                >
                                  <div className="font-medium truncate">{b.customer}</div>
                                  <div className="truncate opacity-75">{b.service}</div>
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ========== NEW BOOKING DIALOG ========== */}
      <Dialog open={newBookingOpen} onOpenChange={(open) => { setNewBookingOpen(open); if (!open) resetNewBookingForm(); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Booking - Step {bookingStep} of 4</DialogTitle>
            <DialogDescription>
              {bookingStep === 1 && "Select a customer or choose walk-in"}
              {bookingStep === 2 && "Choose a service"}
              {bookingStep === 3 && "Pick a date and time"}
              {bookingStep === 4 && "Review and confirm your booking"}
            </DialogDescription>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= bookingStep ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step < bookingStep ? "bg-primary-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Customer */}
          {bookingStep === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                {/* Walk-in option */}
                <button
                  type="button"
                  onClick={() => { setIsWalkIn(true); setSelectedCustomer(null); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                    isWalkIn ? "border-primary-500 bg-primary-50" : "border-border hover:bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Walk-in Customer</p>
                    <p className="text-sm text-gray-500">No account needed</p>
                  </div>
                </button>
                {/* Customer list */}
                {filteredMockCustomers.map(customer => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => { setSelectedCustomer(customer); setIsWalkIn(false); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                      selectedCustomer?.id === customer.id ? "border-primary-500 bg-primary-50" : "border-border hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        {customer.isMember && (
                          <Badge className="bg-primary-100 text-primary-700 text-xs">Member</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Service */}
          {bookingStep === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {mockServices.map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    selectedService?.id === service.id ? "border-primary-500 bg-primary-50" : "border-border hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{service.duration} min</p>
                  <p className="text-sm font-semibold text-primary-600 mt-1">{formatCurrency(service.price)}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Date & Time */}
          {bookingStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <Input
                  type="date"
                  value={selectedBookingDate}
                  onChange={(e) => setSelectedBookingDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        selectedTimeSlot === slot
                          ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                          : "border-border hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Assignment</label>
                <div className="space-y-2">
                  {mockTherapists.map(therapist => (
                    <button
                      key={therapist.id}
                      type="button"
                      onClick={() => setSelectedTherapist(therapist)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                        selectedTherapist?.id === therapist.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-border hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900">{therapist.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {bookingStep === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Customer</span>
                  <span className="text-sm font-medium text-gray-900">
                    {isWalkIn ? "Walk-in Customer" : selectedCustomer?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Service</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedService?.name} ({selectedService?.duration} min)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedBookingDate ? formatDate(selectedBookingDate) : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Time</span>
                  <span className="text-sm font-medium text-gray-900">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Staff</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedTherapist?.name || "Not assigned"}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tax (7.5%)</span>
                  <span className="text-sm font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between gap-2 sm:justify-between">
            <div>
              {bookingStep > 1 && (
                <Button variant="outline" onClick={() => setBookingStep(prev => prev - 1)}>
                  Back
                </Button>
              )}
            </div>
            <div>
              {bookingStep < 4 ? (
                <Button
                  onClick={() => setBookingStep(prev => prev + 1)}
                  disabled={
                    (bookingStep === 1 && !selectedCustomer && !isWalkIn) ||
                    (bookingStep === 2 && !selectedService) ||
                    (bookingStep === 3 && (!selectedBookingDate || !selectedTimeSlot))
                  }
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleCreateBooking}>
                  Create Booking
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========== VIEW DETAILS DIALOG ========== */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Booking {selectedBooking?.id}</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Customer</h3>
                <p className="font-medium text-gray-900">{selectedBooking.customer}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Phone className="h-3 w-3" /> {selectedBooking.phone}
                </p>
              </div>

              {/* Service Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Service</h3>
                <p className="font-medium text-gray-900">{selectedBooking.service}</p>
                <p className="text-sm text-gray-500">{selectedBooking.duration} min</p>
                {selectedBooking.therapist && (
                  <p className="text-sm text-gray-500 mt-1">Therapist: {selectedBooking.therapist}</p>
                )}
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Payment</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">{formatCurrency(selectedBooking.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (7.5%)</span>
                    <span className="font-medium">{formatCurrency(Math.round(selectedBooking.price * 0.075))}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-1 mt-1">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{formatCurrency(selectedBooking.price + Math.round(selectedBooking.price * 0.075))}</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Status Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div>
                      <p className="text-sm font-medium">Booking Created</p>
                      <p className="text-xs text-gray-500">{selectedBooking.date} at {selectedBooking.time}</p>
                    </div>
                  </div>
                  {selectedBooking.status !== "upcoming" && selectedBooking.status !== "confirmed" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Checked In</p>
                        <p className="text-xs text-gray-500">{selectedBooking.date}</p>
                      </div>
                    </div>
                  )}
                  {(selectedBooking.status === "in-progress" || selectedBooking.status === "completed") && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium">In Progress</p>
                        <p className="text-xs text-gray-500">{selectedBooking.date}</p>
                      </div>
                    </div>
                  )}
                  {selectedBooking.status === "completed" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm font-medium">Completed</p>
                        <p className="text-xs text-gray-500">{selectedBooking.date}</p>
                      </div>
                    </div>
                  )}
                  {selectedBooking.status === "cancelled" && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div>
                        <p className="text-sm font-medium">Cancelled</p>
                        <p className="text-xs text-gray-500">{selectedBooking.date}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedBooking.status === "completed" ? "bg-green-500" :
                      selectedBooking.status === "cancelled" ? "bg-red-500" : "bg-gray-300"
                    }`} />
                    <div>
                      <p className="text-sm font-medium">Current: {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1).replace("-", " ")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Notes */}
              {bookingNotes[selectedBooking.id] && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Service Notes
                  </h3>
                  {bookingNotes[selectedBooking.id].treatmentNotes && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-500">Treatment Notes</p>
                      <p className="text-sm text-gray-900">{bookingNotes[selectedBooking.id].treatmentNotes}</p>
                    </div>
                  )}
                  {bookingNotes[selectedBooking.id].customerFeedback && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-500">Customer Feedback</p>
                      <p className="text-sm text-gray-900">{bookingNotes[selectedBooking.id].customerFeedback}</p>
                    </div>
                  )}
                  {bookingNotes[selectedBooking.id].followUpNeeded && (
                    <div className="flex items-center gap-2 mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                      <Badge className="bg-amber-100 text-amber-700">Follow-up Needed</Badge>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========== CANCEL BOOKING DIALOG ========== */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel booking {cancelBooking?.id} for {cancelBooking?.customer}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for cancellation
              </label>
              <Textarea
                placeholder="Enter the reason for cancellation..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button
              variant="outline"
              className="bg-red-600 text-white hover:bg-red-700 border-red-600"
              onClick={handleConfirmCancel}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========== RESCHEDULE DIALOG ========== */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogDescription>
              Reschedule {rescheduleBooking?.id} for {rescheduleBooking?.customer}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
              <Input
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Time</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setRescheduleTime(slot)}
                    className={`px-2 py-1.5 text-xs rounded-lg border transition-colors ${
                      rescheduleTime === slot
                        ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                        : "border-border hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmReschedule}
              disabled={!rescheduleDate || !rescheduleTime}
            >
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========== SEND REMINDER DIALOG ========== */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Reminder</DialogTitle>
            <DialogDescription>
              Send an appointment reminder to {reminderBooking?.customer}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            {reminderBooking && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-medium">{reminderBooking.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium">{reminderBooking.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{reminderBooking.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{reminderBooking.time}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmReminder} disabled={reminderSent}>
              {reminderSent ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                "Send Reminder"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========== SERVICE NOTES DIALOG ========== */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-primary-600" />
              Service Notes
            </DialogTitle>
            <DialogDescription>
              Add treatment notes for this booking
            </DialogDescription>
          </DialogHeader>
          {notesBooking && (
            <div className="space-y-4">
              {/* Booking Info */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-medium">{notesBooking.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium">{notesBooking.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{notesBooking.date} at {notesBooking.time}</span>
                </div>
              </div>

              <Separator />

              {/* Treatment Notes */}
              <div className="space-y-2">
                <Label htmlFor="treatmentNotes">Treatment Notes</Label>
                <Textarea
                  id="treatmentNotes"
                  placeholder="What was done, products used, techniques applied..."
                  value={notesForm.treatmentNotes}
                  onChange={(e) => setNotesForm(prev => ({ ...prev, treatmentNotes: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Customer Feedback */}
              <div className="space-y-2">
                <Label htmlFor="customerFeedback">Customer Feedback</Label>
                <Textarea
                  id="customerFeedback"
                  placeholder="Verbal feedback from the customer..."
                  value={notesForm.customerFeedback}
                  onChange={(e) => setNotesForm(prev => ({ ...prev, customerFeedback: e.target.value }))}
                  rows={2}
                />
              </div>

              {/* Follow-up Needed */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="followUp"
                  checked={notesForm.followUpNeeded}
                  onCheckedChange={(checked) => setNotesForm(prev => ({ ...prev, followUpNeeded: checked === true }))}
                />
                <Label htmlFor="followUp" className="text-sm font-normal cursor-pointer">
                  Follow-up needed for this customer
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>
              <FileText className="h-4 w-4 mr-2" />
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
