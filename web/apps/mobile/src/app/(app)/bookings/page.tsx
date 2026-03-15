"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
  Sparkles,
  CalendarPlus,
  X as XIcon,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { Button, Badge, Separator } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BookingData {
  id: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  therapist: string | null;
  price: number;
  status: "confirmed" | "completed" | "cancelled";
  cancelReason?: string;
}

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderData {
  id: string;
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  deliveryMethod: string;
  trackingNumber?: string;
  timeline: { label: string; date: string; done: boolean }[];
}

type ActiveSection = "bookings" | "orders";
type BookingFilter = "all" | "upcoming" | "completed" | "cancelled";
type OrderFilter = "all" | "processing" | "shipped" | "delivered" | "cancelled";
type ManageView = "list" | "manage" | "reschedule" | "cancel-confirm";
type OrderView = "list" | "detail";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const initialBookings: BookingData[] = [
  {
    id: "1",
    service: "Swedish Massage",
    date: "Feb 8, 2026",
    time: "3:00 PM",
    duration: 60,
    therapist: "Chidi Eze",
    price: 25000,
    status: "confirmed",
  },
  {
    id: "2",
    service: "Hammam Experience",
    date: "Feb 15, 2026",
    time: "2:00 PM",
    duration: 90,
    therapist: "Fatima Mohammed",
    price: 35000,
    status: "confirmed",
  },
  {
    id: "3",
    service: "Deep Tissue Massage",
    date: "Jan 25, 2026",
    time: "11:00 AM",
    duration: 60,
    therapist: "Chidi Eze",
    price: 30000,
    status: "completed",
  },
  {
    id: "4",
    service: "Classic Facial",
    date: "Jan 15, 2026",
    time: "10:00 AM",
    duration: 45,
    therapist: "Amina Bello",
    price: 18000,
    status: "completed",
  },
  {
    id: "5",
    service: "Sauna Session",
    date: "Jan 10, 2026",
    time: "4:00 PM",
    duration: 45,
    therapist: null,
    price: 14000,
    status: "completed",
  },
  {
    id: "6",
    service: "Aromatherapy Massage",
    date: "Dec 20, 2025",
    time: "1:00 PM",
    duration: 60,
    therapist: "Chidi Eze",
    price: 28000,
    status: "cancelled",
    cancelReason: "Schedule conflict",
  },
];

const mockOrders: OrderData[] = [
  {
    id: "o1",
    orderId: "ORD-20260210",
    date: "Feb 10, 2026",
    items: [
      { name: "Glow Face Cream", qty: 1, price: 12500 },
      { name: "Vitamin C Serum", qty: 2, price: 18500 },
    ],
    total: 49500,
    status: "Processing",
    deliveryMethod: "Standard Delivery",
    timeline: [
      { label: "Order placed", date: "Feb 10, 2026", done: true },
      { label: "Payment confirmed", date: "Feb 10, 2026", done: true },
      { label: "Shipped", date: "", done: false },
      { label: "Delivered", date: "", done: false },
    ],
  },
  {
    id: "o2",
    orderId: "ORD-20260203",
    date: "Feb 3, 2026",
    items: [
      { name: "Body Lotion", qty: 1, price: 8900 },
      { name: "Aromatherapy Set", qty: 1, price: 35000 },
    ],
    total: 43900,
    status: "Shipped",
    deliveryMethod: "Express Delivery",
    trackingNumber: "NGP-28374651",
    timeline: [
      { label: "Order placed", date: "Feb 3, 2026", done: true },
      { label: "Payment confirmed", date: "Feb 3, 2026", done: true },
      { label: "Shipped", date: "Feb 5, 2026", done: true },
      { label: "Delivered", date: "", done: false },
    ],
  },
  {
    id: "o3",
    orderId: "ORD-20260125",
    date: "Jan 25, 2026",
    items: [
      { name: "Glow Face Cream", qty: 2, price: 12500 },
    ],
    total: 25000,
    status: "Delivered",
    deliveryMethod: "Standard Delivery",
    timeline: [
      { label: "Order placed", date: "Jan 25, 2026", done: true },
      { label: "Payment confirmed", date: "Jan 25, 2026", done: true },
      { label: "Shipped", date: "Jan 27, 2026", done: true },
      { label: "Delivered", date: "Jan 30, 2026", done: true },
    ],
  },
  {
    id: "o4",
    orderId: "ORD-20260115",
    date: "Jan 15, 2026",
    items: [
      { name: "Hair Treatment Oil", qty: 1, price: 15000 },
    ],
    total: 15000,
    status: "Cancelled",
    deliveryMethod: "Standard Delivery",
    timeline: [
      { label: "Order placed", date: "Jan 15, 2026", done: true },
      { label: "Cancelled", date: "Jan 16, 2026", done: true },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper: pill button classes
// ---------------------------------------------------------------------------

function parentPillClass(active: boolean) {
  return [
    "px-5 py-2 rounded-full text-sm font-semibold transition-colors",
    active
      ? "bg-primary text-primary-foreground"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200",
  ].join(" ");
}

function subPillClass(active: boolean) {
  return [
    "px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
    active
      ? "bg-primary/10 text-primary-700 ring-1 ring-primary/30"
      : "bg-gray-100 text-gray-500 hover:bg-gray-200",
  ].join(" ");
}

// ---------------------------------------------------------------------------
// Status badge helpers
// ---------------------------------------------------------------------------

function bookingBadgeClass(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-gray-100 text-gray-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function orderBadgeClass(status: string) {
  switch (status) {
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Shipped":
      return "bg-amber-100 text-amber-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function orderStatusIcon(status: string) {
  switch (status) {
    case "Processing":
      return <Package className="h-5 w-5 text-blue-500" />;
    case "Shipped":
      return <Truck className="h-5 w-5 text-amber-500" />;
    case "Delivered":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "Cancelled":
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Package className="h-5 w-5 text-gray-400" />;
  }
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function BookingsPage() {
  // --- Navigation state ---
  const [activeSection, setActiveSection] = useState<ActiveSection>("bookings");
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("all");
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("all");

  // --- Data state ---
  const [bookings, setBookings] = useState<BookingData[]>(initialBookings);

  // --- Inline view state ---
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [manageView, setManageView] = useState<ManageView>("list");
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [orderView, setOrderView] = useState<OrderView>("list");

  // --- Derived ---
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === "all") return true;
    if (bookingFilter === "upcoming") return b.status === "confirmed";
    return b.status === bookingFilter;
  });

  const filteredOrders = mockOrders.filter((o) => {
    if (orderFilter === "all") return true;
    return o.status.toLowerCase() === orderFilter;
  });

  // --- Handlers ---
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: "cancelled" as const, cancelReason: "Cancelled by user" }
          : b
      )
    );
    setManageView("list");
    setSelectedBooking(null);
  };

  const handleReschedule = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, date: newDate, time: newTime } : b
      )
    );
    setManageView("list");
    setSelectedBooking(null);
  };

  const handleAddToCalendar = (booking: BookingData) => {
    const title = encodeURIComponent(booking.service);
    const details = encodeURIComponent(
      `${booking.service} at Radiance Wellness with ${booking.therapist || "Any Therapist"}`
    );
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`,
      "_blank"
    );
    setManageView("list");
    setSelectedBooking(null);
  };

  const goBackToBookingList = () => {
    setSelectedBooking(null);
    setManageView("list");
  };

  const goBackToOrderList = () => {
    setSelectedOrder(null);
    setOrderView("list");
  };

  // --- Counts for sub-filter labels ---
  const bookingCounts = {
    all: bookings.length,
    upcoming: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const orderCounts = {
    all: mockOrders.length,
    processing: mockOrders.filter((o) => o.status === "Processing").length,
    shipped: mockOrders.filter((o) => o.status === "Shipped").length,
    delivered: mockOrders.filter((o) => o.status === "Delivered").length,
    cancelled: mockOrders.filter((o) => o.status === "Cancelled").length,
  };

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <div className="space-y-4 px-4 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500">Manage your appointments &amp; orders</p>
        </div>
        <Button size="sm" asChild>
          <Link href="/book">
            <Plus className="h-4 w-4 mr-1" />
            Book
          </Link>
        </Button>
      </div>

      {/* ---- Level 1: Parent Tabs (pill buttons) ---- */}
      <div className="flex gap-2">
        <button
          className={parentPillClass(activeSection === "bookings")}
          onClick={() => {
            setActiveSection("bookings");
            goBackToBookingList();
          }}
        >
          Bookings
        </button>
        <button
          className={parentPillClass(activeSection === "orders")}
          onClick={() => {
            setActiveSection("orders");
            goBackToOrderList();
          }}
        >
          Orders
        </button>
      </div>

      {/* ================================================================== */}
      {/* BOOKINGS SECTION                                                   */}
      {/* ================================================================== */}
      {activeSection === "bookings" && (
        <>
          {/* If we're in manage/reschedule view, show that inline panel */}
          {selectedBooking && manageView !== "list" ? (
            <BookingManagePanel
              booking={selectedBooking}
              manageView={manageView}
              setManageView={setManageView}
              onBack={goBackToBookingList}
              onCancel={handleCancelBooking}
              onReschedule={handleReschedule}
              onAddToCalendar={handleAddToCalendar}
            />
          ) : (
            <>
              {/* Sub-filter tabs */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {(
                  [
                    ["all", "All"],
                    ["upcoming", "Upcoming"],
                    ["completed", "Completed"],
                    ["cancelled", "Cancelled"],
                  ] as [BookingFilter, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    className={subPillClass(bookingFilter === key)}
                    onClick={() => setBookingFilter(key)}
                  >
                    {label} ({bookingCounts[key]})
                  </button>
                ))}
              </div>

              {/* Booking Cards */}
              <div className="space-y-3">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onManage={() => {
                        setSelectedBooking(booking);
                        setManageView("manage");
                      }}
                    />
                  ))
                ) : (
                  <EmptyBookings />
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* ================================================================== */}
      {/* ORDERS SECTION                                                     */}
      {/* ================================================================== */}
      {activeSection === "orders" && (
        <>
          {selectedOrder && orderView === "detail" ? (
            <OrderDetailPanel order={selectedOrder} onBack={goBackToOrderList} />
          ) : (
            <>
              {/* Sub-filter tabs */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {(
                  [
                    ["all", "All"],
                    ["processing", "Processing"],
                    ["shipped", "Shipped"],
                    ["delivered", "Delivered"],
                    ["cancelled", "Cancelled"],
                  ] as [OrderFilter, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    className={subPillClass(orderFilter === key)}
                    onClick={() => setOrderFilter(key)}
                  >
                    {label} ({orderCounts[key]})
                  </button>
                ))}
              </div>

              {/* Order Cards */}
              <div className="space-y-3">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onTap={() => {
                        setSelectedOrder(order);
                        setOrderView("detail");
                      }}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No orders found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// BookingCard
// ---------------------------------------------------------------------------

function BookingCard({
  booking,
  onManage,
}: {
  booking: BookingData;
  onManage: () => void;
}) {
  const isUpcoming = booking.status === "confirmed";
  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled";

  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className="flex gap-3">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${
            isCancelled
              ? "bg-red-50"
              : isUpcoming
                ? "bg-primary-100"
                : "bg-gray-100"
          }`}
        >
          <Sparkles
            className={`h-6 w-6 ${
              isCancelled
                ? "text-red-400"
                : isUpcoming
                  ? "text-primary-600"
                  : "text-gray-400"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {booking.service}
            </h3>
            <Badge className={bookingBadgeClass(booking.status)}>
              {booking.status}
            </Badge>
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>
                {booking.date} at {booking.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{booking.duration} minutes</span>
            </div>
            {booking.therapist && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>with {booking.therapist}</span>
              </div>
            )}
          </div>

          {/* Cancelled reason */}
          {isCancelled && booking.cancelReason && (
            <p className="mt-2 text-xs text-red-500 italic">
              Reason: {booking.cancelReason}
            </p>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <span className="font-semibold text-primary-600">
              {formatCurrency(booking.price)}
            </span>

            {isUpcoming && (
              <button
                className="text-sm text-primary-600 font-medium flex items-center"
                onClick={onManage}
              >
                Manage <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {isCompleted && (
              <Link
                href="/book"
                className="text-sm text-primary-600 font-medium flex items-center"
              >
                Book Again <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EmptyBookings
// ---------------------------------------------------------------------------

function EmptyBookings() {
  return (
    <div className="text-center py-12">
      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500 mb-4">No bookings found</p>
      <Button asChild>
        <Link href="/book">Book a Service</Link>
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BookingManagePanel (inline, not a dialog)
// ---------------------------------------------------------------------------

function BookingManagePanel({
  booking,
  manageView,
  setManageView,
  onBack,
  onCancel,
  onReschedule,
  onAddToCalendar,
}: {
  booking: BookingData;
  manageView: ManageView;
  setManageView: (v: ManageView) => void;
  onBack: () => void;
  onCancel: (id: string) => void;
  onReschedule: (id: string, date: string, time: string) => void;
  onAddToCalendar: (b: BookingData) => void;
}) {
  // --- Manage view ---
  if (manageView === "manage") {
    return (
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to bookings
        </button>

        <h2 className="text-lg font-bold text-gray-900">Manage Booking</h2>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Service</span>
            <span className="font-medium">{booking.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{booking.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Time</span>
            <span className="font-medium">{booking.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Duration</span>
            <span className="font-medium">{booking.duration} minutes</span>
          </div>
          {booking.therapist && (
            <div className="flex justify-between">
              <span className="text-gray-500">Therapist</span>
              <span className="font-medium">{booking.therapist}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary-600">
              {formatCurrency(booking.price)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setManageView("reschedule")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Reschedule
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onAddToCalendar(booking)}
          >
            <CalendarPlus className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
          <Button
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
            variant="outline"
            onClick={() => setManageView("cancel-confirm")}
          >
            <XIcon className="h-4 w-4 mr-2" />
            Cancel Booking
          </Button>
        </div>
      </div>
    );
  }

  // --- Reschedule view ---
  if (manageView === "reschedule") {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setManageView("manage")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h2 className="text-lg font-bold text-gray-900">Reschedule Booking</h2>
        <p className="text-sm text-gray-500">
          Choose a new date and time for {booking.service}
        </p>

        <RescheduleForm
          onConfirm={(newDate, newTime) =>
            onReschedule(booking.id, newDate, newTime)
          }
          onCancel={() => setManageView("manage")}
        />
      </div>
    );
  }

  // --- Cancel confirmation view ---
  if (manageView === "cancel-confirm") {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setManageView("manage")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h2 className="text-lg font-bold text-gray-900">Cancel Booking</h2>
        <p className="text-sm text-gray-500">
          Are you sure you want to cancel your{" "}
          <span className="font-medium">{booking.service}</span> on{" "}
          <span className="font-medium">{booking.date}</span>?
        </p>
        <p className="text-sm text-gray-400">
          This action cannot be undone. A refund will be processed within 3-5
          business days.
        </p>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setManageView("manage")}
          >
            Keep Booking
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onCancel(booking.id)}
          >
            Yes, Cancel
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// RescheduleForm (reused from original, minus Dialog dependency)
// ---------------------------------------------------------------------------

function RescheduleForm({
  onConfirm,
  onCancel,
}: {
  onConfirm: (date: string, time: string) => void;
  onCancel: () => void;
}) {
  const [newDate, setNewDate] = useState<string | null>(null);
  const [newTime, setNewTime] = useState<string | null>(null);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00",
  ];

  const getNextDays = (count: number) => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= count; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const formatDateKey = (d: Date) => d.toISOString().split("T")[0];

  const formatDisplayDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Select New Date</h4>
        <div className="grid grid-cols-5 gap-2">
          {getNextDays(10).map((d) => (
            <button
              key={formatDateKey(d)}
              onClick={() => setNewDate(formatDateKey(d))}
              className={`p-2 rounded-xl border text-center transition-all ${
                newDate === formatDateKey(d)
                  ? "border-primary-500 bg-primary-50"
                  : "border-border"
              }`}
            >
              <div className="text-xs text-gray-500">
                {d.toLocaleDateString("en-NG", { weekday: "short" })}
              </div>
              <div className="text-lg font-bold">{d.getDate()}</div>
            </button>
          ))}
        </div>
      </div>

      {newDate && (
        <div>
          <h4 className="text-sm font-medium mb-2">Select New Time</h4>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setNewTime(t)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  newTime === t
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="w-full"
          disabled={!newDate || !newTime}
          onClick={() => {
            if (newDate && newTime) {
              onConfirm(formatDisplayDate(newDate), newTime);
            }
          }}
        >
          Confirm Reschedule
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OrderCard
// ---------------------------------------------------------------------------

function OrderCard({
  order,
  onTap,
}: {
  order: OrderData;
  onTap: () => void;
}) {
  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <button
      className="w-full text-left bg-white rounded-xl border border-border p-4 hover:border-primary-200 transition-colors"
      onClick={onTap}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          {orderStatusIcon(order.status)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {order.orderId}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
            </div>
            <Badge className={orderBadgeClass(order.status)}>
              {order.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t">
            <span className="font-semibold text-primary-600">
              {formatCurrency(order.total)}
            </span>
            <span className="text-xs text-gray-400 flex items-center">
              {order.deliveryMethod}
              <ChevronRight className="h-3 w-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// OrderDetailPanel (inline, not a dialog)
// ---------------------------------------------------------------------------

function OrderDetailPanel({
  order,
  onBack,
}: {
  order: OrderData;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{order.orderId}</h2>
          <p className="text-sm text-gray-500">Placed on {order.date}</p>
        </div>
        <Badge className={orderBadgeClass(order.status)}>{order.status}</Badge>
      </div>

      {/* Delivery info */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Delivery Method</span>
          <span className="font-medium">{order.deliveryMethod}</span>
        </div>
        {order.trackingNumber && (
          <div className="flex justify-between">
            <span className="text-gray-500">Tracking Number</span>
            <span className="font-medium font-mono text-xs">
              {order.trackingNumber}
            </span>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-border p-4 space-y-2">
        <h4 className="font-medium text-sm text-gray-900 mb-2">Items</h4>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name}{" "}
              {item.qty > 1 && (
                <span className="text-gray-400">x{item.qty}</span>
              )}
            </span>
            <span className="font-medium">
              {formatCurrency(item.price * item.qty)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-primary-600">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-border p-4">
        <h4 className="font-medium text-sm text-gray-900 mb-3">
          Order Timeline
        </h4>
        <div className="space-y-0">
          {order.timeline.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${
                    step.done ? "bg-primary-500" : "bg-gray-200"
                  }`}
                />
                {idx < order.timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-8 ${
                      step.done ? "bg-primary-300" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <div className="pb-4">
                <p
                  className={`text-sm font-medium ${
                    step.done ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-gray-400">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
