"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  CardContent,
} from "@radiance/ui";

const faqCategories = {
  general: {
    label: "General",
    items: [
      {
        question: "What services do you offer?",
        answer:
          "Radiance Wellness Center offers a comprehensive range of services including thermal bathing (sauna, steam room, hammam), massage therapy (Swedish, deep tissue, hot stone, and more), beauty and grooming treatments, fitness programs with personal training, and luxury accommodation suites for wellness retreats.",
      },
      {
        question: "Where are you located?",
        answer:
          "We are located at 1 Setif Close, Adzope Crescent, Off Kumasi Crescent, Wuse 2, Abuja, Nigeria. Our facility is easily accessible and we provide complimentary parking for all guests.",
      },
      {
        question: "What are your operating hours?",
        answer:
          "We are open Monday through Friday from 8:00 AM to 9:00 PM, and Saturday through Sunday from 9:00 AM to 8:00 PM. On public holidays, we operate from 10:00 AM to 6:00 PM. We recommend booking in advance, especially during weekends and holidays.",
      },
      {
        question: "Do I need an appointment?",
        answer:
          "While we do accept walk-ins based on availability, we strongly recommend booking an appointment in advance to guarantee your preferred time slot and service. You can book online through our website, by phone, or via WhatsApp.",
      },
    ],
  },
  bookings: {
    label: "Bookings",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "You can book an appointment through our online booking system on this website, by calling us at +234 800 123 4567, sending a WhatsApp message, or emailing bookings@radiancewellness.com. Online booking is the fastest way to secure your preferred slot.",
      },
      {
        question: "Can I cancel or reschedule my booking?",
        answer:
          "Yes, you can cancel or reschedule your booking up to 24 hours before your scheduled appointment at no charge. Changes can be made through your booking confirmation email, by calling us, or through your online account.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "We require at least 24 hours notice for cancellations. Cancellations made less than 24 hours before the appointment will incur a 50% charge of the service cost. No-shows will be charged the full amount. We understand emergencies happen, so please contact us if you have special circumstances.",
      },
      {
        question: "Do you accept walk-ins?",
        answer:
          "Yes, we welcome walk-in guests subject to availability. However, to ensure we can accommodate you at your preferred time, we recommend booking in advance. Walk-in guests may experience longer wait times during peak hours (weekends and evenings).",
      },
    ],
  },
  payments: {
    label: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept a variety of payment methods including cash, debit and credit cards (Visa, Mastercard), bank transfers, and mobile payments. Online payments are processed securely through Paystack. We also accept gift cards purchased from our center.",
      },
      {
        question: "Is there a deposit required for bookings?",
        answer:
          "For standard services, no deposit is required when booking online. However, for group bookings (5+ people), special event packages, and accommodation reservations, we require a 30% deposit at the time of booking to secure your reservation.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Refunds are processed for cancellations made within our policy window (24 hours before the appointment). Refunds for online payments are returned to the original payment method within 5-7 business days. Gift card purchases are non-refundable but can be transferred to another person.",
      },
    ],
  },
  memberships: {
    label: "Memberships",
    items: [
      {
        question: "What membership plans are available?",
        answer:
          "We offer three membership tiers: Serenity (basic access to thermal facilities and discounts on services), Harmony (includes monthly treatments and fitness access), and Radiance Elite (all-inclusive with priority booking, complimentary treatments, and accommodation discounts). Visit our pricing page for detailed plan information.",
      },
      {
        question: "Can I upgrade or downgrade my membership plan?",
        answer:
          "Yes, you can change your membership tier at any time. Upgrades take effect immediately with a prorated charge, while downgrades take effect at the start of your next billing cycle. Contact our front desk or manage your membership through your online account.",
      },
      {
        question: "How do I cancel my membership?",
        answer:
          "You can cancel your membership by contacting us at least 30 days before your next billing date. Cancellations can be submitted in person, by email, or through your online account. There are no cancellation fees, and you will retain access until the end of your current billing period.",
      },
    ],
  },
  accommodations: {
    label: "Accommodations",
    items: [
      {
        question: "What apartments are available?",
        answer:
          "We offer a range of luxury accommodation options including Studio Suites (for solo guests or couples), One-Bedroom Apartments (ideal for extended stays), and our Premium Wellness Suite (a full apartment with spa amenities). All accommodations include complimentary access to our thermal facilities and fitness center.",
      },
      {
        question: "What is the check-in and check-out time?",
        answer:
          "Check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability and may incur additional charges. Please contact us in advance if you need flexible timing.",
      },
      {
        question: "Is there a minimum stay requirement?",
        answer:
          "Our standard minimum stay is one night. For our Wellness Retreat packages, which include curated spa treatments and activities, the minimum stay is two nights to ensure you get the full restorative experience.",
      },
      {
        question: "Are pets allowed in the accommodations?",
        answer:
          "Unfortunately, pets are not permitted in our accommodations or wellness facilities. This policy is in place to ensure a serene, allergen-free environment for all our guests. Service animals are welcome with prior notice.",
      },
    ],
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070')",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-accent-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Find answers to common questions about our services, bookings,
              payments, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general">
              <TabsList className="flex flex-wrap w-full gap-1 h-auto p-1">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex-1 min-w-[120px]"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(faqCategories).map(([key, category]) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6 md:p-8">
                        <Accordion type="single" collapsible className="w-full">
                          {category.items.map((item, index) => (
                            <AccordionItem
                              key={index}
                              value={`${key}-${index}`}
                            >
                              <AccordionTrigger className="text-left text-base">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-foreground-secondary leading-relaxed">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-7 w-7 text-primary-600" />
            </div>
            <h2 className="font-display text-3xl font-bold text-primary-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-foreground-secondary mb-8">
              Can't find the answer you're looking for? Our team is here to help.
              Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://wa.me/2348001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
