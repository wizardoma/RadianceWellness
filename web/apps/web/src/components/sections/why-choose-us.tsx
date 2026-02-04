"use client";

import { motion } from "framer-motion";
import { 
  Award, 
  Users, 
  Clock, 
  Shield, 
  Sparkles, 
  Heart 
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "World-class facilities and treatments delivered by certified professionals with years of experience.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team of skilled therapists and wellness experts are dedicated to your well-being.",
  },
  {
    icon: Clock,
    title: "Flexible Booking",
    description: "Easy online booking with flexible scheduling to fit your busy lifestyle.",
  },
  {
    icon: Shield,
    title: "Safe & Hygienic",
    description: "Highest standards of cleanliness and safety protocols for your peace of mind.",
  },
  {
    icon: Sparkles,
    title: "Holistic Approach",
    description: "Comprehensive wellness programs addressing mind, body, and spirit.",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Customized treatments tailored to your unique needs and preferences.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-600 text-sm font-medium uppercase tracking-wider">
              Why Radiance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
              The Radiance{" "}
              <span className="text-primary-600">Difference</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              We're committed to providing an exceptional wellness experience 
              that goes beyond the ordinary. Here's what sets us apart.
            </p>

            {/* Reasons Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex space-x-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                    <p className="text-sm text-gray-500">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800"
                    alt="Massage treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800"
                    alt="Fitness center"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800"
                    alt="Sauna"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800"
                    alt="Facial treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
