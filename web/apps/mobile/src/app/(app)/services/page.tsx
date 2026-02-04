"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, Clock, ChevronRight, Filter, Sparkles } from "lucide-react";
import { Input, Badge } from "@radiance/ui";
import { services, serviceCategories } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Our Services</h1>
        <p className="text-sm text-gray-500">Discover our range of wellness treatments</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search services..."
          className="pl-10 bg-gray-100 border-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          All
        </button>
        {serviceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices.map((service) => (
          <Link
            key={service.id}
            href={`/book?service=${service.id}`}
            className="block bg-white rounded-xl border border-border overflow-hidden hover:border-primary-200 transition-colors"
          >
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-8 w-8 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      {service.isPopular && (
                        <Badge className="bg-accent-100 text-accent-700 text-xs mt-1">Popular</Badge>
                      )}
                    </div>
                    <p className="font-bold text-primary-600 text-right">
                      {formatCurrency(Object.values(service.price)[0])}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.shortDescription}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.duration.join("/")} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {service.rating} ({service.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No services found</p>
        </div>
      )}
    </div>
  );
}
