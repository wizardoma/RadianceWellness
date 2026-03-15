"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  RotateCcw,
  Download,
  FileText,
  Search,
  MoreVertical,
  Plus,
  X,
  CreditCard,
  Building2,
  Banknote,
  Send,
  Eye,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
type Transaction = {
  id: string;
  date: string;
  customer: string;
  description: string;
  amount: number;
  method: string;
  status: string;
};

type Invoice = {
  id: string;
  customer: string;
  items: string;
  amount: number;
  status: string;
  dueDate: string;
};

type Refund = {
  id: string;
  originalTxn: string;
  customer: string;
  amount: number;
  reason: string;
  status: string;
  date: string;
  processedBy: string;
};

// Mock transactions
const initialTransactions: Transaction[] = [
  { id: "TXN-4821", date: "2026-03-15 14:32", customer: "Ngozi Adekunle", description: "Swedish Massage (60 min)", amount: 25000, method: "Card", status: "Successful" },
  { id: "TXN-4820", date: "2026-03-15 13:15", customer: "Emeka Obi", description: "Gold Membership - March", amount: 45000, method: "Bank Transfer", status: "Successful" },
  { id: "TXN-4819", date: "2026-03-15 11:48", customer: "Fatima Bello", description: "Luxury Skincare Set", amount: 38500, method: "Card", status: "Successful" },
  { id: "TXN-4818", date: "2026-03-15 10:20", customer: "Adaora Nwachukwu", description: "Deep Tissue Massage (90 min)", amount: 38000, method: "Cash", status: "Successful" },
  { id: "TXN-4817", date: "2026-03-14 16:45", customer: "Chukwuma Okoro", description: "Hot Stone Massage (90 min)", amount: 35000, method: "Card", status: "Pending" },
  { id: "TXN-4816", date: "2026-03-14 15:10", customer: "Yetunde Afolabi", description: "Manicure & Pedicure", amount: 12000, method: "Bank Transfer", status: "Successful" },
  { id: "TXN-4815", date: "2026-03-14 12:30", customer: "Obioma Eze", description: "Platinum Membership - March", amount: 75000, method: "Card", status: "Failed" },
  { id: "TXN-4814", date: "2026-03-14 10:00", customer: "Halima Yusuf", description: "Classic Facial (45 min)", amount: 18000, method: "Cash", status: "Successful" },
  { id: "TXN-4813", date: "2026-03-13 14:20", customer: "Tunde Bakare", description: "Hammam Experience", amount: 20000, method: "Card", status: "Successful" },
  { id: "TXN-4812", date: "2026-03-13 09:45", customer: "Chidinma Okonkwo", description: "Body Butter & Essential Oil", amount: 15500, method: "Bank Transfer", status: "Pending" },
];

// Mock invoices
const initialInvoices: Invoice[] = [
  { id: "INV-1024", customer: "Ngozi Adekunle", items: "Swedish Massage, Aromatherapy Oil", amount: 31500, status: "Paid", dueDate: "2026-03-15" },
  { id: "INV-1023", customer: "Emeka Obi", items: "Gold Membership (Quarterly)", amount: 135000, status: "Paid", dueDate: "2026-03-10" },
  { id: "INV-1022", customer: "Fatima Bello", items: "Platinum Membership, Luxury Facial", amount: 110000, status: "Partial", dueDate: "2026-03-20" },
  { id: "INV-1021", customer: "Adaora Nwachukwu", items: "Deep Tissue Massage x3", amount: 108000, status: "Unpaid", dueDate: "2026-03-25" },
  { id: "INV-1020", customer: "Obioma Eze", items: "Corporate Event Package", amount: 350000, status: "Overdue", dueDate: "2026-03-01" },
  { id: "INV-1019", customer: "Halima Yusuf", items: "Classic Facial, Product Bundle", amount: 42000, status: "Paid", dueDate: "2026-03-05" },
];

// Mock refunds
const initialRefunds: Refund[] = [
  { id: "REF-301", originalTxn: "TXN-4790", customer: "Yetunde Afolabi", amount: 12000, reason: "Customer request", status: "Processed", date: "2026-03-12", processedBy: "Admin" },
  { id: "REF-300", originalTxn: "TXN-4782", customer: "Tunde Bakare", amount: 20000, reason: "Service not rendered", status: "Processed", date: "2026-03-10", processedBy: "Admin" },
  { id: "REF-299", originalTxn: "TXN-4775", customer: "Chidinma Okonkwo", amount: 8000, reason: "Duplicate payment", status: "Pending", date: "2026-03-14", processedBy: "-" },
  { id: "REF-298", originalTxn: "TXN-4768", customer: "Chukwuma Okoro", amount: 5000, reason: "Booking cancelled", status: "Rejected", date: "2026-03-08", processedBy: "Admin" },
];

// Mock settlements
const mockSettlements = [
  { id: "SET-052", period: "Mar 8 - Mar 14, 2026", totalTransactions: 87, grossAmount: 3850000, fees: 57750, netAmount: 3792250, status: "Settled" },
  { id: "SET-051", period: "Mar 1 - Mar 7, 2026", totalTransactions: 76, grossAmount: 3210000, fees: 48150, netAmount: 3161850, status: "Settled" },
  { id: "SET-050", period: "Feb 22 - Feb 28, 2026", totalTransactions: 82, grossAmount: 3580000, fees: 53700, netAmount: 3526300, status: "Settled" },
  { id: "SET-049", period: "Feb 15 - Feb 21, 2026", totalTransactions: 69, grossAmount: 2940000, fees: 44100, netAmount: 2895900, status: "Settled" },
];

const getTransactionStatusBadge = (status: string) => {
  switch (status) {
    case "Successful":
      return <Badge className="bg-green-100 text-green-700">Successful</Badge>;
    case "Pending":
      return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
    case "Failed":
      return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getInvoiceStatusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
    case "Unpaid":
      return <Badge className="bg-gray-100 text-gray-700">Unpaid</Badge>;
    case "Overdue":
      return <Badge className="bg-red-100 text-red-700">Overdue</Badge>;
    case "Partial":
      return <Badge className="bg-amber-100 text-amber-700">Partial</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getRefundStatusBadge = (status: string) => {
  switch (status) {
    case "Processed":
      return <Badge className="bg-green-100 text-green-700">Processed</Badge>;
    case "Pending":
      return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
    case "Rejected":
      return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "Card":
      return <CreditCard className="h-3 w-3" />;
    case "Bank Transfer":
      return <Building2 className="h-3 w-3" />;
    case "Cash":
      return <Banknote className="h-3 w-3" />;
    default:
      return null;
  }
};

export default function PaymentsPage() {
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [methodFilter, setMethodFilter] = useState<string | null>(null);

  // Stateful data
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [refunds, setRefunds] = useState<Refund[]>(initialRefunds);

  // Invoice dialog state
  const [invoiceCustomer, setInvoiceCustomer] = useState("");
  const [invoiceNotes, setInvoiceNotes] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<{ description: string; quantity: number; unitPrice: number }[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  // Export dialog
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportDateFrom, setExportDateFrom] = useState("");
  const [exportDateTo, setExportDateTo] = useState("");
  const [exportType, setExportType] = useState("all");
  const [exportLoading, setExportLoading] = useState(false);

  // View transaction dialog
  const [viewTxnOpen, setViewTxnOpen] = useState(false);
  const [viewingTxn, setViewingTxn] = useState<Transaction | null>(null);

  // Generate receipt state
  const [receiptTxnId, setReceiptTxnId] = useState<string | null>(null);
  const [receiptState, setReceiptState] = useState<"idle" | "generating" | "done">("idle");

  // Issue refund dialog
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundingTxn, setRefundingTxn] = useState<Transaction | null>(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");

  // View invoice dialog
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  // Send invoice state (per-invoice brief loading)
  const [sendingInvoiceId, setSendingInvoiceId] = useState<string | null>(null);
  // Download PDF state (per-invoice brief loading)
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || txn.status === statusFilter;
    const matchesMethod = !methodFilter || txn.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(" ");
    const date = new Date(datePart);
    return `${date.toLocaleDateString("en-NG", { day: "numeric", month: "short" })} ${timePart}`;
  };

  const handleAddInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveInvoiceItem = (index: number) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
    }
  };

  const handleInvoiceItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...invoiceItems];
    updated[index] = { ...updated[index], [field]: value };
    setInvoiceItems(updated);
  };

  const invoiceTotal = invoiceItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const handleGenerateInvoice = () => {
    setInvoiceDialogOpen(false);
    setInvoiceCustomer("");
    setInvoiceNotes("");
    setInvoiceDueDate("");
    setInvoiceItems([{ description: "", quantity: 1, unitPrice: 0 }]);
  };

  // Export handler
  const handleExport = () => {
    setExportLoading(true);
    setTimeout(() => {
      setExportLoading(false);
      setExportDialogOpen(false);
      setExportFormat("csv");
      setExportDateFrom("");
      setExportDateTo("");
      setExportType("all");
    }, 1500);
  };

  // Generate receipt handler
  const handleGenerateReceipt = (txnId: string) => {
    setReceiptTxnId(txnId);
    setReceiptState("generating");
    setTimeout(() => {
      setReceiptState("done");
      setTimeout(() => {
        setReceiptState("idle");
        setReceiptTxnId(null);
      }, 2000);
    }, 1500);
  };

  // Issue refund handler
  const handleIssueRefund = () => {
    if (refundingTxn && refundAmount && refundReason) {
      const newRefund: Refund = {
        id: `REF-${302 + refunds.length}`,
        originalTxn: refundingTxn.id,
        customer: refundingTxn.customer,
        amount: parseInt(refundAmount) || 0,
        reason: refundReason,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        processedBy: "-",
      };
      setRefunds((prev) => [newRefund, ...prev]);
      setRefundDialogOpen(false);
      setRefundingTxn(null);
      setRefundAmount("");
      setRefundReason("");
    }
  };

  // Send invoice handler
  const handleSendInvoice = (invoiceId: string) => {
    setSendingInvoiceId(invoiceId);
    setTimeout(() => {
      setSendingInvoiceId(null);
    }, 2000);
  };

  // Download PDF handler
  const handleDownloadPdf = (invoiceId: string) => {
    setDownloadingInvoiceId(invoiceId);
    setTimeout(() => {
      setDownloadingInvoiceId(null);
    }, 2000);
  };

  // Mark as paid handler
  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: "Paid" } : inv))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Payments & Billing
          </h1>
          <p className="text-foreground-secondary mt-1">
            Track transactions, invoices, and settlements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setInvoiceDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Invoice
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(17250000)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last period
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(3350000)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Pending Payments</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(185000)}</p>
                <p className="text-sm text-amber-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  3 awaiting confirmation
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Refunds This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(45000)}</p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  4 refund requests
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <RotateCcw className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by customer, transaction ID, or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                All Status
              </Button>
              {["Successful", "Pending", "Failed"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={methodFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setMethodFilter(null)}
              >
                All Methods
              </Button>
              {["Card", "Bank Transfer", "Cash"].map((method) => (
                <Button
                  key={method}
                  variant={methodFilter === method ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMethodFilter(method)}
                >
                  {method}
                </Button>
              ))}
            </div>
          </div>

          {/* Receipt notification */}
          {receiptTxnId && (
            <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg text-sm">
              {receiptState === "generating" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                  <span className="text-primary-700">Generating receipt for {receiptTxnId}...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-700">Receipt generated for {receiptTxnId}</span>
                </>
              )}
            </div>
          )}

          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Transaction ID</th>
                      <th className="text-left p-4 font-medium text-gray-600">Date/Time</th>
                      <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left p-4 font-medium text-gray-600">Description</th>
                      <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-4 font-medium text-gray-600">Method</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono text-sm font-medium">{txn.id}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{formatDateTime(txn.date)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-[10px] font-medium text-primary-700">
                                {txn.customer.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <span className="text-sm font-medium">{txn.customer}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 max-w-[200px] truncate">{txn.description}</td>
                        <td className="p-4 text-right font-medium">{formatCurrency(txn.amount)}</td>
                        <td className="p-4">
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            {getMethodIcon(txn.method)}
                            {txn.method}
                          </span>
                        </td>
                        <td className="p-4">{getTransactionStatusBadge(txn.status)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => { setViewingTxn(txn); setViewTxnOpen(true); }}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleGenerateReceipt(txn.id)}>
                                <FileText className="h-4 w-4 mr-2" />
                                Generate Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { setRefundingTxn(txn); setRefundAmount(String(txn.amount)); setRefundReason(""); setRefundDialogOpen(true); }}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Issue Refund
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

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="mt-6">
          {/* Send/download notifications */}
          {sendingInvoiceId && (
            <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg text-sm mb-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              <span className="text-primary-700">Sending invoice {sendingInvoiceId} to customer...</span>
            </div>
          )}
          {downloadingInvoiceId && (
            <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg text-sm mb-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              <span className="text-primary-700">Downloading PDF for {downloadingInvoiceId}...</span>
            </div>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Invoice #</th>
                      <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left p-4 font-medium text-gray-600">Items</th>
                      <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Due Date</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono text-sm font-medium">{invoice.id}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-[10px] font-medium text-primary-700">
                                {invoice.customer.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <span className="text-sm font-medium">{invoice.customer}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 max-w-[200px] truncate">{invoice.items}</td>
                        <td className="p-4 text-right font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="p-4">{getInvoiceStatusBadge(invoice.status)}</td>
                        <td className="p-4 text-sm text-gray-600">{formatDate(invoice.dueDate)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => { setViewingInvoice(invoice); setViewInvoiceOpen(true); }}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendInvoice(invoice.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                Send to Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadPdf(invoice.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              {invoice.status !== "Paid" && (
                                <DropdownMenuItem onClick={() => handleMarkAsPaid(invoice.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Paid
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

        {/* Refunds Tab */}
        <TabsContent value="refunds" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Refund ID</th>
                      <th className="text-left p-4 font-medium text-gray-600">Original Transaction</th>
                      <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                      <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left p-4 font-medium text-gray-600">Reason</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Date</th>
                      <th className="text-left p-4 font-medium text-gray-600">Processed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refunds.map((refund) => (
                      <tr key={refund.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono text-sm font-medium">{refund.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-sm text-gray-600">{refund.originalTxn}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-[10px] font-medium text-primary-700">
                                {refund.customer.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <span className="text-sm font-medium">{refund.customer}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium text-red-600">
                          -{formatCurrency(refund.amount)}
                        </td>
                        <td className="p-4 text-sm text-gray-600">{refund.reason}</td>
                        <td className="p-4">{getRefundStatusBadge(refund.status)}</td>
                        <td className="p-4 text-sm text-gray-600">{formatDate(refund.date)}</td>
                        <td className="p-4 text-sm text-gray-600">{refund.processedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settlements Tab */}
        <TabsContent value="settlements" className="mt-6 space-y-6">
          {/* Paystack Fee Breakdown */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Paystack Fee Structure</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Local transactions: 1.5% + NGN 100 (capped at NGN 2,000). International transactions: 3.9% + NGN 100.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settlement Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {mockSettlements.map((settlement) => (
              <Card key={settlement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-mono text-sm text-gray-500">{settlement.id}</p>
                      <p className="font-semibold text-gray-900">{settlement.period}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">{settlement.status}</Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Transactions</span>
                      <span className="font-medium">{settlement.totalTransactions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Gross Amount</span>
                      <span className="font-medium">{formatCurrency(settlement.grossAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Paystack Fees</span>
                      <span className="font-medium text-red-600">-{formatCurrency(settlement.fees)}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Net Amount</span>
                      <span className="text-lg font-bold text-green-700">{formatCurrency(settlement.netAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Generate Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a customer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="invoiceCustomer">Customer</Label>
              <Input
                id="invoiceCustomer"
                placeholder="Search customer name..."
                value={invoiceCustomer}
                onChange={(e) => setInvoiceCustomer(e.target.value)}
                className="mt-1"
              />
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Line Items</Label>
                <Button variant="outline" size="sm" onClick={handleAddInvoiceItem}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {invoiceItems.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleInvoiceItemChange(index, "description", e.target.value)}
                      />
                      <div className="flex gap-2">
                        <div className="w-20">
                          <Input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity || ""}
                            onChange={(e) => handleInvoiceItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="Unit Price"
                            value={item.unitPrice || ""}
                            onChange={(e) => handleInvoiceItemChange(index, "unitPrice", parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-700 min-w-[80px] justify-end">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </div>
                      </div>
                    </div>
                    {invoiceItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 mt-1"
                        onClick={() => handleRemoveInvoiceItem(index)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {invoiceTotal > 0 && (
                <div className="flex items-center justify-between mt-3 p-3 bg-primary-50 rounded-lg">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-lg font-bold text-primary-700">{formatCurrency(invoiceTotal)}</span>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <Label htmlFor="invoiceDueDate">Due Date</Label>
              <Input
                id="invoiceDueDate"
                type="date"
                value={invoiceDueDate}
                onChange={(e) => setInvoiceDueDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="invoiceNotes">Notes</Label>
              <Input
                id="invoiceNotes"
                placeholder="Optional notes for the customer..."
                value={invoiceNotes}
                onChange={(e) => setInvoiceNotes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateInvoice}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Transactions</DialogTitle>
            <DialogDescription>
              Configure and download a report of your transactions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exportDateFrom">Date From</Label>
                <Input id="exportDateFrom" type="date" className="mt-1.5" value={exportDateFrom} onChange={(e) => setExportDateFrom(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="exportDateTo">Date To</Label>
                <Input id="exportDateTo" type="date" className="mt-1.5" value={exportDateTo} onChange={(e) => setExportDateTo(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Transaction Type</Label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="successful">Successful Only</SelectItem>
                  <SelectItem value="pending">Pending Only</SelectItem>
                  <SelectItem value="failed">Failed Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>Cancel</Button>
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

      {/* View Transaction Details Dialog */}
      <Dialog open={viewTxnOpen} onOpenChange={setViewTxnOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Full details for this transaction.</DialogDescription>
          </DialogHeader>
          {viewingTxn && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-medium">{viewingTxn.id}</span>
                {getTransactionStatusBadge(viewingTxn.status)}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Date/Time</span>
                  <p className="font-medium">{viewingTxn.date}</p>
                </div>
                <div>
                  <span className="text-gray-500">Customer</span>
                  <p className="font-medium">{viewingTxn.customer}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Description</span>
                  <p className="font-medium">{viewingTxn.description}</p>
                </div>
                <div>
                  <span className="text-gray-500">Amount</span>
                  <p className="font-bold text-primary-600">{formatCurrency(viewingTxn.amount)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method</span>
                  <p className="font-medium flex items-center gap-1">{getMethodIcon(viewingTxn.method)} {viewingTxn.method}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <div className="mt-0.5">{getTransactionStatusBadge(viewingTxn.status)}</div>
                </div>
                <div>
                  <span className="text-gray-500">Reference</span>
                  <p className="font-mono text-xs">{viewingTxn.id}-{viewingTxn.date.replace(/[\s:-]/g, "")}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewTxnOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Issue Refund Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Refund</DialogTitle>
            <DialogDescription>
              Process a refund for transaction {refundingTxn?.id}.
            </DialogDescription>
          </DialogHeader>
          {refundingTxn && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-medium">{refundingTxn.customer}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-gray-500">Original Amount</span>
                  <span className="font-medium">{formatCurrency(refundingTxn.amount)}</span>
                </div>
              </div>
              <div>
                <Label htmlFor="refundAmount">Refund Amount (&#8358;)</Label>
                <Input
                  id="refundAmount"
                  type="number"
                  className="mt-1.5"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                />
              </div>
              <div>
                <Label>Reason</Label>
                <Select value={refundReason} onValueChange={setRefundReason}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer request">Customer request</SelectItem>
                    <SelectItem value="Service not rendered">Service not rendered</SelectItem>
                    <SelectItem value="Duplicate payment">Duplicate payment</SelectItem>
                    <SelectItem value="Booking cancelled">Booking cancelled</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleIssueRefund} disabled={!refundAmount || !refundReason}>
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={viewInvoiceOpen} onOpenChange={setViewInvoiceOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>Invoice {viewingInvoice?.id}</DialogDescription>
          </DialogHeader>
          {viewingInvoice && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-medium">{viewingInvoice.id}</span>
                {getInvoiceStatusBadge(viewingInvoice.status)}
              </div>
              <Separator />
              <div>
                <span className="text-sm text-gray-500">Customer</span>
                <p className="font-medium">{viewingInvoice.customer}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Line Items</span>
                <div className="bg-gray-50 rounded-lg p-3 mt-1 space-y-2">
                  {viewingInvoice.items.split(", ").map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item}</span>
                      <span className="font-medium text-gray-600">
                        {formatCurrency(Math.round(viewingInvoice.amount / viewingInvoice.items.split(", ").length))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Total</span>
                <span className="text-lg font-bold text-primary-700">{formatCurrency(viewingInvoice.amount)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Due Date</span>
                  <p className="font-medium">{formatDate(viewingInvoice.dueDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <div className="mt-0.5">{getInvoiceStatusBadge(viewingInvoice.status)}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewInvoiceOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
