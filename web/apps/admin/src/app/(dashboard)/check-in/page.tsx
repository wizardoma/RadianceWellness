"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Clock, 
  Search,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Mail,
  Calendar,
  PlayCircle,
  StopCircle,
  AlertCircle,
  Sparkles,
  Timer,
  ArrowRight,
  RefreshCw,
  UserPlus,
  Plus,
  Minus,
  CreditCard,
} from "lucide-react";
import { 
  Button, 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Separator,
  Label,
  Checkbox,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";
import { services, serviceCategories } from "@radiance/mock-data";

type BookingStatus = "confirmed" | "checked-in" | "in-progress" | "completed" | "no-show";

interface Booking {
  id: string;
  time: string;
  endTime: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    isVip: boolean;
    memberTier: string | null;
  };
  service: string;
  duration: number;
  therapist: string;
  price: number;
  status: BookingStatus;
  notes?: string;
  room?: string;
}

// Mock today's bookings
const initialBookings: Booking[] = [
  { 
    id: "BK001", 
    time: "09:00", 
    endTime: "10:00",
    customer: { name: "Ngozi Adekunle", email: "ngozi@email.com", phone: "+234 812 345 6789", isVip: true, memberTier: "Gold" },
    service: "Swedish Massage", 
    duration: 60, 
    therapist: "Chidi Eze", 
    price: 25000, 
    status: "completed",
    room: "Treatment Room 1"
  },
  { 
    id: "BK002", 
    time: "10:00", 
    endTime: "11:30",
    customer: { name: "Emeka Obi", email: "emeka@email.com", phone: "+234 809 876 5432", isVip: false, memberTier: "Silver" },
    service: "Deep Tissue Massage", 
    duration: 90, 
    therapist: "Chidi Eze", 
    price: 38000, 
    status: "in-progress",
    room: "Treatment Room 1"
  },
  { 
    id: "BK003", 
    time: "10:30", 
    endTime: "11:30",
    customer: { name: "Fatima Bello", email: "fatima@email.com", phone: "+234 803 456 7890", isVip: false, memberTier: null },
    service: "Hammam Experience", 
    duration: 60, 
    therapist: "Fatima Mohammed", 
    price: 20000, 
    status: "checked-in",
    room: "Hammam Suite"
  },
  { 
    id: "BK004", 
    time: "11:00", 
    endTime: "11:45",
    customer: { name: "Adaora Nwachukwu", email: "adaora@email.com", phone: "+234 805 234 5678", isVip: true, memberTier: "Platinum" },
    service: "Classic Facial", 
    duration: 45, 
    therapist: "Amina Bello", 
    price: 18000, 
    status: "confirmed",
    notes: "First time customer - allergic to lavender",
    room: "Beauty Room 1"
  },
  { 
    id: "BK005", 
    time: "11:30", 
    endTime: "13:00",
    customer: { name: "Chukwuma Okoro", email: "chukwuma@email.com", phone: "+234 811 987 6543", isVip: false, memberTier: "Gold" },
    service: "Hot Stone Massage", 
    duration: 90, 
    therapist: "Chidi Eze", 
    price: 35000, 
    status: "confirmed",
    room: "Treatment Room 2"
  },
  { 
    id: "BK006", 
    time: "12:00", 
    endTime: "13:15",
    customer: { name: "Yetunde Afolabi", email: "yetunde@email.com", phone: "+234 807 654 3210", isVip: false, memberTier: null },
    service: "Manicure & Pedicure", 
    duration: 75, 
    therapist: "Grace Okafor", 
    price: 12000, 
    status: "confirmed",
    room: "Nail Salon"
  },
  { 
    id: "BK007", 
    time: "13:00", 
    endTime: "14:00",
    customer: { name: "Obioma Eze", email: "obioma@email.com", phone: "+234 814 321 0987", isVip: true, memberTier: "Gold" },
    service: "Swedish Massage", 
    duration: 60, 
    therapist: "Fatima Mohammed", 
    price: 25000, 
    status: "confirmed",
    room: "Treatment Room 1"
  },
  { 
    id: "BK008", 
    time: "14:00", 
    endTime: "14:45",
    customer: { name: "Halima Yusuf", email: "halima@email.com", phone: "+234 802 109 8765", isVip: false, memberTier: null },
    service: "Sauna Session", 
    duration: 45, 
    therapist: "Self-service", 
    price: 14000, 
    status: "confirmed",
    room: "Sauna"
  },
];

const getStatusConfig = (status: BookingStatus) => {
  switch (status) {
    case "confirmed":
      return { 
        label: "Confirmed", 
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Calendar,
        action: "Check In",
        actionColor: "default" as const,
      };
    case "checked-in":
      return { 
        label: "Checked In", 
        color: "bg-purple-100 text-purple-700 border-purple-200",
        icon: CheckCircle,
        action: "Start Session",
        actionColor: "default" as const,
      };
    case "in-progress":
      return { 
        label: "In Progress", 
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: PlayCircle,
        action: "Complete",
        actionColor: "default" as const,
      };
    case "completed":
      return { 
        label: "Completed", 
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        action: null,
        actionColor: "default" as const,
      };
    case "no-show":
      return { 
        label: "No Show", 
        color: "bg-red-100 text-red-700 border-red-200",
        icon: XCircle,
        action: null,
        actionColor: "default" as const,
      };
  }
};

const getMemberBadge = (tier: string | null) => {
  if (!tier) return null;
  const colors: Record<string, string> = {
    Silver: "bg-gray-100 text-gray-700",
    Gold: "bg-amber-100 text-amber-700",
    Platinum: "bg-purple-100 text-purple-700",
  };
  return <Badge className={`${colors[tier]} text-xs`}>{tier}</Badge>;
};

// Available therapists
const therapists = [
  { id: "T1", name: "Chidi Eze", specialties: ["massage", "thermal-bathing"], available: true },
  { id: "T2", name: "Fatima Mohammed", specialties: ["massage", "thermal-bathing"], available: true },
  { id: "T3", name: "Amina Bello", specialties: ["beauty-grooming"], available: true },
  { id: "T4", name: "Grace Okafor", specialties: ["beauty-grooming"], available: false },
  { id: "T5", name: "Emeka Nwosu", specialties: ["fitness-wellness"], available: true },
];

// Available rooms
const rooms = [
  { id: "R1", name: "Treatment Room 1", type: "massage" },
  { id: "R2", name: "Treatment Room 2", type: "massage" },
  { id: "R3", name: "Hammam Suite", type: "thermal" },
  { id: "R4", name: "Sauna", type: "thermal" },
  { id: "R5", name: "Beauty Room 1", type: "beauty" },
  { id: "R6", name: "Nail Salon", type: "beauty" },
];

interface WalkInService {
  serviceId: string;
  duration: number;
  price: number;
}

interface WalkInForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  isNewCustomer: boolean;
  selectedServices: WalkInService[];
  therapistId: string;
  roomId: string;
  notes: string;
  payNow: boolean;
}

const initialWalkInForm: WalkInForm = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  isNewCustomer: true,
  selectedServices: [],
  therapistId: "",
  roomId: "",
  notes: "",
  payNow: true,
};

export default function CheckInPage() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCheckInDialog, setShowCheckInDialog] = useState(false);
  const [showWalkInDialog, setShowWalkInDialog] = useState(false);
  const [walkInStep, setWalkInStep] = useState<"customer" | "services" | "assign" | "confirm">("customer");
  const [walkInForm, setWalkInForm] = useState<WalkInForm>(initialWalkInForm);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if opened with walkin param
  useEffect(() => {
    if (searchParams.get("walkin") === "true") {
      setShowWalkInDialog(true);
    }
  }, [searchParams]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NG", { 
      hour: "2-digit", 
      minute: "2-digit",
      hour12: true 
    });
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!searchQuery) return true;
    return (
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.phone.includes(searchQuery) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Separate bookings by status
  const pendingArrivals = filteredBookings.filter(b => b.status === "confirmed");
  const checkedIn = filteredBookings.filter(b => b.status === "checked-in");
  const inProgress = filteredBookings.filter(b => b.status === "in-progress");
  const completed = filteredBookings.filter(b => b.status === "completed" || b.status === "no-show");

  const handleAction = async (booking: Booking, action: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let newStatus: BookingStatus = booking.status;
    
    switch (action) {
      case "Check In":
        newStatus = "checked-in";
        break;
      case "Start Session":
        newStatus = "in-progress";
        break;
      case "Complete":
        newStatus = "completed";
        break;
      case "No Show":
        newStatus = "no-show";
        break;
    }
    
    setBookings(prev => 
      prev.map(b => b.id === booking.id ? { ...b, status: newStatus } : b)
    );
    
    setIsProcessing(false);
    setShowCheckInDialog(false);
    setSelectedBooking(null);
  };

  const openCheckInDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCheckInDialog(true);
  };

  const openWalkInDialog = () => {
    setWalkInForm(initialWalkInForm);
    setWalkInStep("customer");
    setShowWalkInDialog(true);
  };

  const addServiceToWalkIn = (serviceId: string, duration: number, price: number) => {
    const existing = walkInForm.selectedServices.find(s => s.serviceId === serviceId);
    if (!existing) {
      setWalkInForm(prev => ({
        ...prev,
        selectedServices: [...prev.selectedServices, { serviceId, duration, price }]
      }));
    }
  };

  const removeServiceFromWalkIn = (serviceId: string) => {
    setWalkInForm(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.filter(s => s.serviceId !== serviceId)
    }));
  };

  const getWalkInTotal = () => {
    return walkInForm.selectedServices.reduce((sum, s) => sum + s.price, 0);
  };

  const getWalkInDuration = () => {
    return walkInForm.selectedServices.reduce((sum, s) => sum + s.duration, 0);
  };

  const handleWalkInSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new booking from walk-in
    const now = new Date();
    const endTime = new Date(now.getTime() + getWalkInDuration() * 60000);
    const serviceNames = walkInForm.selectedServices
      .map(s => services.find(svc => svc.id === s.serviceId)?.name)
      .filter(Boolean)
      .join(" + ");
    
    const newBooking: Booking = {
      id: `WI${Date.now().toString().slice(-6)}`,
      time: now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", hour12: false }),
      endTime: endTime.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", hour12: false }),
      customer: {
        name: walkInForm.customerName,
        email: walkInForm.customerEmail,
        phone: walkInForm.customerPhone,
        isVip: false,
        memberTier: null,
      },
      service: serviceNames,
      duration: getWalkInDuration(),
      therapist: therapists.find(t => t.id === walkInForm.therapistId)?.name || "Self-service",
      price: getWalkInTotal(),
      status: "checked-in",
      notes: walkInForm.notes || undefined,
      room: rooms.find(r => r.id === walkInForm.roomId)?.name,
    };
    
    setBookings(prev => [newBooking, ...prev]);
    setIsProcessing(false);
    setShowWalkInDialog(false);
    setWalkInForm(initialWalkInForm);
  };

  const canProceedWalkIn = () => {
    switch (walkInStep) {
      case "customer":
        return walkInForm.customerName && walkInForm.customerPhone;
      case "services":
        return walkInForm.selectedServices.length > 0;
      case "assign":
        return true; // Therapist and room are optional
      case "confirm":
        return true;
      default:
        return false;
    }
  };

  const BookingCard = ({ booking, showAction = true }: { booking: Booking; showAction?: boolean }) => {
    const statusConfig = getStatusConfig(booking.status);
    const StatusIcon = statusConfig.icon;
    
    return (
      <div className="p-4 bg-white border border-border rounded-xl hover:shadow-md transition-all">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-xl">{booking.time}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">{booking.endTime}</span>
              <Badge className={statusConfig.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{booking.customer.name}</h3>
              {booking.customer.isVip && (
                <Badge className="bg-accent-100 text-accent-700 text-xs">VIP</Badge>
              )}
              {getMemberBadge(booking.customer.memberTier)}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary-500" />
                {booking.service}
              </span>
              <span className="flex items-center gap-1">
                <Timer className="h-4 w-4" />
                {booking.duration} min
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {booking.therapist}
              </span>
            </div>
            
            {booking.room && (
              <p className="text-sm text-primary-600 font-medium">{booking.room}</p>
            )}
            
            {booking.notes && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-700 flex items-start gap-1">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {booking.notes}
                </p>
              </div>
            )}
          </div>
          
          <div className="text-right flex flex-col items-end gap-2">
            <p className="font-bold text-primary-600">{formatCurrency(booking.price)}</p>
            
            {showAction && statusConfig.action && (
              <Button 
                onClick={() => openCheckInDialog(booking)}
                disabled={isProcessing}
              >
                {statusConfig.action}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Check-In Station
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage customer arrivals and appointments
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Time</p>
            <p className="text-2xl font-bold text-primary-600">{formatTime(currentTime)}</p>
          </div>
          <Button variant="outline" onClick={() => setBookings(initialBookings)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={openWalkInDialog}>
            <UserPlus className="h-4 w-4 mr-2" />
            Walk-In Customer
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-700">{pendingArrivals.length}</p>
                <p className="text-sm text-blue-600">Awaiting Arrival</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-purple-700">{checkedIn.length}</p>
                <p className="text-sm text-purple-600">Checked In</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-amber-700">{inProgress.length}</p>
                <p className="text-sm text-amber-600">In Progress</p>
              </div>
              <PlayCircle className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-700">{completed.length}</p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search by name, phone, or booking ID..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Booking Lists */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Arrivals */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Calendar className="h-5 w-5" />
              Awaiting Arrival ({pendingArrivals.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingArrivals.length > 0 ? (
              pendingArrivals.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No pending arrivals</p>
            )}
          </CardContent>
        </Card>

        {/* Checked In - Ready to Start */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <CheckCircle className="h-5 w-5" />
              Checked In - Ready ({checkedIn.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checkedIn.length > 0 ? (
              checkedIn.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No customers waiting</p>
            )}
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <PlayCircle className="h-5 w-5" />
              In Progress ({inProgress.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inProgress.length > 0 ? (
              inProgress.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No sessions in progress</p>
            )}
          </CardContent>
        </Card>

        {/* Completed Today */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Completed Today ({completed.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completed.length > 0 ? (
              completed.map(booking => (
                <BookingCard key={booking.id} booking={booking} showAction={false} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No completed sessions yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Check-In Dialog */}
      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        <DialogContent className="max-w-lg">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {getStatusConfig(selectedBooking.status).action} - {selectedBooking.customer.name}
                </DialogTitle>
                <DialogDescription>
                  Confirm the action for this appointment
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-700">
                        {selectedBooking.customer.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{selectedBooking.customer.name}</h4>
                        {selectedBooking.customer.isVip && (
                          <Badge className="bg-accent-100 text-accent-700 text-xs">VIP</Badge>
                        )}
                        {getMemberBadge(selectedBooking.customer.memberTier)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {selectedBooking.customer.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Service</span>
                    <span className="font-medium">{selectedBooking.service}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{selectedBooking.time} - {selectedBooking.endTime}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{selectedBooking.duration} minutes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Therapist</span>
                    <span className="font-medium">{selectedBooking.therapist}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Room</span>
                    <span className="font-medium">{selectedBooking.room}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-primary-600">{formatCurrency(selectedBooking.price)}</span>
                  </div>
                </div>

                {/* Notes Alert */}
                {selectedBooking.notes && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Note:</strong> {selectedBooking.notes}</span>
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2">
                {selectedBooking.status === "confirmed" && (
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleAction(selectedBooking, "No Show")}
                    disabled={isProcessing}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Mark No-Show
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => setShowCheckInDialog(false)}
                >
                  Cancel
                </Button>
                {getStatusConfig(selectedBooking.status).action && (
                  <Button 
                    onClick={() => handleAction(selectedBooking, getStatusConfig(selectedBooking.status).action!)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {getStatusConfig(selectedBooking.status).action}
                      </>
                    )}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Walk-In Customer Dialog */}
      <Dialog open={showWalkInDialog} onOpenChange={setShowWalkInDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary-600" />
              Walk-In Customer
            </DialogTitle>
            <DialogDescription>
              Register a walk-in customer and book services immediately
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="flex items-center justify-between py-4 border-b">
            {[
              { id: "customer", label: "Customer" },
              { id: "services", label: "Services" },
              { id: "assign", label: "Assign" },
              { id: "confirm", label: "Confirm" },
            ].map((step, index) => {
              const steps = ["customer", "services", "assign", "confirm"];
              const currentIndex = steps.indexOf(walkInStep);
              const stepIndex = steps.indexOf(step.id);
              const isActive = walkInStep === step.id;
              const isCompleted = stepIndex < currentIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isActive ? "bg-primary-500 text-white" :
                      isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className={`text-xs mt-1 ${isActive ? "text-primary-600 font-medium" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />}
                </div>
              );
            })}
          </div>

          <div className="py-4">
            {/* Step 1: Customer Info */}
            {walkInStep === "customer" && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Full Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="customerName"
                        placeholder="Customer name"
                        className="pl-10"
                        value={walkInForm.customerName}
                        onChange={(e) => setWalkInForm(prev => ({ ...prev, customerName: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone Number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="customerPhone"
                        placeholder="+234 800 000 0000"
                        className="pl-10"
                        value={walkInForm.customerPhone}
                        onChange={(e) => setWalkInForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email (Optional)</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="customer@email.com"
                      className="pl-10"
                      value={walkInForm.customerEmail}
                      onChange={(e) => setWalkInForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> If the customer is returning, search by phone number to auto-fill their details.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Select Services */}
            {walkInStep === "services" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Select one or more services for this customer:</p>
                
                {/* Selected Services */}
                {walkInForm.selectedServices.length > 0 && (
                  <div className="bg-primary-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-primary-700">Selected Services:</p>
                    {walkInForm.selectedServices.map(selected => {
                      const service = services.find(s => s.id === selected.serviceId);
                      return (
                        <div key={selected.serviceId} className="flex items-center justify-between bg-white rounded-lg p-2">
                          <div>
                            <span className="font-medium">{service?.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({selected.duration} min)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{formatCurrency(selected.price)}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeServiceFromWalkIn(selected.serviceId)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total: {getWalkInDuration()} min</span>
                      <span className="text-primary-600">{formatCurrency(getWalkInTotal())}</span>
                    </div>
                  </div>
                )}

                {/* Service Categories */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {serviceCategories.map(category => (
                    <div key={category.id}>
                      <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
                      <div className="grid gap-2">
                        {services.filter(s => s.category === category.id).map(service => {
                          const isSelected = walkInForm.selectedServices.some(s => s.serviceId === service.id);
                          const defaultDuration = service.duration[0];
                          const defaultPrice = service.price[defaultDuration];
                          
                          return (
                            <div
                              key={service.id}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                isSelected 
                                  ? "border-primary-500 bg-primary-50" 
                                  : "border-border hover:border-primary-300"
                              }`}
                              onClick={() => {
                                if (isSelected) {
                                  removeServiceFromWalkIn(service.id);
                                } else {
                                  addServiceToWalkIn(service.id, defaultDuration, defaultPrice);
                                }
                              }}
                            >
                              <div>
                                <span className="font-medium">{service.name}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  ({service.duration.join("/")} min)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-primary-600 font-medium">
                                  {formatCurrency(defaultPrice)}
                                </span>
                                {isSelected ? (
                                  <CheckCircle className="h-5 w-5 text-primary-600" />
                                ) : (
                                  <Plus className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Assign Therapist & Room */}
            {walkInStep === "assign" && (
              <div className="space-y-6">
                <div>
                  <Label>Assign Therapist (Optional)</Label>
                  <p className="text-sm text-gray-500 mb-3">Select an available therapist for this session</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {therapists.map(therapist => (
                      <div
                        key={therapist.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          !therapist.available 
                            ? "opacity-50 cursor-not-allowed bg-gray-50" 
                            : walkInForm.therapistId === therapist.id
                              ? "border-primary-500 bg-primary-50"
                              : "border-border hover:border-primary-300"
                        }`}
                        onClick={() => therapist.available && setWalkInForm(prev => ({ 
                          ...prev, 
                          therapistId: prev.therapistId === therapist.id ? "" : therapist.id 
                        }))}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-700">
                                {therapist.name.split(" ").map(n => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{therapist.name}</p>
                              <p className="text-xs text-gray-500">
                                {therapist.available ? "Available" : "Busy"}
                              </p>
                            </div>
                          </div>
                          {walkInForm.therapistId === therapist.id && (
                            <CheckCircle className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Assign Room (Optional)</Label>
                  <p className="text-sm text-gray-500 mb-3">Select a treatment room</p>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {rooms.map(room => (
                      <div
                        key={room.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                          walkInForm.roomId === room.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-border hover:border-primary-300"
                        }`}
                        onClick={() => setWalkInForm(prev => ({ 
                          ...prev, 
                          roomId: prev.roomId === room.id ? "" : room.id 
                        }))}
                      >
                        <p className="font-medium text-sm">{room.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Special Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    placeholder="Any allergies, preferences, or special requests..."
                    className="mt-1 w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                    value={walkInForm.notes}
                    onChange={(e) => setWalkInForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirm & Pay */}
            {walkInStep === "confirm" && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-gray-600">Customer</span>
                      <span className="font-medium">{walkInForm.customerName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium">{walkInForm.customerPhone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-gray-600">Services</span>
                      <span className="font-medium text-right">
                        {walkInForm.selectedServices.map(s => 
                          services.find(svc => svc.id === s.serviceId)?.name
                        ).join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{getWalkInDuration()} minutes</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-gray-600">Therapist</span>
                      <span className="font-medium">
                        {therapists.find(t => t.id === walkInForm.therapistId)?.name || "Not assigned"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-gray-600">Room</span>
                      <span className="font-medium">
                        {rooms.find(r => r.id === walkInForm.roomId)?.name || "Not assigned"}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between py-1 text-lg">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-bold text-primary-600">{formatCurrency(getWalkInTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Option */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="font-medium">Collect Payment Now</p>
                        <p className="text-sm text-gray-600">Customer will pay before starting</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={walkInForm.payNow}
                      onCheckedChange={(checked) => setWalkInForm(prev => ({ ...prev, payNow: checked as boolean }))}
                    />
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Customer will be immediately checked in and ready to start their session.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                if (walkInStep === "customer") {
                  setShowWalkInDialog(false);
                } else {
                  const steps: typeof walkInStep[] = ["customer", "services", "assign", "confirm"];
                  const currentIndex = steps.indexOf(walkInStep);
                  setWalkInStep(steps[currentIndex - 1]);
                }
              }}
            >
              {walkInStep === "customer" ? "Cancel" : "Back"}
            </Button>
            
            {walkInStep === "confirm" ? (
              <Button onClick={handleWalkInSubmit} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check In Customer
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  const steps: typeof walkInStep[] = ["customer", "services", "assign", "confirm"];
                  const currentIndex = steps.indexOf(walkInStep);
                  setWalkInStep(steps[currentIndex + 1]);
                }}
                disabled={!canProceedWalkIn()}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
