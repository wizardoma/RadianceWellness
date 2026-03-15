"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Mail, Phone, Calendar, Star, MoreVertical } from "lucide-react";
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
} from "@radiance/ui";

const initialMockStaff = [
  { id: "S001", name: "Chidi Eze", role: "Senior Therapist", email: "chidi@radiancewellness.com", phone: "+234 812 345 6789", specialties: ["Swedish Massage", "Deep Tissue", "Hot Stone"], rating: 4.9, bookingsThisMonth: 48, status: "active" },
  { id: "S002", name: "Fatima Mohammed", role: "Therapist", email: "fatima@radiancewellness.com", phone: "+234 803 456 7890", specialties: ["Hammam", "Body Scrubs"], rating: 4.8, bookingsThisMonth: 36, status: "active" },
  { id: "S003", name: "Amina Bello", role: "Beauty Specialist", email: "amina@radiancewellness.com", phone: "+234 805 234 5678", specialties: ["Facials", "Skincare"], rating: 4.7, bookingsThisMonth: 42, status: "active" },
  { id: "S004", name: "Grace Okafor", role: "Nail Technician", email: "grace@radiancewellness.com", phone: "+234 807 654 3210", specialties: ["Manicure", "Pedicure", "Nail Art"], rating: 4.9, bookingsThisMonth: 55, status: "active" },
  { id: "S005", name: "Emeka Nwosu", role: "Fitness Trainer", email: "emeka@radiancewellness.com", phone: "+234 811 987 6543", specialties: ["Personal Training", "Yoga"], rating: 4.6, bookingsThisMonth: 30, status: "active" },
  { id: "S006", name: "Blessing Adeyemi", role: "Receptionist", email: "blessing@radiancewellness.com", phone: "+234 814 321 0987", specialties: [], rating: null, bookingsThisMonth: null, status: "active" },
];

type StaffMember = typeof initialMockStaff[number];

const roles = [
  "Therapist",
  "Senior Therapist",
  "Beauty Specialist",
  "Nail Technician",
  "Fitness Trainer",
  "Receptionist",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const emptyStaffForm = {
  name: "",
  email: "",
  phone: "",
  role: "",
  specialties: "",
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] as string[],
  startTime: "09:00",
  endTime: "17:00",
};

export default function StaffPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [staffList, setStaffList] = useState(initialMockStaff);

  // Add/Edit Staff dialog
  const [staffDialogOpen, setStaffDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffForm, setStaffForm] = useState(emptyStaffForm);

  // View Profile dialog
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Deactivate confirmation dialog
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [deactivatingStaff, setDeactivatingStaff] = useState<StaffMember | null>(null);

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddDialog = () => {
    setEditingStaff(null);
    setStaffForm(emptyStaffForm);
    setStaffDialogOpen(true);
  };

  const handleOpenEditDialog = (staff: StaffMember) => {
    setEditingStaff(staff);
    setStaffForm({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      specialties: staff.specialties.join(", "),
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      startTime: "09:00",
      endTime: "17:00",
    });
    setStaffDialogOpen(true);
  };

  const handleSaveStaff = () => {
    // In a real app this would call an API
    setStaffDialogOpen(false);
    setEditingStaff(null);
    setStaffForm(emptyStaffForm);
  };

  const handleViewProfile = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setProfileDialogOpen(true);
  };

  const handleOpenDeactivateDialog = (staff: StaffMember) => {
    setDeactivatingStaff(staff);
    setDeactivateDialogOpen(true);
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingStaff) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === deactivatingStaff.id ? { ...s, status: "inactive" } : s
        )
      );
    }
    setDeactivateDialogOpen(false);
    setDeactivatingStaff(null);
  };

  const toggleWorkingDay = (day: string) => {
    setStaffForm((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  // Mock schedule for profile view
  const mockSchedule = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
    { day: "Sunday", hours: "Off" },
  ];

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
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{staffList.length}</p>
            <p className="text-sm text-foreground-muted">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {staffList.filter(s => s.status === "active").length}
            </p>
            <p className="text-sm text-foreground-muted">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-600">
              {staffList.filter(s => s.bookingsThisMonth).reduce((sum, s) => sum + (s.bookingsThisMonth || 0), 0)}
            </p>
            <p className="text-sm text-foreground-muted">Bookings This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {(staffList.filter(s => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0) / staffList.filter(s => s.rating).length).toFixed(1)}
            </p>
            <p className="text-sm text-foreground-muted">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search staff..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Staff Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((staff) => (
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
                    <DropdownMenuItem onClick={() => handleViewProfile(staff)}>
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/bookings")}>
                      View Schedule
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOpenEditDialog(staff)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleOpenDeactivateDialog(staff)}
                    >
                      Deactivate
                    </DropdownMenuItem>
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
                <Badge className={staff.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                  {staff.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={staffDialogOpen} onOpenChange={setStaffDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingStaff ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
            <DialogDescription>
              {editingStaff
                ? "Update the staff member details below."
                : "Enter the details for the new staff member."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="staffName">Full Name</Label>
              <Input
                id="staffName"
                value={staffForm.name}
                onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="staffEmail">Email</Label>
                <Input
                  id="staffEmail"
                  type="email"
                  value={staffForm.email}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  placeholder="email@radiancewellness.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffPhone">Phone</Label>
                <Input
                  id="staffPhone"
                  value={staffForm.phone}
                  onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <Button
                    key={role}
                    type="button"
                    variant={staffForm.role === role ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStaffForm({ ...staffForm, role })}
                    className="justify-start"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="staffSpecialties">Specialties</Label>
              <Input
                id="staffSpecialties"
                value={staffForm.specialties}
                onChange={(e) => setStaffForm({ ...staffForm, specialties: e.target.value })}
                placeholder="e.g. Swedish Massage, Deep Tissue, Hot Stone"
              />
              <p className="text-xs text-gray-500">Separate multiple specialties with commas</p>
            </div>
            <div className="space-y-3">
              <Label>Working Days</Label>
              <div className="flex flex-wrap gap-3">
                {weekDays.map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <Checkbox
                      id={`day-${day}`}
                      checked={staffForm.workingDays.includes(day)}
                      onCheckedChange={() => toggleWorkingDay(day)}
                    />
                    <Label htmlFor={`day-${day}`} className="text-sm font-normal">{day}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={staffForm.startTime}
                  onChange={(e) => setStaffForm({ ...staffForm, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={staffForm.endTime}
                  onChange={(e) => setStaffForm({ ...staffForm, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStaffDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveStaff}>
              {editingStaff ? "Update Staff" : "Save Staff"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Staff Profile</DialogTitle>
            <DialogDescription>Full details for this staff member.</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-6 py-4">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-700">
                    {selectedStaff.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStaff.name}</h3>
                  <p className="text-sm text-foreground-muted">{selectedStaff.role}</p>
                  <div className="text-sm text-gray-500 space-y-1 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {selectedStaff.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {selectedStaff.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary-600">
                    {selectedStaff.bookingsThisMonth ?? "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">This Month Bookings</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">
                    {selectedStaff.rating ? (
                      <span className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {selectedStaff.rating}
                      </span>
                    ) : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-600">
                    {selectedStaff.bookingsThisMonth ? Math.round(selectedStaff.bookingsThisMonth * 2.5) : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Total Clients</p>
                </div>
              </div>

              {/* Specialties */}
              {selectedStaff.specialties.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.specialties.map((specialty, i) => (
                      <Badge key={i} variant="secondary">{specialty}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Schedule */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-3">Weekly Schedule</h4>
                <div className="grid grid-cols-7 gap-1">
                  {mockSchedule.map((item) => (
                    <div
                      key={item.day}
                      className={`text-center p-2 rounded-lg text-xs ${
                        item.hours === "Off"
                          ? "bg-gray-100 text-gray-400"
                          : "bg-primary-50 text-primary-700"
                      }`}
                    >
                      <p className="font-medium">{item.day.slice(0, 3)}</p>
                      <p className="mt-1">{item.hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Confirmation Dialog */}
      <Dialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Staff Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate <strong>{deactivatingStaff?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This will prevent them from being assigned to new bookings. Their existing bookings will remain unaffected.
              You can reactivate them later if needed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeactivateDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDeactivate}>
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
