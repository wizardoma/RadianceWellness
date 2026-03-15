"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock,
  Calendar,
  ChevronRight,
  Sparkles,
  Star,
  CreditCard,
  Building2,
  Shield,
} from "lucide-react";
import { Button, Badge, Separator, Input } from "@radiance/ui";
import { services, serviceCategories, addOns } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

type BookingStep = "service" | "datetime" | "addons" | "payment" | "confirm";

const STEPS: BookingStep[] = ["service", "datetime", "addons", "payment", "confirm"];

const STEP_LABELS: Record<BookingStep, string> = {
  service: "Select Service",
  datetime: "Choose Date & Time",
  addons: "Add-ons",
  payment: "Payment",
  confirm: "Confirm Booking",
};

type PaymentMethod = "card" | "transfer" | "pay-later";

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState<BookingStep>(preselectedService ? "datetime" : "service");
  const [serviceId, setServiceId] = useState<string | null>(preselectedService);
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const selectedService = useMemo(() =>
    services.find(s => s.id === serviceId), [serviceId]
  );

  const serviceAddOns = useMemo(() => {
    if (!selectedService) return addOns;
    return addOns.filter(a => selectedService.addOns.includes(a.id));
  }, [selectedService]);

  const addOnsTotal = useMemo(() => {
    return addOns
      .filter(a => selectedAddOns.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
  }, [selectedAddOns]);

  const basePrice = useMemo(() => {
    if (!selectedService || !duration) return 0;
    return selectedService.price[duration] || 0;
  }, [selectedService, duration]);

  const discount = useMemo(() => {
    return Math.round(basePrice * 0.15);
  }, [basePrice]);

  const totalPrice = useMemo(() => {
    return basePrice - discount + addOnsTotal;
  }, [basePrice, discount, addOnsTotal]);

  const currentStepIndex = STEPS.indexOf(step);

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

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const goBack = () => {
    const idx = currentStepIndex;
    if (idx === 0) {
      router.back();
    } else {
      setStep(STEPS[idx - 1]);
    }
  };

  const goNext = () => {
    const idx = currentStepIndex;
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1]);
    }
  };

  const handleBook = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    setBookingRef(`RW-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    setIsComplete(true);
    setIsProcessing(false);
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 text-center pb-20">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-6">Your appointment has been scheduled</p>

        <div className="w-full bg-primary-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">Booking Reference</p>
          <p className="text-xl font-mono font-bold text-primary-700">{bookingRef}</p>
        </div>

        <div className="w-full bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Service</span>
            <span className="font-medium">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">
              {date && new Date(date).toLocaleDateString("en-NG", {
                weekday: "short", day: "numeric", month: "short"
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Time</span>
            <span className="font-medium">{time}</span>
          </div>
          {selectedAddOns.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Add-ons</span>
              <span className="font-medium">{selectedAddOns.length} selected</span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">{formatCurrency(basePrice + addOnsTotal)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Gold Discount (15%)</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <Button className="w-full" onClick={() => router.push("/bookings")}>
            View My Bookings
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/home")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-3 border-b flex items-center gap-3">
        <button
          onClick={goBack}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold">{STEP_LABELS[step]}</h1>
          <p className="text-xs text-gray-500">Step {currentStepIndex + 1} of {STEPS.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 px-4 py-2 bg-background">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded-full ${
              i <= currentStepIndex ? "bg-primary-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Step 1: Service Selection */}
        {step === "service" && (
          <div className="space-y-3">
            {serviceCategories.map(category => (
              <div key={category.id}>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{category.name}</h3>
                <div className="space-y-2">
                  {services.filter(s => s.category === category.id).map(service => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setServiceId(service.id);
                        setDuration(service.duration[0]);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        serviceId === service.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold truncate">{service.name}</span>
                            {service.isPopular && (
                              <Badge className="bg-accent-100 text-accent-700 text-xs">Popular</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {service.duration[0]} min
                            <Star className="h-3 w-3 text-yellow-500" />
                            {service.rating}
                          </div>
                        </div>
                        <span className="font-bold text-primary-600">
                          {formatCurrency(service.price[service.duration[0]])}
                        </span>
                      </div>

                      {serviceId === service.id && service.duration.length > 1 && (
                        <div className="mt-3 pt-3 border-t flex gap-2">
                          {service.duration.map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDuration(d);
                              }}
                              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                duration === d
                                  ? "bg-primary-500 text-white"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {d}min
                            </button>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === "datetime" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Select Date</h3>
              <div className="grid grid-cols-5 gap-2">
                {getNextDays(10).map(d => (
                  <button
                    key={formatDate(d)}
                    onClick={() => setDate(formatDate(d))}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      date === formatDate(d)
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

            {date && (
              <div>
                <h3 className="font-medium mb-3">Select Time</h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        time === t
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
          </div>
        )}

        {/* Step 3: Add-ons */}
        {step === "addons" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Enhance your {selectedService?.name} with these add-ons
            </p>
            {serviceAddOns.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No add-ons available for this service</p>
              </div>
            ) : (
              <div className="space-y-3">
                {serviceAddOns.map(addon => {
                  const isSelected = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? "border-primary-500 bg-primary-50"
                          : "border-border bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{addon.name}</span>
                            {addon.duration && (
                              <Badge className="bg-gray-100 text-gray-600 text-xs">+{addon.duration}min</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-3">
                          <span className="font-bold text-primary-600 whitespace-nowrap">
                            {formatCurrency(addon.price)}
                          </span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-primary-500 border-primary-500"
                              : "border-gray-300"
                          }`}>
                            {isSelected && <Check className="h-4 w-4 text-white" />}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {selectedAddOns.length > 0 && (
              <div className="bg-primary-50 rounded-xl p-4 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Add-ons ({selectedAddOns.length})</span>
                  <span className="font-medium">{formatCurrency(addOnsTotal)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span className="text-primary-600">{formatCurrency(basePrice + addOnsTotal)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Payment */}
        {step === "payment" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Choose your payment method</p>

            {/* Card Payment */}
            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                paymentMethod === "card"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Card Payment</span>
                  <p className="text-xs text-gray-500">Debit or credit card</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "card" ? "bg-primary-500 border-primary-500" : "border-gray-300"
                }`}>
                  {paymentMethod === "card" && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </button>

            {paymentMethod === "card" && (
              <div className="space-y-3 pl-2 pr-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Card Number</label>
                  <Input
                    placeholder="0000 0000 0000 0000"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Expiry</label>
                    <Input
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">CVV</label>
                    <Input
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Cardholder Name</label>
                  <Input
                    placeholder="Full name on card"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <Shield className="h-4 w-4" />
                  <span>Secured by Paystack</span>
                </div>
              </div>
            )}

            {/* Bank Transfer */}
            <button
              onClick={() => setPaymentMethod("transfer")}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                paymentMethod === "transfer"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Bank Transfer</span>
                  <p className="text-xs text-gray-500">Pay via bank transfer</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "transfer" ? "bg-primary-500 border-primary-500" : "border-gray-300"
                }`}>
                  {paymentMethod === "transfer" && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </button>

            {paymentMethod === "transfer" && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Bank</span>
                  <span className="font-medium">GTBank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Name</span>
                  <span className="font-medium">Radiance Wellness Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Number</span>
                  <span className="font-mono font-bold text-primary-600">0123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-primary-600">{formatCurrency(totalPrice)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Transfer the exact amount and use your booking reference as narration.
                </p>
              </div>
            )}

            {/* Pay Later */}
            <button
              onClick={() => setPaymentMethod("pay-later")}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                paymentMethod === "pay-later"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Pay Later</span>
                  <p className="text-xs text-gray-500">Pay at the spa on arrival</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "pay-later" ? "bg-primary-500 border-primary-500" : "border-gray-300"
                }`}>
                  {paymentMethod === "pay-later" && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Step 5: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium">{duration} minutes</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">
                    {date && new Date(date).toLocaleDateString("en-NG", {
                      weekday: "long", day: "numeric", month: "long"
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{time}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="py-2 border-b">
                    <span className="text-gray-500">Add-ons</span>
                    <div className="mt-1 space-y-1">
                      {addOns.filter(a => selectedAddOns.includes(a.id)).map(a => (
                        <div key={a.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{a.name}</span>
                          <span className="font-medium">{formatCurrency(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium capitalize">
                    {paymentMethod === "card" ? "Card Payment" : paymentMethod === "transfer" ? "Bank Transfer" : "Pay Later"}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(basePrice + addOnsTotal)}</span>
                </div>
                <div className="flex justify-between py-1 text-green-600">
                  <span>Gold Discount (15%)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between py-2 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-700">
                <strong>Gold Member:</strong> You saved {formatCurrency(discount)} with your 15% discount!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="px-4 pt-4">
        {step === "service" && (
          <Button
            className="w-full"
            disabled={!serviceId || !duration}
            onClick={goNext}
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {step === "datetime" && (
          <Button
            className="w-full"
            disabled={!date || !time}
            onClick={goNext}
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {step === "addons" && (
          <Button
            className="w-full"
            onClick={goNext}
          >
            {selectedAddOns.length > 0
              ? `Continue with ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? "s" : ""}`
              : "Skip Add-ons"
            }
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {step === "payment" && (
          <Button
            className="w-full"
            disabled={!paymentMethod}
            onClick={goNext}
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {step === "confirm" && (
          <Button
            className="w-full"
            onClick={handleBook}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Processing...
              </>
            ) : (
              <>Confirm Booking - {formatCurrency(totalPrice)}</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
      </div>
    }>
      <BookPageContent />
    </Suspense>
  );
}
