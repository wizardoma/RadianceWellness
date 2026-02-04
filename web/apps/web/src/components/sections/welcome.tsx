"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Sparkles } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070"
                alt="Radiance Wellness Center Interior"
                className="w-full h-full object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-soft-xl p-6 max-w-xs"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                  <Heart className="h-7 w-7 text-primary-600" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-primary-600">5,000+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Label */}
            <div className="flex items-center space-x-2 text-primary-600 mb-4">
              <Leaf className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Welcome to Radiance</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Where Wellness Meets{" "}
              <span className="text-primary-600">Luxury</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Radiance Wellness Center, we believe that true wellness encompasses 
              the harmony of mind, body, and spirit. Our state-of-the-art facility 
              offers a comprehensive range of services designed to help you achieve 
              optimal health and relaxation.
            </p>

            <p className="text-gray-600 leading-relaxed mb-10">
              From our traditional Turkish hammam to modern fitness facilities, 
              from expert massage therapists to luxurious accommodations—every 
              detail is crafted to provide you with an exceptional wellness experience.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "Premium Services",
                  description: "World-class treatments delivered by certified professionals",
                },
                {
                  icon: Heart,
                  title: "Personalized Care",
                  description: "Customized wellness programs tailored to your needs",
                },
              ].map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
