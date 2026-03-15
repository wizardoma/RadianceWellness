"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MoreVertical,
  Calendar,
  CreditCard,
  Star,
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
import { formatCurrency } from "@radiance/utils";

// Mock customers
const mockCustomers = [
  { id: "C001", name: "Ngozi Adekunle", email: "ngozi@email.com", phone: "+234 812 345 6789", totalSpent: 485000, visits: 24, lastVisit: "2026-02-04", memberTier: "Gold", rating: 4.9 },
  { id: "C002", name: "Emeka Obi", email: "emeka@email.com", phone: "+234 809 876 5432", totalSpent: 320000, visits: 15, lastVisit: "2026-02-04", memberTier: "Silver", rating: 4.7 },
  { id: "C003", name: "Fatima Bello", email: "fatima@email.com", phone: "+234 803 456 7890", totalSpent: 680000, visits: 32, lastVisit: "2026-02-04", memberTier: "Platinum", rating: 5.0 },
  { id: "C004", name: "Adaora Nwachukwu", email: "adaora@email.com", phone: "+234 805 234 5678", totalSpent: 85000, visits: 4, lastVisit: "2026-02-04", memberTier: null, rating: 4.5 },
  { id: "C005", name: "Chukwuma Okoro", email: "chukwuma@email.com", phone: "+234 811 987 6543", totalSpent: 245000, visits: 12, lastVisit: "2026-02-03", memberTier: "Silver", rating: 4.8 },
  { id: "C006", name: "Yetunde Afolabi", email: "yetunde@email.com", phone: "+234 807 654 3210", totalSpent: 156000, visits: 8, lastVisit: "2026-02-02", memberTier: null, rating: 4.6 },
  { id: "C007", name: "Obioma Eze", email: "obioma@email.com", phone: "+234 814 321 0987", totalSpent: 520000, visits: 28, lastVisit: "2026-02-01", memberTier: "Gold", rating: 4.9 },
  { id: "C008", name: "Halima Yusuf", email: "halima@email.com", phone: "+234 802 109 8765", totalSpent: 98000, visits: 5, lastVisit: "2026-01-30", memberTier: null, rating: 4.4 },
];

type Customer = typeof mockCustomers[number];

const getMemberBadge = (tier: string | null) => {
  if (!tier) return null;
  const colors = {
    Silver: "bg-gray-100 text-gray-700",
    Gold: "bg-amber-100 text-amber-700",
    Platinum: "bg-purple-100 text-purple-700",
  };
  return <Badge className={colors[tier as keyof typeof colors]}>{tier}</Badge>;
};

const emptyCustomerForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  membershipTier: "None",
  commEmail: false,
  commSMS: false,
  commWhatsApp: false,
  notes: "",
};

export default function CustomersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "staff">("admin");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "admin" | "staff";
    if (role) setUserRole(role);
  }, []);

  // Add Customer dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [customerForm, setCustomerForm] = useState(emptyCustomerForm);

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterMembership, setFilterMembership] = useState("All");
  const [filterLastVisit, setFilterLastVisit] = useState("All");

  // View Profile dialog
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Send Email dialog
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ to: "", subject: "", message: "" });

  // Add to Membership dialog
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [selectedMembershipTier, setSelectedMembershipTier] = useState("Silver");

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    let matchesMembership = true;
    if (filterMembership === "Non-member") {
      matchesMembership = customer.memberTier === null;
    } else if (filterMembership !== "All") {
      matchesMembership = customer.memberTier === filterMembership;
    }

    let matchesVisit = true;
    if (filterLastVisit !== "All") {
      const now = new Date();
      const lastVisit = new Date(customer.lastVisit);
      const diffDays = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
      if (filterLastVisit === "7") matchesVisit = diffDays <= 7;
      else if (filterLastVisit === "30") matchesVisit = diffDays <= 30;
      else if (filterLastVisit === "90") matchesVisit = diffDays <= 90;
    }

    return matchesSearch && matchesMembership && matchesVisit;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddCustomer = () => {
    // In a real app this would call an API
    setCustomerForm(emptyCustomerForm);
    setAddDialogOpen(false);
  };

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setProfileDialogOpen(true);
  };

  const handleSendEmail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEmailForm({ to: customer.email, subject: "", message: "" });
    setEmailDialogOpen(true);
  };

  const handleAddToMembership = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedMembershipTier("Silver");
    setMembershipDialogOpen(true);
  };

  const handleClearFilters = () => {
    setFilterMembership("All");
    setFilterLastVisit("All");
  };

  // Mock recent bookings for profile view
  const mockRecentBookings = [
    { id: "B001", service: "Swedish Massage", date: "2026-02-04", amount: 35000, status: "Completed" },
    { id: "B002", service: "Signature Facial", date: "2026-01-28", amount: 20000, status: "Completed" },
    { id: "B003", service: "Hot Stone Massage", date: "2026-01-15", amount: 45000, status: "Completed" },
  ];

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
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-2 ${userRole === "admin" ? "sm:grid-cols-4" : "sm:grid-cols-2"} gap-4`}>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{mockCustomers.length}</p>
            <p className="text-sm text-foreground-muted">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {mockCustomers.filter(c => c.memberTier).length}
            </p>
            <p className="text-sm text-foreground-muted">Members</p>
          </CardContent>
        </Card>
        {userRole === "admin" && (
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
              <p className="text-sm text-foreground-muted">Total Revenue</p>
            </CardContent>
          </Card>
        )}
        {userRole === "admin" && (
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">
                {(mockCustomers.reduce((sum, c) => sum + c.rating, 0) / mockCustomers.length).toFixed(1)}
              </p>
              <p className="text-sm text-foreground-muted">Avg Rating</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {(filterMembership !== "All" || filterLastVisit !== "All") && (
                <Badge className="ml-2 bg-primary-100 text-primary-700 text-xs">Active</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Filter Customers</h4>
              <div className="space-y-2">
                <Label className="text-sm">Membership</Label>
                <Select value={filterMembership} onValueChange={setFilterMembership}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                    <SelectItem value="Non-member">Non-member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Last Visit</Label>
                <Select value={filterLastVisit} onValueChange={setFilterLastVisit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
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

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-600">Contact</th>
                  <th className="text-left p-4 font-medium text-gray-600">Membership</th>
                  <th className="text-left p-4 font-medium text-gray-600">Visits</th>
                  {userRole === "admin" && (
                    <th className="text-left p-4 font-medium text-gray-600">Total Spent</th>
                  )}
                  <th className="text-left p-4 font-medium text-gray-600">Last Visit</th>
                  <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {customer.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {customer.rating}
                          </div>
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
                      {getMemberBadge(customer.memberTier) || (
                        <span className="text-gray-400 text-sm">Non-member</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {customer.visits}
                      </div>
                    </td>
                    {userRole === "admin" && (
                      <td className="p-4 font-medium">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                    )}
                    <td className="p-4 text-gray-500">
                      {formatDate(customer.lastVisit)}
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
                          <DropdownMenuItem onClick={() => router.push("/bookings")}>
                            View Bookings
                          </DropdownMenuItem>
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
                            <DropdownMenuItem onClick={() => handleAddToMembership(customer)}>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Add to Membership
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

      {/* Add Customer Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Enter the customer details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={customerForm.firstName}
                  onChange={(e) => setCustomerForm({ ...customerForm, firstName: e.target.value })}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={customerForm.lastName}
                  onChange={(e) => setCustomerForm({ ...customerForm, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerForm.email}
                  onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={customerForm.phone}
                  onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={customerForm.dateOfBirth}
                  onChange={(e) => setCustomerForm({ ...customerForm, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={customerForm.gender}
                  onValueChange={(value) => setCustomerForm({ ...customerForm, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipTier">Membership Tier</Label>
              <Select
                value={customerForm.membershipTier}
                onValueChange={(value) => setCustomerForm({ ...customerForm, membershipTier: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>Communication Preferences</Label>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="commEmail"
                    checked={customerForm.commEmail}
                    onCheckedChange={(checked) =>
                      setCustomerForm({ ...customerForm, commEmail: checked === true })
                    }
                  />
                  <Label htmlFor="commEmail" className="text-sm font-normal">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="commSMS"
                    checked={customerForm.commSMS}
                    onCheckedChange={(checked) =>
                      setCustomerForm({ ...customerForm, commSMS: checked === true })
                    }
                  />
                  <Label htmlFor="commSMS" className="text-sm font-normal">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="commWhatsApp"
                    checked={customerForm.commWhatsApp}
                    onCheckedChange={(checked) =>
                      setCustomerForm({ ...customerForm, commWhatsApp: checked === true })
                    }
                  />
                  <Label htmlFor="commWhatsApp" className="text-sm font-normal">WhatsApp</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={customerForm.notes}
                onChange={(e) => setCustomerForm({ ...customerForm, notes: e.target.value })}
                placeholder="Any additional notes about the customer..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCustomer}>Save Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Profile Dialog */}
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
                    {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    {getMemberBadge(selectedCustomer.memberTier)}
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

              {/* Stats Row */}
              <div className={`grid ${userRole === "admin" ? "grid-cols-4" : "grid-cols-2"} gap-3`}>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{selectedCustomer.visits}</p>
                  <p className="text-xs text-gray-500">Total Bookings</p>
                </div>
                {userRole === "admin" && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-600">{formatCurrency(selectedCustomer.totalSpent)}</p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </div>
                )}
                {userRole === "admin" && (
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-primary-600">
                      {selectedCustomer.visits > 0 ? formatCurrency(Math.round(selectedCustomer.totalSpent / selectedCustomer.visits)) : formatCurrency(0)}
                    </p>
                    <p className="text-xs text-gray-500">Avg Booking</p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{formatDate(selectedCustomer.lastVisit)}</p>
                  <p className="text-xs text-gray-500">Last Visit</p>
                </div>
              </div>

              {/* Recent Bookings */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-3">Recent Bookings</h4>
                <div className="space-y-2">
                  {mockRecentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{booking.service}</p>
                        <p className="text-xs text-gray-500">{formatDate(booking.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{formatCurrency(booking.amount)}</p>
                        <Badge className="bg-green-100 text-green-700 text-xs">{booking.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Notes</h4>
                <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  Loyal customer. Prefers afternoon appointments. Allergic to lavender essential oils.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Compose an email to {selectedCustomer?.name}.
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

      {/* Add to Membership Dialog */}
      <Dialog open={membershipDialogOpen} onOpenChange={setMembershipDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Membership</DialogTitle>
            <DialogDescription>
              Select a membership tier for {selectedCustomer?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Membership Tier</Label>
              <Select value={selectedMembershipTier} onValueChange={setSelectedMembershipTier}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                This will assign <strong>{selectedCustomer?.name}</strong> to the{" "}
                <strong>{selectedMembershipTier}</strong> membership tier. The customer will be
                notified of their new membership benefits.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMembershipDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setMembershipDialogOpen(false)}>Confirm Membership</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
