"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Gift,
  Send,
  CreditCard,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Button,
  Badge,
  Input,
  Separator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

const giftCardAmounts = [5000, 10000, 15000, 25000, 50000, 100000];

const initialGiftCards = [
  {
    id: "gc-1",
    code: "RW-GIFT-A3F2",
    balance: 15000,
    originalAmount: 25000,
    expiresAt: "2026-12-31",
    from: "Mom",
  },
  {
    id: "gc-2",
    code: "RW-GIFT-K9P1",
    balance: 10000,
    originalAmount: 10000,
    expiresAt: "2027-06-15",
    from: "Self-purchased",
  },
];

export default function GiftCardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "my-cards">("buy");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  // Gift card state
  const [myGiftCards, setMyGiftCards] = useState(initialGiftCards);

  // "Use Now" dialog state
  const [useNowCard, setUseNowCard] = useState<typeof initialGiftCards[0] | null>(null);

  // Redeem code state
  const [redeemCode, setRedeemCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    await new Promise(r => setTimeout(r, 1500));
    setPurchaseComplete(true);
    setIsPurchasing(false);
  };

  const handleUseNow = (card: typeof initialGiftCards[0]) => {
    setUseNowCard(card);
  };

  const handleRedeemCode = async () => {
    if (!redeemCode.trim()) return;
    setIsValidating(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsValidating(false);
    // Always succeed with 15,000
    const newCard = {
      id: `gc-${Date.now()}`,
      code: redeemCode.toUpperCase(),
      balance: 15000,
      originalAmount: 15000,
      expiresAt: "2027-12-31",
      from: "Redeemed",
    };
    setMyGiftCards(prev => [...prev, newCard]);
    setRedeemCode("");
    setRedeemSuccess(true);
  };

  const totalBalance = myGiftCards.reduce((sum, card) => sum + card.balance, 0);

  if (purchaseComplete) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 text-center pb-20">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Gift Card Sent!</h1>
        <p className="text-gray-500 mb-6">
          Your gift card has been sent to {recipientEmail}
        </p>

        <div className="w-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white mb-6">
          <Gift className="h-8 w-8 mb-2" />
          <p className="text-sm opacity-80">Gift Card Value</p>
          <p className="text-2xl font-bold">
            {formatCurrency(selectedAmount || parseInt(customAmount) || 0)}
          </p>
          <p className="text-sm mt-2 opacity-80">To: {recipientName}</p>
        </div>

        <div className="w-full space-y-3">
          <Button
            className="w-full"
            onClick={() => {
              setPurchaseComplete(false);
              setSelectedAmount(null);
              setCustomAmount("");
              setRecipientEmail("");
              setRecipientName("");
              setMessage("");
            }}
          >
            Send Another Gift Card
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/home")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-background px-4 py-3 border-b flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="font-semibold">Gift Cards</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "buy"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500"
          }`}
        >
          Buy Gift Card
        </button>
        <button
          onClick={() => setActiveTab("my-cards")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "my-cards"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500"
          }`}
        >
          My Gift Cards
        </button>
      </div>

      {activeTab === "buy" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 space-y-6"
        >
          {/* Preview Card */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-6 w-6" />
              <span className="font-semibold">Radiance Wellness</span>
            </div>
            <p className="text-sm opacity-80">Gift Card</p>
            <p className="text-3xl font-bold mt-1">
              {formatCurrency(selectedAmount || parseInt(customAmount) || 0)}
            </p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs opacity-70">The gift of wellness & relaxation</p>
            </div>
          </div>

          {/* Amount Selection */}
          <div>
            <h3 className="font-medium mb-3">Select Amount</h3>
            <div className="grid grid-cols-3 gap-2">
              {giftCardAmounts.map(amount => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                    selectedAmount === amount
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-border text-gray-700"
                  }`}
                >
                  {formatCurrency(amount)}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <Input
                placeholder="Or enter custom amount"
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
              />
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-3">
            <h3 className="font-medium">Recipient Details</h3>
            <Input
              placeholder="Recipient's name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <Input
              placeholder="Recipient's email"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <textarea
              placeholder="Add a personal message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none h-20"
            />
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full"
            disabled={(!selectedAmount && !customAmount) || !recipientEmail || !recipientName || isPurchasing}
            onClick={handlePurchase}
          >
            {isPurchasing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Gift Card - {formatCurrency(selectedAmount || parseInt(customAmount) || 0)}
              </>
            )}
          </Button>
        </motion.div>
      )}

      {activeTab === "my-cards" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 space-y-4"
        >
          {/* Total Balance */}
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-5 text-white">
            <p className="text-sm opacity-80">Total Gift Card Balance</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
            <p className="text-xs mt-2 opacity-70">{myGiftCards.length} active gift cards</p>
          </div>

          {/* Gift Cards List */}
          <div className="space-y-3">
            <h3 className="font-medium">Your Gift Cards</h3>
            {myGiftCards.map(card => (
              <div key={card.id} className="bg-white border rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-sm text-gray-500">{card.code}</p>
                    <p className="text-lg font-bold text-primary-600 mt-1">
                      {formatCurrency(card.balance)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      of {formatCurrency(card.originalAmount)} remaining
                    </p>
                  </div>
                  <Badge variant="secondary">{card.from}</Badge>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Expires: {card.expiresAt}</span>
                  <button
                    onClick={() => handleUseNow(card)}
                    className="text-primary-600 font-medium flex items-center gap-1"
                  >
                    Use Now <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Redeem Code */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-medium mb-2">Have a gift card code?</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                className="flex-1"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
              />
              <Button onClick={handleRedeemCode} disabled={!redeemCode.trim() || isValidating}>
                {isValidating ? (
                  <div className="flex items-center gap-1">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span className="sr-only">Validating</span>
                  </div>
                ) : (
                  "Redeem"
                )}
              </Button>
            </div>
            {isValidating && (
              <p className="text-sm text-gray-500 mt-2">Validating...</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Use Now Dialog */}
      <Dialog open={!!useNowCard} onOpenChange={(open) => !open && setUseNowCard(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Use Gift Card</DialogTitle>
            <DialogDescription>Apply this gift card at checkout.</DialogDescription>
          </DialogHeader>
          {useNowCard && (
            <div className="space-y-4">
              <div className="bg-primary-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Gift card <span className="font-mono font-medium">{useNowCard.code}</span> will be applied at checkout.</p>
                <p className="text-2xl font-bold text-primary-700 mt-2">
                  Balance: {formatCurrency(useNowCard.balance)}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button className="w-full" onClick={() => { setUseNowCard(null); router.push("/book"); }}>
              Go to Booking
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setUseNowCard(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redeem Success Dialog */}
      <Dialog open={redeemSuccess} onOpenChange={(open) => !open && setRedeemSuccess(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gift Card Redeemed!</DialogTitle>
            <DialogDescription>Your gift card has been successfully added.</DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(15000)} added to your balance
            </p>
            <p className="text-sm text-gray-500">
              Your new total balance is {formatCurrency(totalBalance)}
            </p>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={() => setRedeemSuccess(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
