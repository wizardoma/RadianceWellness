"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button, Card, CardContent } from "@radiance/ui";
import { formatCurrency, formatDuration } from "@radiance/utils";

interface AddOnData {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: number;
}

interface ServicePricingProps {
  serviceId: string;
  durations: number[];
  prices: Record<number, number>;
  addOns: AddOnData[];
}

export function ServicePricing({ serviceId, durations, prices, addOns }: ServicePricingProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(durations[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const basePrice = prices[selectedDuration] || 0;

  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce((total, addonId) => {
      const addon = addOns.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
  }, [selectedAddOns, addOns]);

  const totalPrice = basePrice + addOnsTotal;

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const bookingHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("service", serviceId);
    params.set("duration", String(selectedDuration));
    if (selectedAddOns.length > 0) {
      params.set("addons", selectedAddOns.join(","));
    }
    return `/book?${params.toString()}`;
  }, [serviceId, selectedDuration, selectedAddOns]);

  return (
    <>
      <Card className="shadow-soft-lg">
        <CardContent className="p-6">
          {/* Total Price Display */}
          <div className="mb-6">
            <span className="text-sm text-gray-500">
              {selectedAddOns.length > 0 ? "Total" : "Starting from"}
            </span>
            <div className="flex items-baseline">
              <span className="font-display text-3xl font-bold text-primary-600">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            {selectedAddOns.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Base: {formatCurrency(basePrice)} + Add-ons: {formatCurrency(addOnsTotal)}
              </p>
            )}
          </div>

          {/* Duration Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Duration
            </label>
            <div className="space-y-2">
              {durations.map((duration) => (
                <label
                  key={duration}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${
                    selectedDuration === duration
                      ? "border-primary-500 bg-primary-50"
                      : "border-border hover:border-primary-300"
                  }`}
                  onClick={() => setSelectedDuration(duration)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={selectedDuration === duration}
                      onChange={() => setSelectedDuration(duration)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-900">{formatDuration(duration)}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(prices[duration])}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {addOns.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enhance Your Experience
              </label>
              <div className="space-y-2">
                {addOns.map((addon) => {
                  const isSelected = selectedAddOns.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? "border-primary-500 bg-primary-50"
                          : "border-border hover:border-primary-300"
                      }`}
                      onClick={() => toggleAddOn(addon.id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAddOn(addon.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                        />
                        <div className="ml-3">
                          <span className="text-sm text-gray-900">{addon.name}</span>
                          {addon.duration && (
                            <span className="text-xs text-gray-500 ml-2">
                              +{addon.duration} min
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        +{formatCurrency(addon.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <Button size="lg" className="w-full" asChild>
            <Link href={bookingHref}>
              Book Now - {formatCurrency(totalPrice)}
            </Link>
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Free cancellation up to 24 hours before
          </p>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="mt-6">
        <CardContent className="p-6 text-center">
          <Users className="h-8 w-8 text-primary-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-500 mb-4">
            Our team is here to help you choose the right treatment.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="https://wa.me/2348001234567">Chat with us</a>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
