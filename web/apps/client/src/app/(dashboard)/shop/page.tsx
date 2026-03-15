"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  X,
  ShoppingBag,
  Truck,
  Package,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Separator,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  color: string;
  stock: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

// Mock products
const products: Product[] = [
  {
    id: "P001",
    name: "Radiance Glow Face Cream",
    size: "50ml",
    price: 12500,
    category: "Skincare",
    rating: 4.8,
    reviewCount: 32,
    description: "Luxurious face cream for a radiant, dewy glow.",
    longDescription: "A luxurious face cream enriched with natural botanicals, hyaluronic acid, and vitamin E for a radiant, dewy glow. Lightweight formula absorbs quickly without leaving a greasy residue. Perfect for all skin types.",
    color: "bg-rose-100 text-rose-700",
    stock: 45,
  },
  {
    id: "P002",
    name: "Deep Hydration Body Lotion",
    size: "250ml",
    price: 8900,
    category: "Body Care",
    rating: 4.6,
    reviewCount: 28,
    description: "Deeply moisturizing lotion with shea butter.",
    longDescription: "Deeply moisturizing body lotion with shea butter, coconut oil, and vitamin E. Provides all-day hydration and leaves skin feeling silky smooth. Enriched with natural ingredients for healthy, nourished skin.",
    color: "bg-blue-100 text-blue-700",
    stock: 62,
  },
  {
    id: "P003",
    name: "Organic Hair Oil Treatment",
    size: "100ml",
    price: 15000,
    category: "Hair Care",
    rating: 4.9,
    reviewCount: 45,
    description: "Premium organic oil for deep nourishment.",
    longDescription: "Premium organic hair oil blend featuring argan oil, jojoba oil, and rosemary extract for deep nourishment and brilliant shine. Strengthens hair from root to tip and reduces breakage. Suitable for all hair types.",
    color: "bg-amber-100 text-amber-700",
    stock: 18,
  },
  {
    id: "P004",
    name: "Aromatherapy Gift Set",
    size: "",
    price: 35000,
    category: "Gift Sets",
    rating: 5.0,
    reviewCount: 18,
    description: "Curated set with essential oils and candles.",
    longDescription: "A beautifully curated aromatherapy gift set featuring premium essential oils, handcrafted soy candles, and mineral-rich bath salts. Presented in an elegant gift box, perfect for birthdays, anniversaries, or self-care treats.",
    color: "bg-purple-100 text-purple-700",
    stock: 12,
  },
  {
    id: "P005",
    name: "Wellness Tea Collection",
    size: "",
    price: 6500,
    category: "Wellness",
    rating: 4.7,
    reviewCount: 56,
    description: "Herbal teas for relaxation and well-being.",
    longDescription: "A collection of carefully selected herbal teas designed to promote relaxation, better sleep, and overall well-being. Includes chamomile blend, peppermint refresh, and hibiscus calm. 30 tea bags in total.",
    color: "bg-green-100 text-green-700",
    stock: 85,
  },
  {
    id: "P006",
    name: "Bamboo Spa Headband",
    size: "",
    price: 3500,
    category: "Accessories",
    rating: 4.5,
    reviewCount: 22,
    description: "Soft bamboo headband for spa routines.",
    longDescription: "Ultra-soft bamboo fabric headband perfect for spa treatments, skincare routines, and makeup application. Features an adjustable velcro closure for a comfortable fit. Machine washable and eco-friendly.",
    color: "bg-teal-100 text-teal-700",
    stock: 30,
  },
  {
    id: "P007",
    name: "Radiance Vitamin C Serum",
    size: "30ml",
    price: 18500,
    category: "Skincare",
    rating: 4.9,
    reviewCount: 67,
    description: "Potent serum for brightening and anti-aging.",
    longDescription: "Potent vitamin C serum with 20% L-ascorbic acid, ferulic acid, and vitamin E for powerful brightening, anti-aging, and skin protection. Reduces dark spots and fine lines while boosting collagen production.",
    color: "bg-orange-100 text-orange-700",
    stock: 5,
  },
  {
    id: "P008",
    name: "Luxury Bath Salts",
    size: "500g",
    price: 9800,
    category: "Bath & Body",
    rating: 4.4,
    reviewCount: 19,
    description: "Mineral-rich salts with lavender and eucalyptus.",
    longDescription: "Mineral-rich bath salts infused with lavender and eucalyptus essential oils. Helps relieve muscle tension, promote relaxation, and soften skin. Sourced from natural mineral springs and hand-blended with care.",
    color: "bg-indigo-100 text-indigo-700",
    stock: 40,
  },
];

const categories = ["All", "Skincare", "Body Care", "Hair Care", "Gift Sets", "Wellness", "Accessories"];

const SHIPPING_THRESHOLD = 20000;
const SHIPPING_FEE = 2500;

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
              ? "fill-amber-400/50 text-amber-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const getStockIndicator = (stock: number) => {
  if (stock === 0) return <Badge className="bg-red-100 text-red-700">Out of Stock</Badge>;
  if (stock <= 10) return <Badge className="bg-amber-100 text-amber-700">Low Stock</Badge>;
  return <Badge className="bg-green-100 text-green-700">In Stock</Badge>;
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [detailQuantity, setDetailQuantity] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartShipping = cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const cartTotal = cartSubtotal + cartShipping;

  const addToCart = (product: Product, quantity: number = 1) => {
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

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailQuantity(1);
    setProductDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Shop
          </h1>
          <p className="text-foreground-secondary mt-1">
            Premium wellness products
          </p>
        </div>
        <Button
          variant="outline"
          className="relative"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => openProductDetail(product)}
            >
              <CardContent className="p-0">
                {/* Image Placeholder */}
                <div className={`h-48 rounded-t-lg flex items-center justify-center ${product.color.split(" ")[0]}`}>
                  <span className={`text-4xl font-display font-bold ${product.color.split(" ")[1]} opacity-60`}>
                    {product.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    {product.size && (
                      <span className="text-xs text-foreground-muted">{product.size}</span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground-secondary line-clamp-1">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-foreground-muted">
                      {product.rating}
                    </span>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-primary-600">
                      {formatCurrency(product.price)}
                    </span>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or category filter
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Product Detail Dialog */}
      <Dialog open={productDetailOpen} onOpenChange={setProductDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  {selectedProduct.category}
                  {selectedProduct.size && ` - ${selectedProduct.size}`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Large Image Placeholder */}
                <div className={`h-56 rounded-xl flex items-center justify-center ${selectedProduct.color.split(" ")[0]}`}>
                  <span className={`text-6xl font-display font-bold ${selectedProduct.color.split(" ")[1]} opacity-50`}>
                    {selectedProduct.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {selectedProduct.longDescription}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(selectedProduct.price)}
                  </span>
                  {getStockIndicator(selectedProduct.stock)}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  {renderStars(selectedProduct.rating)}
                  <span className="text-sm font-medium">{selectedProduct.rating}</span>
                  <span className="text-sm text-foreground-muted">
                    ({selectedProduct.reviewCount} reviews)
                  </span>
                </div>

                <Separator />

                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                      disabled={detailQuantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{detailQuantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setDetailQuantity(detailQuantity + 1)}
                      disabled={detailQuantity >= selectedProduct.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    addToCart(selectedProduct, detailQuantity);
                    setProductDetailOpen(false);
                  }}
                  disabled={selectedProduct.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - {formatCurrency(selectedProduct.price * detailQuantity)}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
              {cartItemCount > 0 && (
                <Badge variant="secondary">{cartItemCount} items</Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Review your items before checkout
            </DialogDescription>
          </DialogHeader>

          {cart.length > 0 ? (
            <div className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {/* Mini Product Image */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.product.color.split(" ")[0]}`}>
                      <span className={`text-sm font-bold ${item.product.color.split(" ")[1]} opacity-60`}>
                        {item.product.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-primary-600 font-medium">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-gray-400 hover:text-red-500"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span className="font-medium">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    Shipping
                  </span>
                  <span className="font-medium">
                    {cartShipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatCurrency(cartShipping)
                    )}
                  </span>
                </div>
                {cartShipping > 0 && (
                  <p className="text-xs text-foreground-muted">
                    Free shipping on orders over {formatCurrency(SHIPPING_THRESHOLD)}
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-col">
                <Button className="w-full" asChild>
                  <Link href="/shop/checkout">
                    <Package className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-sm text-foreground-muted mb-4">
                Browse our products and add items to your cart
              </p>
              <Button variant="outline" onClick={() => setCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
