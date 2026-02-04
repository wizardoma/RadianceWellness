"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { getFeaturedTestimonials } from "@radiance/mock-data";

export function TestimonialsSection() {
  const testimonials = getFeaturedTestimonials();

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
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what our valued guests 
            have to say about their experience at Radiance.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-soft-sm relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-full bg-accent-400 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-accent-950" fill="currentColor" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-accent-400 fill-current"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-primary-600 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  {testimonial.role && (
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  )}
                </div>
              </div>

              {/* Service Tag */}
              {testimonial.service && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-primary-600 font-medium uppercase tracking-wider">
                    {testimonial.service}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-soft-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-primary-200"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">5,000+</span> happy clients
            </span>
            <div className="flex items-center ml-2">
              <Star className="h-4 w-4 text-accent-400 fill-current" />
              <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
