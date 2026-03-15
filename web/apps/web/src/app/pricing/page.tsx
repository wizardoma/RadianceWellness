"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  X,
  Star,
  Clock,
  Sparkles,
  Crown,
  Heart,
  Gift,
  Users,
  Stethoscope,
  Scissors,
  Dumbbell,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@radiance/ui";
import { services, serviceCategories } from "@radiance/mock-data";
import { formatCurrency, formatDuration } from "@radiance/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categoryIcons: Record<string, React.ElementType> = {
  spa: Sparkles,
  treatments: Stethoscope,
  gym: Dumbbell,
  salon: Scissors,
};

const packageDeals = [
  {
    id: "couples-retreat",
    name: "Couples Retreat",
    description:
      "A romantic wellness experience for two. Enjoy side-by-side massages in our private couples suite followed by a blissful sauna and hammam session.",
    includes: ["2x Massage", "Sauna Session", "Hammam Experience"],
    price: 85000,
    originalPrice: 100000,
    savings: 15,
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    validFor: "Couples",
  },
  {
    id: "royal-pamper-day",
    name: "Royal Pamper Day",
    description:
      "The ultimate head-to-toe pampering experience. Be treated like royalty with our most luxurious combination of treatments.",
    includes: ["Deep Tissue Massage", "Signature Facial", "Manicure", "Pedicure"],
    price: 65000,
    originalPrice: 81250,
    savings: 20,
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    validFor: "Individual",
  },
  {
    id: "relaxation-package",
    name: "Relaxation Package",
    description:
      "The perfect escape from daily stress. Melt away tension with a Swedish massage followed by a calming sauna session.",
    includes: ["Swedish Massage (60min)", "Sauna Session (30min)"],
    price: 32000,
    originalPrice: 35000,
    savings: 10,
    icon: Sparkles,
    color: "from-teal-500 to-emerald-600",
    validFor: "Individual",
  },
  {
    id: "birthday-special",
    name: "Birthday Special",
    description:
      "Celebrate your special day in style. Enjoy a bespoke massage, rejuvenating facial, and take home a curated wellness gift bag.",
    includes: ["Any Massage (60min)", "Signature Facial", "Gift Bag"],
    price: 55000,
    originalPrice: 67000,
    savings: 18,
    icon: Gift,
    color: "from-violet-500 to-purple-600",
    validFor: "Individual",
  },
];

const membershipTiers = [
  {
    id: "silver",
    name: "Silver",
    price: 25000,
    period: "month",
    description: "A great starting point for your wellness journey.",
    color: "gray",
    benefits: [
      { text: "Gym access (weekdays)", included: true },
      { text: "10% off all spa services", included: true },
      { text: "2 aerobics classes / month", included: true },
      { text: "Locker rental included", included: true },
      { text: "Priority booking", included: false },
      { text: "Guest passes", included: false },
      { text: "Complimentary monthly treatment", included: false },
      { text: "VIP lounge access", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 45000,
    period: "month",
    description: "Our most popular plan for committed wellness enthusiasts.",
    color: "primary",
    isPopular: true,
    benefits: [
      { text: "Unlimited gym access", included: true },
      { text: "15% off all spa services", included: true },
      { text: "Unlimited aerobics classes", included: true },
      { text: "Personal locker included", included: true },
      { text: "Priority booking (48h early)", included: true },
      { text: "2 guest passes / month", included: true },
      { text: "Complimentary monthly treatment", included: false },
      { text: "VIP lounge access", included: false },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 75000,
    period: "month",
    description: "The ultimate membership for those who demand the very best.",
    color: "accent",
    benefits: [
      { text: "24/7 gym access", included: true },
      { text: "20% off all spa services", included: true },
      { text: "Unlimited classes + private sessions", included: true },
      { text: "Premium locker included", included: true },
      { text: "Priority booking (72h early)", included: true },
      { text: "5 guest passes / month", included: true },
      { text: "1 complimentary massage / month", included: true },
      { text: "VIP lounge access", included: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Services Tab                                                       */
/* ------------------------------------------------------------------ */

function ServicesTab() {
  return (
    <div className="space-y-12">
      {serviceCategories.map((category) => {
        const categoryServices = services.filter(
          (s) => s.category === category.id
        );
        const Icon = categoryIcons[category.id] || Sparkles;

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary-900">
                {category.name}
              </h3>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border bg-primary-50/50">
                      <th className="text-left p-4 text-sm font-semibold text-foreground-muted">
                        Service
                      </th>
                      <th className="text-center p-4 text-sm font-semibold text-foreground-muted">
                        Duration
                      </th>
                      <th className="text-right p-4 text-sm font-semibold text-foreground-muted">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryServices.map((service) => (
                      <tr
                        key={service.id}
                        className="border-b border-border last:border-0 hover:bg-primary-50/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {service.name}
                            </span>
                            {service.isPopular && (
                              <Badge variant="accent" className="text-[10px]">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground-muted mt-1">
                            {service.shortDescription}
                          </p>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            {service.duration.map((d) => (
                              <span
                                key={d}
                                className="text-sm text-foreground-secondary"
                              >
                                {formatDuration(d)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex flex-col items-end gap-1">
                            {service.duration.map((d) => (
                              <span
                                key={d}
                                className="text-sm font-semibold text-primary-600"
                              >
                                {formatCurrency(
                                  service.price[d as keyof typeof service.price]
                                )}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Packages Tab                                                       */
/* ------------------------------------------------------------------ */

function PackagesTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {packageDeals.map((pkg, index) => {
        const Icon = pkg.icon;
        return (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              {/* Gradient strip */}
              <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">
                        {pkg.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1">
                        {pkg.validFor}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="accent">Save {pkg.savings}%</Badge>
                </div>

                <p className="text-sm text-foreground-secondary mb-4">
                  {pkg.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                    Includes
                  </p>
                  {pkg.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground-secondary"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-sm text-foreground-muted line-through">
                      {formatCurrency(pkg.originalPrice)}
                    </span>
                    <div className="font-display text-2xl font-bold text-primary-600">
                      {formatCurrency(pkg.price)}
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/book">Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Memberships Tab                                                    */
/* ------------------------------------------------------------------ */

function MembershipsTab() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {membershipTiers.map((tier, index) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`h-full relative overflow-hidden hover:shadow-lg transition-shadow ${
              tier.isPopular ? "border-primary-500 border-2 shadow-lg" : ""
            }`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg bg-primary-500 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  tier.id === "silver"
                    ? "bg-gray-100"
                    : tier.id === "gold"
                      ? "bg-primary-100"
                      : "bg-accent-100"
                }`}
              >
                {tier.id === "silver" && (
                  <Star className="h-8 w-8 text-gray-500" />
                )}
                {tier.id === "gold" && (
                  <Crown className="h-8 w-8 text-primary-600" />
                )}
                {tier.id === "platinum" && (
                  <Sparkles className="h-8 w-8 text-accent-600" />
                )}
              </div>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <p className="text-sm text-foreground-secondary mt-2">
                {tier.description}
              </p>
              <div className="mt-4">
                <span className="font-display text-4xl font-bold text-primary-600">
                  {formatCurrency(tier.price)}
                </span>
                <span className="text-foreground-muted">/{tier.period}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                {tier.benefits.map((benefit) => (
                  <div
                    key={benefit.text}
                    className="flex items-center gap-3 text-sm"
                  >
                    {benefit.included ? (
                      <CheckCircle2 className="h-4 w-4 text-primary-500 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
                    )}
                    <span
                      className={
                        benefit.included
                          ? "text-foreground-secondary"
                          : "text-gray-400"
                      }
                    >
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                variant={tier.isPopular ? "default" : "outline"}
                asChild
              >
                <Link href="/book">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070')",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="bg-accent-400 text-accent-950 mb-4">
              Transparent Pricing
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pricing &{" "}
              <span className="text-accent-400">Packages</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Explore our services, value packages, and membership plans. Find
              the perfect option for your wellness goals and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="services" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="h-auto flex-wrap">
                <TabsTrigger value="services" className="text-base px-6 py-3">
                  <Clock className="h-4 w-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="packages" className="text-base px-6 py-3">
                  <Gift className="h-4 w-4 mr-2" />
                  Packages
                </TabsTrigger>
                <TabsTrigger
                  value="memberships"
                  className="text-base px-6 py-3"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Memberships
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>

            <TabsContent value="packages">
              <PackagesTab />
            </TabsContent>

            <TabsContent value="memberships">
              <MembershipsTab />
            </TabsContent>
          </Tabs>
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
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Book your preferred service, package, or membership today and
              experience the Radiance difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <Link href="/book">
                  Book Now
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
