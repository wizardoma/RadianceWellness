"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock } from "lucide-react";
import { Button, Badge } from "@radiance/ui";
import { getPopularServices } from "@radiance/mock-data";
import { formatCurrency, formatDuration } from "@radiance/utils";

const serviceImages: Record<string, string> = {
  "swedish-massage": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800",
  "deep-tissue-massage": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800",
  "hammam-experience": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
  "sauna-session": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
  "couples-massage": "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800",
  "signature-facial": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800",
};

export function FeaturedServices() {
  const popularServices = getPopularServices();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
        >
          <div>
            <span className="text-primary-600 text-sm font-medium uppercase tracking-wider">
              Most Popular
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Featured Treatments
            </h2>
          </div>
          <Button variant="outline" asChild className="mt-4 sm:mt-0">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularServices.slice(0, 6).map((service, index) => {
            const minPrice = Math.min(...Object.values(service.price));
            const imageUrl = serviceImages[service.id] || serviceImages["swedish-massage"];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/services/${service.category}/${service.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {service.isPopular && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="accent">Popular</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className="text-xs text-primary-600 font-medium uppercase tracking-wider">
                      {service.category.replace("-", " & ")}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-gray-900 mt-2 mb-2 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {service.shortDescription}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        {/* Rating */}
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-accent-400 fill-current mr-1" />
                          <span className="font-medium">{service.rating}</span>
                          <span className="text-gray-400 ml-1">({service.reviewCount})</span>
                        </div>
                        {/* Duration */}
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(service.duration[0])}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs text-gray-400">From</span>
                        <div className="font-semibold text-primary-600">
                          {formatCurrency(minPrice)}
                        </div>
                      </div>
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
