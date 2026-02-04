"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Bed, Wifi, Coffee, Dumbbell } from "lucide-react";
import { Button, Badge } from "@radiance/ui";
import { accommodations } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

const accommodationImages: Record<string, string> = {
  "premium-apartment": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070",
  "standard-apartment": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070",
};

const amenityIcons = {
  wifi: Wifi,
  coffee: Coffee,
  gym: Dumbbell,
};

export function AccommodationsPreview() {
  return (
    <section className="py-24 bg-primary-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent-400 text-sm font-medium uppercase tracking-wider">
            Stay With Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Luxury Accommodations
          </h2>
          <p className="text-lg text-primary-200">
            Extend your wellness journey with a stay in our beautifully appointed 
            apartments, complete with spa access and premium amenities.
          </p>
        </motion.div>

        {/* Accommodations Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {accommodations.map((accommodation, index) => {
            const imageUrl = accommodationImages[accommodation.id];
            
            return (
              <motion.div
                key={accommodation.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link
                  href={`/accommodations/${accommodation.slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden text-gray-900"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={accommodation.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={accommodation.type === "premium" ? "accent" : "secondary"}>
                        {accommodation.type === "premium" ? "Luxury" : "Comfort"}
                      </Badge>
                    </div>
                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-accent-500 fill-current" />
                      <span className="text-sm font-medium">{accommodation.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {accommodation.name}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {accommodation.shortDescription}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1.5" />
                        {accommodation.capacity} Guests
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Bed className="h-4 w-4 mr-1.5" />
                        {accommodation.bedrooms} Bedroom
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Wifi className="h-4 w-4 mr-1.5" />
                        Free WiFi
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Dumbbell className="h-4 w-4 mr-1.5" />
                        Spa Access
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div>
                        <span className="text-sm text-gray-400">Starting from</span>
                        <div className="flex items-baseline">
                          <span className="font-display text-2xl font-bold text-primary-600">
                            {formatCurrency(accommodation.pricePerNight)}
                          </span>
                          <span className="text-gray-500 ml-1">/night</span>
                        </div>
                      </div>
                      <Button>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
