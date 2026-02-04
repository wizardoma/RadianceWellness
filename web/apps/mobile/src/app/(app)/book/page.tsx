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
} from "lucide-react";
import { Button, Badge, Separator } from "@radiance/ui";
import { services, serviceCategories, addOns } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

type BookingStep = "service" | "datetime" | "confirm";

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");
  
  const [step, setStep] = useState<BookingStep>(preselectedService ? "datetime" : "service");
  const [serviceId, setServiceId] = useState<string | null>(preselectedService);
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const selectedService = useMemo(() => 
    services.find(s => s.id === serviceId), [serviceId]
  );

  const price = useMemo(() => {
    if (!selectedService || !duration) return 0;
    return selectedService.price[duration] || 0;
  }, [selectedService, duration]);

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
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary-600">{formatCurrency(price)}</span>
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
          onClick={() => {
            if (step === "service") router.back();
            else if (step === "datetime") setStep("service");
            else if (step === "confirm") setStep("datetime");
          }}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold">
            {step === "service" && "Select Service"}
            {step === "datetime" && "Choose Date & Time"}
            {step === "confirm" && "Confirm Booking"}
          </h1>
          <p className="text-xs text-gray-500">Step {step === "service" ? 1 : step === "datetime" ? 2 : 3} of 3</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 px-4 py-2 bg-background">
        {["service", "datetime", "confirm"].map((s, i) => (
          <div 
            key={s} 
            className={`flex-1 h-1 rounded-full ${
              (step === "service" && i === 0) ||
              (step === "datetime" && i <= 1) ||
              (step === "confirm" && i <= 2)
                ? "bg-primary-500" 
                : "bg-gray-200"
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

        {/* Step 3: Confirm */}
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
                <Separator className="my-2" />
                <div className="flex justify-between py-2 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">{formatCurrency(price)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-700">
                <strong>Gold Member:</strong> You're getting 15% off!
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
            onClick={() => setStep("datetime")}
          >
            Continue <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
        {step === "datetime" && (
          <Button 
            className="w-full" 
            disabled={!date || !time}
            onClick={() => setStep("confirm")}
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
              <>Confirm Booking - {formatCurrency(price)}</>
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
