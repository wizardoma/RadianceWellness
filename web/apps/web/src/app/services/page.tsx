"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Star, Clock, Filter, X } from "lucide-react";
import { Button, Badge } from "@radiance/ui";
import { services, serviceCategories } from "@radiance/mock-data";
import { formatCurrency, formatDuration } from "@radiance/utils";

const serviceImages: Record<string, string> = {
  "swedish-massage": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800",
  "deep-tissue-massage": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800",
  "hammam-experience": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
  "sauna-session": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
  "couples-massage": "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800",
  "signature-facial": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800",
  "hot-stone-massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800",
  "aromatherapy-massage": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
  "steam-bath": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
  "manicure": "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
  "pedicure": "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
  "hair-styling": "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800",
  "gym-access": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
  "aerobics-class": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
};

type PriceRange = "all" | "under-15000" | "15000-30000" | "over-30000";
type DurationFilter = "all" | 30 | 60 | 90;

export default function ServicesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [durationFilter, setDurationFilter] = useState<DurationFilter>("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const minPrice = Math.min(...Object.values(service.price));

      // Price filter
      if (priceRange === "under-15000" && minPrice >= 15000) return false;
      if (priceRange === "15000-30000" && (minPrice < 15000 || minPrice > 30000)) return false;
      if (priceRange === "over-30000" && minPrice <= 30000) return false;

      // Duration filter
      if (durationFilter !== "all" && !service.duration.includes(durationFilter)) return false;

      return true;
    });
  }, [priceRange, durationFilter]);

  const hasActiveFilters = priceRange !== "all" || durationFilter !== "all";

  const clearFilters = () => {
    setPriceRange("all");
    setDurationFilter("all");
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-primary-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Discover our comprehensive range of wellness services designed to
            nurture your body, calm your mind, and elevate your spirit.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="px-6 py-2.5 rounded-full bg-primary-500 text-white text-sm font-medium"
            >
              All Services
            </Link>
            {serviceCategories.map((category) => (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filteredServices.length}</span> services
            </p>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-white/20 text-xs rounded-full px-1.5 py-0.5">
                    {(priceRange !== "all" ? 1 : 0) + (durationFilter !== "all" ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mb-8 p-6 bg-white rounded-2xl border border-border shadow-soft-sm">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "all" as PriceRange, label: "All" },
                      { value: "under-15000" as PriceRange, label: "Under \u20A615,000" },
                      { value: "15000-30000" as PriceRange, label: "\u20A615,000-\u20A630,000" },
                      { value: "over-30000" as PriceRange, label: "Over \u20A630,000" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPriceRange(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          priceRange === option.value
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Duration</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "all" as DurationFilter, label: "All" },
                      { value: 30 as DurationFilter, label: "30 min" },
                      { value: 60 as DurationFilter, label: "60 min" },
                      { value: 90 as DurationFilter, label: "90 min" },
                    ].map((option) => (
                      <button
                        key={String(option.value)}
                        onClick={() => setDurationFilter(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          durationFilter === option.value
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply / Clear */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No services match your filters.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const minPrice = Math.min(...Object.values(service.price));
                const imageUrl = serviceImages[service.id] || serviceImages["swedish-massage"];

                return (
                  <Link
                    key={service.id}
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
                      {service.isNew && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="success">New</Badge>
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Can't decide? Let us help!
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our wellness consultants can recommend the perfect treatment based on your needs.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Get a Recommendation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
