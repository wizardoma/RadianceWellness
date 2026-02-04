"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ChevronRight, Plus, Sparkles } from "lucide-react";
import { Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

const mockBookings = {
  upcoming: [
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
  ],
  past: [
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
  ],
};

const BookingCard = ({ booking, isPast = false }: { booking: typeof mockBookings.upcoming[0], isPast?: boolean }) => (
  <div className="bg-white rounded-xl border border-border p-4">
    <div className="flex gap-3">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isPast ? "bg-gray-100" : "bg-primary-100"}`}>
        <Sparkles className={`h-6 w-6 ${isPast ? "text-gray-400" : "text-primary-600"}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900">{booking.service}</h3>
          <Badge className={isPast ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"}>
            {booking.status}
          </Badge>
        </div>
        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {booking.date} at {booking.time}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {booking.duration} minutes
          </div>
          {booking.therapist && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              with {booking.therapist}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <span className="font-semibold text-primary-600">{formatCurrency(booking.price)}</span>
          {!isPast && (
            <button className="text-sm text-primary-600 font-medium flex items-center">
              Manage <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {isPast && (
            <Link href={`/book?service=${booking.id}`} className="text-sm text-primary-600 font-medium flex items-center">
              Book Again <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function BookingsPage() {
  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500">Manage your appointments</p>
        </div>
        <Button size="sm" asChild>
          <Link href="/book">
            <Plus className="h-4 w-4 mr-1" />
            Book
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({mockBookings.upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({mockBookings.past.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {mockBookings.upcoming.length > 0 ? (
            mockBookings.upcoming.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No upcoming bookings</p>
              <Button asChild>
                <Link href="/book">Book a Service</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-4 space-y-3">
          {mockBookings.past.map((booking) => (
            <BookingCard key={booking.id} booking={booking} isPast />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
