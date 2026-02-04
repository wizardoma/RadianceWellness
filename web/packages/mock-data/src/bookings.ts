import type { Booking } from "@radiance/types";

export const bookings: Booking[] = [
  {
    id: "b1",
    reference: "RWC-2026-00125",
    customerId: "c1",
    customerName: "Sarah Mitchell",
    customerEmail: "sarah.mitchell@email.com",
    customerPhone: "+234 801 234 5678",
    type: "service",
    items: [
      { type: "service", id: "swedish-massage", name: "Swedish Massage", duration: 60, price: 25000, quantity: 1 },
      { type: "addon", id: "aromatherapy", name: "Aromatherapy Enhancement", duration: 0, price: 5000, quantity: 1 },
    ],
    date: "2026-02-04",
    startTime: "14:00",
    endTime: "15:00",
    duration: 60,
    status: "confirmed",
    paymentStatus: "paid",
    subtotal: 30000,
    discount: 4500,
    tax: 1912,
    total: 27412,
    notes: "Please use unscented products",
    staffId: "s1",
    staffName: "Michael Kalu",
    createdAt: "2026-02-03T10:15:00Z",
    updatedAt: "2026-02-03T10:15:00Z",
  },
  {
    id: "b2",
    reference: "RWC-2026-00124",
    customerId: "c2",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+234 802 345 6789",
    type: "service",
    items: [
      { type: "service", id: "deep-tissue-massage", name: "Deep Tissue Massage", duration: 60, price: 30000, quantity: 1 },
      { type: "service", id: "sauna-session", name: "Sauna Session", duration: 30, price: 10000, quantity: 1 },
    ],
    date: "2026-02-04",
    startTime: "09:00",
    endTime: "10:30",
    duration: 90,
    status: "completed",
    paymentStatus: "paid",
    subtotal: 40000,
    discount: 0,
    tax: 3000,
    total: 43000,
    staffId: "s2",
    staffName: "Sarah Thompson",
    createdAt: "2026-02-01T14:30:00Z",
    updatedAt: "2026-02-04T10:30:00Z",
  },
  {
    id: "b3",
    reference: "RWC-2026-00123",
    customerId: "c3",
    customerName: "Amara Okonkwo",
    customerEmail: "amara.o@email.com",
    customerPhone: "+234 803 456 7890",
    type: "package",
    items: [
      { type: "package", id: "couples-retreat", name: "Couples Retreat Package", duration: 90, price: 55000, quantity: 1 },
    ],
    date: "2026-02-05",
    startTime: "15:00",
    endTime: "16:30",
    duration: 90,
    status: "pending",
    paymentStatus: "pending",
    subtotal: 55000,
    discount: 0,
    tax: 4125,
    total: 59125,
    notes: "Anniversary celebration - please have champagne ready",
    createdAt: "2026-02-03T16:45:00Z",
    updatedAt: "2026-02-03T16:45:00Z",
  },
  {
    id: "b4",
    reference: "RWC-2026-00122",
    customerId: "c4",
    customerName: "Tunde Adeleke",
    customerEmail: "tunde.a@email.com",
    customerPhone: "+234 804 567 8901",
    type: "service",
    items: [
      { type: "service", id: "signature-facial", name: "Signature Facial", duration: 60, price: 20000, quantity: 1 },
    ],
    date: "2026-02-04",
    startTime: "11:00",
    endTime: "12:00",
    duration: 60,
    status: "confirmed",
    paymentStatus: "paid",
    subtotal: 20000,
    discount: 0,
    tax: 1500,
    total: 21500,
    staffId: "s3",
    staffName: "Ada Obi",
    createdAt: "2026-02-02T09:00:00Z",
    updatedAt: "2026-02-02T09:00:00Z",
  },
  {
    id: "b5",
    reference: "RWC-2026-00121",
    customerId: "c5",
    customerName: "Mary Kalu",
    customerEmail: "mary.k@email.com",
    customerPhone: "+234 805 678 9012",
    type: "service",
    items: [
      { type: "service", id: "hammam-experience", name: "Hammam Experience", duration: 60, price: 20000, quantity: 1 },
      { type: "addon", id: "body-mask", name: "Detox Body Mask", duration: 20, price: 10000, quantity: 1 },
    ],
    date: "2026-02-04",
    startTime: "16:00",
    endTime: "17:20",
    duration: 80,
    status: "confirmed",
    paymentStatus: "paid",
    subtotal: 30000,
    discount: 0,
    tax: 2250,
    total: 32250,
    staffId: "s2",
    staffName: "Sarah Thompson",
    createdAt: "2026-02-03T11:30:00Z",
    updatedAt: "2026-02-03T11:30:00Z",
  },
];

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function getBookingByReference(reference: string): Booking | undefined {
  return bookings.find((b) => b.reference === reference);
}

export function getBookingsByDate(date: string): Booking[] {
  return bookings.filter((b) => b.date === date);
}

export function getBookingsByCustomerId(customerId: string): Booking[] {
  return bookings.filter((b) => b.customerId === customerId);
}

export function getBookingsByStatus(status: string): Booking[] {
  return bookings.filter((b) => b.status === status);
}

export function getTodaysBookings(): Booking[] {
  const today = new Date().toISOString().split("T")[0];
  return getBookingsByDate(today);
}

export function getUpcomingBookings(): Booking[] {
  const today = new Date().toISOString().split("T")[0];
  return bookings.filter((b) => b.date >= today && b.status !== "cancelled");
}
