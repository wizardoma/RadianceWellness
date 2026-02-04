"use client";

import { Check, Crown, Star, Zap } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Separator } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

const membershipPlans = [
  {
    id: "silver",
    name: "Silver",
    price: 25000,
    period: "month",
    icon: Star,
    color: "gray",
    description: "Perfect for occasional wellness seekers",
    features: [
      "5% discount on all services",
      "Priority booking (24hr advance)",
      "Birthday special offer",
      "Free cancellation up to 24hrs",
      "Access to member events",
    ],
    popular: false,
  },
  {
    id: "gold",
    name: "Gold",
    price: 50000,
    period: "month",
    icon: Crown,
    color: "amber",
    description: "Our most popular membership tier",
    features: [
      "15% discount on all services",
      "Priority booking (48hr advance)",
      "Birthday special offer + free service",
      "Free cancellation up to 12hrs",
      "Access to member events",
      "1 free massage per month",
      "Complimentary refreshments",
      "Dedicated wellness concierge",
    ],
    popular: true,
    current: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 100000,
    period: "month",
    icon: Zap,
    color: "purple",
    description: "The ultimate wellness experience",
    features: [
      "25% discount on all services",
      "Instant priority booking",
      "Birthday celebration package",
      "Free cancellation anytime",
      "VIP access to all events",
      "2 free massages per month",
      "Complimentary spa treatments",
      "Personal wellness advisor",
      "Exclusive platinum lounge access",
      "Guest passes (2 per month)",
    ],
    popular: false,
  },
];

const membershipBenefits = [
  { title: "Sessions Completed", value: "24", subtitle: "This year" },
  { title: "Total Savings", value: "₦86,400", subtitle: "From discounts" },
  { title: "Points Earned", value: "2,450", subtitle: "Available to redeem" },
  { title: "Next Reward", value: "550", subtitle: "Points until free service" },
];

export default function MembershipsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          Memberships
        </h1>
        <p className="text-foreground-secondary mt-1">
          Manage your membership and explore upgrade options
        </p>
      </div>

      {/* Current Membership */}
      <Card className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <p className="text-amber-100 text-sm">Current Membership</p>
                <h2 className="font-display text-2xl font-bold">Gold Member</h2>
                <p className="text-amber-100 text-sm">Renews on March 1, 2026</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white text-amber-600 hover:bg-amber-50">
                Manage Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {membershipBenefits.map((benefit, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{benefit.value}</p>
              <p className="text-sm font-medium text-gray-700">{benefit.title}</p>
              <p className="text-xs text-foreground-muted">{benefit.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Membership Plans */}
      <div>
        <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Membership Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.current ? "border-2 border-amber-500" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary-500 text-white">Most Popular</Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-amber-500 text-white">Current Plan</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 ${
                    plan.color === "gray" ? "bg-gray-100" :
                    plan.color === "amber" ? "bg-amber-100" : "bg-purple-100"
                  }`}>
                    <Icon className={`h-7 w-7 ${
                      plan.color === "gray" ? "text-gray-600" :
                      plan.color === "amber" ? "text-amber-600" : "text-purple-600"
                    }`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-foreground-muted">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-foreground-muted">/{plan.period}</span>
                  </div>

                  <Separator />

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          plan.color === "gray" ? "text-gray-500" :
                          plan.color === "amber" ? "text-amber-500" : "text-purple-500"
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : 
                     plan.price > 50000 ? "Upgrade" : "Switch Plan"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Points Redemption */}
      <Card>
        <CardHeader>
          <CardTitle>Points & Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-primary-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">You have 2,450 points</p>
              <p className="text-sm text-foreground-secondary">
                Redeem your points for free services and exclusive rewards
              </p>
            </div>
            <Button>Redeem Points</Button>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { points: 1000, reward: "₦5,000 voucher" },
              { points: 2000, reward: "Free 30-min massage" },
              { points: 3000, reward: "Free 60-min massage" },
            ].map((item, index) => (
              <div key={index} className="p-4 border border-border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary-600">{item.points}</p>
                <p className="text-sm text-foreground-muted">points</p>
                <p className="text-sm font-medium mt-2">{item.reward}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
