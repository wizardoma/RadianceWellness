"use client";

import { useState } from "react";
import {
  Gift,
  CreditCard,
  Send,
  User,
  Mail,
  MessageSquare,
  CheckCircle2,
  Copy,
  ShoppingBag,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Label,
  Textarea,
  Switch,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Separator,
} from "@radiance/ui";
import { formatCurrency, cn } from "@radiance/utils";

// -------- Types --------
interface OwnedGiftCard {
  id: string;
  code: string;
  originalValue: number;
  balance: number;
  status: "active" | "redeemed" | "expired";
  source: string;
}

// -------- Mock Data --------
const presetAmounts = [10000, 25000, 50000, 100000];

const initialOwnedCards: OwnedGiftCard[] = [
  {
    id: "1",
    code: "GC-RW-001",
    originalValue: 50000,
    balance: 35000,
    status: "active",
    source: 'Received from "Amara O."',
  },
  {
    id: "2",
    code: "GC-RW-002",
    originalValue: 25000,
    balance: 0,
    status: "redeemed",
    source: "Purchased by self",
  },
  {
    id: "3",
    code: "GC-RW-003",
    originalValue: 10000,
    balance: 10000,
    status: "active",
    source: 'Received from "Emeka O."',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "redeemed":
      return "bg-gray-100 text-gray-600";
    case "expired":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

function generateGiftCardCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "GC-RW-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function GiftCardsPage() {
  // Purchase form state
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [sendAsGift, setSendAsGift] = useState(true);

  // Payment dialog
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  // Success state
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchasedCode, setPurchasedCode] = useState("");
  const [codeCopied, setCodeCopied] = useState(false);

  // Owned cards
  const [ownedCards] = useState<OwnedGiftCard[]>(initialOwnedCards);

  // Apply dialog
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyCard, setApplyCard] = useState<OwnedGiftCard | null>(null);

  const effectiveAmount = isCustom ? Number(customAmount) || 0 : (selectedAmount || 0);

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handlePurchase = () => {
    if (effectiveAmount < 1000) return;
    setPaymentOpen(true);
  };

  const handleConfirmPayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentOpen(false);
      const code = generateGiftCardCode();
      setPurchasedCode(code);
      setPurchaseSuccess(true);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(purchasedCode).catch(() => {});
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleNewPurchase = () => {
    setPurchaseSuccess(false);
    setPurchasedCode("");
    setSelectedAmount(null);
    setIsCustom(false);
    setCustomAmount("");
    setRecipientName("");
    setRecipientEmail("");
    setPersonalMessage("");
    setSendAsGift(true);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
  };

  const handleApplyToBooking = (card: OwnedGiftCard) => {
    setApplyCard(card);
    setApplyOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          Gift Cards
        </h1>
        <p className="text-foreground-secondary mt-1">
          Give the gift of wellness
        </p>
      </div>

      <Tabs defaultValue="purchase">
        <TabsList>
          <TabsTrigger value="purchase">
            <Gift className="h-4 w-4 mr-2" />
            Purchase
          </TabsTrigger>
          <TabsTrigger value="my-cards">
            <CreditCard className="h-4 w-4 mr-2" />
            My Gift Cards
          </TabsTrigger>
        </TabsList>

        {/* ==================== PURCHASE TAB ==================== */}
        <TabsContent value="purchase" className="mt-6">
          {purchaseSuccess ? (
            /* Success State */
            <Card className="max-w-lg mx-auto">
              <CardContent className="p-8 text-center space-y-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-900">
                    Purchase Successful!
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {sendAsGift
                      ? `Your gift card has been sent to ${recipientEmail || "the recipient"}.`
                      : "Your gift card is ready to use."}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Gift className="h-5 w-5" />
                    <span className="font-display text-lg font-semibold">
                      Radiance Wellness
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {formatCurrency(effectiveAmount)}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="bg-white/20 rounded-lg px-4 py-2 text-sm font-mono tracking-wider">
                      {purchasedCode}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={handleCopyCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {codeCopied && (
                    <p className="text-xs text-primary-100">Copied to clipboard!</p>
                  )}
                </div>

                <Button onClick={handleNewPurchase} className="w-full">
                  Purchase Another Gift Card
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Purchase Form */
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Amount Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleSelectPreset(amount)}
                          className={cn(
                            "relative rounded-xl border-2 p-4 text-center transition-all hover:shadow-md",
                            selectedAmount === amount && !isCustom
                              ? "border-primary-500 bg-primary-50"
                              : "border-border hover:border-gray-300"
                          )}
                        >
                          <p className="font-bold text-lg text-gray-900">
                            {formatCurrency(amount)}
                          </p>
                          {selectedAmount === amount && !isCustom && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="h-5 w-5 text-primary-500" />
                            </div>
                          )}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleSelectCustom}
                        className={cn(
                          "relative rounded-xl border-2 p-4 text-center transition-all hover:shadow-md col-span-2 sm:col-span-1",
                          isCustom
                            ? "border-primary-500 bg-primary-50"
                            : "border-border hover:border-gray-300"
                        )}
                      >
                        <p className="font-bold text-lg text-gray-900">Custom</p>
                        <p className="text-xs text-gray-500">Enter amount</p>
                        {isCustom && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 className="h-5 w-5 text-primary-500" />
                          </div>
                        )}
                      </button>
                    </div>

                    {isCustom && (
                      <div className="mt-4">
                        <Label>Custom Amount (NGN)</Label>
                        <Input
                          type="number"
                          placeholder="Enter amount (min 1,000)"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="mt-1"
                          min={1000}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recipient Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recipient Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Toggle: Gift vs Self */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Send className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {sendAsGift ? "Send as gift" : "Buy for myself"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {sendAsGift
                              ? "Recipient will receive an email"
                              : "Card will be added to your account"}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={sendAsGift}
                        onCheckedChange={setSendAsGift}
                      />
                    </div>

                    {sendAsGift && (
                      <>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" />
                            Recipient Name
                          </Label>
                          <Input
                            placeholder="Enter recipient's name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" />
                            Recipient Email
                          </Label>
                          <Input
                            type="email"
                            placeholder="Enter recipient's email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5" />
                            Personal Message
                          </Label>
                          <Textarea
                            placeholder="Write a personal message (optional)"
                            value={personalMessage}
                            onChange={(e) => setPersonalMessage(e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Preview & Purchase */}
              <div className="space-y-6">
                {/* Email Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Email Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 text-white space-y-3">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4" />
                        <span className="font-display text-sm font-semibold">
                          Radiance Wellness
                        </span>
                      </div>
                      <Separator className="bg-white/20" />
                      {sendAsGift && recipientName && (
                        <p className="text-sm text-primary-100">
                          Dear {recipientName},
                        </p>
                      )}
                      <p className="text-sm text-primary-100">
                        {sendAsGift
                          ? "You have received a gift card!"
                          : "Your gift card is ready."}
                      </p>
                      <p className="text-2xl font-bold text-center py-2">
                        {effectiveAmount > 0
                          ? formatCurrency(effectiveAmount)
                          : "Select amount"}
                      </p>
                      {personalMessage && (
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-primary-100 italic">
                            &ldquo;{personalMessage}&rdquo;
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-primary-200 text-center">
                        Redeemable at Radiance Wellness Spa
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Purchase Button */}
                <Button
                  className="w-full"
                  size="lg"
                  disabled={effectiveAmount < 1000}
                  onClick={handlePurchase}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {effectiveAmount > 0
                    ? `Purchase Gift Card - ${formatCurrency(effectiveAmount)}`
                    : "Select an amount"}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ==================== MY GIFT CARDS TAB ==================== */}
        <TabsContent value="my-cards" className="mt-6">
          {ownedCards.length > 0 ? (
            <div className="space-y-4">
              {ownedCards.map((card) => {
                const usedPercentage =
                  card.originalValue > 0
                    ? ((card.originalValue - card.balance) / card.originalValue) * 100
                    : 100;
                return (
                  <Card key={card.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Gift className="h-7 w-7 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="font-mono text-sm font-semibold text-gray-900">
                                {card.code}
                              </code>
                              <Badge className={getStatusColor(card.status)}>
                                {card.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{card.source}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-600">
                                Original: {formatCurrency(card.originalValue)}
                              </span>
                              <span className="font-medium text-primary-600">
                                Balance: {formatCurrency(card.balance)}
                              </span>
                            </div>
                            {/* Progress bar */}
                            <div className="mt-3 w-full max-w-xs">
                              <div className="w-full bg-gray-100 rounded-full h-2.5">
                                <div
                                  className={cn(
                                    "h-2.5 rounded-full transition-all",
                                    card.balance > 0
                                      ? "bg-primary-500"
                                      : "bg-gray-300"
                                  )}
                                  style={{
                                    width: `${100 - usedPercentage}%`,
                                  }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {Math.round(100 - usedPercentage)}% remaining
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          {card.status === "active" && card.balance > 0 && (
                            <Button
                              variant="outline"
                              onClick={() => handleApplyToBooking(card)}
                            >
                              Apply to Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  No gift cards yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Purchase a gift card or receive one from someone to see it here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* ==================== PAYMENT DIALOG ==================== */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              Complete your gift card purchase of{" "}
              {formatCurrency(effectiveAmount)}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label>CVC</Label>
                <Input
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  maxLength={4}
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gift Card Amount</span>
              <span className="font-semibold">{formatCurrency(effectiveAmount)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!cardNumber || !cardExpiry || !cardCvc || processing}
              onClick={handleConfirmPayment}
            >
              {processing ? "Processing..." : `Pay ${formatCurrency(effectiveAmount)}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== APPLY TO BOOKING DIALOG ==================== */}
      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent className="max-w-sm">
          {applyCard && (
            <>
              <DialogHeader>
                <DialogTitle>Apply Gift Card</DialogTitle>
                <DialogDescription>
                  Use {applyCard.code} for your next booking.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gift Card</span>
                    <code className="font-mono font-medium">{applyCard.code}</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available Balance</span>
                    <span className="font-semibold text-primary-600">
                      {formatCurrency(applyCard.balance)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  This gift card will be applied as a payment method during your
                  next booking checkout. The applicable amount will be deducted
                  from the balance.
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setApplyOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setApplyOpen(false);
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Apply to Next Booking
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
