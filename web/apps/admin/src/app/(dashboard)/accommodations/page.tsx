"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Wifi,
  Wind,
  UtensilsCrossed,
  Waves,
  Car,
  Edit,
  CalendarDays,
  Ban,
  MoreVertical,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Copy,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  UserCheck,
  Loader2,
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
  Separator,
  Switch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Label,
  Textarea,
  Checkbox,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
interface Apartment {
  id: string;
  name: string;
  type: "Premium" | "Standard";
  description: string;
  status: string;
  guest: string | null;
  checkOut: string | null;
  nightly: number;
  weekly: number;
  monthly: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  upcomingBookings: number;
  image: null;
}

interface ApartmentFormData {
  name: string;
  type: "Premium" | "Standard";
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  nightly: number;
  weekly: number;
  monthly: number;
  amenities: string[];
}

interface BlockDatesFormData {
  apartmentId: string;
  startDate: string;
  endDate: string;
  reason: string;
}

// Mock apartments
const initialApartments: Apartment[] = [
  {
    id: "APT001",
    name: "Premium Luxury Apartment",
    type: "Premium",
    description: "A luxurious premium apartment with top-notch amenities.",
    status: "occupied",
    guest: "Ngozi Adekunle",
    checkOut: "March 18, 2026",
    nightly: 95000,
    weekly: 570000,
    monthly: 1900000,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["WiFi", "AC", "Kitchen", "Pool Access", "Parking"],
    upcomingBookings: 3,
    image: null,
  },
  {
    id: "APT002",
    name: "Standard Comfort Apartment",
    type: "Standard",
    description: "A comfortable standard apartment for short and long stays.",
    status: "available",
    guest: null,
    checkOut: null,
    nightly: 55000,
    weekly: 330000,
    monthly: 1100000,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ["WiFi", "AC", "Kitchenette"],
    upcomingBookings: 1,
    image: null,
  },
];

// Mock bookings for accommodations
const mockAccommodationBookings = [
  { id: "AB001", guest: "Ngozi Adekunle", apartment: "Premium Luxury Apartment", checkIn: "March 14, 2026", checkOut: "March 18, 2026", nights: 4, total: 380000, status: "checked-in" },
  { id: "AB002", guest: "Emeka Obi", apartment: "Standard Comfort Apartment", checkIn: "March 20, 2026", checkOut: "March 23, 2026", nights: 3, total: 165000, status: "confirmed" },
  { id: "AB003", guest: "Fatima Bello", apartment: "Premium Luxury Apartment", checkIn: "March 22, 2026", checkOut: "March 28, 2026", nights: 6, total: 570000, status: "confirmed" },
  { id: "AB004", guest: "Adaora Nwachukwu", apartment: "Premium Luxury Apartment", checkIn: "March 5, 2026", checkOut: "March 10, 2026", nights: 5, total: 475000, status: "completed" },
  { id: "AB005", guest: "Chukwuma Okoro", apartment: "Standard Comfort Apartment", checkIn: "March 1, 2026", checkOut: "March 3, 2026", nights: 2, total: 110000, status: "cancelled" },
];

// Mock sync data
const initialSyncData = [
  {
    apartmentId: "APT001",
    apartmentName: "Premium Luxury Apartment",
    lastSynced: "15 minutes ago",
    syncStatus: "synced",
    iCalUrl: "https://www.airbnb.com/calendar/ical/12345678.ics?s=abc123def456",
    autoSync: true,
    syncLog: [
      { time: "March 15, 2026 10:30 AM", action: "Calendar synced successfully", status: "success" },
      { time: "March 15, 2026 06:30 AM", action: "Calendar synced successfully", status: "success" },
      { time: "March 14, 2026 10:30 PM", action: "Calendar synced successfully", status: "success" },
      { time: "March 14, 2026 06:30 PM", action: "New booking imported: AB003", status: "success" },
    ],
  },
  {
    apartmentId: "APT002",
    apartmentName: "Standard Comfort Apartment",
    lastSynced: "20 minutes ago",
    syncStatus: "synced",
    iCalUrl: "https://www.airbnb.com/calendar/ical/87654321.ics?s=xyz789uvw012",
    autoSync: true,
    syncLog: [
      { time: "March 15, 2026 10:25 AM", action: "Calendar synced successfully", status: "success" },
      { time: "March 15, 2026 06:25 AM", action: "Calendar synced successfully", status: "success" },
      { time: "March 14, 2026 10:25 PM", action: "Sync failed - retrying", status: "error" },
    ],
  },
];

// Calendar data for March 2026
const calendarData: Record<string, Record<number, string>> = {
  APT001: {
    1: "available", 2: "available", 3: "available", 4: "available", 5: "occupied",
    6: "occupied", 7: "occupied", 8: "occupied", 9: "occupied", 10: "occupied",
    11: "available", 12: "available", 13: "available", 14: "occupied", 15: "occupied",
    16: "occupied", 17: "occupied", 18: "occupied", 19: "available", 20: "available",
    21: "available", 22: "occupied", 23: "occupied", 24: "occupied", 25: "occupied",
    26: "occupied", 27: "occupied", 28: "occupied", 29: "available", 30: "blocked",
    31: "blocked",
  },
  APT002: {
    1: "occupied", 2: "occupied", 3: "occupied", 4: "available", 5: "available",
    6: "available", 7: "available", 8: "available", 9: "available", 10: "available",
    11: "available", 12: "available", 13: "available", 14: "available", 15: "available",
    16: "available", 17: "available", 18: "available", 19: "available", 20: "occupied",
    21: "occupied", 22: "occupied", 23: "occupied", 24: "available", 25: "available",
    26: "available", 27: "available", 28: "blocked", 29: "blocked", 30: "available",
    31: "available",
  },
};

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-3.5 w-3.5" />,
  AC: <Wind className="h-3.5 w-3.5" />,
  Kitchen: <UtensilsCrossed className="h-3.5 w-3.5" />,
  Kitchenette: <UtensilsCrossed className="h-3.5 w-3.5" />,
  "Pool Access": <Waves className="h-3.5 w-3.5" />,
  Parking: <Car className="h-3.5 w-3.5" />,
};

const ALL_AMENITIES = ["WiFi", "AC", "Kitchen", "Kitchenette", "Pool Access", "Parking"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const getBookingStatusBadge = (status: string) => {
  switch (status) {
    case "checked-in":
      return <Badge className="bg-blue-100 text-blue-700">Checked In</Badge>;
    case "confirmed":
      return <Badge className="bg-primary-100 text-primary-700">Confirmed</Badge>;
    case "completed":
      return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const emptyFormData: ApartmentFormData = {
  name: "",
  type: "Standard",
  description: "",
  bedrooms: 1,
  bathrooms: 1,
  maxGuests: 2,
  nightly: 0,
  weekly: 0,
  monthly: 0,
  amenities: [],
};

const emptyBlockDatesForm: BlockDatesFormData = {
  apartmentId: "",
  startDate: "",
  endDate: "",
  reason: "",
};

export default function AccommodationsPage() {
  const [activeTab, setActiveTab] = useState("apartments");
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);

  // Calendar month navigation state (0-indexed month)
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(2); // March = 2

  // Apartment Add/Edit dialog state
  const [apartmentDialogOpen, setApartmentDialogOpen] = useState(false);
  const [editingApartmentId, setEditingApartmentId] = useState<string | null>(null);
  const [apartmentForm, setApartmentForm] = useState<ApartmentFormData>(emptyFormData);

  // Block Dates dialog state
  const [blockDatesDialogOpen, setBlockDatesDialogOpen] = useState(false);
  const [blockDatesForm, setBlockDatesForm] = useState<BlockDatesFormData>(emptyBlockDatesForm);

  // Booking detail dialog state
  const [bookingDetailDialogOpen, setBookingDetailDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof mockAccommodationBookings[0] | null>(null);

  // Cancel booking confirmation dialog state
  const [cancelBookingDialogOpen, setCancelBookingDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<typeof mockAccommodationBookings[0] | null>(null);

  // Booking statuses (to allow cancellation)
  const [bookingStatuses, setBookingStatuses] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    mockAccommodationBookings.forEach((b) => { map[b.id] = b.status; });
    return map;
  });

  // Send confirmation toast state
  const [confirmationSentFor, setConfirmationSentFor] = useState<string | null>(null);

  // Sync states per apartment
  const [syncStates, setSyncStates] = useState<Record<string, { syncing: boolean; lastSynced: string }>>(() => {
    const map: Record<string, { syncing: boolean; lastSynced: string }> = {};
    initialSyncData.forEach((s) => { map[s.apartmentId] = { syncing: false, lastSynced: s.lastSynced }; });
    return map;
  });

  // Auto-sync states per apartment
  const [autoSyncStates, setAutoSyncStates] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    initialSyncData.forEach((s) => { map[s.apartmentId] = s.autoSync; });
    return map;
  });

  // Clipboard copied state per apartment
  const [copiedApartmentId, setCopiedApartmentId] = useState<string | null>(null);

  // ---- Handlers ----

  const handleOpenAddApartment = useCallback(() => {
    setEditingApartmentId(null);
    setApartmentForm(emptyFormData);
    setApartmentDialogOpen(true);
  }, []);

  const handleOpenEditApartment = useCallback((apartment: Apartment) => {
    setEditingApartmentId(apartment.id);
    setApartmentForm({
      name: apartment.name,
      type: apartment.type,
      description: apartment.description,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      maxGuests: apartment.maxGuests,
      nightly: apartment.nightly,
      weekly: apartment.weekly,
      monthly: apartment.monthly,
      amenities: [...apartment.amenities],
    });
    setApartmentDialogOpen(true);
  }, []);

  const handleSaveApartment = useCallback(() => {
    if (editingApartmentId) {
      setApartments((prev) =>
        prev.map((apt) =>
          apt.id === editingApartmentId
            ? {
                ...apt,
                name: apartmentForm.name,
                type: apartmentForm.type,
                description: apartmentForm.description,
                bedrooms: apartmentForm.bedrooms,
                bathrooms: apartmentForm.bathrooms,
                maxGuests: apartmentForm.maxGuests,
                nightly: apartmentForm.nightly,
                weekly: apartmentForm.weekly,
                monthly: apartmentForm.monthly,
                amenities: apartmentForm.amenities,
              }
            : apt
        )
      );
    } else {
      const newId = `APT${String(apartments.length + 1).padStart(3, "0")}`;
      const newApartment: Apartment = {
        id: newId,
        name: apartmentForm.name,
        type: apartmentForm.type,
        description: apartmentForm.description,
        status: "available",
        guest: null,
        checkOut: null,
        nightly: apartmentForm.nightly,
        weekly: apartmentForm.weekly,
        monthly: apartmentForm.monthly,
        bedrooms: apartmentForm.bedrooms,
        bathrooms: apartmentForm.bathrooms,
        maxGuests: apartmentForm.maxGuests,
        amenities: apartmentForm.amenities,
        upcomingBookings: 0,
        image: null,
      };
      setApartments((prev) => [...prev, newApartment]);
    }
    setApartmentDialogOpen(false);
  }, [editingApartmentId, apartmentForm, apartments.length]);

  const handleViewCalendar = useCallback(() => {
    setActiveTab("calendar");
  }, []);

  const handleOpenBlockDates = useCallback((preselectedApartmentId?: string) => {
    setBlockDatesForm({
      ...emptyBlockDatesForm,
      apartmentId: preselectedApartmentId || "",
    });
    setBlockDatesDialogOpen(true);
  }, []);

  const handleSaveBlockDates = useCallback(() => {
    setBlockDatesDialogOpen(false);
  }, []);

  const handleCalendarPrev = useCallback(() => {
    setCalendarMonth((prev) => {
      if (prev === 0) {
        setCalendarYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const handleCalendarNext = useCallback(() => {
    setCalendarMonth((prev) => {
      if (prev === 11) {
        setCalendarYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const handleSyncNow = useCallback((apartmentId: string) => {
    setSyncStates((prev) => ({
      ...prev,
      [apartmentId]: { ...prev[apartmentId], syncing: true },
    }));
    setTimeout(() => {
      setSyncStates((prev) => ({
        ...prev,
        [apartmentId]: { syncing: false, lastSynced: "just now" },
      }));
    }, 1500);
  }, []);

  const handleCopyUrl = useCallback((apartmentId: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedApartmentId(apartmentId);
    setTimeout(() => setCopiedApartmentId(null), 2000);
  }, []);

  const handleOpenExternal = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  const handleAutoSyncChange = useCallback((apartmentId: string, checked: boolean) => {
    setAutoSyncStates((prev) => ({ ...prev, [apartmentId]: checked }));
  }, []);

  const handleViewBookingDetails = useCallback((booking: typeof mockAccommodationBookings[0]) => {
    setSelectedBooking(booking);
    setBookingDetailDialogOpen(true);
  }, []);

  const handleOpenCancelBooking = useCallback((booking: typeof mockAccommodationBookings[0]) => {
    setBookingToCancel(booking);
    setCancelBookingDialogOpen(true);
  }, []);

  const handleConfirmCancelBooking = useCallback(() => {
    if (bookingToCancel) {
      setBookingStatuses((prev) => ({ ...prev, [bookingToCancel.id]: "cancelled" }));
    }
    setCancelBookingDialogOpen(false);
    setBookingToCancel(null);
  }, [bookingToCancel]);

  const handleSendConfirmation = useCallback((bookingId: string) => {
    setConfirmationSentFor(bookingId);
    setTimeout(() => setConfirmationSentFor(null), 2000);
  }, []);

  const handleAmenityToggle = useCallback((amenity: string) => {
    setApartmentForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }, []);

  // Calendar helpers
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstDayOffset = getFirstDayOfMonth(calendarYear, calendarMonth);
  const isCalendarMarch2026 = calendarYear === 2026 && calendarMonth === 2;

  const getDayColor = (apartmentId: string, day: number) => {
    if (!isCalendarMarch2026) return "bg-green-100 text-green-700";
    const status = calendarData[apartmentId]?.[day];
    switch (status) {
      case "occupied":
        return apartmentId === "APT001" ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800";
      case "blocked":
        return "bg-gray-300 text-gray-600";
      case "available":
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Accommodations
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage apartments and guest bookings
          </p>
        </div>
        <Button onClick={handleOpenAddApartment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Apartment
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-100">
                <Building2 className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{apartments.length}</p>
                <p className="text-sm text-foreground-muted">Total Apartments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {apartments.filter((a) => a.status === "occupied").length}
                </p>
                <p className="text-sm text-foreground-muted">Currently Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(850000)}</p>
                <p className="text-sm text-foreground-muted">This Month Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(75000)}</p>
                <p className="text-sm text-foreground-muted">Avg Nightly Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="apartments">Apartments</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="airbnb-sync">Airbnb Sync</TabsTrigger>
        </TabsList>

        {/* Apartments Tab */}
        <TabsContent value="apartments" className="mt-6">
          <div className="space-y-6">
            {apartments.map((apartment) => (
              <Card key={apartment.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left: Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900">{apartment.name}</h3>
                            {apartment.status === "occupied" ? (
                              <Badge className="bg-red-100 text-red-700">Occupied</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">Available</Badge>
                            )}
                          </div>
                          {apartment.guest && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Guest:</span> {apartment.guest} &middot; Check-out: {apartment.checkOut}
                            </p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenEditApartment(apartment)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleViewCalendar}>
                              <CalendarDays className="h-4 w-4 mr-2" />
                              View Calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenBlockDates(apartment.id)}>
                              <Ban className="h-4 w-4 mr-2" />
                              Block Dates
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Pricing */}
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-gray-50 rounded-lg px-4 py-2">
                          <p className="text-xs text-gray-500">Nightly</p>
                          <p className="font-bold text-primary-600">{formatCurrency(apartment.nightly)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-4 py-2">
                          <p className="text-xs text-gray-500">Weekly</p>
                          <p className="font-bold text-primary-600">{formatCurrency(apartment.weekly)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-4 py-2">
                          <p className="text-xs text-gray-500">Monthly</p>
                          <p className="font-bold text-primary-600">{formatCurrency(apartment.monthly)}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="h-4 w-4" />
                          {apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="h-4 w-4" />
                          {apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <UserCheck className="h-4 w-4" />
                          Max {apartment.maxGuests} guests
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {apartment.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs flex items-center gap-1">
                            {amenityIcons[amenity]}
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <Separator />

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">{apartment.upcomingBookings}</span> upcoming booking{apartment.upcomingBookings !== 1 ? "s" : ""}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenEditApartment(apartment)}>
                            <Edit className="mr-1.5 h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleViewCalendar}>
                            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                            View Calendar
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenBlockDates(apartment.id)}>
                            <Ban className="mr-1.5 h-3.5 w-3.5" />
                            Block Dates
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{MONTH_NAMES[calendarMonth]} {calendarYear}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleCalendarPrev}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleCalendarNext}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar for each apartment */}
              {apartments.map((apartment) => (
                <div key={apartment.id} className="mb-6">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">{apartment.name}</h4>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOffset }).map((_, i) => (
                      <div key={`empty-${apartment.id}-${i}`} className="h-10" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      return (
                        <div
                          key={`${apartment.id}-${day}`}
                          className={`h-10 rounded-md flex items-center justify-center text-xs font-medium ${getDayColor(apartment.id, day)}`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <Separator className="my-4" />
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-green-100 border border-green-200" />
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-red-200 border border-red-300" />
                  <span className="text-gray-600">Occupied (Premium)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-blue-200 border border-blue-300" />
                  <span className="text-gray-600">Occupied (Standard)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-gray-300 border border-gray-400" />
                  <span className="text-gray-600">Blocked</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Booking ID</th>
                      <th className="text-left p-4 font-medium text-gray-600">Guest</th>
                      <th className="text-left p-4 font-medium text-gray-600">Apartment</th>
                      <th className="text-left p-4 font-medium text-gray-600">Check-In</th>
                      <th className="text-left p-4 font-medium text-gray-600">Check-Out</th>
                      <th className="text-center p-4 font-medium text-gray-600">Nights</th>
                      <th className="text-right p-4 font-medium text-gray-600">Total</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAccommodationBookings.map((booking) => {
                      const currentStatus = bookingStatuses[booking.id] || booking.status;
                      return (
                        <tr key={booking.id} className="border-b border-border hover:bg-gray-50">
                          <td className="p-4 font-medium text-primary-600">{booking.id}</td>
                          <td className="p-4 font-medium">{booking.guest}</td>
                          <td className="p-4 text-sm text-gray-600">{booking.apartment}</td>
                          <td className="p-4 text-sm">{booking.checkIn}</td>
                          <td className="p-4 text-sm">{booking.checkOut}</td>
                          <td className="p-4 text-center">{booking.nights}</td>
                          <td className="p-4 text-right font-medium">{formatCurrency(booking.total)}</td>
                          <td className="p-4">{getBookingStatusBadge(currentStatus)}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {confirmationSentFor === booking.id && (
                                <span className="text-xs text-green-600 font-medium animate-in fade-in">
                                  Confirmation sent!
                                </span>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewBookingDetails(booking)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleViewBookingDetails(booking)}>
                                    Edit Booking
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSendConfirmation(booking.id)}>
                                    Send Confirmation
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleOpenCancelBooking(booking)}
                                  >
                                    Cancel Booking
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Airbnb Sync Tab */}
        <TabsContent value="airbnb-sync" className="mt-6">
          <div className="space-y-6">
            {initialSyncData.map((sync) => {
              const syncState = syncStates[sync.apartmentId];
              const isAutoSync = autoSyncStates[sync.apartmentId] ?? sync.autoSync;
              const isCopied = copiedApartmentId === sync.apartmentId;

              return (
                <Card key={sync.apartmentId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{sync.apartmentName}</CardTitle>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">Synced</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={syncState?.syncing}
                        onClick={() => handleSyncNow(sync.apartmentId)}
                      >
                        {syncState?.syncing ? (
                          <>
                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                            Sync Now
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Last synced: <span className="font-medium text-gray-700">{syncState?.lastSynced ?? sync.lastSynced}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Auto-sync</span>
                        <Switch
                          checked={isAutoSync}
                          onCheckedChange={(checked) => handleAutoSyncChange(sync.apartmentId, checked)}
                        />
                      </div>
                    </div>

                    {/* iCal URL */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">iCal URL</label>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={sync.iCalUrl}
                          className="font-mono text-xs"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleCopyUrl(sync.apartmentId, sync.iCalUrl)}
                        >
                          {isCopied ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenExternal(sync.iCalUrl)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Sync Log */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Sync Log</h4>
                      <div className="space-y-2">
                        {sync.syncLog.map((log, index) => (
                          <div key={index} className="flex items-center justify-between text-sm py-1.5">
                            <div className="flex items-center gap-2">
                              {log.status === "success" ? (
                                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <div className="h-3.5 w-3.5 rounded-full bg-red-500" />
                              )}
                              <span className="text-gray-700">{log.action}</span>
                            </div>
                            <span className="text-gray-400 text-xs">{log.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* ======== DIALOGS ======== */}

      {/* Add/Edit Apartment Dialog */}
      <Dialog open={apartmentDialogOpen} onOpenChange={setApartmentDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingApartmentId ? "Edit Apartment" : "Add Apartment"}</DialogTitle>
            <DialogDescription>
              {editingApartmentId
                ? "Update the apartment details below."
                : "Fill in the details for the new apartment."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apt-name">Name</Label>
                <Input
                  id="apt-name"
                  value={apartmentForm.name}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Apartment name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apt-type">Type</Label>
                <Select
                  value={apartmentForm.type}
                  onValueChange={(value) => setApartmentForm((prev) => ({ ...prev, type: value as "Premium" | "Standard" }))}
                >
                  <SelectTrigger id="apt-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apt-description">Description</Label>
              <Textarea
                id="apt-description"
                value={apartmentForm.description}
                onChange={(e) => setApartmentForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Apartment description"
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apt-bedrooms">Bedrooms</Label>
                <Input
                  id="apt-bedrooms"
                  type="number"
                  min={1}
                  value={apartmentForm.bedrooms}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, bedrooms: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apt-bathrooms">Bathrooms</Label>
                <Input
                  id="apt-bathrooms"
                  type="number"
                  min={1}
                  value={apartmentForm.bathrooms}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, bathrooms: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apt-max-guests">Max Guests</Label>
                <Input
                  id="apt-max-guests"
                  type="number"
                  min={1}
                  value={apartmentForm.maxGuests}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, maxGuests: parseInt(e.target.value) || 1 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apt-nightly">Nightly Rate</Label>
                <Input
                  id="apt-nightly"
                  type="number"
                  min={0}
                  value={apartmentForm.nightly}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, nightly: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apt-weekly">Weekly Rate</Label>
                <Input
                  id="apt-weekly"
                  type="number"
                  min={0}
                  value={apartmentForm.weekly}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, weekly: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apt-monthly">Monthly Rate</Label>
                <Input
                  id="apt-monthly"
                  type="number"
                  min={0}
                  value={apartmentForm.monthly}
                  onChange={(e) => setApartmentForm((prev) => ({ ...prev, monthly: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid grid-cols-3 gap-3">
                {ALL_AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={apartmentForm.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApartmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveApartment}>
              {editingApartmentId ? "Save Changes" : "Add Apartment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Dates Dialog */}
      <Dialog open={blockDatesDialogOpen} onOpenChange={setBlockDatesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Dates</DialogTitle>
            <DialogDescription>
              Block a date range for an apartment to prevent bookings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="block-apartment">Apartment</Label>
              <Select
                value={blockDatesForm.apartmentId}
                onValueChange={(value) => setBlockDatesForm((prev) => ({ ...prev, apartmentId: value }))}
              >
                <SelectTrigger id="block-apartment">
                  <SelectValue placeholder="Select apartment" />
                </SelectTrigger>
                <SelectContent>
                  {apartments.map((apt) => (
                    <SelectItem key={apt.id} value={apt.id}>
                      {apt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="block-start">Start Date</Label>
                <Input
                  id="block-start"
                  type="date"
                  value={blockDatesForm.startDate}
                  onChange={(e) => setBlockDatesForm((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="block-end">End Date</Label>
                <Input
                  id="block-end"
                  type="date"
                  value={blockDatesForm.endDate}
                  onChange={(e) => setBlockDatesForm((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="block-reason">Reason</Label>
              <Textarea
                id="block-reason"
                value={blockDatesForm.reason}
                onChange={(e) => setBlockDatesForm((prev) => ({ ...prev, reason: e.target.value }))}
                placeholder="Reason for blocking dates"
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDatesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlockDates}>
              Block Dates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Detail Dialog */}
      <Dialog open={bookingDetailDialogOpen} onOpenChange={setBookingDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Full details for booking {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-medium">{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-0.5">{getBookingStatusBadge(bookingStatuses[selectedBooking.id] || selectedBooking.status)}</div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Guest</p>
                  <p className="font-medium">{selectedBooking.guest}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Apartment</p>
                  <p className="font-medium">{selectedBooking.apartment}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Check-In</p>
                  <p className="font-medium">{selectedBooking.checkIn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-Out</p>
                  <p className="font-medium">{selectedBooking.checkOut}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nights</p>
                  <p className="font-medium">{selectedBooking.nights}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">{formatCurrency(selectedBooking.total)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDetailDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Confirmation Dialog */}
      <Dialog open={cancelBookingDialogOpen} onOpenChange={setCancelBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel booking {bookingToCancel?.id} for {bookingToCancel?.guest}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelBookingDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleConfirmCancelBooking}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
