"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Hand, Sparkles, Dumbbell } from "lucide-react";
import { serviceCategories } from "@radiance/mock-data";

const iconMap = {
  Flame,
  Hand,
  Sparkles,
  Dumbbell,
};

const categoryImages = {
  "thermal-bathing": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
  "massage-therapy": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
  "beauty-grooming": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070",
  "fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
};

export function ServicesOverview() {
  return (
    <section className="py-24 bg-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary-600 text-sm font-medium uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Comprehensive Wellness Solutions
          </h2>
          <p className="text-lg text-gray-600">
            Discover our wide range of services designed to nurture your body, 
            calm your mind, and elevate your spirit.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Sparkles;
            const imageUrl = categoryImages[category.id as keyof typeof categoryImages];
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/services/${category.slug}`}
                  className="group block relative h-[400px] rounded-2xl overflow-hidden"
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-accent-400 transition-colors">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold text-white mb-2">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm line-clamp-2 mb-4">
                      {category.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-accent-400 text-sm font-medium">
                      <span>Explore</span>
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
