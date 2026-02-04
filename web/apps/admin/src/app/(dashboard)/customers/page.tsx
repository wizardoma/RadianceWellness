"use client";

import { useState } from "react";
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

const getMemberBadge = (tier: string | null) => {
  if (!tier) return null;
  const colors = {
    Silver: "bg-gray-100 text-gray-700",
    Gold: "bg-amber-100 text-amber-700",
    Platinum: "bg-purple-100 text-purple-700",
  };
  return <Badge className={colors[tier as keyof typeof colors]}>{tier}</Badge>;
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = mockCustomers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    );
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0))}
            </p>
            <p className="text-sm text-foreground-muted">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-600">
              {(mockCustomers.reduce((sum, c) => sum + c.rating, 0) / mockCustomers.length).toFixed(1)}
            </p>
            <p className="text-sm text-foreground-muted">Avg Rating</p>
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
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
                  <th className="text-left p-4 font-medium text-gray-600">Total Spent</th>
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
                    <td className="p-4 font-medium">
                      {formatCurrency(customer.totalSpent)}
                    </td>
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Bookings</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Add to Membership
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
    </div>
  );
}
