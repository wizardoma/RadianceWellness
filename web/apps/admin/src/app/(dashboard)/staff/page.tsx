"use client";

import { Search, Plus, Mail, Phone, Calendar, Star, MoreVertical } from "lucide-react";
import { Button, Card, CardContent, Input, Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radiance/ui";

const mockStaff = [
  { id: "S001", name: "Chidi Eze", role: "Senior Therapist", email: "chidi@radiancewellness.com", phone: "+234 812 345 6789", specialties: ["Swedish Massage", "Deep Tissue", "Hot Stone"], rating: 4.9, bookingsThisMonth: 48, status: "active" },
  { id: "S002", name: "Fatima Mohammed", role: "Therapist", email: "fatima@radiancewellness.com", phone: "+234 803 456 7890", specialties: ["Hammam", "Body Scrubs"], rating: 4.8, bookingsThisMonth: 36, status: "active" },
  { id: "S003", name: "Amina Bello", role: "Beauty Specialist", email: "amina@radiancewellness.com", phone: "+234 805 234 5678", specialties: ["Facials", "Skincare"], rating: 4.7, bookingsThisMonth: 42, status: "active" },
  { id: "S004", name: "Grace Okafor", role: "Nail Technician", email: "grace@radiancewellness.com", phone: "+234 807 654 3210", specialties: ["Manicure", "Pedicure", "Nail Art"], rating: 4.9, bookingsThisMonth: 55, status: "active" },
  { id: "S005", name: "Emeka Nwosu", role: "Fitness Trainer", email: "emeka@radiancewellness.com", phone: "+234 811 987 6543", specialties: ["Personal Training", "Yoga"], rating: 4.6, bookingsThisMonth: 30, status: "active" },
  { id: "S006", name: "Blessing Adeyemi", role: "Receptionist", email: "blessing@radiancewellness.com", phone: "+234 814 321 0987", specialties: [], rating: null, bookingsThisMonth: null, status: "active" },
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Staff Management
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your team members
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{mockStaff.length}</p>
            <p className="text-sm text-foreground-muted">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {mockStaff.filter(s => s.status === "active").length}
            </p>
            <p className="text-sm text-foreground-muted">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-600">
              {mockStaff.filter(s => s.bookingsThisMonth).reduce((sum, s) => sum + (s.bookingsThisMonth || 0), 0)}
            </p>
            <p className="text-sm text-foreground-muted">Bookings This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {(mockStaff.filter(s => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0) / mockStaff.filter(s => s.rating).length).toFixed(1)}
            </p>
            <p className="text-sm text-foreground-muted">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input placeholder="Search staff..." className="pl-10" />
      </div>

      {/* Staff Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStaff.map((staff) => (
          <Card key={staff.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary-700">
                      {staff.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{staff.name}</h3>
                    <p className="text-sm text-foreground-muted">{staff.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {staff.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {staff.phone}
                </div>
              </div>

              {staff.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {staff.specialties.slice(0, 3).map((specialty, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {staff.specialties.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{staff.specialties.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                {staff.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{staff.rating}</span>
                  </div>
                )}
                {staff.bookingsThisMonth && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{staff.bookingsThisMonth} bookings</span>
                  </div>
                )}
                <Badge className="bg-green-100 text-green-700">{staff.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
