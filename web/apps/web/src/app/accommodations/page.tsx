"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wifi,
  Wind,
  Tv,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Car,
  ConciergeBell,
  BedDouble,
  Bath,
  Users,
  Maximize,
  CheckCircle2,
  Star,
  Clock,
  Sparkles,
  ShieldCheck,
  Coffee,
} from "lucide-react";
import { Button, Card, CardContent, Badge, Separator } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const premiumApartment = {
  id: "premium-apartment",
  name: "Premium Luxury Apartment",
  badge: "Premium",
  badgeVariant: "accent" as const,
  description:
    "Indulge in the finest wellness retreat experience in our Premium Luxury Apartment. Designed with discerning guests in mind, this spacious two-bedroom sanctuary blends contemporary elegance with world-class amenities. Floor-to-ceiling windows frame stunning views, while premium furnishings and thoughtful touches create an atmosphere of refined comfort. Whether you are here for a weekend escape or an extended wellness journey, every detail has been curated to ensure an unforgettable stay.",
  features: [
    { icon: BedDouble, label: "2 Bedrooms" },
    { icon: Bath, label: "2 Bathrooms" },
    { icon: Users, label: "Max 4 Guests" },
    { icon: Maximize, label: "85 sqm" },
    { icon: UtensilsCrossed, label: "Kitchen" },
    { icon: Waves, label: "Pool Access" },
  ],
  amenities: [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Tv, label: '55" Smart TV' },
    { icon: UtensilsCrossed, label: "Full Kitchen" },
    { icon: WashingMachine, label: "Washer / Dryer" },
    { icon: Waves, label: "Pool Access" },
    { icon: Car, label: "Free Parking" },
    { icon: ConciergeBell, label: "Room Service" },
  ],
  pricing: {
    night: 95000,
    week: 570000,
    month: 1900000,
  },
  gradient: "from-primary-600 to-primary-800",
  imageGradient: "from-amber-400 via-orange-300 to-rose-400",
};

const standardApartment = {
  id: "standard-apartment",
  name: "Standard Comfort Apartment",
  badge: "Standard",
  badgeVariant: "secondary" as const,
  description:
    "Our Standard Comfort Apartment offers everything you need for a relaxing and rejuvenating stay. Thoughtfully designed with a warm, welcoming aesthetic, this one-bedroom apartment features modern amenities, a cozy kitchenette, and a comfortable living space. Ideal for solo travelers or couples seeking an affordable yet elevated wellness retreat experience without compromising on quality or comfort.",
  features: [
    { icon: BedDouble, label: "1 Bedroom" },
    { icon: Bath, label: "1 Bathroom" },
    { icon: Users, label: "Max 2 Guests" },
    { icon: Maximize, label: "45 sqm" },
    { icon: Coffee, label: "Kitchenette" },
  ],
  amenities: [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Tv, label: '43" Smart TV' },
    { icon: Coffee, label: "Kitchenette" },
  ],
  pricing: {
    night: 55000,
    week: 330000,
    month: 1100000,
  },
  gradient: "from-primary-400 to-primary-600",
  imageGradient: "from-teal-400 via-cyan-300 to-blue-400",
};

const comparisonFeatures = [
  { label: "Bedrooms", premium: "2", standard: "1" },
  { label: "Bathrooms", premium: "2", standard: "1" },
  { label: "Max Guests", premium: "4", standard: "2" },
  { label: "Size", premium: "85 sqm", standard: "45 sqm" },
  { label: "Kitchen", premium: "Full Kitchen", standard: "Kitchenette" },
  { label: "Pool Access", premium: "Yes", standard: "No" },
  { label: "Parking", premium: "Free", standard: "Available" },
  { label: "Room Service", premium: "Yes", standard: "No" },
  { label: "Washer / Dryer", premium: "In-unit", standard: "Shared" },
  { label: "TV", premium: '55" Smart TV', standard: '43" Smart TV' },
  { label: "Spa Access", premium: "Complimentary", standard: "Discounted" },
  { label: "Price / Night", premium: formatCurrency(95000), standard: formatCurrency(55000) },
];

const includedItems = [
  { icon: Clock, title: "Check-in / Check-out", detail: "Check-in from 2:00 PM, Check-out by 12:00 PM" },
  { icon: Sparkles, title: "Daily Cleaning", detail: "Complimentary daily housekeeping service" },
  { icon: Bath, title: "Fresh Towels & Linens", detail: "Premium towels and bed linens replaced daily" },
  { icon: ShieldCheck, title: "Toiletries", detail: "Luxury bath amenities restocked each day" },
  { icon: Wifi, title: "High-Speed WiFi", detail: "Unlimited high-speed internet throughout your stay" },
  { icon: Coffee, title: "Welcome Amenities", detail: "Complimentary coffee, tea, and bottled water on arrival" },
  { icon: Car, title: "Secure Parking", detail: "Guarded on-site parking available for all guests" },
  { icon: ConciergeBell, title: "Concierge Service", detail: "24/7 front desk assistance for any request" },
];

/* ------------------------------------------------------------------ */
/*  Apartment Section Component                                        */
/* ------------------------------------------------------------------ */

function ApartmentSection({
  apartment,
  reversed,
  index,
}: {
  apartment: typeof premiumApartment;
  reversed?: boolean;
  index: number;
}) {
  return (
    <section id={apartment.id} className="py-20 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-start ${
            reversed ? "lg:direction-rtl" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={reversed ? "lg:order-2" : ""}
          >
            <div
              className={`relative aspect-[4/3] rounded-3xl bg-gradient-to-br ${apartment.imageGradient} overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 text-lg font-medium">
                  {apartment.name}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant={apartment.badgeVariant} className="text-sm px-3 py-1">
                  {apartment.badge}
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={reversed ? "lg:order-1" : ""}
          >
            <Badge variant={apartment.badgeVariant} className="mb-4">
              {apartment.badge}
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {apartment.name}
            </h2>
            <p className="text-foreground-secondary leading-relaxed mb-8">
              {apartment.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {apartment.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 text-sm text-foreground-secondary"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="font-medium">{feature.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {apartment.amenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={amenity.label}
                      className="flex items-center gap-2 text-sm text-foreground-secondary"
                    >
                      <Icon className="h-4 w-4 text-primary-500" />
                      <span>{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Card */}
            <Card className="bg-primary-50 border-primary-100">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-primary-900 mb-4">
                  Pricing
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="font-display text-xl md:text-2xl font-bold text-primary-600">
                      {formatCurrency(apartment.pricing.night)}
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">
                      per night
                    </div>
                  </div>
                  <div className="text-center border-x border-primary-200">
                    <div className="font-display text-xl md:text-2xl font-bold text-primary-600">
                      {formatCurrency(apartment.pricing.week)}
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">
                      per week
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-xl md:text-2xl font-bold text-primary-600">
                      {formatCurrency(apartment.pricing.month)}
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">
                      per month
                    </div>
                  </div>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/book">
                    Book This Apartment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccommodationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070')",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="bg-accent-400 text-accent-950 mb-4">
              Stay With Us
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Luxury{" "}
              <span className="text-accent-400">Accommodations</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Extend your wellness journey with a stay in our beautifully
              appointed apartments. Each residence is designed to be your
              personal sanctuary during your retreat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Apartment */}
      <ApartmentSection apartment={premiumApartment} index={0} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator />
      </div>

      {/* Standard Apartment */}
      <ApartmentSection apartment={standardApartment} reversed index={1} />

      {/* Comparison Table */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Compare Apartments
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Find the perfect accommodation for your wellness retreat
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-primary-900 text-white">
                      <th className="text-left p-4 font-display font-semibold">
                        Feature
                      </th>
                      <th className="text-center p-4 font-display font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <Star className="h-4 w-4 text-accent-400" />
                          Premium
                        </div>
                      </th>
                      <th className="text-center p-4 font-display font-semibold">
                        Standard
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr
                        key={feature.label}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-primary-50/50"
                        }
                      >
                        <td className="p-4 font-medium text-foreground-secondary">
                          {feature.label}
                        </td>
                        <td className="p-4 text-center text-primary-700 font-medium">
                          {feature.premium}
                        </td>
                        <td className="p-4 text-center text-foreground-secondary">
                          {feature.standard}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              What&apos;s Included
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Every stay comes with these complimentary services and amenities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary">
                        {item.detail}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book Your Stay?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Reserve your apartment today and begin your journey to complete
              relaxation and rejuvenation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
