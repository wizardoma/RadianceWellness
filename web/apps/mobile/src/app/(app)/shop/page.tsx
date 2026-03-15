"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Trash2,
  Check,
  ChevronRight,
  ArrowLeft,
  MapPin,
  CreditCard,
  Building2,
  Package,
  Truck,
} from "lucide-react";
import { Button, Badge, Input, Separator } from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  description: string;
  stock: number;
  color: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

type ViewMode = "browse" | "product-detail" | "cart" | "checkout";
type CheckoutStep = "delivery" | "payment" | "confirmation";

// Product data
const products: Product[] = [
  {
    id: "1",
    name: "Radiance Glow Face Cream",
    price: 12500,
    category: "Skincare",
    rating: 4.8,
    description:
      "A luxurious face cream infused with natural botanicals to give your skin a radiant, healthy glow. Perfect for daily use.",
    stock: 15,
    color: "bg-pink-200",
  },
  {
    id: "2",
    name: "Deep Hydration Body Lotion",
    price: 8900,
    category: "Body Care",
    rating: 4.6,
    description:
      "Intensely moisturizing body lotion with shea butter and vitamin E. Keeps your skin soft and supple all day long.",
    stock: 22,
    color: "bg-blue-200",
  },
  {
    id: "3",
    name: "Organic Hair Oil Treatment",
    price: 15000,
    category: "Hair Care",
    rating: 4.9,
    description:
      "Premium organic hair oil blend with argan, coconut, and jojoba oils. Nourishes and strengthens hair from root to tip.",
    stock: 8,
    color: "bg-amber-200",
  },
  {
    id: "4",
    name: "Aromatherapy Gift Set",
    price: 35000,
    category: "Gift Sets",
    rating: 5.0,
    description:
      "A curated collection of our finest aromatherapy products including essential oils, candles, and bath salts. Perfect for gifting.",
    stock: 5,
    color: "bg-purple-200",
  },
  {
    id: "5",
    name: "Wellness Tea Collection",
    price: 6500,
    category: "Wellness",
    rating: 4.7,
    description:
      "A handpicked selection of organic wellness teas designed to relax, rejuvenate, and restore balance to your day.",
    stock: 30,
    color: "bg-green-200",
  },
  {
    id: "6",
    name: "Bamboo Spa Headband",
    price: 3500,
    category: "Accessories",
    rating: 4.5,
    description:
      "Soft bamboo fabric headband perfect for keeping hair away during your skincare routine. Gentle and eco-friendly.",
    stock: 40,
    color: "bg-teal-200",
  },
  {
    id: "7",
    name: "Vitamin C Serum",
    price: 18500,
    category: "Skincare",
    rating: 4.9,
    description:
      "Potent vitamin C serum that brightens, firms, and protects your skin. Formulated with hyaluronic acid for deep hydration.",
    stock: 12,
    color: "bg-orange-200",
  },
  {
    id: "8",
    name: "Luxury Bath Salts",
    price: 9800,
    category: "Bath & Body",
    rating: 4.4,
    description:
      "Himalayan pink salt blended with essential oils and dried flower petals for a truly indulgent bath experience.",
    stock: 18,
    color: "bg-rose-200",
  },
];

const categories = [
  "All",
  "Skincare",
  "Body Care",
  "Hair Care",
  "Gift Sets",
  "Wellness",
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("delivery");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">(
    "card"
  );
  const [orderNumber, setOrderNumber] = useState("");

  // Derived state
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = deliveryMethod === "delivery" ? 2500 : 0;
  const total = subtotal + shippingFee;

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart actions
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCheckoutStep("delivery");
    setViewMode("checkout");
  };

  const handlePlaceOrder = () => {
    setOrderNumber(
      `RW-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    );
    setCheckoutStep("confirmation");
  };

  const handleOrderComplete = () => {
    setCart([]);
    setCheckoutStep("delivery");
    setDeliveryMethod("pickup");
    setDeliveryAddress("");
    setPaymentMethod("card");
    setOrderNumber("");
    setViewMode("browse");
  };

  // ─── Browse Mode ───────────────────────────────────────────────────────────
  if (viewMode === "browse") {
    return (
      <div className="pb-24 min-h-full">
        {/* Top bar */}
        <div className="bg-white px-4 py-3 border-b border-border flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-gray-900">Shop</h1>
          <button
            onClick={() => setViewMode("cart")}
            className="relative p-2 rounded-full bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setProductQuantity(1);
                  setViewMode("product-detail");
                }}
                className="bg-white rounded-xl border border-border p-3 text-left transition-colors hover:border-primary-200"
              >
                <div
                  className={`w-full h-24 rounded-lg ${product.color} flex items-center justify-center mb-2`}
                >
                  <Package className="h-8 w-8 text-gray-500/40" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-primary-600 mt-1">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No products found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different search or category
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Product Detail Mode ───────────────────────────────────────────────────
  if (viewMode === "product-detail" && selectedProduct) {
    return (
      <div className="min-h-full bg-white flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3 sticky top-0 z-30 bg-white">
          <button
            onClick={() => {
              setViewMode("browse");
              setSelectedProduct(null);
            }}
            className="p-1"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 truncate flex-1">
            {selectedProduct.name}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Image placeholder */}
          <div
            className={`w-full h-52 ${selectedProduct.color} flex items-center justify-center`}
          >
            <Package className="h-16 w-16 text-gray-500/30" />
          </div>

          <div className="px-4 py-4 space-y-4">
            {/* Name and price */}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedProduct.name}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-bold text-primary-600">
                  {formatCurrency(selectedProduct.price)}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">
                    {selectedProduct.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${selectedProduct.stock > 10 ? "bg-green-500" : selectedProduct.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`}
              />
              <span className="text-sm text-gray-500">
                {selectedProduct.stock > 10
                  ? "In Stock"
                  : selectedProduct.stock > 0
                    ? `Only ${selectedProduct.stock} left`
                    : "Out of Stock"}
              </span>
            </div>

            <Separator />

            {/* Quantity selector */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setProductQuantity(Math.max(1, productQuantity - 1))
                  }
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">
                  {productQuantity}
                </span>
                <button
                  onClick={() =>
                    setProductQuantity(
                      Math.min(selectedProduct.stock, productQuantity + 1)
                    )
                  }
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full"
              onClick={() => {
                addToCart(selectedProduct, productQuantity);
                setViewMode("browse");
                setSelectedProduct(null);
              }}
            >
              Add to Cart -{" "}
              {formatCurrency(selectedProduct.price * productQuantity)}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Cart Mode ─────────────────────────────────────────────────────────────
  if (viewMode === "cart") {
    return (
      <div className="min-h-full bg-white flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3 sticky top-0 z-30 bg-white">
          <button onClick={() => setViewMode("browse")} className="p-1">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">
            Cart ({cartCount})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
            <ShoppingCart className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">
              Add some products to get started
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setViewMode("browse")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                >
                  <div
                    className={`w-14 h-14 rounded-lg ${item.product.color} flex-shrink-0 flex items-center justify-center`}
                  >
                    <Package className="h-6 w-6 text-gray-500/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm font-bold text-primary-600">
                      {formatCurrency(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-bold">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart footer */}
            <div className="border-t border-border px-4 py-4 bg-white space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold">
                  {subtotal >= 20000 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span className="text-primary-600">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Checkout Mode ─────────────────────────────────────────────────────────
  if (viewMode === "checkout") {
    return (
      <div className="min-h-full bg-white flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3 sticky top-0 z-30 bg-white">
          {checkoutStep !== "confirmation" && (
            <button
              onClick={() => {
                if (checkoutStep === "payment") setCheckoutStep("delivery");
                else setViewMode("cart");
              }}
              className="p-1"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}
          <h1 className="text-lg font-bold text-gray-900">
            {checkoutStep === "delivery" && "Delivery"}
            {checkoutStep === "payment" && "Payment"}
            {checkoutStep === "confirmation" && "Order Confirmed"}
          </h1>
        </div>

        {/* Step indicator */}
        {checkoutStep !== "confirmation" && (
          <div className="flex gap-1 px-4 pt-3">
            {["delivery", "payment", "confirmation"].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  (checkoutStep === "delivery" && i === 0) ||
                  (checkoutStep === "payment" && i <= 1)
                    ? "bg-primary-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1: Delivery */}
        {checkoutStep === "delivery" && (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
            <p className="text-sm text-gray-500">
              How would you like to receive your order?
            </p>

            <button
              onClick={() => setDeliveryMethod("pickup")}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                deliveryMethod === "pickup"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${deliveryMethod === "pickup" ? "bg-primary-100" : "bg-gray-100"}`}
                >
                  <MapPin
                    className={`h-5 w-5 ${deliveryMethod === "pickup" ? "text-primary-600" : "text-gray-500"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">Store Pickup</span>
                    <Badge className="bg-green-100 text-green-700 flex-shrink-0">
                      Free
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pick up from Radiance Wellness, Wuse 2, Abuja
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setDeliveryMethod("delivery")}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                deliveryMethod === "delivery"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${deliveryMethod === "delivery" ? "bg-primary-100" : "bg-gray-100"}`}
                >
                  <Truck
                    className={`h-5 w-5 ${deliveryMethod === "delivery" ? "text-primary-600" : "text-gray-500"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">Home Delivery</span>
                    <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                      {formatCurrency(2500)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    2-3 business days within Abuja
                  </p>
                </div>
              </div>
            </button>

            {deliveryMethod === "delivery" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Delivery Address
                </label>
                <Input
                  placeholder="Enter your full address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
            )}

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shippingFee === 0 ? "Free" : formatCurrency(shippingFee)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-primary-600">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => setCheckoutStep("payment")}
              disabled={
                deliveryMethod === "delivery" && !deliveryAddress.trim()
              }
            >
              Continue to Payment{" "}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 2: Payment */}
        {checkoutStep === "payment" && (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
            <p className="text-sm text-gray-500">
              Select your payment method
            </p>

            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                paymentMethod === "card"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === "card" ? "bg-primary-100" : "bg-gray-100"}`}
                >
                  <CreditCard
                    className={`h-5 w-5 ${paymentMethod === "card" ? "text-primary-600" : "text-gray-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-sm">Pay with Card</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Secured by Paystack
                  </p>
                </div>
              </div>
            </button>

            {paymentMethod === "card" && (
              <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    Card Number
                  </label>
                  <Input placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      Expiry
                    </label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      CVV
                    </label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-500">
                    Secured by Paystack
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => setPaymentMethod("transfer")}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                paymentMethod === "transfer"
                  ? "border-primary-500 bg-primary-50"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === "transfer" ? "bg-primary-100" : "bg-gray-100"}`}
                >
                  <Building2
                    className={`h-5 w-5 ${paymentMethod === "transfer" ? "text-primary-600" : "text-gray-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-sm">Bank Transfer</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay directly to our bank account
                  </p>
                </div>
              </div>
            </button>

            {paymentMethod === "transfer" && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <p className="font-medium text-gray-700">
                  Transfer to the account below:
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank</span>
                    <span className="font-medium">GTBank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-mono font-medium">0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Name</span>
                    <span className="font-medium">
                      Radiance Wellness Ltd
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Amount</span>
                  <span className="text-primary-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span className="text-primary-600">
                {formatCurrency(total)}
              </span>
            </div>

            <Button className="w-full" onClick={handlePlaceOrder}>
              {paymentMethod === "card"
                ? `Pay ${formatCurrency(total)}`
                : "I've Sent the Transfer"}
            </Button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {checkoutStep === "confirmation" && (
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center text-center pb-24">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Order Placed!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Thank you for your purchase
            </p>

            <div className="w-full bg-primary-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500">Order Number</p>
              <p className="text-lg font-mono font-bold text-primary-700">
                {orderNumber}
              </p>
            </div>

            <div className="w-full bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-left mb-4">
              <h3 className="font-medium text-gray-700">Order Summary</h3>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between py-1"
                >
                  <span className="text-gray-500 truncate flex-1 pr-2">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium flex-shrink-0">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shippingFee === 0 ? "Free" : formatCurrency(shippingFee)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary-600">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="w-full bg-blue-50 rounded-xl p-3 mb-4">
              <p className="text-xs text-blue-700">
                {deliveryMethod === "pickup"
                  ? "Your order will be ready for pickup in 24 hours."
                  : "Your order will be delivered in 2-3 business days."}
              </p>
            </div>

            <div className="w-full space-y-3 mt-auto">
              <Button className="w-full" onClick={handleOrderComplete}>
                Continue Shopping
              </Button>
              <Link href="/bookings" className="block">
                <Button variant="outline" className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  View My Orders
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback - should not reach here, but return browse view
  return null;
}
