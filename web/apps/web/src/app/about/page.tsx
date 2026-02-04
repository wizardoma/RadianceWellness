"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Leaf,
  Users,
  Award,
  Star,
  ArrowRight,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Button, Card, CardContent, Badge } from "@radiance/ui";

const values = [
  {
    icon: Heart,
    title: "Holistic Wellness",
    description:
      "We believe in treating the whole person - mind, body, and soul - through integrated wellness practices.",
  },
  {
    icon: Leaf,
    title: "Natural Approach",
    description:
      "Our treatments use premium natural products and time-tested techniques from wellness traditions worldwide.",
  },
  {
    icon: Users,
    title: "Personalized Care",
    description:
      "Every guest receives customized attention and treatments tailored to their unique needs and goals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in service delivery, facility maintenance, and therapist training.",
  },
];

const milestones = [
  { year: "2016", event: "Founded with a vision to bring world-class wellness to Nigeria" },
  { year: "2018", event: "Expanded services to include thermal bathing and hammam" },
  { year: "2020", event: "Launched luxury accommodation suites" },
  { year: "2022", event: "Served our 10,000th guest" },
  { year: "2024", event: "Recognized as Best Spa in Abuja by Nigeria Wellness Awards" },
];

const team = [
  {
    name: "Dr. Amara Okonkwo",
    role: "Founder & Wellness Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
    bio: "With over 15 years in holistic health, Dr. Amara founded Radiance with a mission to make premium wellness accessible.",
  },
  {
    name: "Chidi Eze",
    role: "Head Therapist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    bio: "Certified in Swedish, deep tissue, and traditional African massage techniques with 10+ years experience.",
  },
  {
    name: "Fatima Mohammed",
    role: "Spa Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
    bio: "Ensures every guest receives a seamless, luxurious experience from booking to departure.",
  },
  {
    name: "Emeka Nwosu",
    role: "Fitness Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
    bio: "Former national athlete with certifications in personal training and sports rehabilitation.",
  },
];

const certifications = [
  "International Spa Association (ISPA) Member",
  "Nigeria Wellness & Spa Association Certified",
  "ISO 9001:2015 Quality Management",
  "Green Spa Network Member",
];

const stats = [
  { value: "8+", label: "Years of Excellence" },
  { value: "15,000+", label: "Happy Guests" },
  { value: "50+", label: "Expert Therapists" },
  { value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070')",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="bg-accent-400 text-accent-950 mb-4">
              Our Story
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              A Sanctuary for{" "}
              <span className="text-accent-400">Mind, Body & Soul</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Radiance Wellness Center was born from a simple belief: everyone
              deserves access to premium wellness experiences that nurture their
              complete well-being.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary-600">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                The Radiance Story
              </h2>
              <div className="space-y-4 text-foreground-secondary">
                <p>
                  Founded in 2016, Radiance Wellness Center began as a small spa
                  with a big dream: to create a haven where Nigerians could
                  experience world-class wellness services without traveling
                  abroad.
                </p>
                <p>
                  Our founder, Dr. Amara Okonkwo, spent years studying wellness
                  traditions from around the world—from Finnish saunas to Turkish
                  hammams, Thai massage to Ayurvedic treatments. She brought this
                  knowledge home to create something truly special.
                </p>
                <p>
                  Today, Radiance has grown into Abuja's premier wellness
                  destination, offering an integrated approach to health that
                  combines the best of global traditions with African hospitality
                  and warmth.
                </p>
                <p>
                  Our beautiful facility in Wuse 2 features state-of-the-art
                  amenities including thermal bathing facilities, treatment rooms,
                  a fully equipped fitness center, and luxury accommodation
                  suites for those seeking a complete wellness retreat.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 rounded-xl bg-primary-100 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600"
                      alt="Spa treatment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-64 rounded-xl bg-primary-100 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600"
                      alt="Relaxation area"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-64 rounded-xl bg-primary-100 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600"
                      alt="Wellness center"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 rounded-xl bg-primary-100 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600"
                      alt="Fitness center"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto">
                These principles guide everything we do at Radiance
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary-600" />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Our Journey
            </h2>
            <p className="text-foreground-secondary">
              Key milestones in our growth
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 pb-8"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg z-10 flex-shrink-0">
                    {milestone.year.slice(2)}
                  </div>
                  <div className="pt-3">
                    <span className="text-sm font-medium text-primary-600">
                      {milestone.year}
                    </span>
                    <p className="text-foreground-secondary mt-1">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto">
                Passionate professionals dedicated to your wellness
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-64 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display font-semibold text-lg">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary-600 mb-2">{member.role}</p>
                    <p className="text-sm text-foreground-secondary">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Certifications & Memberships
              </h2>
              <p className="text-foreground-secondary mb-8">
                We maintain the highest industry standards and are proud members
                of leading wellness organizations worldwide.
              </p>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary-500" />
                    <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-primary-200 mb-4" />
                  <blockquote className="text-xl font-medium mb-6">
                    "Our mission is to be the leading wellness destination in
                    Africa, inspiring people to live healthier, happier lives
                    through holistic care and exceptional service."
                  </blockquote>
                  <div>
                    <p className="font-semibold">Dr. Amara Okonkwo</p>
                    <p className="text-primary-200 text-sm">
                      Founder & Wellness Director
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Experience the Radiance Difference
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of guests who have transformed their wellness
              journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/book">
                  Book Your Experience
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
