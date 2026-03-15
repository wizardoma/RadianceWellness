"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bed,
  Bath,
  Users,
  Ruler,
  Wifi,
  Wind,
  UtensilsCrossed,
  Waves,
  Car,
  Tv,
  WashingMachine,
  ChevronDown,
  ChevronUp,
  Check,
  CreditCard,
  Calendar,
  Sparkles,
  X,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

interface Apartment {
  id: string;
  name: string;
  type: string;
  typeBadgeColor: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  sizeSqm: number;
  amenities: { icon: React.ElementType; label: string }[];
  pricePerNight: number;
  pricePerWeek: number;
  pricePerMonth: number;
  imageGradient: string;
}

const apartments: Apartment[] = [
  {
    id: "premium-luxury",
    name: "Premium Luxury Apartment",
    type: "Premium",
    typeBadgeColor: "bg-amber-100 text-amber-700",
    description:
      "Spacious 2-bedroom luxury apartment with modern amenities, full kitchen, and pool access. Perfect for couples or families seeking a premium wellness retreat.",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    sizeSqm: 85,
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Wind, label: "AC" },
      { icon: UtensilsCrossed, label: "Kitchen" },
      { icon: Waves, label: "Pool" },
      { icon: Car, label: "Parking" },
      { icon: Tv, label: "Smart TV" },
      { icon: WashingMachine, label: "Washer" },
    ],
    pricePerNight: 95000,
    pricePerWeek: 570000,
    pricePerMonth: 1900000,
    imageGradient: "from-primary-600 to-primary-400",
  },
  {
    id: "standard-comfort",
    name: "Standard Comfort Apartment",
    type: "Standard",
    typeBadgeColor: "bg-blue-100 text-blue-700",
    description:
      "Cozy 1-bedroom apartment with essential amenities and a kitchenette. Ideal for solo travelers or couples looking for a comfortable wellness getaway.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    sizeSqm: 45,
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Wind, label: "AC" },
      { icon: UtensilsCrossed, label: "Kitchenette" },
      { icon: Tv, label: "Smart TV" },
    ],
    pricePerNight: 55000,
    pricePerWeek: 330000,
    pricePerMonth: 1100000,
    imageGradient: "from-blue-600 to-blue-400",
  },
];

const addOnServices = [
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    description: "60-minute full body relaxation massage",
    price: 25000,
  },
  {
    id: "sauna-session",
    name: "Sauna Session",
    description: "30-minute private sauna with aromatherapy",
    price: 10000,
  },
  {
    id: "couples-package",
    name: "Couples Package",
    description: "Side-by-side massage with champagne & chocolates",
    price: 50000,
  },
  {
    id: "facial-treatment",
    name: "Luxury Facial",
    description: "45-minute rejuvenating facial with premium products",
    price: 20000,
  },
];

export default function AccommodationsPage() {
  const [expandedApartment, setExpandedApartment] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    specialRequests: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

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

  const handleBookNow = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setBookingConfirmed(false);
    setIsProcessing(false);
    setGuestDetails({ name: "", email: "", phone: "", guests: 1, specialRequests: "" });
    setPaymentDetails({ cardNumber: "", expiry: "", cvv: "", cardName: "" });
    setBookingDialogOpen(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setBookingConfirmed(true);
  };

  const todayStr = new Date().toISOString().split("T")[0];

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
        {apartments.map((apartment) => (
          <Card key={apartment.id} className="overflow-hidden">
            {/* Image Placeholder with Gradient */}
            <div className={`relative h-64 sm:h-72 bg-gradient-to-br ${apartment.imageGradient}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {apartment.name}
                  </h2>
                  <Badge className={apartment.typeBadgeColor}>{apartment.type}</Badge>
                </div>
                <p className="text-white/80 text-sm sm:text-base max-w-2xl">
                  {apartment.description}
                </p>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Bed className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{apartment.bedrooms} Bedroom{apartment.bedrooms > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Bath className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{apartment.bathrooms} Bathroom{apartment.bathrooms > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Users className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Max {apartment.maxGuests} Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Ruler className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{apartment.sizeSqm}sqm</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {apartment.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.label}
                        className="flex items-center gap-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm"
                      >
                        <Icon className="h-4 w-4" />
                        {amenity.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

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
                  <div className="text-center p-4 border border-border rounded-xl">
                    <p className="text-xl sm:text-2xl font-bold text-primary-600">
                      {formatCurrency(apartment.pricePerWeek)}
                    </p>
                    <p className="text-sm text-foreground-muted">per week</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-xl">
                    <p className="text-xl sm:text-2xl font-bold text-primary-600">
                      {formatCurrency(apartment.pricePerMonth)}
                    </p>
                    <p className="text-sm text-foreground-muted">per month</p>
                  </div>
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
                {expandedApartment === apartment.id ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
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
                        <span className="font-medium">{formatCurrency(apartment.pricePerNight)}</span>
                      </div>
                      <Separator />
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

      {/* Add-on Services */}
      <div>
        <div className="mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-gray-900">
            Enhance Your Stay
          </h2>
          <p className="text-foreground-secondary mt-1">
            Enhance your stay with spa services
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOnServices.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-foreground-secondary">{service.description}</p>
                <p className="text-lg font-bold text-primary-600">{formatCurrency(service.price)}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/book">Book Service</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {bookingConfirmed ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-foreground-secondary mb-4">
                Your accommodation has been booked successfully. A confirmation email will be sent to{" "}
                {guestDetails.email || "your email"}.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Apartment</span>
                  <span className="font-medium">{selectedApartment?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Check-in</span>
                  <span className="font-medium">{checkInDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Check-out</span>
                  <span className="font-medium">{checkOutDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total Paid</span>
                  <span className="font-bold text-primary-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              <Button onClick={() => setBookingDialogOpen(false)} className="w-full">
                Done
              </Button>
            </div>
          ) : (
            <>
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
                <Separator />
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
                    max={selectedApartment?.maxGuests || 4}
                    value={guestDetails.guests}
                    onChange={(e) =>
                      setGuestDetails({ ...guestDetails, guests: parseInt(e.target.value) || 1 })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <textarea
                    id="special-requests"
                    placeholder="Any special requests for your stay?"
                    value={guestDetails.specialRequests}
                    onChange={(e) =>
                      setGuestDetails({ ...guestDetails, specialRequests: e.target.value })
                    }
                    className="mt-1 w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Details
                </h4>
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="card-expiry">Expiry Date</Label>
                    <Input
                      id="card-expiry"
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, expiry: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input
                      id="card-cvv"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, cardName: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>Pay {formatCurrency(totalPrice)}</>
                )}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
