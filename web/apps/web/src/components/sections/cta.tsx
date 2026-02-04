"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@radiance/ui";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience{" "}
              <span className="text-accent-400">True Wellness?</span>
            </h2>
            <p className="text-xl text-primary-100 mb-10 leading-relaxed">
              Take the first step towards a healthier, more relaxed you. 
              Book your appointment today and discover why thousands choose 
              Radiance for their wellness journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="xl" 
                className="bg-accent-400 hover:bg-accent-500 text-accent-950"
                asChild
              >
                <Link href="/book">
                  Book Your Visit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:+2348001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </a>
              </Button>
            </div>

            {/* Contact Options */}
            <div className="flex flex-wrap items-center gap-6 text-primary-200">
              <span className="text-sm">Or reach us via:</span>
              <a 
                href="https://wa.me/2348001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                WhatsApp
              </a>
              <a 
                href="mailto:hello@radiancewellness.com"
                className="flex items-center text-sm hover:text-white transition-colors"
              >
                hello@radiancewellness.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
