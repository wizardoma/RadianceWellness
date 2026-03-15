"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Upload,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreVertical,
  Star,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  ImagePlus,
  Flag,
  MessageSquare,
  ChevronRight,
  FileUp,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Switch,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  comparePrice: number | null;
  costPrice: number;
  stock: number;
  category: string;
  rating: number;
  reviewCount: number;
  sku: string;
  active: boolean;
  description: string;
  color: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: string;
};

type Order = {
  id: string;
  customer: string;
  products: string;
  total: number;
  status: string;
  date: string;
  items: number;
};

type Review = {
  id: string;
  customer: string;
  product: string;
  rating: number;
  review: string;
  date: string;
  flagged?: boolean;
};

// Mock products
const initialProducts: Product[] = [
  {
    id: "P001",
    name: "Radiance Glow Face Cream",
    size: "50ml",
    price: 12500,
    comparePrice: 15000,
    costPrice: 5500,
    stock: 45,
    category: "Skincare",
    rating: 4.8,
    reviewCount: 32,
    sku: "RGF-001",
    active: true,
    description: "A luxurious face cream enriched with natural botanicals for a radiant, dewy glow.",
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: "P002",
    name: "Deep Hydration Body Lotion",
    size: "250ml",
    price: 8900,
    comparePrice: null,
    costPrice: 3800,
    stock: 62,
    category: "Body Care",
    rating: 4.6,
    reviewCount: 28,
    sku: "DHB-002",
    active: true,
    description: "Deeply moisturizing body lotion with shea butter and vitamin E.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "P003",
    name: "Organic Hair Oil Treatment",
    size: "100ml",
    price: 15000,
    comparePrice: 18000,
    costPrice: 6200,
    stock: 18,
    category: "Hair Care",
    rating: 4.9,
    reviewCount: 45,
    sku: "OHO-003",
    active: true,
    description: "Premium organic hair oil blend for deep nourishment and shine.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "P004",
    name: "Aromatherapy Gift Set",
    size: "",
    price: 35000,
    comparePrice: 42000,
    costPrice: 15000,
    stock: 12,
    category: "Gift Sets",
    rating: 5.0,
    reviewCount: 18,
    sku: "AGS-004",
    active: true,
    description: "Curated aromatherapy gift set with essential oils, candles, and bath salts.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "P005",
    name: "Wellness Tea Collection",
    size: "",
    price: 6500,
    comparePrice: null,
    costPrice: 2800,
    stock: 85,
    category: "Wellness",
    rating: 4.7,
    reviewCount: 56,
    sku: "WTC-005",
    active: true,
    description: "A collection of herbal teas designed to promote relaxation and well-being.",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "P006",
    name: "Bamboo Spa Headband",
    size: "",
    price: 3500,
    comparePrice: null,
    costPrice: 1200,
    stock: 30,
    category: "Accessories",
    rating: 4.5,
    reviewCount: 22,
    sku: "BSH-006",
    active: true,
    description: "Soft bamboo fabric headband, perfect for spa treatments and skincare routines.",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "P007",
    name: "Radiance Vitamin C Serum",
    size: "30ml",
    price: 18500,
    comparePrice: 22000,
    costPrice: 7500,
    stock: 5,
    category: "Skincare",
    rating: 4.9,
    reviewCount: 67,
    sku: "RVC-007",
    active: true,
    description: "Potent vitamin C serum for brightening, anti-aging, and skin protection.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "P008",
    name: "Luxury Bath Salts",
    size: "500g",
    price: 9800,
    comparePrice: 12000,
    costPrice: 4000,
    stock: 0,
    category: "Bath & Body",
    rating: 4.4,
    reviewCount: 19,
    sku: "LBS-008",
    active: false,
    description: "Mineral-rich bath salts infused with lavender and eucalyptus essential oils.",
    color: "bg-indigo-100 text-indigo-700",
  },
];

// Mock categories
const initialCategories: Category[] = [
  { id: "CAT001", name: "Skincare", description: "Facial creams, serums, cleansers, and treatments", productCount: 12, status: "active" },
  { id: "CAT002", name: "Body Care", description: "Body lotions, oils, and moisturizers", productCount: 8, status: "active" },
  { id: "CAT003", name: "Hair Care", description: "Hair oils, shampoos, conditioners, and treatments", productCount: 6, status: "active" },
  { id: "CAT004", name: "Gift Sets", description: "Curated gift sets for special occasions", productCount: 5, status: "active" },
  { id: "CAT005", name: "Wellness", description: "Teas, supplements, and wellness products", productCount: 7, status: "active" },
  { id: "CAT006", name: "Accessories", description: "Spa accessories, headbands, and tools", productCount: 4, status: "active" },
  { id: "CAT007", name: "Bath & Body", description: "Bath salts, bath bombs, and shower products", productCount: 6, status: "active" },
];

// Mock orders
const initialOrders: Order[] = [
  { id: "ORD-1042", customer: "Chidinma Okonkwo", products: "Radiance Glow Face Cream, Vitamin C Serum", total: 31000, status: "Processing", date: "2026-03-14", items: 2 },
  { id: "ORD-1041", customer: "Babajide Adeyemi", products: "Aromatherapy Gift Set", total: 35000, status: "Shipped", date: "2026-03-13", items: 1 },
  { id: "ORD-1040", customer: "Amara Nwosu", products: "Deep Hydration Body Lotion, Wellness Tea Collection", total: 15400, status: "Delivered", date: "2026-03-12", items: 2 },
  { id: "ORD-1039", customer: "Oluwaseun Bakare", products: "Organic Hair Oil Treatment", total: 15000, status: "Delivered", date: "2026-03-11", items: 1 },
  { id: "ORD-1038", customer: "Funmilayo Adesanya", products: "Bamboo Spa Headband, Luxury Bath Salts", total: 13300, status: "Cancelled", date: "2026-03-10", items: 2 },
  { id: "ORD-1037", customer: "Ikenna Uchenna", products: "Radiance Vitamin C Serum, Radiance Glow Face Cream", total: 31000, status: "Processing", date: "2026-03-09", items: 2 },
];

// Mock reviews
const initialReviews: Review[] = [
  { id: "R001", customer: "Chidinma Okonkwo", product: "Radiance Glow Face Cream", rating: 5, review: "Absolutely love this cream! My skin has never looked better. The glow is real and it absorbs so quickly without feeling greasy.", date: "2026-03-12" },
  { id: "R002", customer: "Amara Nwosu", product: "Organic Hair Oil Treatment", rating: 5, review: "This hair oil is a game changer. My natural hair has never been softer or more manageable. Worth every naira!", date: "2026-03-10" },
  { id: "R003", customer: "Oluwaseun Bakare", product: "Wellness Tea Collection", rating: 4, review: "Great selection of teas. The chamomile blend is my favourite for winding down. Would love to see more flavour options.", date: "2026-03-08" },
  { id: "R004", customer: "Funmilayo Adesanya", product: "Deep Hydration Body Lotion", rating: 4, review: "Very hydrating and the scent is subtle and pleasant. Lasts most of the day. Will definitely repurchase.", date: "2026-03-06" },
  { id: "R005", customer: "Babajide Adeyemi", product: "Aromatherapy Gift Set", rating: 5, review: "Bought this as a gift for my wife and she was thrilled. Beautiful packaging and the products inside are premium quality.", date: "2026-03-04" },
];

const colorOptions = [
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
  "bg-indigo-100 text-indigo-700",
];

const getStockBadge = (stock: number) => {
  if (stock === 0) return <Badge className="bg-red-100 text-red-700">Out of Stock</Badge>;
  if (stock <= 10) return <Badge className="bg-amber-100 text-amber-700">Low: {stock}</Badge>;
  return <Badge className="bg-green-100 text-green-700">In Stock: {stock}</Badge>;
};

const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case "Processing":
      return <Badge className="bg-blue-100 text-blue-700">Processing</Badge>;
    case "Shipped":
      return <Badge className="bg-purple-100 text-purple-700">Shipped</Badge>;
    case "Delivered":
      return <Badge className="bg-green-100 text-green-700">Delivered</Badge>;
    case "Cancelled":
      return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [activeTab, setActiveTab] = useState("products");

  // Add/Edit Product dialog
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formComparePrice, setFormComparePrice] = useState("");
  const [formCostPrice, setFormCostPrice] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formActive, setFormActive] = useState(true);

  // View Product dialog
  const [viewProductOpen, setViewProductOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Delete Product dialog
  const [deleteProductOpen, setDeleteProductOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Import Products dialog
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importFileName, setImportFileName] = useState("");

  // Category Edit/Create dialog
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catName, setCatName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const [catStatus, setCatStatus] = useState("active");

  // Delete Category dialog
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  // View Order dialog
  const [viewOrderOpen, setViewOrderOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Update Order Status dialog
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
  const [updatingOrder, setUpdatingOrder] = useState<Order | null>(null);
  const [newOrderStatus, setNewOrderStatus] = useState("");

  // Review Reply dialog
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyingReview, setReplyingReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");

  // Delete Review dialog
  const [deleteReviewOpen, setDeleteReviewOpen] = useState(false);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const toggleProductActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, active: !p.active } : p))
    );
  };

  // Product form helpers
  const resetProductForm = () => {
    setFormName("");
    setFormDescription("");
    setFormCategory("");
    setFormPrice("");
    setFormComparePrice("");
    setFormCostPrice("");
    setFormStock("");
    setFormSku("");
    setFormActive(true);
    setEditingProduct(null);
  };

  const openAddProduct = () => {
    resetProductForm();
    setAddProductOpen(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormDescription(product.description);
    setFormCategory(categories.find((c) => c.name === product.category)?.id || "");
    setFormPrice(String(product.price));
    setFormComparePrice(product.comparePrice ? String(product.comparePrice) : "");
    setFormCostPrice(String(product.costPrice));
    setFormStock(String(product.stock));
    setFormSku(product.sku);
    setFormActive(product.active);
    setAddProductOpen(true);
  };

  const handleSaveProduct = () => {
    const categoryName = categories.find((c) => c.id === formCategory)?.name || "Uncategorized";
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                description: formDescription,
                category: categoryName,
                price: parseInt(formPrice) || 0,
                comparePrice: formComparePrice ? parseInt(formComparePrice) : null,
                costPrice: parseInt(formCostPrice) || 0,
                stock: parseInt(formStock) || 0,
                sku: formSku,
                active: formActive,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: `P${String(products.length + 1).padStart(3, "0")}`,
        name: formName,
        size: "",
        price: parseInt(formPrice) || 0,
        comparePrice: formComparePrice ? parseInt(formComparePrice) : null,
        costPrice: parseInt(formCostPrice) || 0,
        stock: parseInt(formStock) || 0,
        category: categoryName,
        rating: 0,
        reviewCount: 0,
        sku: formSku,
        active: formActive,
        description: formDescription,
        color: colorOptions[products.length % colorOptions.length],
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setAddProductOpen(false);
    resetProductForm();
  };

  const handleDuplicate = (product: Product) => {
    const copy: Product = {
      ...product,
      id: `P${String(products.length + 1).padStart(3, "0")}`,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
    };
    setProducts((prev) => [...prev, copy]);
  };

  const handleDeleteProduct = () => {
    if (deletingProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeleteProductOpen(false);
      setDeletingProduct(null);
    }
  };

  // Category helpers
  const openAddCategory = () => {
    setEditingCategory(null);
    setCatName("");
    setCatDescription("");
    setCatStatus("active");
    setCategoryDialogOpen(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatDescription(cat.description);
    setCatStatus(cat.status);
    setCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: catName, description: catDescription, status: catStatus }
            : c
        )
      );
    } else {
      const newCat: Category = {
        id: `CAT${String(categories.length + 1).padStart(3, "0")}`,
        name: catName,
        description: catDescription,
        productCount: 0,
        status: catStatus,
      };
      setCategories((prev) => [...prev, newCat]);
    }
    setCategoryDialogOpen(false);
  };

  const handleDeleteCategory = () => {
    if (deletingCategory) {
      setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id));
      setDeleteCategoryOpen(false);
      setDeletingCategory(null);
    }
  };

  // Order helpers
  const handleUpdateOrderStatus = () => {
    if (updatingOrder && newOrderStatus) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === updatingOrder.id ? { ...o, status: newOrderStatus } : o
        )
      );
      setUpdateStatusOpen(false);
      setUpdatingOrder(null);
      setNewOrderStatus("");
    }
  };

  // Review helpers
  const handleFlagReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, flagged: !r.flagged } : r))
    );
  };

  const handleDeleteReview = () => {
    if (deletingReview) {
      setReviews((prev) => prev.filter((r) => r.id !== deletingReview.id));
      setDeleteReviewOpen(false);
      setDeletingReview(null);
    }
  };

  const handleSendReply = () => {
    setReplyDialogOpen(false);
    setReplyingReview(null);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Products & Shop
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your retail product catalog
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import Products
          </Button>
          <Button onClick={openAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">48</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +6 this month
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">42</p>
                <p className="text-sm text-foreground-muted mt-1">
                  6 inactive
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Sales This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(1250000)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% from last month
                </p>
              </div>
              <div className="p-3 bg-accent-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(18500)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% from last month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search products by name, category, or SKU..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs - controlled */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">All Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* All Products Tab */}
        <TabsContent value="products">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Product Image Placeholder */}
                  <div className={`w-full h-40 rounded-lg ${product.color} flex items-center justify-center mb-4`}>
                    <span className="text-3xl font-bold opacity-60">
                      {product.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                      {product.size && (
                        <p className="text-sm text-foreground-muted">{product.size}</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditProduct(product)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setViewingProduct(product); setViewProductOpen(true); }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(product)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => { setDeletingProduct(product); setDeleteProductOpen(true); }}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary-600 text-lg">
                      {formatCurrency(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatCurrency(product.comparePrice)}
                      </span>
                    )}
                  </div>

                  {/* Category & Stock */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{product.category}</Badge>
                    {getStockBadge(product.stock)}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <Separator className="mb-4" />

                  {/* Active Toggle & SKU */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.active}
                        onCheckedChange={() => toggleProductActive(product.id)}
                      />
                      <span className="text-sm text-foreground-muted">
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{product.sku}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No products found matching your search</p>
            </div>
          )}
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Categories</CardTitle>
                <Button size="sm" onClick={openAddCategory}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Category</th>
                      <th className="text-left p-4 font-medium text-gray-600">Description</th>
                      <th className="text-left p-4 font-medium text-gray-600">Products</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                              <Package className="h-5 w-5 text-primary-600" />
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-600 max-w-xs">{category.description}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{category.productCount}</span>
                            <span className="text-sm text-gray-500">products</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-700 capitalize">{category.status}</Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => { setDeletingCategory(category); setDeleteCategoryOpen(true); }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                  View All Orders
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Order ID</th>
                      <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left p-4 font-medium text-gray-600">Products</th>
                      <th className="text-left p-4 font-medium text-gray-600">Total</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Date</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono font-medium text-primary-600">{order.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">{order.customer}</span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-600 max-w-xs truncate">{order.products}</p>
                          <p className="text-xs text-gray-400">{order.items} item{order.items > 1 ? "s" : ""}</p>
                        </td>
                        <td className="p-4 font-medium">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="p-4">
                          {getOrderStatusBadge(order.status)}
                        </td>
                        <td className="p-4 text-gray-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => { setViewingOrder(order); setViewOrderOpen(true); }}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Order
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { setUpdatingOrder(order); setNewOrderStatus(order.status); setUpdateStatusOpen(true); }}>
                                <Edit className="h-4 w-4 mr-2" />
                                Update Status
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary-700">
                          {review.customer.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{review.customer}</span>
                          <span className="text-sm text-gray-400">on</span>
                          <span className="text-sm font-medium text-primary-600">{review.product}</span>
                          {review.flagged && (
                            <Badge className="bg-red-100 text-red-700">Flagged</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">{review.rating}/5</span>
                          <span className="text-sm text-gray-400">&middot;</span>
                          <span className="text-sm text-gray-400">{formatDate(review.date)}</span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setReplyingReview(review); setReplyText(""); setReplyDialogOpen(true); }}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFlagReview(review.id)}>
                          <Flag className="h-4 w-4 mr-2" />
                          {review.flagged ? "Unflag" : "Flag"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => { setDeletingReview(review); setDeleteReviewOpen(true); }}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No reviews yet</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Product Dialog */}
      <Dialog open={addProductOpen} onOpenChange={(open) => { setAddProductOpen(open); if (!open) resetProductForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product details below." : "Add a new product to your retail catalog."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g. Radiance Glow Face Cream"
                  className="mt-1.5"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="productDescription">Description</Label>
                <Textarea
                  id="productDescription"
                  placeholder="Describe the product, its benefits, and key ingredients..."
                  className="mt-1.5"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="productCategory">Category</Label>
                <Select value={formCategory} onValueChange={setFormCategory}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (&#8358;)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    className="mt-1.5"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="comparePrice">Compare At Price (&#8358;)</Label>
                  <Input
                    id="comparePrice"
                    type="number"
                    placeholder="0"
                    className="mt-1.5"
                    value={formComparePrice}
                    onChange={(e) => setFormComparePrice(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="costPrice">Cost Price (&#8358;)</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    placeholder="0"
                    className="mt-1.5"
                    value={formCostPrice}
                    onChange={(e) => setFormCostPrice(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Compare At Price is shown as the original price for discounts.</p>
            </div>

            <Separator />

            {/* Inventory */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Inventory</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    className="mt-1.5"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="e.g. RGF-001"
                    className="mt-1.5"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Images */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Product Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                <ImagePlus className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p className="text-sm font-medium text-gray-700">Click to upload images</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG or WebP. Max 5MB each.</p>
              </div>
            </div>

            <Separator />

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Active</Label>
                <p className="text-sm text-foreground-muted">
                  Make this product visible in the shop
                </p>
              </div>
              <Switch checked={formActive} onCheckedChange={setFormActive} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddProductOpen(false); resetProductForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {editingProduct ? "Update Product" : "Save Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={viewProductOpen} onOpenChange={setViewProductOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Full details for this product.</DialogDescription>
          </DialogHeader>
          {viewingProduct && (
            <div className="space-y-4 py-4">
              <div className={`w-full h-40 rounded-lg ${viewingProduct.color} flex items-center justify-center`}>
                <span className="text-4xl font-bold opacity-60">
                  {viewingProduct.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{viewingProduct.name}</h3>
                {viewingProduct.size && <p className="text-sm text-gray-500">{viewingProduct.size}</p>}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{viewingProduct.description}</p>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Price</span>
                  <p className="font-semibold text-primary-600">{formatCurrency(viewingProduct.price)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Stock</span>
                  <div className="mt-0.5">{getStockBadge(viewingProduct.stock)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Category</span>
                  <p className="font-medium">{viewingProduct.category}</p>
                </div>
                <div>
                  <span className="text-gray-500">SKU</span>
                  <p className="font-mono">{viewingProduct.sku}</p>
                </div>
                <div>
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {renderStars(viewingProduct.rating)}
                    <span className="text-sm">{viewingProduct.rating}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Reviews</span>
                  <p className="font-medium">{viewingProduct.reviewCount} reviews</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewProductOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={deleteProductOpen} onOpenChange={setDeleteProductOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingProduct?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteProductOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Products Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import Products</DialogTitle>
            <DialogDescription>
              Upload a CSV file to bulk-import products into your catalog.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <FileUp className="h-10 w-10 mx-auto mb-3 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">
                {importFileName || "Drop your CSV file here or click to browse"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Supports .csv files up to 10MB</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setImportFileName("products_export.csv")}>
              <Upload className="mr-2 h-4 w-4" />
              Choose CSV File
            </Button>
            {importFileName && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Field Mapping Preview</p>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Column A</span><span className="font-medium">Product Name</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Column B</span><span className="font-medium">Description</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Column C</span><span className="font-medium">Price</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Column D</span><span className="font-medium">Stock</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Column E</span><span className="font-medium">Category</span></div>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setImportDialogOpen(false); setImportFileName(""); }}>Cancel</Button>
            <Button disabled={!importFileName} onClick={() => { setImportDialogOpen(false); setImportFileName(""); }}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Edit/Create Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Update category details." : "Create a new product category."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="catName">Name</Label>
              <Input id="catName" placeholder="Category name" className="mt-1.5" value={catName} onChange={(e) => setCatName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="catDesc">Description</Label>
              <Textarea id="catDesc" placeholder="Brief description..." className="mt-1.5" value={catDescription} onChange={(e) => setCatDescription(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="catStatus">Status</Label>
              <Select value={catStatus} onValueChange={setCatStatus}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCategory}>{editingCategory ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirmation Dialog */}
      <Dialog open={deleteCategoryOpen} onOpenChange={setDeleteCategoryOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deletingCategory?.name}&quot;? Products in this category will become uncategorized.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteCategoryOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Order Dialog */}
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order {viewingOrder?.id}</DialogDescription>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-primary-600 font-medium">{viewingOrder.id}</span>
                {getOrderStatusBadge(viewingOrder.status)}
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer</p>
                <p className="font-medium">{viewingOrder.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Items</p>
                <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                  {viewingOrder.products.split(", ").map((item, i) => (
                    <p key={i} className="text-sm font-medium">{item}</p>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">{viewingOrder.items} item{viewingOrder.items > 1 ? "s" : ""}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Order Date</span>
                  <p className="font-medium">{formatDate(viewingOrder.date)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Total</span>
                  <p className="font-bold text-primary-600">{formatCurrency(viewingOrder.total)}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-500 mb-1">Shipping Info</p>
                <p className="text-sm text-gray-600">Standard Delivery - Lagos, Nigeria</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOrderOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Order Status Dialog */}
      <Dialog open={updateStatusOpen} onOpenChange={setUpdateStatusOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {updatingOrder?.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>New Status</Label>
            <Select value={newOrderStatus} onValueChange={setNewOrderStatus}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateStatusOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateOrderStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply to Review Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
            <DialogDescription>
              Replying to {replyingReview?.customer}&apos;s review on {replyingReview?.product}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {replyingReview && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600 italic">
                &quot;{replyingReview.review}&quot;
              </div>
            )}
            <Label htmlFor="replyText">Your Reply</Label>
            <Textarea
              id="replyText"
              placeholder="Write your reply..."
              className="mt-1.5"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendReply} disabled={!replyText.trim()}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Review Confirmation Dialog */}
      <Dialog open={deleteReviewOpen} onOpenChange={setDeleteReviewOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deletingReview?.customer}&apos;s review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteReviewOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteReview}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
