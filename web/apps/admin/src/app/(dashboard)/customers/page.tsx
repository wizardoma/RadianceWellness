"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/application/user/user.store";
import { useCustomersStore } from "@/application/customers/customers.store";
import {
  type Customer,
  type CreateCustomerPayload,
  type UpdateCustomerPayload,
  CUSTOMER_STATUS,
  getCustomerStatusLabel,
  getRegistrationSourceLabel,
} from "@/infrastructure/api/customers.client";
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MoreVertical,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Checkbox,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radiance/ui";

const getStatusBadge = (status: string) => {
  const colors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    BLACKLISTED: "bg-red-100 text-red-700",
  };
  return <Badge className={colors[status] ?? "bg-gray-100 text-gray-700"}>{getCustomerStatusLabel(status)}</Badge>;
};

const emptyCustomerForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  notes: "",
  emailOptIn: true,
  smsOptIn: true,
  whatsappOptIn: false,
};

export default function CustomersPage() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const userRole: "admin" | "staff" = profile?.role?.toLowerCase() === "staff" ? "staff" : "admin";

  const {
    customers,
    totalElements,
    isLoading,
    isSaving,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    clearError,
  } = useCustomersStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Add Customer dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [customerForm, setCustomerForm] = useState(emptyCustomerForm);

  // Filter popover
  const [filterOpen, setFilterOpen] = useState(false);

  // View Profile dialog
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Edit Customer dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState(emptyCustomerForm);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Send Email dialog
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ to: "", subject: "", message: "" });

  // Fetch on mount and when filters change
  const loadCustomers = useCallback(() => {
    fetchCustomers({
      status: filterStatus !== "All" ? filterStatus : undefined,
      search: searchQuery || undefined,
    });
  }, [fetchCustomers, filterStatus, searchQuery]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  // Debounced search
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        fetchCustomers({
          status: filterStatus !== "All" ? filterStatus : undefined,
          search: value || undefined,
        });
      }, 400)
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  };

  // ── Add Customer ─────────────────────────────────────────────────
  const handleAddCustomer = async () => {
    clearError();
    const payload: CreateCustomerPayload = {
      firstName: customerForm.firstName,
      lastName: customerForm.lastName,
      email: customerForm.email,
      phone: customerForm.phone,
      gender: customerForm.gender || undefined,
      dateOfBirth: customerForm.dateOfBirth || undefined,
      notes: customerForm.notes || undefined,
      emailOptIn: customerForm.emailOptIn,
      smsOptIn: customerForm.smsOptIn,
      whatsappOptIn: customerForm.whatsappOptIn,
    };

    const success = await createCustomer(payload);
    if (success) {
      setCustomerForm(emptyCustomerForm);
      setAddDialogOpen(false);
    }
  };

  // ── View Profile ─────────────────────────────────────────────────
  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setProfileDialogOpen(true);
  };

  // ── Edit Customer ────────────────────────────────────────────────
  const handleOpenEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      dateOfBirth: customer.dateOfBirth ?? "",
      gender: customer.gender ?? "",
      notes: customer.notes ?? "",
      emailOptIn: customer.emailOptIn,
      smsOptIn: customer.smsOptIn,
      whatsappOptIn: customer.whatsappOptIn,
    });
    setEditDialogOpen(true);
  };

  const handleEditCustomer = async () => {
    if (!selectedCustomer) return;
    clearError();
    const payload: UpdateCustomerPayload = {
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      phone: editForm.phone,
      gender: editForm.gender || undefined,
      dateOfBirth: editForm.dateOfBirth || undefined,
      notes: editForm.notes || undefined,
      emailOptIn: editForm.emailOptIn,
      smsOptIn: editForm.smsOptIn,
      whatsappOptIn: editForm.whatsappOptIn,
    };

    const success = await updateCustomer(selectedCustomer.id, payload);
    if (success) {
      setEditDialogOpen(false);
    }
  };

  // ── Delete Customer ──────────────────────────────────────────────
  const handleOpenDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer) return;
    const success = await deleteCustomer(selectedCustomer.id);
    if (success) {
      setDeleteDialogOpen(false);
      setSelectedCustomer(null);
    }
  };

  // ── Send Email ───────────────────────────────────────────────────
  const handleSendEmail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEmailForm({ to: customer.email, subject: "", message: "" });
    setEmailDialogOpen(true);
  };

  const handleClearFilters = () => {
    setFilterStatus("All");
  };

  const activeCount = customers.filter((c) => c.status === "ACTIVE").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Customers
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your customer database
          </p>
        </div>
        {userRole === "admin" && (
          <Button onClick={() => { clearError(); setCustomerForm(emptyCustomerForm); setAddDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{totalElements}</p>
            <p className="text-sm text-foreground-muted">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            <p className="text-sm text-foreground-muted">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-600">
              {customers.filter((c) => c.registrationSource === "WALK_IN").length}
            </p>
            <p className="text-sm text-foreground-muted">Walk-ins</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {filterStatus !== "All" && (
                <Badge className="ml-2 bg-primary-100 text-primary-700 text-xs">Active</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Filter Customers</h4>
              <div className="space-y-2">
                <Label className="text-sm">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {CUSTOMER_STATUS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button size="sm" className="flex-1" onClick={() => setFilterOpen(false)}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No customers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left p-4 font-medium text-gray-600">Contact</th>
                    <th className="text-left p-4 font-medium text-gray-600">Status</th>
                    <th className="text-left p-4 font-medium text-gray-600">Source</th>
                    <th className="text-left p-4 font-medium text-gray-600">Joined</th>
                    <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-700">
                              {customer.firstName[0]}{customer.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm flex items-center gap-1 text-gray-600">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="text-sm flex items-center gap-1 text-gray-600">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(customer.status)}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {customer.registrationSource ? getRegistrationSourceLabel(customer.registrationSource) : "—"}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {formatDate(customer.createdAt)}
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(customer)}>
                              View Profile
                            </DropdownMenuItem>
                            {userRole === "admin" && (
                              <DropdownMenuItem onClick={() => handleOpenEdit(customer)}>
                                Edit Customer
                              </DropdownMenuItem>
                            )}
                            {userRole === "admin" && (
                              <DropdownMenuItem onClick={() => handleSendEmail(customer)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => window.open(`tel:${customer.phone.replace(/\s/g, "")}`)}>
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </DropdownMenuItem>
                            {userRole === "admin" && (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleOpenDelete(customer)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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
          )}
        </CardContent>
      </Card>

      {/* ── Add Customer Dialog ──────────────────────────────────────── */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Enter the walk-in customer details below.</DialogDescription>
          </DialogHeader>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-firstName">First Name *</Label>
                <Input
                  id="add-firstName"
                  value={customerForm.firstName}
                  onChange={(e) => setCustomerForm({ ...customerForm, firstName: e.target.value })}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-lastName">Last Name *</Label>
                <Input
                  id="add-lastName"
                  value={customerForm.lastName}
                  onChange={(e) => setCustomerForm({ ...customerForm, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-email">Email *</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={customerForm.email}
                  onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-phone">Phone *</Label>
                <Input
                  id="add-phone"
                  value={customerForm.phone}
                  onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-dob">Date of Birth</Label>
                <Input
                  id="add-dob"
                  type="date"
                  value={customerForm.dateOfBirth}
                  onChange={(e) => setCustomerForm({ ...customerForm, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-gender">Gender</Label>
                <Select
                  value={customerForm.gender}
                  onValueChange={(value) => setCustomerForm({ ...customerForm, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Communication Preferences</Label>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="add-commEmail"
                    checked={customerForm.emailOptIn}
                    onCheckedChange={(checked) =>
                      setCustomerForm({ ...customerForm, emailOptIn: checked === true })
                    }
                  />
                  <Label htmlFor="add-commEmail" className="text-sm font-normal">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="add-commSMS"
                    checked={customerForm.smsOptIn}
                    onCheckedChange={(checked) =>
                      setCustomerForm({ ...customerForm, smsOptIn: checked === true })
                    }
                  />
                  <Label htmlFor="add-commSMS" className="text-sm font-normal">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="add-commWhatsApp"
                    checked={customerForm.whatsappOptIn}
                    onCheckedChange={(checked) =>
                      setCustomerForm({ ...customerForm, whatsappOptIn: checked === true })
                    }
                  />
                  <Label htmlFor="add-commWhatsApp" className="text-sm font-normal">WhatsApp</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-notes">Notes</Label>
              <Textarea
                id="add-notes"
                value={customerForm.notes}
                onChange={(e) => setCustomerForm({ ...customerForm, notes: e.target.value })}
                placeholder="Any additional notes about the customer..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCustomer} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Customer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View Profile Dialog ──────────────────────────────────────── */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>Full details for this customer.</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6 py-4">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-700">
                    {selectedCustomer.firstName[0]}{selectedCustomer.lastName[0]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </h3>
                    {getStatusBadge(selectedCustomer.status)}
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {selectedCustomer.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {selectedCustomer.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Registration</p>
                  <p className="text-sm font-medium">
                    {selectedCustomer.registrationSource ? getRegistrationSourceLabel(selectedCustomer.registrationSource) : "—"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium">{formatDate(selectedCustomer.createdAt)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Email Verified</p>
                  <p className="text-sm font-medium">{selectedCustomer.emailVerified ? "Yes" : "No"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedCustomer.gender?.toLowerCase().replace(/_/g, " ") ?? "—"}
                  </p>
                </div>
                {selectedCustomer.dateOfBirth && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm font-medium">{formatDate(selectedCustomer.dateOfBirth)}</p>
                  </div>
                )}
                {(selectedCustomer.address || selectedCustomer.city || selectedCustomer.state) && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">
                      {[selectedCustomer.address, selectedCustomer.city, selectedCustomer.state].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Communication Preferences */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Communication Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className={selectedCustomer.emailOptIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                    Email {selectedCustomer.emailOptIn ? "On" : "Off"}
                  </Badge>
                  <Badge className={selectedCustomer.smsOptIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                    SMS {selectedCustomer.smsOptIn ? "On" : "Off"}
                  </Badge>
                  <Badge className={selectedCustomer.whatsappOptIn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                    WhatsApp {selectedCustomer.whatsappOptIn ? "On" : "Off"}
                  </Badge>
                </div>
              </div>

              {/* Tags */}
              {selectedCustomer.tags && selectedCustomer.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.tags.map((tag) => (
                      <Badge key={tag} className="bg-primary-100 text-primary-700">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedCustomer.notes && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Notes</h4>
                  <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>Close</Button>
            {userRole === "admin" && selectedCustomer && (
              <Button onClick={() => { setProfileDialogOpen(false); handleOpenEdit(selectedCustomer); }}>
                Edit Customer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Customer Dialog ─────────────────────────────────────── */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update customer information.</DialogDescription>
          </DialogHeader>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input
                  id="edit-firstName"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input
                  id="edit-lastName"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dob">Date of Birth</Label>
                <Input
                  id="edit-dob"
                  type="date"
                  value={editForm.dateOfBirth}
                  onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gender">Gender</Label>
                <Select
                  value={editForm.gender}
                  onValueChange={(value) => setEditForm({ ...editForm, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Communication Preferences</Label>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="edit-commEmail"
                    checked={editForm.emailOptIn}
                    onCheckedChange={(checked) =>
                      setEditForm({ ...editForm, emailOptIn: checked === true })
                    }
                  />
                  <Label htmlFor="edit-commEmail" className="text-sm font-normal">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="edit-commSMS"
                    checked={editForm.smsOptIn}
                    onCheckedChange={(checked) =>
                      setEditForm({ ...editForm, smsOptIn: checked === true })
                    }
                  />
                  <Label htmlFor="edit-commSMS" className="text-sm font-normal">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="edit-commWhatsApp"
                    checked={editForm.whatsappOptIn}
                    onCheckedChange={(checked) =>
                      setEditForm({ ...editForm, whatsappOptIn: checked === true })
                    }
                  />
                  <Label htmlFor="edit-commWhatsApp" className="text-sm font-normal">WhatsApp</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="Any additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCustomer} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ───────────────────────────────── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedCustomer?.firstName} {selectedCustomer?.lastName}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleDeleteCustomer}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Customer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Send Email Dialog ────────────────────────────────────────── */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Compose an email to {selectedCustomer?.firstName} {selectedCustomer?.lastName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emailTo">To</Label>
              <Input id="emailTo" value={emailForm.to} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailSubject">Subject</Label>
              <Input
                id="emailSubject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                placeholder="Email subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailMessage">Message</Label>
              <Textarea
                id="emailMessage"
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                placeholder="Write your message..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setEmailDialogOpen(false)}>
              <Mail className="mr-2 h-4 w-4" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
