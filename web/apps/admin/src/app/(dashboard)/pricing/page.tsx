"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  Tag,
  Percent,
  Gift,
  CheckCircle,
  XCircle,
  Package,
  Sparkles,
  Heart,
  Star,
  PartyPopper,
  Clock,
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
  Separator,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Switch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
type ServicePrice = {
  id: string;
  name: string;
  category: string;
  durations: string[];
  prices: number[];
  status: string;
};

type PackageData = {
  id: string;
  name: string;
  description: string;
  services: string[];
  totalValue: number;
  packagePrice: number;
  savings: number;
  validity: string;
  status: string;
  icon: typeof Heart;
};

type Promotion = {
  id: string;
  name: string;
  code: string;
  discountType: string;
  discountValue: number;
  description: string;
  used: number;
  limit: number | null;
  validFrom: string;
  validTo: string;
  status: string;
};

// Mock services with pricing
const initialServicePrices: ServicePrice[] = [
  { id: "SP001", name: "Swedish Massage", category: "Massages", durations: ["60 min", "90 min"], prices: [25000, 35000], status: "active" },
  { id: "SP002", name: "Deep Tissue Massage", category: "Massages", durations: ["60 min", "90 min"], prices: [30000, 42000], status: "active" },
  { id: "SP003", name: "Hot Stone Massage", category: "Massages", durations: ["60 min", "90 min"], prices: [35000, 48000], status: "active" },
  { id: "SP004", name: "Classic Facial", category: "Facials", durations: ["45 min", "60 min"], prices: [18000, 25000], status: "active" },
  { id: "SP005", name: "Hammam Experience", category: "Experiences", durations: ["60 min"], prices: [20000], status: "active" },
  { id: "SP006", name: "Manicure & Pedicure", category: "Nail Care", durations: ["75 min"], prices: [12000], status: "active" },
  { id: "SP007", name: "Sauna Session", category: "Experiences", durations: ["45 min"], prices: [14000], status: "active" },
  { id: "SP008", name: "Aromatherapy Massage", category: "Massages", durations: ["60 min", "90 min"], prices: [28000, 40000], status: "inactive" },
];

// Mock packages
const initialPackages: PackageData[] = [
  {
    id: "PKG001",
    name: "Couples Retreat",
    description: "A romantic wellness experience for two",
    services: ["2x Swedish Massage (60 min)", "Sauna Session", "Hammam Experience"],
    totalValue: 100000,
    packagePrice: 85000,
    savings: 15,
    validity: "Valid for 30 days",
    status: "active",
    icon: Heart,
  },
  {
    id: "PKG002",
    name: "Royal Pamper Day",
    description: "The ultimate head-to-toe pampering experience",
    services: ["Swedish Massage (60 min)", "Classic Facial (60 min)", "Manicure & Pedicure"],
    totalValue: 81250,
    packagePrice: 65000,
    savings: 20,
    validity: "Valid for 30 days",
    status: "active",
    icon: Sparkles,
  },
  {
    id: "PKG003",
    name: "Relaxation Package",
    description: "Unwind and de-stress with this calming combo",
    services: ["Swedish Massage (60 min)", "Sauna Session"],
    totalValue: 35556,
    packagePrice: 32000,
    savings: 10,
    validity: "Valid for 14 days",
    status: "active",
    icon: Star,
  },
  {
    id: "PKG004",
    name: "Birthday Special",
    description: "Celebrate your special day with a spa treat",
    services: ["Any Massage (60 min)", "Classic Facial (45 min)", "Complimentary Gift Bag"],
    totalValue: 67073,
    packagePrice: 55000,
    savings: 18,
    validity: "Valid during birthday month",
    status: "draft",
    icon: PartyPopper,
  },
];

// Mock promotions
const initialPromotions: Promotion[] = [
  {
    id: "PROMO001",
    name: "Welcome Offer",
    code: "WELCOME20",
    discountType: "percentage",
    discountValue: 20,
    description: "20% off first booking",
    used: 45,
    limit: 100,
    validFrom: "Jan 1, 2026",
    validTo: "Dec 31, 2026",
    status: "active",
  },
  {
    id: "PROMO002",
    name: "Birthday Discount",
    code: "BIRTHDAY",
    discountType: "fixed",
    discountValue: 5000,
    description: "NGN 5,000 off during birthday month",
    used: 23,
    limit: null,
    validFrom: "Jan 1, 2026",
    validTo: "Dec 31, 2026",
    status: "active",
  },
  {
    id: "PROMO003",
    name: "Referral Reward",
    code: "REFER10",
    discountType: "percentage",
    discountValue: 10,
    description: "10% off for referrals",
    used: 67,
    limit: null,
    validFrom: "Jan 1, 2026",
    validTo: "Dec 31, 2026",
    status: "active",
  },
  {
    id: "PROMO004",
    name: "Weekend Special",
    code: "WEEKEND15",
    discountType: "percentage",
    discountValue: 15,
    description: "15% off weekend bookings",
    used: 12,
    limit: 50,
    validFrom: "Mar 1, 2026",
    validTo: "Jun 30, 2026",
    status: "active",
  },
];

const allAvailableServices = [
  "Swedish Massage (60 min)",
  "Swedish Massage (90 min)",
  "Deep Tissue Massage (60 min)",
  "Deep Tissue Massage (90 min)",
  "Hot Stone Massage (60 min)",
  "Hot Stone Massage (90 min)",
  "Classic Facial (45 min)",
  "Classic Facial (60 min)",
  "Hammam Experience (60 min)",
  "Manicure & Pedicure (75 min)",
  "Sauna Session (45 min)",
  "Aromatherapy Massage (60 min)",
];

const serviceCategories = ["All Services", "Massages", "Facials", "Experiences", "Nail Care"];

const getPackageStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700">Active</Badge>;
    case "draft":
      return <Badge className="bg-amber-100 text-amber-700">Draft</Badge>;
    case "expired":
      return <Badge className="bg-gray-100 text-gray-700">Expired</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getPromoStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700">Active</Badge>;
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
    case "expired":
      return <Badge className="bg-red-100 text-red-700">Expired</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("service-prices");

  // --- Stateful lists ---
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>(initialServicePrices);
  const [packages, setPackages] = useState<PackageData[]>(initialPackages);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);

  // --- Service editing ---
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPrices, setEditingPrices] = useState<number[]>([]);

  // --- Bulk update ---
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false);
  const [bulkAdjustmentType, setBulkAdjustmentType] = useState<"percent-increase" | "percent-decrease" | "fixed-amount">("percent-increase");
  const [bulkValue, setBulkValue] = useState("");
  const [bulkApplyTo, setBulkApplyTo] = useState("All Services");

  // --- Package dialog ---
  const [showCreatePackageDialog, setShowCreatePackageDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [newPackageName, setNewPackageName] = useState("");
  const [newPackageDescription, setNewPackageDescription] = useState("");
  const [newPackageServices, setNewPackageServices] = useState<string[]>([]);
  const [newPackagePrice, setNewPackagePrice] = useState("");
  const [newPackageValidity, setNewPackageValidity] = useState("30");
  const [newPackageStatus, setNewPackageStatus] = useState("draft");

  // --- Package delete confirm ---
  const [deletePackageConfirmOpen, setDeletePackageConfirmOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<PackageData | null>(null);

  // --- Promotion dialog ---
  const [promoEditOpen, setPromoEditOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [promoEditName, setPromoEditName] = useState("");
  const [promoEditCode, setPromoEditCode] = useState("");
  const [promoEditDiscountType, setPromoEditDiscountType] = useState("percentage");
  const [promoEditDiscountValue, setPromoEditDiscountValue] = useState("");
  const [promoEditDescription, setPromoEditDescription] = useState("");

  // --- Copy code feedback ---
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);

  // --- Service price editing handlers ---
  const startEditingService = (service: ServicePrice) => {
    setEditingServiceId(service.id);
    setEditingPrices([...service.prices]);
  };

  const handleSaveServicePrice = (serviceId: string) => {
    setServicePrices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, prices: [...editingPrices] } : s
      )
    );
    setEditingServiceId(null);
    setEditingPrices([]);
  };

  const handleCancelEditService = () => {
    setEditingServiceId(null);
    setEditingPrices([]);
  };

  // --- Bulk update handlers ---
  const getBulkPreview = () => {
    const affected = servicePrices.filter(
      (s) => bulkApplyTo === "All Services" || s.category === bulkApplyTo
    );
    return affected;
  };

  const handleApplyBulkUpdate = () => {
    const value = Number(bulkValue) || 0;
    if (value === 0) return;

    setServicePrices((prev) =>
      prev.map((s) => {
        if (bulkApplyTo !== "All Services" && s.category !== bulkApplyTo) return s;
        const newPrices = s.prices.map((p) => {
          switch (bulkAdjustmentType) {
            case "percent-increase":
              return Math.round(p * (1 + value / 100));
            case "percent-decrease":
              return Math.round(p * (1 - value / 100));
            case "fixed-amount":
              return Math.max(0, p + value);
            default:
              return p;
          }
        });
        return { ...s, prices: newPrices };
      })
    );
    setBulkUpdateOpen(false);
    setBulkValue("");
  };

  // --- Package handlers ---
  const toggleServiceInPackage = (service: string) => {
    setNewPackageServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const resetPackageForm = () => {
    setEditingPackage(null);
    setNewPackageName("");
    setNewPackageDescription("");
    setNewPackageServices([]);
    setNewPackagePrice("");
    setNewPackageValidity("30");
    setNewPackageStatus("draft");
  };

  const openPackageDialog = (pkg?: PackageData) => {
    if (pkg) {
      setEditingPackage(pkg);
      setNewPackageName(pkg.name);
      setNewPackageDescription(pkg.description);
      setNewPackageServices([...pkg.services]);
      setNewPackagePrice(String(pkg.packagePrice));
      setNewPackageValidity(pkg.validity.match(/\d+/)?.[0] || "30");
      setNewPackageStatus(pkg.status);
    } else {
      resetPackageForm();
    }
    setShowCreatePackageDialog(true);
  };

  const handleSavePackage = () => {
    const price = Number(newPackagePrice) || 0;
    if (editingPackage) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingPackage.id
            ? {
                ...p,
                name: newPackageName,
                description: newPackageDescription,
                services: newPackageServices,
                packagePrice: price,
                validity: `Valid for ${newPackageValidity} days`,
                status: newPackageStatus,
              }
            : p
        )
      );
    } else {
      const newPkg: PackageData = {
        id: `PKG${String(packages.length + 1).padStart(3, "0")}`,
        name: newPackageName,
        description: newPackageDescription,
        services: newPackageServices,
        totalValue: price,
        packagePrice: price,
        savings: 0,
        validity: `Valid for ${newPackageValidity} days`,
        status: newPackageStatus,
        icon: Gift,
      };
      setPackages((prev) => [...prev, newPkg]);
    }
    setShowCreatePackageDialog(false);
    resetPackageForm();
  };

  const handleDuplicatePackage = (pkg: PackageData) => {
    const duplicate: PackageData = {
      ...pkg,
      id: `PKG${String(packages.length + 1).padStart(3, "0")}`,
      name: `${pkg.name} (Copy)`,
      status: "draft",
    };
    setPackages((prev) => [...prev, duplicate]);
  };

  const handleDeletePackage = (pkg: PackageData) => {
    setPackageToDelete(pkg);
    setDeletePackageConfirmOpen(true);
  };

  const confirmDeletePackage = () => {
    if (packageToDelete) {
      setPackages((prev) => prev.filter((p) => p.id !== packageToDelete.id));
    }
    setDeletePackageConfirmOpen(false);
    setPackageToDelete(null);
  };

  // --- Promotion handlers ---
  const openPromoEdit = (promo: Promotion) => {
    setEditingPromotion(promo);
    setPromoEditName(promo.name);
    setPromoEditCode(promo.code);
    setPromoEditDiscountType(promo.discountType);
    setPromoEditDiscountValue(String(promo.discountValue));
    setPromoEditDescription(promo.description);
    setPromoEditOpen(true);
  };

  const handleSavePromoEdit = () => {
    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((p) =>
          p.id === editingPromotion.id
            ? {
                ...p,
                name: promoEditName,
                code: promoEditCode.toUpperCase(),
                discountType: promoEditDiscountType,
                discountValue: Number(promoEditDiscountValue) || 0,
                description: promoEditDescription,
              }
            : p
        )
      );
    }
    setPromoEditOpen(false);
    setEditingPromotion(null);
  };

  const handleDeactivatePromotion = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "inactive" } : p))
    );
  };

  const handleCopyPromoCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPromoId(id);
    setTimeout(() => setCopiedPromoId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Pricing & Packages
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage service prices, packages, and promotions
          </p>
        </div>
        <Button onClick={() => openPackageDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="service-prices">Service Prices</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>

        {/* Service Prices Tab */}
        <TabsContent value="service-prices" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Service Pricing</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setBulkUpdateOpen(true)}>
                  <Edit className="mr-1.5 h-3.5 w-3.5" />
                  Bulk Update
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Service</th>
                      <th className="text-left p-4 font-medium text-gray-600">Duration Options</th>
                      <th className="text-right p-4 font-medium text-gray-600">Current Price</th>
                      <th className="text-center p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicePrices.map((service) => (
                      <tr key={service.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {service.durations.map((duration, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {duration}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {editingServiceId === service.id ? (
                            <div className="flex items-center justify-end gap-2">
                              {editingPrices.map((price, i) => (
                                <Input
                                  key={i}
                                  type="number"
                                  value={price}
                                  onChange={(e) => {
                                    const updated = [...editingPrices];
                                    updated[i] = Number(e.target.value) || 0;
                                    setEditingPrices(updated);
                                  }}
                                  className="w-28 text-right"
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {service.prices.map((price, i) => (
                                <div key={i} className="text-sm">
                                  <span className="font-medium text-gray-900">{formatCurrency(price)}</span>
                                  <span className="text-gray-400 ml-1">/ {service.durations[i]}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {service.status === "active" ? (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {editingServiceId === service.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveServicePrice(service.id)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEditService}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditingService(service)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages" className="mt-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const IconComponent = pkg.icon;
              return (
                <Card key={pkg.id} className="hover:shadow-md transition-shadow relative">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary-100">
                          <IconComponent className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{pkg.name}</h3>
                          <p className="text-sm text-foreground-muted">{pkg.description}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openPackageDialog(pkg)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicatePackage(pkg)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePackage(pkg)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Included Services */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Included Services</h4>
                      <ul className="space-y-1.5">
                        {pkg.services.map((service, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator className="my-4" />

                    {/* Pricing */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Total value</span>
                        <span className="text-gray-400 line-through">{formatCurrency(pkg.totalValue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Package price</span>
                        <span className="text-xl font-bold text-primary-600">{formatCurrency(pkg.packagePrice)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Savings</span>
                        <Badge className="bg-accent-100 text-accent-700">{pkg.savings}% off</Badge>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="h-3.5 w-3.5" />
                        {pkg.validity}
                      </div>
                      {getPackageStatusBadge(pkg.status)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Promotion</th>
                      <th className="text-left p-4 font-medium text-gray-600">Code</th>
                      <th className="text-left p-4 font-medium text-gray-600">Discount</th>
                      <th className="text-center p-4 font-medium text-gray-600">Usage</th>
                      <th className="text-left p-4 font-medium text-gray-600">Valid Period</th>
                      <th className="text-center p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promo) => (
                      <tr key={promo.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <span className="font-medium text-gray-900">{promo.name}</span>
                            <p className="text-sm text-gray-500">{promo.description}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2.5 py-1 rounded-md text-sm font-mono font-medium text-primary-700">
                              {promo.code}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleCopyPromoCode(promo.code, promo.id)}
                            >
                              {copiedPromoId === promo.id ? (
                                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            {promo.discountType === "percentage" ? (
                              <>
                                <Percent className="h-4 w-4 text-primary-500" />
                                <span className="font-medium">{promo.discountValue}% off</span>
                              </>
                            ) : (
                              <>
                                <Tag className="h-4 w-4 text-primary-500" />
                                <span className="font-medium">{formatCurrency(promo.discountValue)} off</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="space-y-1">
                            <span className="font-medium text-gray-900">{promo.used}</span>
                            <span className="text-gray-400"> / </span>
                            <span className="text-gray-500">{promo.limit ?? "Unlimited"}</span>
                            {promo.limit && (
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div
                                  className="bg-primary-500 h-1.5 rounded-full"
                                  style={{ width: `${Math.min((promo.used / promo.limit) * 100, 100)}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="text-gray-700">{promo.validFrom}</p>
                            <p className="text-gray-400">to {promo.validTo}</p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          {getPromoStatusBadge(promo.status)}
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openPromoEdit(promo)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeactivatePromotion(promo.id)}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCopyPromoCode(promo.code, promo.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                {copiedPromoId === promo.id ? "Copied!" : "Copy Code"}
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
      </Tabs>

      {/* Bulk Update Dialog */}
      <Dialog open={bulkUpdateOpen} onOpenChange={setBulkUpdateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Bulk Price Update</DialogTitle>
            <DialogDescription>
              Apply a price adjustment across multiple services at once.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Adjustment Type</Label>
              <Select value={bulkAdjustmentType} onValueChange={(v) => setBulkAdjustmentType(v as typeof bulkAdjustmentType)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent-increase">Percentage Increase</SelectItem>
                  <SelectItem value="percent-decrease">Percentage Decrease</SelectItem>
                  <SelectItem value="fixed-amount">Fixed Amount Change</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bulkValue">
                Value {bulkAdjustmentType.startsWith("percent") ? "(%)" : "(NGN)"}
              </Label>
              <Input
                id="bulkValue"
                type="number"
                placeholder={bulkAdjustmentType.startsWith("percent") ? "e.g. 10" : "e.g. 2000"}
                className="mt-1"
                value={bulkValue}
                onChange={(e) => setBulkValue(e.target.value)}
              />
            </div>
            <div>
              <Label>Apply To</Label>
              <Select value={bulkApplyTo} onValueChange={setBulkApplyTo}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Preview: affected services ({getBulkPreview().length})</p>
              <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
                {getBulkPreview().map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-3 py-2 border-b border-border last:border-b-0 text-sm">
                    <span>{s.name}</span>
                    <span className="text-gray-500">
                      {s.prices.map((p) => formatCurrency(p)).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkUpdateOpen(false)}>Cancel</Button>
            <Button onClick={handleApplyBulkUpdate}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Package Dialog */}
      <Dialog open={showCreatePackageDialog} onOpenChange={setShowCreatePackageDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPackage ? "Edit Package" : "Create Package"}</DialogTitle>
            <DialogDescription>
              {editingPackage ? "Update the package details." : "Bundle services together at a discounted price"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="pkg-name">Package Name</Label>
              <Input
                id="pkg-name"
                placeholder="e.g. Couples Retreat"
                value={newPackageName}
                onChange={(e) => setNewPackageName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pkg-desc">Description</Label>
              <Input
                id="pkg-desc"
                placeholder="Brief description of the package"
                value={newPackageDescription}
                onChange={(e) => setNewPackageDescription(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Select Services to Include</Label>
              <div className="mt-2 border border-border rounded-lg max-h-48 overflow-y-auto">
                {allAvailableServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-border last:border-b-0"
                    onClick={() => toggleServiceInPackage(service)}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                        newPackageServices.includes(service)
                          ? "bg-primary-500 border-primary-500"
                          : "border-gray-300"
                      }`}
                    >
                      {newPackageServices.includes(service) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
              {newPackageServices.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {newPackageServices.length} service{newPackageServices.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pkg-price">Package Price (NGN)</Label>
                <Input
                  id="pkg-price"
                  type="number"
                  placeholder="e.g. 85000"
                  value={newPackagePrice}
                  onChange={(e) => setNewPackagePrice(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pkg-validity">Validity (days)</Label>
                <Input
                  id="pkg-validity"
                  type="number"
                  placeholder="e.g. 30"
                  value={newPackageValidity}
                  onChange={(e) => setNewPackageValidity(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Status</Label>
              <div className="flex gap-3 mt-2">
                <Button
                  variant={newPackageStatus === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewPackageStatus("draft")}
                >
                  Draft
                </Button>
                <Button
                  variant={newPackageStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewPackageStatus("active")}
                >
                  Active
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreatePackageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePackage}>
              <Package className="mr-2 h-4 w-4" />
              {editingPackage ? "Save Changes" : "Create Package"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Package Confirmation Dialog */}
      <Dialog open={deletePackageConfirmOpen} onOpenChange={setDeletePackageConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Package?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{packageToDelete?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePackageConfirmOpen(false)}>Cancel</Button>
            <Button variant="default" className="bg-red-600 hover:bg-red-700" onClick={confirmDeletePackage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Promotion Dialog */}
      <Dialog open={promoEditOpen} onOpenChange={setPromoEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
            <DialogDescription>
              Update the promotion details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="promoEditName">Promotion Name</Label>
              <Input
                id="promoEditName"
                className="mt-1"
                value={promoEditName}
                onChange={(e) => setPromoEditName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="promoEditCode">Code</Label>
              <Input
                id="promoEditCode"
                className="mt-1 font-mono uppercase"
                value={promoEditCode}
                onChange={(e) => setPromoEditCode(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Discount Type</Label>
                <Select value={promoEditDiscountType} onValueChange={setPromoEditDiscountType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="promoEditValue">Value</Label>
                <Input
                  id="promoEditValue"
                  type="number"
                  className="mt-1"
                  value={promoEditDiscountValue}
                  onChange={(e) => setPromoEditDiscountValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="promoEditDesc">Description</Label>
              <Input
                id="promoEditDesc"
                className="mt-1"
                value={promoEditDescription}
                onChange={(e) => setPromoEditDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPromoEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePromoEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
