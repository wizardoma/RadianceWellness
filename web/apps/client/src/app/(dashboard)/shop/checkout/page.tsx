"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Building2,
  MapPin,
  Store,
  Truck,
  ShoppingBag,
  Package,
  Loader2,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Label,
  Separator,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

type CheckoutStep = "shipping" | "payment" | "confirmation";
type DeliveryMethod = "pickup" | "delivery";
type PaymentMethod = "card" | "transfer";

interface ShippingInfo {
  deliveryMethod: DeliveryMethod;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

interface CardInfo {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

// Mock cart items (in production, this would come from cart state/context)
const cartItems = [
  { id: "P001", name: "Radiance Glow Face Cream", size: "50ml", price: 12500, quantity: 1, color: "bg-rose-100 text-rose-700" },
  { id: "P007", name: "Radiance Vitamin C Serum", size: "30ml", price: 18500, quantity: 1, color: "bg-orange-100 text-orange-700" },
  { id: "P005", name: "Wellness Tea Collection", size: "", price: 6500, quantity: 2, color: "bg-green-100 text-green-700" },
];

const SHIPPING_THRESHOLD = 20000;
const SHIPPING_FEE = 2500;

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Shipping state
  const [shipping, setShipping] = useState<ShippingInfo>({
    deliveryMethod: "pickup",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shipping.deliveryMethod === "pickup" ? 0 : (subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE);
  const total = subtotal + shippingCost;

  const generateOrderNumber = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `ORD-RW-${num}`;
  };

  const canProceedToPayment = () => {
    if (shipping.deliveryMethod === "pickup") return true;
    return (
      shipping.name.trim() !== "" &&
      shipping.phone.trim() !== "" &&
      shipping.address.trim() !== "" &&
      shipping.city.trim() !== "" &&
      shipping.state.trim() !== ""
    );
  };

  const canSubmitPayment = () => {
    if (paymentMethod === "transfer") return true;
    return (
      cardInfo.number.trim() !== "" &&
      cardInfo.expiry.trim() !== "" &&
      cardInfo.cvv.trim() !== "" &&
      cardInfo.name.trim() !== ""
    );
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setOrderNumber(generateOrderNumber());
    setCurrentStep("confirmation");
    setIsProcessing(false);
  };

  // Confirmation Step
  if (currentStep === "confirmation") {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h2>
            <p className="text-foreground-secondary mb-6">
              Thank you for your purchase
            </p>

            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-foreground-muted mb-1">Order Number</p>
              <p className="text-2xl font-mono font-bold text-primary-700">{orderNumber}</p>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} {item.quantity > 1 && `x${item.quantity}`}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
              <div className="flex items-center gap-2 mb-2">
                {shipping.deliveryMethod === "pickup" ? (
                  <Store className="h-4 w-4 text-primary-600" />
                ) : (
                  <Truck className="h-4 w-4 text-primary-600" />
                )}
                <span className="font-medium text-sm">
                  {shipping.deliveryMethod === "pickup" ? "Pickup at Center" : "Delivery"}
                </span>
              </div>
              {shipping.deliveryMethod === "pickup" ? (
                <div className="text-sm text-foreground-secondary">
                  <p>Radiance Wellness Center</p>
                  <p>Ready for pickup in 1-2 business days</p>
                  <p className="mt-1 text-foreground-muted">You'll receive an SMS when your order is ready</p>
                </div>
              ) : (
                <div className="text-sm text-foreground-secondary">
                  <p>{shipping.name}</p>
                  <p>{shipping.address}</p>
                  <p>{shipping.city}, {shipping.state}</p>
                  <p className="mt-1 text-foreground-muted">Estimated delivery: 3-5 business days</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/bookings">View Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shop">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-foreground-secondary mt-1">
            Complete your order
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-md">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isActive || isCompleted
                      ? "bg-primary-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 hidden sm:block ${
                    isActive ? "text-primary-600 font-medium" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 ${
                    isCompleted ? "bg-primary-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {currentStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Method */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Delivery Method</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shipping.deliveryMethod === "pickup"
                          ? "border-primary-500 bg-primary-50"
                          : "border-border hover:border-primary-300"
                      }`}
                      onClick={() =>
                        setShipping({ ...shipping, deliveryMethod: "pickup" })
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                          <Store className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium">Pickup at Center</p>
                          <p className="text-sm text-green-600 font-medium">Free</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shipping.deliveryMethod === "delivery"
                          ? "border-primary-500 bg-primary-50"
                          : "border-border hover:border-primary-300"
                      }`}
                      onClick={() =>
                        setShipping({ ...shipping, deliveryMethod: "delivery" })
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Delivery</p>
                          <p className="text-sm text-foreground-muted">
                            {subtotal >= SHIPPING_THRESHOLD ? (
                              <span className="text-green-600 font-medium">Free</span>
                            ) : (
                              formatCurrency(SHIPPING_FEE)
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address Fields */}
                {shipping.deliveryMethod === "delivery" && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <MapPin className="h-4 w-4" />
                      <span>Delivery Address</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={shipping.name}
                          onChange={(e) =>
                            setShipping({ ...shipping, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="e.g. 08012345678"
                          value={shipping.phone}
                          onChange={(e) =>
                            setShipping({ ...shipping, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter your street address"
                        value={shipping.address}
                        onChange={(e) =>
                          setShipping({ ...shipping, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="e.g. Lagos"
                          value={shipping.city}
                          onChange={(e) =>
                            setShipping({ ...shipping, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="e.g. Lagos"
                          value={shipping.state}
                          onChange={(e) =>
                            setShipping({ ...shipping, state: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pickup Info */}
                {shipping.deliveryMethod === "pickup" && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Store className="h-5 w-5 text-primary-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Radiance Wellness Center</p>
                        <p className="text-sm text-foreground-secondary">
                          12 Victoria Island Boulevard, Lagos
                        </p>
                        <p className="text-sm text-foreground-muted mt-1">
                          Ready for pickup in 1-2 business days
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => setCurrentStep("payment")}
                  disabled={!canProceedToPayment()}
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {currentStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-primary-500 bg-primary-50"
                        : "border-border hover:border-primary-300"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium">Card Payment</p>
                        <p className="text-xs text-foreground-muted">Debit or credit card</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "transfer"
                        ? "border-primary-500 bg-primary-50"
                        : "border-border hover:border-primary-300"
                    }`}
                    onClick={() => setPaymentMethod("transfer")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-xs text-foreground-muted">Direct bank transfer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Card Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={cardInfo.number}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, number: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, expiry: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, cvv: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="Name on card"
                        value={cardInfo.name}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Bank Transfer Info */}
                {paymentMethod === "transfer" && (
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h4 className="font-medium text-gray-900">Bank Transfer Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Bank</span>
                        <span className="font-medium">First Bank of Nigeria</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Account Name</span>
                        <span className="font-medium">Radiance Wellness Ltd</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Account Number</span>
                        <span className="font-mono font-medium">3088234567</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Amount</span>
                        <span className="font-bold text-primary-600">{formatCurrency(total)}</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-700">
                        Please use your order reference as the payment description. Your order will be confirmed once payment is verified.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("shipping")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handlePayment}
                    disabled={!canSubmitPayment() || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay {formatCurrency(total)}</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color.split(" ")[0]}`}>
                      <span className={`text-xs font-bold ${item.color.split(" ")[1]} opacity-60`}>
                        {item.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        Qty: {item.quantity}
                        {item.size && ` - ${item.size}`}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary-600">{formatCurrency(total)}</span>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  {shipping.deliveryMethod === "pickup" ? (
                    <>
                      <Store className="h-4 w-4 text-primary-600" />
                      <span className="text-foreground-muted">Pickup at Center</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 text-primary-600" />
                      <span className="text-foreground-muted">Delivery (3-5 days)</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
