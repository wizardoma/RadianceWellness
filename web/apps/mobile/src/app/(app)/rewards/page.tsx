"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Star, 
  Gift,
  Trophy,
  ChevronRight,
  Clock,
  Check,
  Sparkles,
  Crown,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Badge, Separator } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Mock user rewards data
const userRewards = {
  points: 2450,
  tier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 550,
  lifetimePoints: 8750,
  memberSince: "January 2025",
};

const tiers = [
  { name: "Silver", minPoints: 0, color: "bg-gray-400", benefits: ["5% off all services", "Birthday reward"] },
  { name: "Gold", minPoints: 2000, color: "bg-yellow-500", benefits: ["10% off all services", "Birthday reward", "Priority booking", "Complimentary drinks"] },
  { name: "Platinum", minPoints: 5000, color: "bg-purple-500", benefits: ["15% off all services", "Birthday reward", "Priority booking", "Complimentary drinks", "Free monthly add-on", "VIP lounge access"] },
];

const rewardsToRedeem = [
  { id: "r1", name: "₦5,000 Service Credit", points: 500, icon: Gift },
  { id: "r2", name: "Free 30-min Add-on", points: 750, icon: Sparkles },
  { id: "r3", name: "₦10,000 Service Credit", points: 1000, icon: Gift },
  { id: "r4", name: "Free Aromatherapy Upgrade", points: 300, icon: Zap },
  { id: "r5", name: "Partner Spa Day (2 people)", points: 2500, icon: Crown },
  { id: "r6", name: "₦25,000 Service Credit", points: 2000, icon: Gift },
];

const pointsHistory = [
  { id: "h1", description: "Swedish Massage booking", points: 150, date: "Feb 1, 2026", type: "earned" },
  { id: "h2", description: "Referral bonus - Amara O.", points: 500, date: "Jan 28, 2026", type: "earned" },
  { id: "h3", description: "Redeemed ₦5,000 credit", points: -500, date: "Jan 25, 2026", type: "redeemed" },
  { id: "h4", description: "Facial Treatment booking", points: 200, date: "Jan 20, 2026", type: "earned" },
  { id: "h5", description: "Birthday bonus", points: 300, date: "Jan 15, 2026", type: "bonus" },
];

export default function RewardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"rewards" | "history">("rewards");
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);

  const currentTier = tiers.find(t => t.name === userRewards.tier);
  const nextTier = tiers.find(t => t.name === userRewards.nextTier);
  const progressToNextTier = nextTier 
    ? ((userRewards.points - (currentTier?.minPoints || 0)) / (nextTier.minPoints - (currentTier?.minPoints || 0))) * 100
    : 100;

  const handleRedeem = async (rewardId: string) => {
    setIsRedeeming(rewardId);
    await new Promise(r => setTimeout(r, 1500));
    setIsRedeeming(null);
    // In real app, would update points and show success
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-3 border-b flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="font-semibold">Rewards & Points</h1>
      </div>

      {/* Points Card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${currentTier?.color} flex items-center justify-center`}>
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">{userRewards.tier} Member</span>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              Since {userRewards.memberSince}
            </Badge>
          </div>

          <p className="text-sm opacity-80">Available Points</p>
          <p className="text-4xl font-bold mt-1">{userRewards.points.toLocaleString()}</p>

          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="opacity-80">Progress to {nextTier.name}</span>
                <span className="font-medium">{userRewards.pointsToNextTier} pts to go</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progressToNextTier}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex border-b px-4">
        <button
          onClick={() => setActiveTab("rewards")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "rewards"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500"
          }`}
        >
          Redeem Rewards
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "history"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500"
          }`}
        >
          Points History
        </button>
      </div>

      {activeTab === "rewards" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 space-y-4"
        >
          {/* How to Earn */}
          <div className="bg-primary-50 rounded-xl p-4">
            <h3 className="font-medium text-primary-900 mb-2">How to Earn Points</h3>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• Earn 1 point for every ₦100 spent</li>
              <li>• 500 bonus points for each referral</li>
              <li>• 300 bonus points on your birthday</li>
              <li>• 2x points during promotional periods</li>
            </ul>
          </div>

          {/* Rewards Grid */}
          <div className="space-y-3">
            <h3 className="font-medium">Available Rewards</h3>
            {rewardsToRedeem.map(reward => {
              const canAfford = userRewards.points >= reward.points;
              const IconComponent = reward.icon;
              
              return (
                <div 
                  key={reward.id} 
                  className={`border rounded-xl p-4 transition-all ${
                    canAfford ? "bg-white" : "bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      canAfford ? "bg-primary-100" : "bg-gray-200"
                    }`}>
                      <IconComponent className={`h-6 w-6 ${canAfford ? "text-primary-600" : "text-gray-400"}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{reward.name}</h4>
                      <p className="text-sm text-gray-500">{reward.points.toLocaleString()} points</p>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!canAfford || isRedeeming === reward.id}
                      onClick={() => handleRedeem(reward.id)}
                    >
                      {isRedeeming === reward.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : canAfford ? (
                        "Redeem"
                      ) : (
                        "Locked"
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier Benefits */}
          <div className="space-y-3">
            <h3 className="font-medium">Your {userRewards.tier} Benefits</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <ul className="space-y-2">
                {currentTier?.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-yellow-800">
                    <Check className="h-4 w-4 text-yellow-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "history" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 space-y-4"
        >
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{userRewards.lifetimePoints.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Lifetime Points</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{pointsHistory.filter(h => h.type === "earned").length}</p>
              <p className="text-xs text-gray-500">Transactions</p>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-2">
            <h3 className="font-medium">Recent Activity</h3>
            {pointsHistory.map(item => (
              <div key={item.id} className="flex items-center gap-3 py-3 border-b last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === "earned" ? "bg-green-100" :
                  item.type === "redeemed" ? "bg-orange-100" :
                  "bg-purple-100"
                }`}>
                  {item.type === "earned" ? (
                    <Star className="h-5 w-5 text-green-600" />
                  ) : item.type === "redeemed" ? (
                    <Gift className="h-5 w-5 text-orange-600" />
                  ) : (
                    <Trophy className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <span className={`font-semibold ${item.points > 0 ? "text-green-600" : "text-orange-600"}`}>
                  {item.points > 0 ? "+" : ""}{item.points}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
