"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Check,
  Plus,
  Minus,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Separator,
} from "@radiance/ui";
import { services, serviceCategories, addOns as addons } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

type BookingStep = "service" | "datetime" | "addons" | "confirm";

interface BookingState {
  serviceId: string | null;
  duration: number | null;
  date: string | null;
  time: string | null;
  selectedAddons: string[];
  notes: string;
}

const steps = [
  { id: "service", label: "Select Service" },
  { id: "datetime", label: "Date & Time" },
  { id: "addons", label: "Add-ons" },
  { id: "confirm", label: "Confirm" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
];

export default function BookServicePage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  
  const [booking, setBooking] = useState<BookingState>({
    serviceId: null,
    duration: null,
    date: null,
    time: null,
    selectedAddons: [],
    notes: "",
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

  const totalPrice = servicePrice + addonsTotal;

  const filteredServices = useMemo(() => {
    let result = services;
    if (selectedCategory) {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter((s) => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const availableAddons = useMemo(() => {
    if (!selectedService) return [];
    return addons.filter((a) => selectedService.addOns?.includes(a.id));
  }, [selectedService]);

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

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const generateBookingRef = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ref = "RW-";
    for (let i = 0; i < 8; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const nextStep = () => {
    const stepOrder: BookingStep[] = ["service", "datetime", "addons", "confirm"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const stepOrder: BookingStep[] = ["service", "datetime", "addons", "confirm"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setBookingRef(generateBookingRef());
    setBookingComplete(true);
    setIsProcessing(false);
  };

  const isStepComplete = (step: BookingStep): boolean => {
    switch (step) {
      case "service":
        return !!booking.serviceId && !!booking.duration;
      case "datetime":
        return !!booking.date && !!booking.time;
      case "addons":
        return true;
      default:
        return false;
    }
  };

  if (bookingComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-foreground-secondary mb-6">
              Your appointment has been scheduled successfully
            </p>

            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-foreground-muted mb-1">Booking Reference</p>
              <p className="text-2xl font-mono font-bold text-primary-700">{bookingRef}</p>
            </div>

            <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4 mb-8">
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
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Time</span>
                <span className="font-medium">{booking.time}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold text-primary-600">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/bookings">View My Bookings</Link>
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setBookingComplete(false);
                  setCurrentStep("service");
                  setBooking({
                    serviceId: null,
                    duration: null,
                    date: null,
                    time: null,
                    selectedAddons: [],
                    notes: "",
                  });
                }}
              >
                Book Another Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          Book a Service
        </h1>
        <p className="text-foreground-secondary mt-1">
          Choose your service and preferred time
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : isCompleted
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${isActive ? "text-primary-600 font-medium" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 ${isCompleted ? "bg-primary-500" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Service Selection */}
          {currentStep === "service" && (
            <Card>
              <CardHeader>
                <CardTitle>Select Your Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search & Filter */}
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search services..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Button>
                  {serviceCategories.map((category) => (
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
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
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
                            <h3 className="font-semibold">{service.name}</h3>
                            {service.isPopular && (
                              <Badge variant="secondary" className="bg-accent-100 text-accent-700">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground-secondary mt-1">
                            {service.shortDescription}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-foreground-muted">
                            <span><Clock className="h-3.5 w-3.5 inline mr-1" />{service.duration.join("/")} min</span>
                            <span>★ {service.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary-600">
                            {formatCurrency(Object.values(service.price)[0])}
                          </p>
                          <p className="text-xs text-foreground-muted">from</p>
                        </div>
                      </div>

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
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === "datetime" && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Date & Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Select Date</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {getNextDays(14).map((date) => (
                      <button
                        key={formatDate(date)}
                        className={`p-2 rounded-lg border text-center transition-all ${
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
                      </button>
                    ))}
                  </div>
                </div>

                {booking.date && (
                  <div>
                    <label className="text-sm font-medium mb-3 block">Select Time</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            booking.time === time
                              ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                              : "border-border hover:border-primary-300"
                          }`}
                          onClick={() => setBooking({ ...booking, time })}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Add-ons */}
          {currentStep === "addons" && (
            <Card>
              <CardHeader>
                <CardTitle>Enhance Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {availableAddons.length > 0 ? (
                  <div className="space-y-3">
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
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{addon.name}</h4>
                            <p className="text-sm text-foreground-secondary">{addon.description}</p>
                          </div>
                          <span className="font-semibold text-primary-600">+{formatCurrency(addon.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-foreground-secondary">No add-ons available for this service</p>
                  </div>
                )}

                <div className="mt-6">
                  <label className="text-sm font-medium mb-2 block">Special Requests (Optional)</label>
                  <textarea
                    placeholder="Any special requests or notes for your appointment?"
                    value={booking.notes}
                    onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirm */}
          {currentStep === "confirm" && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Your Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Service</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Duration</span>
                    <span className="font-medium">{booking.duration} minutes</span>
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
                  
                  {booking.selectedAddons.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <span className="text-foreground-muted">Add-ons</span>
                        <div className="mt-2 space-y-1">
                          {booking.selectedAddons.map((addonId) => {
                            const addon = addons.find((a) => a.id === addonId);
                            return addon ? (
                              <div key={addonId} className="flex justify-between text-sm">
                                <span>{addon.name}</span>
                                <span>{formatCurrency(addon.price)}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <p className="text-sm text-primary-700">
                    <strong>Gold Member Discount:</strong> You're saving 15% on this booking!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === "service"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep === "confirm" ? (
              <Button onClick={handleConfirm} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>Confirm Booking - {formatCurrency(totalPrice)}</>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!isStepComplete(currentStep)}>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedService ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{selectedService.name}</h4>
                    <p className="text-sm text-foreground-muted">{booking.duration} minutes</p>
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

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{selectedService.name}</span>
                      <span>{formatCurrency(servicePrice)}</span>
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

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-foreground-muted text-sm text-center py-4">
                  Select a service to see summary
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
