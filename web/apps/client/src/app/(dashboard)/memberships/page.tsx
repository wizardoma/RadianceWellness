"use client";

import { useState } from "react";
import { Check, Crown, Star, Zap } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

const allPlans = [
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

const redemptionOptions = [
  { id: "discount", points: 1000, reward: "N5,000 discount", description: "Applied to your next booking" },
  { id: "basic-massage", points: 2000, reward: "Free Basic Massage", description: "30-minute relaxation massage" },
  { id: "premium-service", points: 3000, reward: "Free Premium Service", description: "60-minute premium treatment" },
];

export default function MembershipsPage() {
  const [currentPlanId, setCurrentPlanId] = useState("gold");
  const [points, setPoints] = useState(2450);

  // Dialog states
  const [manageOpen, setManageOpen] = useState(false);
  const [pauseConfirmOpen, setPauseConfirmOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [switchPlanOpen, setSwitchPlanOpen] = useState(false);
  const [targetPlan, setTargetPlan] = useState<typeof allPlans[0] | null>(null);

  const [redeemOpen, setRedeemOpen] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<string | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const [planChangeSuccess, setPlanChangeSuccess] = useState("");

  const currentPlan = allPlans.find((p) => p.id === currentPlanId)!;

  const membershipPlans = allPlans.map((plan) => ({
    ...plan,
    current: plan.id === currentPlanId,
  }));

  const membershipBenefits = [
    { title: "Sessions Completed", value: "24", subtitle: "This year" },
    { title: "Total Savings", value: "N86,400", subtitle: "From discounts" },
    { title: "Points Earned", value: points.toLocaleString(), subtitle: "Available to redeem" },
    { title: "Next Reward", value: "550", subtitle: "Points until free service" },
  ];

  const handleSwitchPlan = (plan: typeof allPlans[0]) => {
    setTargetPlan(plan);
    setSwitchPlanOpen(true);
  };

  const confirmSwitchPlan = () => {
    if (!targetPlan) return;
    setCurrentPlanId(targetPlan.id);
    setSwitchPlanOpen(false);
    setTargetPlan(null);
    setPlanChangeSuccess(
      `Successfully ${targetPlan.price > currentPlan.price ? "upgraded" : "switched"} to ${targetPlan.name} plan!`
    );
    setTimeout(() => setPlanChangeSuccess(""), 3000);
  };

  const handleRedeem = () => {
    const option = redemptionOptions.find((o) => o.id === selectedRedemption);
    if (!option || points < option.points) return;
    setPoints((prev) => prev - option.points);
    setRedeemSuccess(true);
    setTimeout(() => {
      setRedeemSuccess(false);
      setSelectedRedemption(null);
      setRedeemOpen(false);
    }, 2000);
  };

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

      {/* Plan change success message */}
      {planChangeSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
          {planChangeSuccess}
        </div>
      )}

      {/* Current Membership */}
      <Card className={`border-0 text-white ${
        currentPlanId === "silver" ? "bg-gradient-to-r from-gray-500 to-gray-600" :
        currentPlanId === "platinum" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
        "bg-gradient-to-r from-amber-500 to-amber-600"
      }`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                {currentPlanId === "silver" ? <Star className="h-8 w-8" /> :
                 currentPlanId === "platinum" ? <Zap className="h-8 w-8" /> :
                 <Crown className="h-8 w-8" />}
              </div>
              <div>
                <p className="text-white/70 text-sm">Current Membership</p>
                <h2 className="font-display text-2xl font-bold">{currentPlan.name} Member</h2>
                <p className="text-white/70 text-sm">Renews on March 1, 2026</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white text-gray-800 hover:bg-gray-50"
                onClick={() => setManageOpen(true)}
              >
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
                className={`relative ${plan.current ? `border-2 ${
                  plan.color === "gray" ? "border-gray-500" :
                  plan.color === "purple" ? "border-purple-500" :
                  "border-amber-500"
                }` : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary-500 text-white">Most Popular</Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 right-4">
                    <Badge className={`text-white ${
                      plan.color === "gray" ? "bg-gray-500" :
                      plan.color === "purple" ? "bg-purple-500" :
                      "bg-amber-500"
                    }`}>Current Plan</Badge>
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
                    onClick={() => !plan.current && handleSwitchPlan(plan)}
                  >
                    {plan.current ? "Current Plan" :
                     plan.price > currentPlan.price ? "Upgrade" : "Switch Plan"}
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
              <p className="font-semibold text-gray-900">You have {points.toLocaleString()} points</p>
              <p className="text-sm text-foreground-secondary">
                Redeem your points for free services and exclusive rewards
              </p>
            </div>
            <Button onClick={() => { setRedeemSuccess(false); setSelectedRedemption(null); setRedeemOpen(true); }}>
              Redeem Points
            </Button>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {redemptionOptions.map((item) => (
              <div key={item.id} className="p-4 border border-border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary-600">{item.points.toLocaleString()}</p>
                <p className="text-sm text-foreground-muted">points</p>
                <p className="text-sm font-medium mt-2">{item.reward}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manage Subscription Dialog */}
      <Dialog open={manageOpen} onOpenChange={setManageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>View and manage your current membership plan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Current Plan</span>
                <span className="font-semibold">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Monthly Price</span>
                <span className="font-semibold">{formatCurrency(currentPlan.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Renewal Date</span>
                <span className="font-semibold">March 1, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Payment Method</span>
                <span className="font-semibold">Visa ending in 4242</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => { setManageOpen(false); setPauseConfirmOpen(true); }}
              >
                Pause Subscription
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => { setManageOpen(false); setCancelConfirmOpen(true); setCancelReason(""); }}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setManageOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pause Subscription Confirmation Dialog */}
      <Dialog open={pauseConfirmOpen} onOpenChange={setPauseConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Subscription</DialogTitle>
            <DialogDescription>
              Your subscription will be paused and you will not be charged until you resume.
              Your benefits will be unavailable during the pause.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPauseConfirmOpen(false)}>
              Go Back
            </Button>
            <Button onClick={() => setPauseConfirmOpen(false)}>
              Confirm Pause
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Confirmation Dialog */}
      <Dialog open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel? You will lose all membership benefits at the end of your current billing period.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Please tell us why you are cancelling (optional)
            </label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Your feedback helps us improve..."
              className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelConfirmOpen(false)}>
              Go Back
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setCancelConfirmOpen(false)}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Switch Plan Dialog */}
      <Dialog open={switchPlanOpen} onOpenChange={setSwitchPlanOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {targetPlan && targetPlan.price > currentPlan.price ? "Upgrade" : "Switch"} Plan
            </DialogTitle>
            <DialogDescription>
              Review the changes to your membership
            </DialogDescription>
          </DialogHeader>
          {targetPlan && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Current Plan</p>
                  <p className="font-semibold text-lg">{currentPlan.name}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(currentPlan.price)}/mo</p>
                </div>
                <div className="p-4 border-2 border-primary-500 rounded-xl text-center bg-primary-50">
                  <p className="text-xs text-primary-600 mb-1">New Plan</p>
                  <p className="font-semibold text-lg">{targetPlan.name}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(targetPlan.price)}/mo</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500">Price difference</p>
                <p className={`font-semibold text-lg ${
                  targetPlan.price > currentPlan.price ? "text-amber-600" : "text-green-600"
                }`}>
                  {targetPlan.price > currentPlan.price ? "+" : "-"}
                  {formatCurrency(Math.abs(targetPlan.price - currentPlan.price))}/mo
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSwitchPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSwitchPlan}>
              Confirm {targetPlan && targetPlan.price > currentPlan.price ? "Upgrade" : "Switch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redeem Points Dialog */}
      <Dialog open={redeemOpen} onOpenChange={setRedeemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redeem Points</DialogTitle>
            <DialogDescription>
              Current balance: <span className="font-semibold text-gray-900">{points.toLocaleString()} points</span>
            </DialogDescription>
          </DialogHeader>
          {redeemSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">Points Redeemed!</p>
              <p className="text-sm text-gray-500 mt-1">Your reward has been applied to your account.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {redemptionOptions.map((option) => {
                  const canAfford = points >= option.points;
                  return (
                    <button
                      key={option.id}
                      onClick={() => canAfford && setSelectedRedemption(option.id)}
                      disabled={!canAfford}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                        selectedRedemption === option.id
                          ? "border-primary-500 bg-primary-50"
                          : canAfford
                          ? "border-border hover:border-primary-300"
                          : "border-border opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{option.reward}</p>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary-600">{option.points.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                      {!canAfford && (
                        <p className="text-xs text-red-500 mt-1">
                          You need {(option.points - points).toLocaleString()} more points
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRedeemOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleRedeem}
                  disabled={!selectedRedemption}
                >
                  Redeem
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
