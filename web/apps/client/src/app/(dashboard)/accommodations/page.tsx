"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Bed,
  Bath,
  Users,
  Wifi,
  Star,
  Calendar,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Textarea,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";
import {
  AccommodationsApiClient,
  Accommodation,
} from "@/infrastructure/api/accommodations.client";

function getTypeBadgeClasses(type: string): string {
  switch (type.toUpperCase()) {
    case "PREMIUM":
      return "bg-purple-100 text-purple-700";
    case "STANDARD":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getGradientForType(type: string): string {
  switch (type.toUpperCase()) {
    case "PREMIUM":
      return "from-purple-600 to-purple-400";
    case "STANDARD":
      return "from-blue-600 to-blue-400";
    default:
      return "from-gray-600 to-gray-400";
  }
}

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedApartment, setExpandedApartment] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Accommodation | null>(null);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    specialRequests: "",
  });

  useEffect(() => {
    async function fetchAccommodations() {
      setLoading(true);
      setError(null);
      try {
        const response = await AccommodationsApiClient.getAccommodations();
        if (response.isError) {
          setError(response.errorMessage || "Failed to load accommodations");
        } else {
          setAccommodations(response.data ?? []);
        }
      } catch {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchAccommodations();
  }, []);

  const calculatedNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkInDate, checkOutDate]);

  const totalPrice = useMemo(() => {
    if (!selectedApartment || calculatedNights <= 0) return 0;
    return selectedApartment.pricePerNight * calculatedNights;
  }, [selectedApartment, calculatedNights]);

  const handleCheckAvailability = (apartmentId: string) => {
    if (expandedApartment === apartmentId) {
      setExpandedApartment(null);
    } else {
      setExpandedApartment(apartmentId);
      setCheckInDate("");
      setCheckOutDate("");
    }
  };

  const handleBookNow = (apartment: Accommodation) => {
    setSelectedApartment(apartment);
    setGuestDetails({ name: "", email: "", phone: "", guests: 1, specialRequests: "" });
    setBookingDialogOpen(true);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600 mb-4" />
        <p className="text-foreground-secondary">Loading accommodations...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertCircle className="h-7 w-7 text-red-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-foreground-secondary mb-6 text-center max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Empty state
  if (accommodations.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Accommodations
          </h1>
          <p className="text-foreground-secondary mt-1">
            Luxury stays for your wellness retreat
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Bed className="h-7 w-7 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            No accommodations available
          </h2>
          <p className="text-foreground-secondary text-center max-w-md">
            We don&apos;t have any accommodations listed at the moment. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          Accommodations
        </h1>
        <p className="text-foreground-secondary mt-1">
          Luxury stays for your wellness retreat
        </p>
      </div>

      {/* Apartment Cards */}
      <div className="space-y-8">
        {accommodations.map((apartment) => (
          <Card key={apartment.id} className="overflow-hidden">
            {/* Image Placeholder with Gradient */}
            <div
              className={`relative h-64 sm:h-72 bg-gradient-to-br ${getGradientForType(apartment.type)}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {apartment.name}
                  </h2>
                  <Badge className={getTypeBadgeClasses(apartment.type)}>
                    {apartment.type}
                  </Badge>
                </div>
                <p className="text-white/80 text-sm sm:text-base max-w-2xl">
                  {apartment.shortDescription || apartment.description}
                </p>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Bed className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Bath className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Users className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Max {apartment.capacity} Guest{apartment.capacity > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                {apartment.rating > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Star className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {apartment.rating} ({apartment.reviewCount})
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Check-in / Check-out times */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <Clock className="h-4 w-4" />
                  <span>Check-in: {apartment.checkInTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <Clock className="h-4 w-4" />
                  <span>Check-out: {apartment.checkOutTime}</span>
                </div>
                {apartment.minStay > 1 && (
                  <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <Calendar className="h-4 w-4" />
                    <span>Min stay: {apartment.minStay} nights</span>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {apartment.amenities && apartment.amenities.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {apartment.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="bg-primary-50 text-primary-700 font-normal"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-border rounded-xl">
                    <p className="text-xl sm:text-2xl font-bold text-primary-600">
                      {formatCurrency(apartment.pricePerNight)}
                    </p>
                    <p className="text-sm text-foreground-muted">per night</p>
                  </div>
                  {apartment.pricePerWeek != null && (
                    <div className="text-center p-4 border border-border rounded-xl">
                      <p className="text-xl sm:text-2xl font-bold text-primary-600">
                        {formatCurrency(apartment.pricePerWeek)}
                      </p>
                      <p className="text-sm text-foreground-muted">per week</p>
                    </div>
                  )}
                  {apartment.pricePerMonth != null && (
                    <div className="text-center p-4 border border-border rounded-xl">
                      <p className="text-xl sm:text-2xl font-bold text-primary-600">
                        {formatCurrency(apartment.pricePerMonth)}
                      </p>
                      <p className="text-sm text-foreground-muted">per month</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Check Availability Button */}
              <Button
                className="w-full"
                variant={expandedApartment === apartment.id ? "outline" : "default"}
                onClick={() => handleCheckAvailability(apartment.id)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Check Availability
              </Button>

              {/* Expanded Availability Section */}
              {expandedApartment === apartment.id && (
                <div className="border border-primary-200 bg-primary-50/50 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900">Select Your Dates</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`checkin-${apartment.id}`}>Check-in Date</Label>
                      <Input
                        id={`checkin-${apartment.id}`}
                        type="date"
                        min={todayStr}
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="mt-1 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`checkout-${apartment.id}`}>Check-out Date</Label>
                      <Input
                        id={`checkout-${apartment.id}`}
                        type="date"
                        min={checkInDate || todayStr}
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="mt-1 bg-white"
                      />
                    </div>
                  </div>

                  {calculatedNights > 0 && (
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Duration</span>
                        <span className="font-medium">
                          {calculatedNights} night{calculatedNights !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Price per night</span>
                        <span className="font-medium">
                          {formatCurrency(apartment.pricePerNight)}
                        </span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-primary-600">
                          {formatCurrency(apartment.pricePerNight * calculatedNights)}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={calculatedNights <= 0}
                    onClick={() => handleBookNow(apartment)}
                  >
                    Book Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              Review your stay and provide your details
            </DialogDescription>
          </DialogHeader>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm text-gray-900">Booking Summary</h4>
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Apartment</span>
              <span className="font-medium">{selectedApartment?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Dates</span>
              <span className="font-medium">
                {checkInDate} to {checkOutDate}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Duration</span>
              <span className="font-medium">
                {calculatedNights} night{calculatedNights !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Price per night</span>
              <span className="font-medium">
                {selectedApartment ? formatCurrency(selectedApartment.pricePerNight) : ""}
              </span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary-600">{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          {/* Guest Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-900">Guest Details</h4>
            <div>
              <Label htmlFor="guest-name">Full Name</Label>
              <Input
                id="guest-name"
                placeholder="John Doe"
                value={guestDetails.name}
                onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="guest-email">Email</Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="john@example.com"
                value={guestDetails.email}
                onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="guest-phone">Phone</Label>
              <Input
                id="guest-phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={guestDetails.phone}
                onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="guest-count">Number of Guests</Label>
              <Input
                id="guest-count"
                type="number"
                min={1}
                max={selectedApartment?.capacity || 4}
                value={guestDetails.guests}
                onChange={(e) =>
                  setGuestDetails({ ...guestDetails, guests: parseInt(e.target.value) || 1 })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="special-requests">Special Requests</Label>
              <Textarea
                id="special-requests"
                placeholder="Any special requests for your stay?"
                value={guestDetails.specialRequests}
                onChange={(e) =>
                  setGuestDetails({ ...guestDetails, specialRequests: e.target.value })
                }
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          {/* Payment placeholder */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <p className="text-sm font-medium text-amber-800">
              Payment integration coming soon
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Online booking and payments will be available shortly.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Close
            </Button>
            <Button disabled>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
