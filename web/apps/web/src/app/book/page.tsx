"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CreditCard,
  Check,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  Shield,
  MapPin,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Badge,
  Separator,
} from "@radiance/ui";
import { services, serviceCategories as categories, addOns as addons } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

type BookingStep = "service" | "datetime" | "details" | "addons" | "payment" | "confirmation";

interface BookingState {
  serviceId: string | null;
  duration: number | null;
  date: string | null;
  time: string | null;
  guestCount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  selectedAddons: string[];
  paymentMethod: "card" | "transfer" | "paystack";
}

const steps: { id: BookingStep; label: string; icon: React.ElementType }[] = [
  { id: "service", label: "Select Service", icon: Sparkles },
  { id: "datetime", label: "Date & Time", icon: Calendar },
  { id: "details", label: "Your Details", icon: User },
  { id: "addons", label: "Add-ons", icon: Plus },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Confirmed", icon: Check },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  
  const [booking, setBooking] = useState<BookingState>({
    serviceId: null,
    duration: null,
    date: null,
    time: null,
    guestCount: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    selectedAddons: [],
    paymentMethod: "paystack",
  });

  const selectedService = useMemo(() => {
    return services.find((s) => s.id === booking.serviceId);
  }, [booking.serviceId]);

  const servicePrice = useMemo(() => {
    if (!selectedService || !booking.duration) return 0;
    return selectedService.price[booking.duration] || 0;
  }, [selectedService, booking.duration]);

  const addonsTotal = useMemo(() => {
    return booking.selectedAddons.reduce((total, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
  }, [booking.selectedAddons]);

  const totalPrice = useMemo(() => {
    return (servicePrice * booking.guestCount) + addonsTotal;
  }, [servicePrice, addonsTotal, booking.guestCount]);

  const filteredServices = useMemo(() => {
    if (!selectedCategory) return services;
    return services.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const availableAddons = useMemo(() => {
    if (!selectedService) return [];
    return addons.filter((a) => selectedService.addOns?.includes(a.id));
  }, [selectedService]);

  const generateBookingRef = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ref = "RW-";
    for (let i = 0; i < 8; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const stepOrder: BookingStep[] = ["service", "datetime", "details", "addons", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const stepOrder: BookingStep[] = ["service", "datetime", "details", "addons", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setBookingReference(generateBookingRef());
    setIsProcessing(false);
    nextStep();
  };

  const isStepComplete = (step: BookingStep): boolean => {
    switch (step) {
      case "service":
        return !!booking.serviceId && !!booking.duration;
      case "datetime":
        return !!booking.date && !!booking.time;
      case "details":
        return !!booking.firstName && !!booking.lastName && !!booking.email && !!booking.phone;
      case "addons":
        return true; // Add-ons are optional
      case "payment":
        return !!bookingReference;
      default:
        return false;
    }
  };

  const getNextDays = (count: number) => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-900">
            Book Your Experience
          </h1>
          <p className="text-foreground-secondary mt-2">
            Complete your booking in a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-primary-500 text-white"
                          : isCompleted
                          ? "bg-primary-500 text-white"
                          : "bg-primary-100 text-primary-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 hidden sm:block ${
                        isActive ? "text-primary-600 font-medium" : "text-foreground-muted"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 sm:w-16 md:w-24 h-0.5 mx-2 ${
                        isCompleted ? "bg-primary-500" : "bg-primary-100"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {currentStep === "service" && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Your Service</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Category Filter */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={selectedCategory === null ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                        >
                          All Services
                        </Button>
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {category.name}
                          </Button>
                        ))}
                      </div>

                      {/* Services List */}
                      <div className="space-y-4">
                        {filteredServices.map((service) => (
                          <div
                            key={service.id}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              booking.serviceId === service.id
                                ? "border-primary-500 bg-primary-50"
                                : "border-border hover:border-primary-300"
                            }`}
                            onClick={() => setBooking({
                              ...booking,
                              serviceId: service.id,
                              duration: service.duration[0],
                              selectedAddons: [],
                            })}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{service.name}</h3>
                                  {service.isPopular && (
                                    <Badge variant="secondary" className="bg-accent-100 text-accent-700">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-foreground-secondary mt-1">
                                  {service.shortDescription}
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                  <span className="text-sm text-foreground-muted">
                                    <Clock className="h-4 w-4 inline mr-1" />
                                    {service.duration.join(" or ")} min
                                  </span>
                                  <span className="text-sm text-foreground-muted">
                                    ★ {service.rating} ({service.reviewCount})
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary-600">
                                  {formatCurrency(Object.values(service.price)[0])}
                                </p>
                                <p className="text-xs text-foreground-muted">starting from</p>
                              </div>
                            </div>

                            {/* Duration Selection */}
                            {booking.serviceId === service.id && (
                              <div className="mt-4 pt-4 border-t">
                                <p className="text-sm font-medium mb-2">Select Duration:</p>
                                <div className="flex gap-2">
                                  {service.duration.map((duration) => (
                                    <Button
                                      key={duration}
                                      variant={booking.duration === duration ? "default" : "outline"}
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setBooking({ ...booking, duration });
                                      }}
                                    >
                                      {duration} min - {formatCurrency(service.price[duration])}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Guest Count */}
                      {booking.serviceId && (
                        <div className="pt-4 border-t">
                          <label className="text-sm font-medium mb-2 block">Number of Guests</label>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setBooking({
                                ...booking,
                                guestCount: Math.max(1, booking.guestCount - 1),
                              })}
                              disabled={booking.guestCount <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-xl font-semibold w-8 text-center">
                              {booking.guestCount}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setBooking({
                                ...booking,
                                guestCount: Math.min(6, booking.guestCount + 1),
                              })}
                              disabled={booking.guestCount >= 6}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === "datetime" && (
                <motion.div
                  key="datetime"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Choose Date & Time</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Date Selection */}
                      <div>
                        <label className="text-sm font-medium mb-3 block">Select Date</label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                          {getNextDays(14).map((date) => (
                            <button
                              key={formatDate(date)}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                booking.date === formatDate(date)
                                  ? "border-primary-500 bg-primary-50 text-primary-700"
                                  : "border-border hover:border-primary-300"
                              }`}
                              onClick={() => setBooking({ ...booking, date: formatDate(date) })}
                            >
                              <div className="text-xs text-foreground-muted">
                                {date.toLocaleDateString("en-NG", { weekday: "short" })}
                              </div>
                              <div className="text-lg font-semibold">{date.getDate()}</div>
                              <div className="text-xs">
                                {date.toLocaleDateString("en-NG", { month: "short" })}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      {booking.date && (
                        <div>
                          <label className="text-sm font-medium mb-3 block">Select Time</label>
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {timeSlots.map((time) => {
                              // Simulate some unavailable slots
                              const isUnavailable = Math.random() > 0.8;
                              return (
                                <button
                                  key={time}
                                  disabled={isUnavailable}
                                  className={`p-2 rounded-lg border text-sm transition-all ${
                                    booking.time === time
                                      ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                                      : isUnavailable
                                      ? "border-border bg-muted text-foreground-muted cursor-not-allowed"
                                      : "border-border hover:border-primary-300"
                                  }`}
                                  onClick={() => !isUnavailable && setBooking({ ...booking, time })}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-xs text-foreground-muted mt-2">
                            * Grayed out slots are unavailable
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Guest Details */}
              {currentStep === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                        <p className="text-sm text-primary-700">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Your email will be used to create your wellness profile and send booking confirmations.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            value={booking.firstName}
                            onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            value={booking.lastName}
                            onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={booking.email}
                          onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                          className="mt-1"
                        />
                        <p className="text-xs text-foreground-muted mt-1">
                          We'll use this to send your booking confirmation and create your profile
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={booking.phone}
                          onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes">Special Requests (Optional)</Label>
                        <textarea
                          id="notes"
                          placeholder="Any special requests or health conditions we should know about?"
                          value={booking.notes}
                          onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                          className="mt-1 w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Add-ons */}
              {currentStep === "addons" && (
                <motion.div
                  key="addons"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Enhance Your Experience</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {availableAddons.length > 0 ? (
                        <>
                          <p className="text-foreground-secondary">
                            Add these extras to make your experience even more special
                          </p>
                          {availableAddons.map((addon) => (
                            <div
                              key={addon.id}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                booking.selectedAddons.includes(addon.id)
                                  ? "border-primary-500 bg-primary-50"
                                  : "border-border hover:border-primary-300"
                              }`}
                              onClick={() => {
                                const isSelected = booking.selectedAddons.includes(addon.id);
                                setBooking({
                                  ...booking,
                                  selectedAddons: isSelected
                                    ? booking.selectedAddons.filter((id) => id !== addon.id)
                                    : [...booking.selectedAddons, addon.id],
                                });
                              }}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    checked={booking.selectedAddons.includes(addon.id)}
                                    className="mt-1"
                                  />
                                  <div>
                                    <h4 className="font-medium">{addon.name}</h4>
                                    <p className="text-sm text-foreground-secondary mt-1">
                                      {addon.description}
                                    </p>
                                    {addon.duration && (
                                      <span className="text-xs text-foreground-muted">
                                        +{addon.duration} min
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <span className="font-semibold text-primary-600">
                                  +{formatCurrency(addon.price)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Sparkles className="h-12 w-12 text-primary-300 mx-auto mb-3" />
                          <p className="text-foreground-secondary">
                            No add-ons available for this service
                          </p>
                          <p className="text-sm text-foreground-muted mt-1">
                            You can proceed to payment
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 5: Payment */}
              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                        <p className="text-sm text-accent-700 font-medium">
                          <Shield className="h-4 w-4 inline mr-2" />
                          Your payment is secure and encrypted
                        </p>
                      </div>

                      <RadioGroup
                        value={booking.paymentMethod}
                        onValueChange={(value: "card" | "transfer" | "paystack") =>
                          setBooking({ ...booking, paymentMethod: value })
                        }
                      >
                        <div
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            booking.paymentMethod === "paystack"
                              ? "border-primary-500 bg-primary-50"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="paystack" id="paystack" />
                            <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                              <div className="font-medium">Pay with Paystack</div>
                              <div className="text-sm text-foreground-secondary">
                                Card, Bank Transfer, USSD
                              </div>
                            </Label>
                            <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                              Recommended
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            booking.paymentMethod === "card"
                              ? "border-primary-500 bg-primary-50"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-foreground-secondary">
                                Visa, Mastercard, Verve
                              </div>
                            </Label>
                          </div>
                        </div>

                        <div
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            booking.paymentMethod === "transfer"
                              ? "border-primary-500 bg-primary-50"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                              <div className="font-medium">Bank Transfer</div>
                              <div className="text-sm text-foreground-secondary">
                                Pay directly to our bank account
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>

                      {booking.paymentMethod === "card" && (
                        <div className="space-y-4 pt-4 border-t">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" className="mt-1" />
                            </div>
                          </div>
                        </div>
                      )}

                      {booking.paymentMethod === "transfer" && (
                        <div className="bg-muted rounded-lg p-4 mt-4">
                          <h4 className="font-medium mb-2">Bank Details</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-foreground-muted">Bank:</span> First Bank of Nigeria</p>
                            <p><span className="text-foreground-muted">Account Name:</span> Radiance Wellness Ltd</p>
                            <p><span className="text-foreground-muted">Account Number:</span> 1234567890</p>
                          </div>
                          <p className="text-xs text-foreground-muted mt-3">
                            Please use your booking reference as payment description
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 6: Confirmation */}
              {currentStep === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="text-center">
                    <CardContent className="pt-12 pb-8">
                      <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="h-10 w-10 text-primary-600" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-primary-900 mb-2">
                        Booking Confirmed!
                      </h2>
                      <p className="text-foreground-secondary mb-6">
                        Your wellness experience has been booked successfully
                      </p>

                      <div className="bg-primary-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                        <p className="text-sm text-foreground-muted mb-1">Booking Reference</p>
                        <p className="text-2xl font-mono font-bold text-primary-700">
                          {bookingReference}
                        </p>
                      </div>

                      <div className="space-y-3 text-left max-w-md mx-auto bg-muted rounded-lg p-4">
                        <div className="flex justify-between">
                          <span className="text-foreground-muted">Service</span>
                          <span className="font-medium">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground-muted">Date</span>
                          <span className="font-medium">
                            {booking.date && new Date(booking.date).toLocaleDateString("en-NG", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground-muted">Time</span>
                          <span className="font-medium">{booking.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground-muted">Guests</span>
                          <span className="font-medium">{booking.guestCount}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg">
                          <span className="font-medium">Total Paid</span>
                          <span className="font-bold text-primary-600">
                            {formatCurrency(totalPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <p className="text-sm text-foreground-muted">
                          A confirmation email has been sent to{" "}
                          <span className="font-medium text-foreground">{booking.email}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button asChild>
                            <Link href="/">Return to Home</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/services">Book Another Service</Link>
                          </Button>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <h4 className="font-medium mb-2">Visit Us</h4>
                        <p className="text-sm text-foreground-secondary flex items-center justify-center gap-2">
                          <MapPin className="h-4 w-4" />
                          1 Setif Close, Adzope Crescent, Off Kumasi Crescent, Wuse 2, Abuja
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== "confirmation" && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === "service"}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                {currentStep === "payment" ? (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="min-w-[150px]"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay {formatCurrency(totalPrice)}
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    disabled={!isStepComplete(currentStep)}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          {currentStep !== "confirmation" && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedService ? (
                    <>
                      <div>
                        <h4 className="font-medium">{selectedService.name}</h4>
                        <p className="text-sm text-foreground-muted">
                          {booking.duration} minutes
                        </p>
                      </div>

                      {booking.date && booking.time && (
                        <div className="flex items-start gap-3 text-sm">
                          <Calendar className="h-4 w-4 text-foreground-muted mt-0.5" />
                          <div>
                            <p className="font-medium">
                              {new Date(booking.date).toLocaleDateString("en-NG", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                              })}
                            </p>
                            <p className="text-foreground-muted">at {booking.time}</p>
                          </div>
                        </div>
                      )}

                      {booking.guestCount > 1 && (
                        <div className="flex items-center gap-3 text-sm">
                          <User className="h-4 w-4 text-foreground-muted" />
                          <span>{booking.guestCount} guests</span>
                        </div>
                      )}

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>
                            {selectedService.name} x {booking.guestCount}
                          </span>
                          <span>{formatCurrency(servicePrice * booking.guestCount)}</span>
                        </div>
                        
                        {booking.selectedAddons.map((addonId) => {
                          const addon = addons.find((a) => a.id === addonId);
                          return addon ? (
                            <div key={addonId} className="flex justify-between text-foreground-muted">
                              <span>+ {addon.name}</span>
                              <span>{formatCurrency(addon.price)}</span>
                            </div>
                          ) : null;
                        })}
                      </div>

                      <Separator />

                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-foreground-muted text-sm text-center py-4">
                      Select a service to see your booking summary
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
