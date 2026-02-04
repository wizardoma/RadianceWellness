"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  Check,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Separator,
} from "@radiance/ui";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "1 Setif Close, Adzope Crescent",
      "Off Kumasi Crescent, Wuse 2",
      "Abuja, Nigeria",
    ],
    action: {
      label: "Get Directions",
      href: "https://maps.google.com",
    },
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+234 800 123 4567", "+234 900 987 6543"],
    action: {
      label: "Call Now",
      href: "tel:+2348001234567",
    },
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@radiancewellness.com", "bookings@radiancewellness.com"],
    action: {
      label: "Send Email",
      href: "mailto:hello@radiancewellness.com",
    },
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: [
      "Monday - Friday: 8:00 AM - 9:00 PM",
      "Saturday - Sunday: 9:00 AM - 8:00 PM",
      "Public Holidays: 10:00 AM - 6:00 PM",
    ],
  },
];

const faqItems = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book online through our website, call us directly, or send us a WhatsApp message. We recommend booking at least 24 hours in advance to ensure availability.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be charged 50% of the service cost.",
  },
  {
    question: "Do you offer group bookings?",
    answer:
      "Yes! We offer special packages for groups, bridal parties, corporate wellness days, and special occasions. Contact us for custom pricing.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we have complimentary parking available for all our guests. Our attendant will assist you upon arrival.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070')",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for bookings, inquiries, or
              just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-1 text-sm text-foreground-secondary mb-4">
                        {info.details.map((detail, i) => (
                          <p key={i}>{detail}</p>
                        ))}
                      </div>
                      {info.action && (
                        <a
                          href={info.action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          {info.action.label}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-foreground-secondary mb-6">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-primary-600" />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-foreground-secondary mb-6">
                        Thank you for reaching out. We'll respond shortly.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+234 800 000 0000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            placeholder="How can we help?"
                            required
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="mt-1 w-full min-h-[150px] px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-[300px] bg-primary-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-50">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary-400 mx-auto mb-2" />
                      <p className="text-foreground-secondary">
                        Interactive Map
                      </p>
                      <p className="text-sm text-foreground-muted">
                        1 Setif Close, Wuse 2, Abuja
                      </p>
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* WhatsApp CTA */}
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        Chat with Us on WhatsApp
                      </h3>
                      <p className="text-green-100 text-sm">
                        Quick responses during business hours
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white text-green-600 hover:bg-green-50"
                      asChild
                    >
                      <a
                        href="https://wa.me/2348001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Start Chat
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Booking CTA */}
              <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-primary-100 mb-4">
                    Skip the wait and book your wellness experience online.
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-primary-50"
                    asChild
                  >
                    <Link href="/book">
                      Book Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.question}
                      </h3>
                      <p className="text-foreground-secondary text-sm">
                        {item.answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-foreground-muted mb-4">
                Have more questions?
              </p>
              <Button variant="outline" asChild>
                <a href="mailto:hello@radiancewellness.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Our Support Team
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
