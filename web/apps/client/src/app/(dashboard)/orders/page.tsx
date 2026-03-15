"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Search,
  ChevronRight,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Phone,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  deliveryMethod: "pickup" | "delivery";
  trackingNumber?: string;
  deliveryAddress?: string;
  estimatedDelivery?: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-RW-1042",
    date: "2026-03-14",
    items: [
      { name: "Radiance Glow Face Cream (50ml)", quantity: 1, price: 12500 },
      { name: "Radiance Vitamin C Serum (30ml)", quantity: 1, price: 18500 },
    ],
    total: 31000,
    status: "processing",
    deliveryMethod: "delivery",
    deliveryAddress: "15 Adeola Odeku St, Victoria Island, Lagos",
    estimatedDelivery: "March 18, 2026",
  },
  {
    id: "ORD-RW-1038",
    date: "2026-03-10",
    items: [
      { name: "Aromatherapy Gift Set", quantity: 1, price: 35000 },
    ],
    total: 35000,
    status: "shipped",
    deliveryMethod: "delivery",
    trackingNumber: "NGP-28374651",
    deliveryAddress: "8 Aminu Kano Crescent, Wuse 2, Abuja",
    estimatedDelivery: "March 16, 2026",
  },
  {
    id: "ORD-RW-1031",
    date: "2026-03-05",
    items: [
      { name: "Deep Hydration Body Lotion (250ml)", quantity: 2, price: 8900 },
      { name: "Wellness Tea Collection", quantity: 1, price: 6500 },
      { name: "Bamboo Spa Headband", quantity: 1, price: 3500 },
    ],
    total: 27800,
    status: "delivered",
    deliveryMethod: "pickup",
  },
  {
    id: "ORD-RW-1025",
    date: "2026-02-28",
    items: [
      { name: "Organic Hair Oil Treatment (100ml)", quantity: 1, price: 15000 },
    ],
    total: 15000,
    status: "delivered",
    deliveryMethod: "delivery",
    deliveryAddress: "22 Admiralty Way, Lekki Phase 1, Lagos",
  },
  {
    id: "ORD-RW-1018",
    date: "2026-02-20",
    items: [
      { name: "Luxury Bath Salts (500g)", quantity: 2, price: 9800 },
    ],
    total: 19600,
    status: "cancelled",
    deliveryMethod: "delivery",
  },
];

const getStatusConfig = (status: Order["status"]) => {
  switch (status) {
    case "processing":
      return { label: "Processing", color: "bg-blue-100 text-blue-700", icon: Clock };
    case "shipped":
      return { label: "Shipped", color: "bg-amber-100 text-amber-700", icon: Truck };
    case "delivered":
      return { label: "Delivered", color: "bg-green-100 text-green-700", icon: CheckCircle };
    case "cancelled":
      return { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle };
  }
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredOrders = (status?: Order["status"]) => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesStatus = !status || order.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const renderOrderCard = (order: Order) => {
    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
      <Card key={order.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
            </div>
            <Badge className={statusConfig.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} {item.quantity > 1 && `× ${item.quantity}`}
                </span>
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {order.deliveryMethod === "pickup" ? (
                <>
                  <MapPin className="h-4 w-4" />
                  Pickup at Center
                </>
              ) : (
                <>
                  <Truck className="h-4 w-4" />
                  Delivery
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-primary-600">{formatCurrency(order.total)}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewDetails(order)}
              >
                Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {order.status === "shipped" && order.trackingNumber && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-700">
                <Truck className="h-4 w-4 inline mr-1" />
                Tracking: <span className="font-mono font-medium">{order.trackingNumber}</span>
              </p>
              {order.estimatedDelivery && (
                <p className="text-xs text-amber-600 mt-1">
                  Estimated delivery: {order.estimatedDelivery}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderOrderList = (status?: Order["status"]) => {
    const filtered = filteredOrders(status);
    if (filtered.length === 0) {
      return (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No orders found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      );
    }
    return (
      <div className="grid gap-4">
        {filtered.map(renderOrderCard)}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            My Orders
          </h1>
          <p className="text-foreground-secondary mt-1">
            Track and manage your product orders
          </p>
        </div>
        <Button asChild>
          <Link href="/shop">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-sm text-foreground-muted">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "processing").length}
            </p>
            <p className="text-sm text-foreground-muted">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {orders.filter((o) => o.status === "shipped").length}
            </p>
            <p className="text-sm text-foreground-muted">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "delivered").length}
            </p>
            <p className="text-sm text-foreground-muted">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search by order ID or product..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {renderOrderList()}
        </TabsContent>
        <TabsContent value="processing" className="mt-4">
          {renderOrderList("processing")}
        </TabsContent>
        <TabsContent value="shipped" className="mt-4">
          {renderOrderList("shipped")}
        </TabsContent>
        <TabsContent value="delivered" className="mt-4">
          {renderOrderList("delivered")}
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          {renderOrderList("cancelled")}
        </TabsContent>
      </Tabs>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Order {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Placed on {formatDate(selectedOrder.date)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className={getStatusConfig(selectedOrder.status).color}>
                  {getStatusConfig(selectedOrder.status).label}
                </Badge>
              </div>

              <Separator />

              {/* Items */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>
                    {selectedOrder.deliveryMethod === "pickup"
                      ? "Free (Pickup)"
                      : selectedOrder.total >= 20000
                        ? "Free"
                        : formatCurrency(2500)}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-1">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Delivery Info */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {selectedOrder.deliveryMethod === "pickup"
                    ? "Pickup Location"
                    : "Delivery Address"}
                </p>
                {selectedOrder.deliveryMethod === "pickup" ? (
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Radiance Wellness Center
                    </p>
                    <p className="ml-5">1 Setif Close, Wuse 2, Abuja</p>
                    <p className="flex items-center gap-1 mt-1">
                      <Phone className="h-4 w-4" />
                      +234 800 123 4567
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    {selectedOrder.deliveryAddress}
                  </p>
                )}
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Tracking</p>
                    <p className="text-sm font-mono text-primary-600">
                      {selectedOrder.trackingNumber}
                    </p>
                    {selectedOrder.estimatedDelivery && (
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated delivery: {selectedOrder.estimatedDelivery}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Order Timeline */}
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">Order Timeline</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-gray-500">{formatDate(selectedOrder.date)}</p>
                    </div>
                  </div>
                  {selectedOrder.status !== "cancelled" && (
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        ["shipped", "delivered"].includes(selectedOrder.status)
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}>
                        <Package className={`h-3 w-3 ${
                          ["shipped", "delivered"].includes(selectedOrder.status)
                            ? "text-green-600"
                            : "text-gray-400"
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Packed & Ready</p>
                        {["shipped", "delivered"].includes(selectedOrder.status) && (
                          <p className="text-xs text-gray-500">Completed</p>
                        )}
                      </div>
                    </div>
                  )}
                  {selectedOrder.deliveryMethod === "delivery" && selectedOrder.status !== "cancelled" && (
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedOrder.status === "delivered"
                          ? "bg-green-100"
                          : selectedOrder.status === "shipped"
                            ? "bg-amber-100"
                            : "bg-gray-100"
                      }`}>
                        <Truck className={`h-3 w-3 ${
                          selectedOrder.status === "delivered"
                            ? "text-green-600"
                            : selectedOrder.status === "shipped"
                              ? "text-amber-600"
                              : "text-gray-400"
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">In Transit</p>
                        {selectedOrder.status === "shipped" && (
                          <p className="text-xs text-amber-600">On the way</p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedOrder.status === "delivered"
                        ? "bg-green-100"
                        : selectedOrder.status === "cancelled"
                          ? "bg-red-100"
                          : "bg-gray-100"
                    }`}>
                      {selectedOrder.status === "cancelled" ? (
                        <XCircle className="h-3 w-3 text-red-600" />
                      ) : (
                        <CheckCircle className={`h-3 w-3 ${
                          selectedOrder.status === "delivered"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {selectedOrder.status === "cancelled"
                          ? "Cancelled"
                          : selectedOrder.deliveryMethod === "pickup"
                            ? "Ready for Pickup"
                            : "Delivered"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              {selectedOrder.status === "delivered" && (
                <Button asChild variant="outline">
                  <Link href="/shop">Buy Again</Link>
                </Button>
              )}
              <Button onClick={() => setDetailOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
