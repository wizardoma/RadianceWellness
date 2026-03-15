"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Package,
  AlertTriangle,
  TrendingDown,
  Download,
  ShoppingCart,
  Star,
  Phone,
  Mail,
  Calendar,
  ArrowUpDown,
  ClipboardList,
  Truck,
  Edit,
  Trash2,
  History,
  RotateCcw,
  PlusCircle,
  MinusCircle,
  PackageOpen,
  FileText,
  Check,
  X,
  Copy,
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
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  inStock: number;
  reorderLevel: number;
  unitCost: number;
  supplier: string;
  description: string;
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: number;
  total: number;
  status: string;
  date: string;
  expectedDelivery: string;
  notes?: string;
  lineItems?: POLineItem[];
}

interface POLineItem {
  productName: string;
  quantity: number;
  unitCost: number;
}

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  productsSupplied: number;
  lastOrderDate: string;
  rating: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const categories = [
  "Skincare",
  "Massage Oils",
  "Equipment",
  "Towels & Linens",
  "Retail Products",
  "Consumables",
];

const initialInventory: InventoryItem[] = [
  {
    id: "INV001",
    name: "Organic Argan Oil (500ml)",
    sku: "SKC-001",
    category: "Skincare",
    inStock: 45,
    reorderLevel: 20,
    unitCost: 8500,
    supplier: "NaturaGlow Supplies",
    description: "Premium cold-pressed organic argan oil for skincare treatments.",
  },
  {
    id: "INV002",
    name: "Swedish Massage Oil (1L)",
    sku: "MO-001",
    category: "Massage Oils",
    inStock: 8,
    reorderLevel: 15,
    unitCost: 12000,
    supplier: "AromaTherapy Wholesale",
    description: "Professional-grade massage oil for Swedish massage techniques.",
  },
  {
    id: "INV003",
    name: "Hot Stone Set (16pc)",
    sku: "EQ-001",
    category: "Equipment",
    inStock: 4,
    reorderLevel: 2,
    unitCost: 45000,
    supplier: "SpaEquip Nigeria",
    description: "Basalt hot stone set for therapeutic massage treatments.",
  },
  {
    id: "INV004",
    name: "Premium Bath Towels",
    sku: "TL-001",
    category: "Towels & Linens",
    inStock: 0,
    reorderLevel: 30,
    unitCost: 3500,
    supplier: "Lagos Textile Co.",
    description: "100% Egyptian cotton premium bath towels, white.",
  },
  {
    id: "INV005",
    name: "Shea Butter Body Cream (200ml)",
    sku: "RP-001",
    category: "Retail Products",
    inStock: 62,
    reorderLevel: 25,
    unitCost: 6500,
    supplier: "NaturaGlow Supplies",
    description: "Organic shea butter body cream for retail sale.",
  },
  {
    id: "INV006",
    name: "Disposable Slippers",
    sku: "CON-001",
    category: "Consumables",
    inStock: 5,
    reorderLevel: 50,
    unitCost: 500,
    supplier: "Lagos Textile Co.",
    description: "Disposable non-woven spa slippers, one-size.",
  },
  {
    id: "INV007",
    name: "Vitamin C Serum (30ml)",
    sku: "RP-002",
    category: "Retail Products",
    inStock: 38,
    reorderLevel: 15,
    unitCost: 15000,
    supplier: "NaturaGlow Supplies",
    description: "High-potency Vitamin C face serum for retail.",
  },
  {
    id: "INV008",
    name: "Essential Oil Diffuser",
    sku: "EQ-002",
    category: "Equipment",
    inStock: 6,
    reorderLevel: 3,
    unitCost: 22000,
    supplier: "SpaEquip Nigeria",
    description: "Ultrasonic essential oil diffuser with LED mood lighting.",
  },
  {
    id: "INV009",
    name: "Bamboo Cotton Robes",
    sku: "TL-002",
    category: "Towels & Linens",
    inStock: 12,
    reorderLevel: 15,
    unitCost: 8000,
    supplier: "Lagos Textile Co.",
    description: "Eco-friendly bamboo-cotton blend spa robes.",
  },
  {
    id: "INV010",
    name: "Lavender Essential Oil (100ml)",
    sku: "MO-002",
    category: "Massage Oils",
    inStock: 25,
    reorderLevel: 10,
    unitCost: 18000,
    supplier: "AromaTherapy Wholesale",
    description: "Pure lavender essential oil for aromatherapy and massage.",
  },
];

const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2026-001",
    supplier: "NaturaGlow Supplies",
    items: 5,
    total: 185000,
    status: "Pending",
    date: "2026-03-12",
    expectedDelivery: "2026-03-20",
  },
  {
    id: "PO-2026-002",
    supplier: "Lagos Textile Co.",
    items: 3,
    total: 245000,
    status: "Approved",
    date: "2026-03-10",
    expectedDelivery: "2026-03-18",
  },
  {
    id: "PO-2026-003",
    supplier: "SpaEquip Nigeria",
    items: 2,
    total: 520000,
    status: "Ordered",
    date: "2026-03-05",
    expectedDelivery: "2026-03-22",
  },
  {
    id: "PO-2026-004",
    supplier: "AromaTherapy Wholesale",
    items: 8,
    total: 310000,
    status: "Received",
    date: "2026-02-28",
    expectedDelivery: "2026-03-08",
  },
  {
    id: "PO-2026-005",
    supplier: "NaturaGlow Supplies",
    items: 4,
    total: 142000,
    status: "Pending",
    date: "2026-03-14",
    expectedDelivery: "2026-03-25",
  },
];

const mockSuppliers: Supplier[] = [
  {
    id: "SUP001",
    name: "NaturaGlow Supplies",
    contactPerson: "Chidera Okonkwo",
    email: "chidera@naturaglow.ng",
    phone: "+234 812 456 7890",
    productsSupplied: 28,
    lastOrderDate: "2026-03-14",
    rating: 4.8,
  },
  {
    id: "SUP002",
    name: "AromaTherapy Wholesale",
    contactPerson: "Ibrahim Yusuf",
    email: "ibrahim@aromawholesale.ng",
    phone: "+234 803 789 0123",
    productsSupplied: 15,
    lastOrderDate: "2026-02-28",
    rating: 4.5,
  },
  {
    id: "SUP003",
    name: "SpaEquip Nigeria",
    contactPerson: "Ngozi Adeyemi",
    email: "ngozi@spaequip.ng",
    phone: "+234 805 321 6543",
    productsSupplied: 12,
    lastOrderDate: "2026-03-05",
    rating: 4.9,
  },
  {
    id: "SUP004",
    name: "Lagos Textile Co.",
    contactPerson: "Bola Fashola",
    email: "bola@lagostextile.ng",
    phone: "+234 807 654 9876",
    productsSupplied: 20,
    lastOrderDate: "2026-03-10",
    rating: 4.3,
  },
];

const mockStockHistory = [
  { date: "2026-03-14", type: "Purchase", change: "+50", reason: "Restocking order PO-2026-001", by: "Chidera O." },
  { date: "2026-03-10", type: "Sale", change: "-3", reason: "Retail sale - Walk-in customer", by: "Amaka N." },
  { date: "2026-03-07", type: "Adjustment", change: "-2", reason: "Damaged during storage", by: "Ibrahim Y." },
  { date: "2026-03-01", type: "Sale", change: "-8", reason: "Treatment usage - Swedish Massage package", by: "Ngozi A." },
  { date: "2026-02-25", type: "Purchase", change: "+30", reason: "Restocking order PO-2026-003", by: "Chidera O." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getStockStatus(item: InventoryItem) {
  if (item.inStock === 0) return "Out of Stock";
  if (item.inStock < item.reorderLevel) return "Low Stock";
  return "In Stock";
}

function getStockStatusBadge(item: InventoryItem) {
  const status = getStockStatus(item);
  switch (status) {
    case "In Stock":
      return <Badge className="bg-green-100 text-green-700">In Stock</Badge>;
    case "Low Stock":
      return <Badge className="bg-amber-100 text-amber-700">Low Stock</Badge>;
    case "Out of Stock":
      return <Badge className="bg-red-100 text-red-700">Out of Stock</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

function getCategoryBadge(category: string) {
  const colors: Record<string, string> = {
    Skincare: "bg-pink-100 text-pink-700",
    "Massage Oils": "bg-purple-100 text-purple-700",
    Equipment: "bg-blue-100 text-blue-700",
    "Towels & Linens": "bg-teal-100 text-teal-700",
    "Retail Products": "bg-primary-100 text-primary-700",
    Consumables: "bg-gray-100 text-gray-700",
  };
  return (
    <Badge className={colors[category] || "bg-gray-100 text-gray-700"}>
      {category}
    </Badge>
  );
}

function getPOStatusBadge(status: string) {
  switch (status) {
    case "Pending":
      return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
    case "Approved":
      return <Badge className="bg-blue-100 text-blue-700">Approved</Badge>;
    case "Ordered":
      return <Badge className="bg-purple-100 text-purple-700">Ordered</Badge>;
    case "Received":
      return <Badge className="bg-green-100 text-green-700">Received</Badge>;
    case "Cancelled":
      return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InventoryPage() {
  // ─── Core state ─────────────────────────────────────────────────────────────
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventory);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ─── Add / Edit Item dialog ─────────────────────────────────────────────────
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [itemFormName, setItemFormName] = useState("");
  const [itemFormSku, setItemFormSku] = useState("");
  const [itemFormCategory, setItemFormCategory] = useState("");
  const [itemFormSupplier, setItemFormSupplier] = useState("");
  const [itemFormDescription, setItemFormDescription] = useState("");
  const [itemFormStock, setItemFormStock] = useState("");
  const [itemFormReorder, setItemFormReorder] = useState("");
  const [itemFormUnitCost, setItemFormUnitCost] = useState("");

  // ─── Adjust Stock dialog ────────────────────────────────────────────────────
  const [adjustStockOpen, setAdjustStockOpen] = useState(false);
  const [adjustStockItem, setAdjustStockItem] = useState<InventoryItem | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustReason, setAdjustReason] = useState("");
  const [adjustNotes, setAdjustNotes] = useState("");

  // ─── Export dialog ──────────────────────────────────────────────────────────
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | "excel">("csv");
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");
  const [exportLoading, setExportLoading] = useState(false);

  // ─── Purchase Order dialog ──────────────────────────────────────────────────
  const [poDialogOpen, setPoDialogOpen] = useState(false);
  const [poSupplier, setPoSupplier] = useState("");
  const [poExpectedDelivery, setPoExpectedDelivery] = useState("");
  const [poNotes, setPoNotes] = useState("");
  const [poLineItems, setPoLineItems] = useState<POLineItem[]>([
    { productName: "", quantity: 1, unitCost: 0 },
  ]);

  // ─── Reorder All / Urgent Reorder confirmation ─────────────────────────────
  const [reorderAllOpen, setReorderAllOpen] = useState(false);
  const [urgentReorderOpen, setUrgentReorderOpen] = useState(false);

  // ─── Delete Item confirmation ───────────────────────────────────────────────
  const [deleteItemOpen, setDeleteItemOpen] = useState(false);
  const [deleteItemTarget, setDeleteItemTarget] = useState<InventoryItem | null>(null);

  // ─── View History dialog ────────────────────────────────────────────────────
  const [viewHistoryOpen, setViewHistoryOpen] = useState(false);
  const [viewHistoryItem, setViewHistoryItem] = useState<InventoryItem | null>(null);

  // ─── Supplier Contact dialog ────────────────────────────────────────────────
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactSupplier, setContactSupplier] = useState<Supplier | null>(null);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // ─── PO Details dialog ──────────────────────────────────────────────────────
  const [poDetailsOpen, setPoDetailsOpen] = useState(false);
  const [poDetailsTarget, setPoDetailsTarget] = useState<PurchaseOrder | null>(null);

  // ─── Cancel PO confirmation ─────────────────────────────────────────────────
  const [cancelPoOpen, setCancelPoOpen] = useState(false);
  const [cancelPoTarget, setCancelPoTarget] = useState<PurchaseOrder | null>(null);

  // ─── PO Edit dialog (simple) ────────────────────────────────────────────────
  const [poEditOpen, setPoEditOpen] = useState(false);
  const [poEditTarget, setPoEditTarget] = useState<PurchaseOrder | null>(null);

  // ─── PO Download PDF dialog (simple) ────────────────────────────────────────
  const [poDownloadOpen, setPoDownloadOpen] = useState(false);
  const [poDownloadTarget, setPoDownloadTarget] = useState<PurchaseOrder | null>(null);

  // ─── Derived data ───────────────────────────────────────────────────────────
  const filteredInventory = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(
    (item) => item.inStock > 0 && item.inStock < item.reorderLevel
  );
  const outOfStockItems = inventoryItems.filter((item) => item.inStock === 0);
  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + item.unitCost * item.inStock,
    0
  );

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const resetItemForm = () => {
    setItemFormName("");
    setItemFormSku("");
    setItemFormCategory("");
    setItemFormSupplier("");
    setItemFormDescription("");
    setItemFormStock("");
    setItemFormReorder("");
    setItemFormUnitCost("");
    setEditingItem(null);
  };

  const handleOpenAddItem = () => {
    resetItemForm();
    setAddItemOpen(true);
  };

  const handleOpenEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    setItemFormName(item.name);
    setItemFormSku(item.sku);
    setItemFormCategory(item.category);
    const matchedSupplier = mockSuppliers.find((s) => s.name === item.supplier);
    setItemFormSupplier(matchedSupplier?.id || "");
    setItemFormDescription(item.description);
    setItemFormStock(String(item.inStock));
    setItemFormReorder(String(item.reorderLevel));
    setItemFormUnitCost(String(item.unitCost));
    setAddItemOpen(true);
  };

  const handleSaveItem = () => {
    const supplierName =
      mockSuppliers.find((s) => s.id === itemFormSupplier)?.name || itemFormSupplier;

    if (editingItem) {
      setInventoryItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: itemFormName || item.name,
                sku: itemFormSku || item.sku,
                category: itemFormCategory || item.category,
                supplier: supplierName || item.supplier,
                description: itemFormDescription || item.description,
                inStock: itemFormStock ? parseInt(itemFormStock, 10) : item.inStock,
                reorderLevel: itemFormReorder ? parseInt(itemFormReorder, 10) : item.reorderLevel,
                unitCost: itemFormUnitCost ? parseInt(itemFormUnitCost, 10) : item.unitCost,
              }
            : item
        )
      );
    } else {
      const newItem: InventoryItem = {
        id: `INV${String(inventoryItems.length + 1).padStart(3, "0")}`,
        name: itemFormName,
        sku: itemFormSku,
        category: itemFormCategory,
        supplier: supplierName,
        description: itemFormDescription,
        inStock: parseInt(itemFormStock, 10) || 0,
        reorderLevel: parseInt(itemFormReorder, 10) || 0,
        unitCost: parseInt(itemFormUnitCost, 10) || 0,
      };
      setInventoryItems((prev) => [...prev, newItem]);
    }
    setAddItemOpen(false);
    resetItemForm();
  };

  const handleOpenAdjustStock = (item: InventoryItem) => {
    setAdjustStockItem(item);
    setAdjustmentType("add");
    setAdjustQty("");
    setAdjustReason("");
    setAdjustNotes("");
    setAdjustStockOpen(true);
  };

  const handleSaveAdjustment = () => {
    if (!adjustStockItem || !adjustQty) return;
    const qty = parseInt(adjustQty, 10);
    if (isNaN(qty) || qty <= 0) return;

    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === adjustStockItem.id
          ? {
              ...item,
              inStock:
                adjustmentType === "add"
                  ? item.inStock + qty
                  : Math.max(0, item.inStock - qty),
            }
          : item
      )
    );
    setAdjustStockOpen(false);
  };

  const handleExport = () => {
    setExportLoading(true);
    setTimeout(() => {
      setExportLoading(false);
      setExportOpen(false);
    }, 1500);
  };

  const resetPoForm = () => {
    setPoSupplier("");
    setPoExpectedDelivery("");
    setPoNotes("");
    setPoLineItems([{ productName: "", quantity: 1, unitCost: 0 }]);
  };

  const handleOpenPoDialog = (preselectedSupplier?: string, preselectedItem?: InventoryItem) => {
    resetPoForm();
    if (preselectedSupplier) {
      const matchedSupplier = mockSuppliers.find((s) => s.name === preselectedSupplier);
      setPoSupplier(matchedSupplier?.id || "");
    }
    if (preselectedItem) {
      setPoLineItems([
        { productName: preselectedItem.name, quantity: 1, unitCost: preselectedItem.unitCost },
      ]);
    }
    setPoDialogOpen(true);
  };

  const handleCreatePO = () => {
    const supplierName =
      mockSuppliers.find((s) => s.id === poSupplier)?.name || poSupplier;
    const totalLineItems = poLineItems.filter((li) => li.productName.trim() !== "");
    const total = totalLineItems.reduce((sum, li) => sum + li.quantity * li.unitCost, 0);

    const newPO: PurchaseOrder = {
      id: `PO-2026-${String(purchaseOrders.length + 1).padStart(3, "0")}`,
      supplier: supplierName,
      items: totalLineItems.length,
      total,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      expectedDelivery: poExpectedDelivery || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      notes: poNotes,
      lineItems: totalLineItems,
    };
    setPurchaseOrders((prev) => [...prev, newPO]);
    setPoDialogOpen(false);
    resetPoForm();
  };

  const handleAddLineItem = () => {
    setPoLineItems((prev) => [...prev, { productName: "", quantity: 1, unitCost: 0 }]);
  };

  const handleRemoveLineItem = (index: number) => {
    setPoLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateLineItem = (index: number, field: keyof POLineItem, value: string | number) => {
    setPoLineItems((prev) =>
      prev.map((li, i) => (i === index ? { ...li, [field]: value } : li))
    );
  };

  const handleDeleteItem = () => {
    if (!deleteItemTarget) return;
    setInventoryItems((prev) => prev.filter((item) => item.id !== deleteItemTarget.id));
    setDeleteItemOpen(false);
    setDeleteItemTarget(null);
  };

  const handleReorderAll = () => {
    const supplierGroups = new Map<string, InventoryItem[]>();
    lowStockItems.forEach((item) => {
      const existing = supplierGroups.get(item.supplier) || [];
      existing.push(item);
      supplierGroups.set(item.supplier, existing);
    });

    const newPOs: PurchaseOrder[] = [];
    supplierGroups.forEach((items, supplier) => {
      const lineItems = items.map((item) => ({
        productName: item.name,
        quantity: item.reorderLevel - item.inStock,
        unitCost: item.unitCost,
      }));
      const total = lineItems.reduce((s, li) => s + li.quantity * li.unitCost, 0);
      newPOs.push({
        id: `PO-2026-${String(purchaseOrders.length + newPOs.length + 1).padStart(3, "0")}`,
        supplier,
        items: lineItems.length,
        total,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        expectedDelivery: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        lineItems,
      });
    });

    setPurchaseOrders((prev) => [...prev, ...newPOs]);
    setReorderAllOpen(false);
  };

  const handleUrgentReorder = () => {
    const supplierGroups = new Map<string, InventoryItem[]>();
    outOfStockItems.forEach((item) => {
      const existing = supplierGroups.get(item.supplier) || [];
      existing.push(item);
      supplierGroups.set(item.supplier, existing);
    });

    const newPOs: PurchaseOrder[] = [];
    supplierGroups.forEach((items, supplier) => {
      const lineItems = items.map((item) => ({
        productName: item.name,
        quantity: item.reorderLevel,
        unitCost: item.unitCost,
      }));
      const total = lineItems.reduce((s, li) => s + li.quantity * li.unitCost, 0);
      newPOs.push({
        id: `PO-2026-${String(purchaseOrders.length + newPOs.length + 1).padStart(3, "0")}`,
        supplier,
        items: lineItems.length,
        total,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        expectedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0],
        lineItems,
      });
    });

    setPurchaseOrders((prev) => [...prev, ...newPOs]);
    setUrgentReorderOpen(false);
  };

  const handleUpdatePOStatus = (poId: string, newStatus: string) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => (po.id === poId ? { ...po, status: newStatus } : po))
    );
  };

  const handleCancelPO = () => {
    if (!cancelPoTarget) return;
    handleUpdatePOStatus(cancelPoTarget.id, "Cancelled");
    setCancelPoOpen(false);
    setCancelPoTarget(null);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    });
  };

  // ─── Inventory Table (reused across tabs) ──────────────────────────────────

  const renderInventoryTable = (items: InventoryItem[]) => (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">
                  Product
                </th>
                <th className="text-left p-4 font-medium text-gray-600">SKU</th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-right p-4 font-medium text-gray-600">
                  In Stock
                </th>
                <th className="text-right p-4 font-medium text-gray-600">
                  Reorder Level
                </th>
                <th className="text-right p-4 font-medium text-gray-600">
                  Unit Cost
                </th>
                <th className="text-right p-4 font-medium text-gray-600">
                  Total Value
                </th>
                <th className="text-center p-4 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-right p-4 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <Package className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.supplier}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-mono text-gray-600">
                        {item.sku}
                      </span>
                    </td>
                    <td className="p-4">{getCategoryBadge(item.category)}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`font-semibold ${
                          item.inStock === 0
                            ? "text-red-600"
                            : item.inStock < item.reorderLevel
                            ? "text-amber-600"
                            : "text-gray-900"
                        }`}
                      >
                        {item.inStock}
                      </span>
                    </td>
                    <td className="p-4 text-right text-gray-600">
                      {item.reorderLevel}
                    </td>
                    <td className="p-4 text-right text-gray-900">
                      {formatCurrency(item.unitCost)}
                    </td>
                    <td className="p-4 text-right font-medium text-gray-900">
                      {formatCurrency(item.unitCost * item.inStock)}
                    </td>
                    <td className="p-4 text-center">
                      {getStockStatusBadge(item)}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleOpenEditItem(item)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOpenAdjustStock(item)}
                          >
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            Adjust Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setViewHistoryItem(item);
                              setViewHistoryOpen(true);
                            }}
                          >
                            <History className="h-4 w-4 mr-2" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOpenPoDialog(item.supplier, item)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reorder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setDeleteItemTarget(item);
                              setDeleteItemOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500">
                    <PackageOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No items found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-foreground-secondary mt-1">
            Track products, stock levels, and suppliers
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={() => handleOpenPoDialog()}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Purchase Order
          </Button>
          <Button onClick={handleOpenAddItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* ── Summary Stat Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{inventoryItems.length}</p>
                <p className="text-sm text-foreground-muted">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{lowStockItems.length}</p>
                <p className="text-sm text-foreground-muted">Low Stock Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalValue)}
                </p>
                <p className="text-sm text-foreground-muted">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                <p className="text-sm text-foreground-muted">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Search & Category Filter ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search products by name or SKU..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <Tabs defaultValue="all-items">
        <TabsList>
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">
            Low Stock
            {lowStockItems.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-amber-500 text-white">
                {lowStockItems.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="out-of-stock">
            Out of Stock
            {outOfStockItems.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white">
                {outOfStockItems.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        {/* ── All Items Tab ──────────────────────────────────────────────── */}
        <TabsContent value="all-items">
          {renderInventoryTable(filteredInventory)}
        </TabsContent>

        {/* ── Low Stock Tab ──────────────────────────────────────────────── */}
        <TabsContent value="low-stock">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-800">
                  {lowStockItems.length} items are below reorder level
                </p>
                <p className="text-sm text-amber-700">
                  These items need to be restocked soon to avoid disruptions to
                  your services. Consider creating a purchase order.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0"
                onClick={() => setReorderAllOpen(true)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Reorder All
              </Button>
            </div>

            {renderInventoryTable(lowStockItems)}
          </div>
        </TabsContent>

        {/* ── Out of Stock Tab ───────────────────────────────────────────── */}
        <TabsContent value="out-of-stock">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <PackageOpen className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-red-800">
                  {outOfStockItems.length} items are out of stock
                </p>
                <p className="text-sm text-red-700">
                  These items are completely unavailable. Immediate action is
                  required to restock and avoid service interruptions.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0"
                onClick={() => setUrgentReorderOpen(true)}
              >
                <Truck className="mr-2 h-4 w-4" />
                Urgent Reorder
              </Button>
            </div>

            {renderInventoryTable(outOfStockItems)}
          </div>
        </TabsContent>

        {/* ── Purchase Orders Tab ────────────────────────────────────────── */}
        <TabsContent value="purchase-orders">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Purchase Orders</CardTitle>
              <Button size="sm" onClick={() => handleOpenPoDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                New Purchase Order
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">
                        PO Number
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Supplier
                      </th>
                      <th className="text-right p-4 font-medium text-gray-600">
                        Items
                      </th>
                      <th className="text-right p-4 font-medium text-gray-600">
                        Total
                      </th>
                      <th className="text-center p-4 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Expected Delivery
                      </th>
                      <th className="text-right p-4 font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((po) => (
                      <tr
                        key={po.id}
                        className="border-b border-border hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-medium font-mono text-primary-600">
                            {po.id}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-gray-900">
                          {po.supplier}
                        </td>
                        <td className="p-4 text-right text-gray-600">
                          {po.items}
                        </td>
                        <td className="p-4 text-right font-medium text-gray-900">
                          {formatCurrency(po.total)}
                        </td>
                        <td className="p-4 text-center">
                          {getPOStatusBadge(po.status)}
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(po.date).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(po.expectedDelivery).toLocaleDateString(
                            "en-NG",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setPoDetailsTarget(po);
                                  setPoDetailsOpen(true);
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              {po.status === "Pending" && (
                                <DropdownMenuItem
                                  onClick={() => handleUpdatePOStatus(po.id, "Approved")}
                                >
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {po.status === "Approved" && (
                                <DropdownMenuItem
                                  onClick={() => handleUpdatePOStatus(po.id, "Ordered")}
                                >
                                  Mark as Ordered
                                </DropdownMenuItem>
                              )}
                              {po.status === "Ordered" && (
                                <DropdownMenuItem
                                  className="text-green-600"
                                  onClick={() => handleUpdatePOStatus(po.id, "Received")}
                                >
                                  Mark as Received
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => {
                                  setPoEditTarget(po);
                                  setPoEditOpen(true);
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setPoDownloadTarget(po);
                                  setPoDownloadOpen(true);
                                }}
                              >
                                Download PDF
                              </DropdownMenuItem>
                              {po.status === "Pending" && (
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    setCancelPoTarget(po);
                                    setCancelPoOpen(true);
                                  }}
                                >
                                  Cancel Order
                                </DropdownMenuItem>
                              )}
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

        {/* ── Suppliers Tab ──────────────────────────────────────────────── */}
        <TabsContent value="suppliers">
          <div className="grid md:grid-cols-2 gap-4">
            {mockSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-primary-700">
                          {supplier.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {supplier.name}
                        </h3>
                        <p className="text-sm text-foreground-muted">
                          {supplier.contactPerson}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-sm">
                        {supplier.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      {supplier.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      {supplier.phone}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-foreground-muted">Products: </span>
                      <span className="font-medium text-gray-900">
                        {supplier.productsSupplied}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Last order:{" "}
                        {new Date(supplier.lastOrderDate).toLocaleDateString(
                          "en-NG",
                          { day: "numeric", month: "short" }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setContactSupplier(supplier);
                        setPhoneCopied(false);
                        setContactDialogOpen(true);
                      }}
                    >
                      <Phone className="mr-1 h-3 w-3" />
                      Contact
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenPoDialog(supplier.name)}
                    >
                      <ShoppingCart className="mr-1 h-3 w-3" />
                      New Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Export Dialog ───────────────────────────────────────────────────── */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Inventory Data</DialogTitle>
            <DialogDescription>
              Choose a format and date range for your export.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Format</Label>
              <div className="flex gap-2">
                {(["csv", "pdf", "excel"] as const).map((fmt) => (
                  <Button
                    key={fmt}
                    variant={exportFormat === fmt ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setExportFormat(fmt)}
                  >
                    {fmt === "csv" ? "CSV" : fmt === "pdf" ? "PDF" : "Excel"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exportFrom">From</Label>
                <Input
                  id="exportFrom"
                  type="date"
                  value={exportDateFrom}
                  onChange={(e) => setExportDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exportTo">To</Label>
                <Input
                  id="exportTo"
                  type="date"
                  value={exportDateTo}
                  onChange={(e) => setExportDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={exportLoading}>
              {exportLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Purchase Order Dialog ───────────────────────────────────────────── */}
      <Dialog open={poDialogOpen} onOpenChange={setPoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>
              Add line items and details for the new purchase order.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select value={poSupplier} onValueChange={setPoSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSuppliers.map((sup) => (
                      <SelectItem key={sup.id} value={sup.id}>
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="poDelivery">Expected Delivery Date</Label>
                <Input
                  id="poDelivery"
                  type="date"
                  value={poExpectedDelivery}
                  onChange={(e) => setPoExpectedDelivery(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Line Items</Label>
                <Button variant="outline" size="sm" onClick={handleAddLineItem}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2">
                {poLineItems.map((li, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      placeholder="Product name"
                      className="flex-1"
                      value={li.productName}
                      onChange={(e) =>
                        handleUpdateLineItem(idx, "productName", e.target.value)
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Qty"
                      className="w-20"
                      min="1"
                      value={li.quantity}
                      onChange={(e) =>
                        handleUpdateLineItem(idx, "quantity", parseInt(e.target.value, 10) || 0)
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Unit cost"
                      className="w-28"
                      min="0"
                      value={li.unitCost}
                      onChange={(e) =>
                        handleUpdateLineItem(idx, "unitCost", parseInt(e.target.value, 10) || 0)
                      }
                    />
                    {poLineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 flex-shrink-0"
                        onClick={() => handleRemoveLineItem(idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="poNotes">Notes</Label>
              <Textarea
                id="poNotes"
                placeholder="Additional notes..."
                value={poNotes}
                onChange={(e) => setPoNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePO}>Create PO</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reorder All Confirmation Dialog ─────────────────────────────────── */}
      <Dialog open={reorderAllOpen} onOpenChange={setReorderAllOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reorder All Low-Stock Items</DialogTitle>
            <DialogDescription>
              Create purchase orders for all {lowStockItems.length} low-stock items? Orders will be
              grouped by supplier.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReorderAllOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReorderAll}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Urgent Reorder Confirmation Dialog ──────────────────────────────── */}
      <Dialog open={urgentReorderOpen} onOpenChange={setUrgentReorderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Urgent Reorder Out-of-Stock Items</DialogTitle>
            <DialogDescription>
              Create urgent purchase orders for all {outOfStockItems.length} out-of-stock items?
              Orders will be grouped by supplier with expedited delivery.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUrgentReorderOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleUrgentReorder}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Item Confirmation Dialog ──────────────────────────────────── */}
      <Dialog open={deleteItemOpen} onOpenChange={setDeleteItemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteItemTarget?.name}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItemOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View History Dialog ──────────────────────────────────────────────── */}
      <Dialog open={viewHistoryOpen} onOpenChange={setViewHistoryOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Stock History</DialogTitle>
            <DialogDescription>
              Recent stock changes for {viewHistoryItem?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {mockStockHistory.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    entry.change.startsWith("+")
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {entry.change.startsWith("+") ? (
                    <PlusCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <MinusCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-gray-900">
                      {entry.type}
                    </span>
                    <span
                      className={`font-semibold text-sm ${
                        entry.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {entry.change}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{entry.reason}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{entry.date}</span>
                    <span className="text-xs text-gray-400">by {entry.by}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewHistoryOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Supplier Contact Dialog ──────────────────────────────────────────── */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {contactSupplier?.name}</DialogTitle>
            <DialogDescription>
              Reach out to {contactSupplier?.contactPerson}
            </DialogDescription>
          </DialogHeader>
          {contactSupplier && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Mail className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{contactSupplier.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Phone className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{contactSupplier.phone}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => contactSupplier && handleCopyPhone(contactSupplier.phone)}
            >
              {phoneCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Phone
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                if (contactSupplier) {
                  window.open(`mailto:${contactSupplier.email}`, "_blank");
                }
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── PO Details Dialog ────────────────────────────────────────────────── */}
      <Dialog open={poDetailsOpen} onOpenChange={setPoDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
            <DialogDescription>
              {poDetailsTarget?.id}
            </DialogDescription>
          </DialogHeader>
          {poDetailsTarget && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Supplier</p>
                  <p className="font-medium text-gray-900">{poDetailsTarget.supplier}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <div className="mt-1">{getPOStatusBadge(poDetailsTarget.status)}</div>
                </div>
                <div>
                  <p className="text-gray-500">Order Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(poDetailsTarget.date).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Expected Delivery</p>
                  <p className="font-medium text-gray-900">
                    {new Date(poDetailsTarget.expectedDelivery).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Items</p>
                  <p className="font-medium text-gray-900">{poDetailsTarget.items}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(poDetailsTarget.total)}
                  </p>
                </div>
              </div>
              {poDetailsTarget.lineItems && poDetailsTarget.lineItems.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Line Items</p>
                    <div className="space-y-2">
                      {poDetailsTarget.lineItems.map((li, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-gray-50 text-sm"
                        >
                          <span className="text-gray-900">{li.productName}</span>
                          <span className="text-gray-600">
                            {li.quantity} x {formatCurrency(li.unitCost)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {poDetailsTarget.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                    <p className="text-sm text-gray-600">{poDetailsTarget.notes}</p>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPoDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Cancel PO Confirmation Dialog ────────────────────────────────────── */}
      <Dialog open={cancelPoOpen} onOpenChange={setCancelPoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Purchase Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel {cancelPoTarget?.id}? This will mark the order as
              cancelled.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelPoOpen(false)}>
              Keep Order
            </Button>
            <Button variant="destructive" onClick={handleCancelPO}>
              Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── PO Edit Dialog (simple) ──────────────────────────────────────────── */}
      <Dialog open={poEditOpen} onOpenChange={setPoEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Purchase Order</DialogTitle>
            <DialogDescription>
              Editing {poEditTarget?.id} for {poEditTarget?.supplier}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Purchase order editing is available in the full management view. This order
              currently has {poEditTarget?.items} item(s) totalling{" "}
              {poEditTarget ? formatCurrency(poEditTarget.total) : ""}.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPoEditOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── PO Download PDF Dialog ───────────────────────────────────────────── */}
      <Dialog open={poDownloadOpen} onOpenChange={setPoDownloadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Purchase Order PDF</DialogTitle>
            <DialogDescription>
              Generate a PDF document for {poDownloadTarget?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 my-4">
            <FileText className="h-8 w-8 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">{poDownloadTarget?.id}.pdf</p>
              <p className="text-sm text-gray-500">
                {poDownloadTarget?.supplier} &mdash; {formatCurrency(poDownloadTarget?.total || 0)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPoDownloadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setPoDownloadOpen(false)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add / Edit Item Dialog ──────────────────────────────────────────── */}
      <Dialog
        open={addItemOpen}
        onOpenChange={(open) => {
          setAddItemOpen(open);
          if (!open) resetItemForm();
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Update the details for this inventory item."
                : "Fill in the details below to add a new product to your inventory."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g. Organic Argan Oil"
                  value={itemFormName}
                  onChange={(e) => setItemFormName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="e.g. SKC-001"
                  value={itemFormSku}
                  onChange={(e) => setItemFormSku(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={itemFormCategory} onValueChange={setItemFormCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select value={itemFormSupplier} onValueChange={setItemFormSupplier}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSuppliers.map((sup) => (
                      <SelectItem key={sup.id} value={sup.id}>
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief product description..."
                value={itemFormDescription}
                onChange={(e) => setItemFormDescription(e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  id="currentStock"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={itemFormStock}
                  onChange={(e) => setItemFormStock(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderLevel">Reorder Level</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={itemFormReorder}
                  onChange={(e) => setItemFormReorder(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitCost">Unit Cost (NGN)</Label>
                <Input
                  id="unitCost"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={itemFormUnitCost}
                  onChange={(e) => setItemFormUnitCost(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAddItemOpen(false);
                resetItemForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveItem}>
              {editingItem ? "Update Item" : "Save Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Adjust Stock Dialog ───────────────────────────────────────────── */}
      <Dialog open={adjustStockOpen} onOpenChange={setAdjustStockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>
              Update the stock level for this item.
            </DialogDescription>
          </DialogHeader>

          {adjustStockItem && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {adjustStockItem.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Current stock:{" "}
                    <span className="font-semibold">
                      {adjustStockItem.inStock}
                    </span>{" "}
                    units
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Adjustment Type</Label>
                <div className="flex gap-2">
                  <Button
                    variant={adjustmentType === "add" ? "default" : "outline"}
                    className={
                      adjustmentType === "add"
                        ? "flex-1 bg-green-600 hover:bg-green-700"
                        : "flex-1"
                    }
                    onClick={() => setAdjustmentType("add")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Stock
                  </Button>
                  <Button
                    variant={adjustmentType === "remove" ? "default" : "outline"}
                    className={
                      adjustmentType === "remove"
                        ? "flex-1 bg-red-600 hover:bg-red-700"
                        : "flex-1"
                    }
                    onClick={() => setAdjustmentType("remove")}
                  >
                    <MinusCircle className="mr-2 h-4 w-4" />
                    Remove Stock
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustQty">Quantity</Label>
                <Input
                  id="adjustQty"
                  type="number"
                  placeholder="Enter quantity"
                  min="1"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select value={adjustReason} onValueChange={setAdjustReason}>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes about this adjustment..."
                  value={adjustNotes}
                  onChange={(e) => setAdjustNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAdjustStockOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveAdjustment}>Save Adjustment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
