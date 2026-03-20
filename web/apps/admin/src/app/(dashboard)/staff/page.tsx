"use client";

import { useState, useEffect } from "react";
import {
  Search, Plus, Mail, Phone, Calendar, Star, MoreVertical, Loader2,
  Trash2, Eye, EyeOff, UserCheck,
} from "lucide-react";
import {
  Button, Card, CardContent, Input, Badge, Label, Switch, Textarea,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@radiance/ui";
import { useStaffStore } from "@/application/staff/staff.store";
import {
  STAFF_ROLES,
  getStaffRoleLabel,
  getStaffStatusLabel,
  type StaffMember,
  type CreateStaffPayload,
} from "@/infrastructure/api/staff.client";

const emptyStaffForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bio: "",
  position: "",
  department: "",
  role: "",
  createLoginAccount: false,
  password: "",
};

export default function StaffPage() {
  const {
    staff,
    isLoading,
    isSaving,
    totalElements,
    error,
    fetchStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    clearError,
  } = useStaffStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Add/Edit dialog
  const [staffDialogOpen, setStaffDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffForm, setStaffForm] = useState(emptyStaffForm);

  // Profile dialog
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingStaff, setDeletingStaff] = useState<StaffMember | null>(null);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const filteredStaff = searchQuery
    ? staff.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          getStaffRoleLabel(s.role).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : staff;

  const activeCount = staff.filter((s) => s.status === "ACTIVE").length;
  const avgRating = staff.filter((s) => s.rating > 0).length > 0
    ? (staff.filter((s) => s.rating > 0).reduce((sum, s) => sum + s.rating, 0) / staff.filter((s) => s.rating > 0).length).toFixed(1)
    : "N/A";

  const handleOpenAddDialog = () => {
    setEditingStaff(null);
    setStaffForm(emptyStaffForm);
    clearError();
    setStaffDialogOpen(true);
  };

  const handleOpenEditDialog = (s: StaffMember) => {
    setEditingStaff(s);
    setStaffForm({
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      phone: s.phone,
      bio: s.bio ?? "",
      position: s.position ?? "",
      department: s.department ?? "",
      role: s.role,
      createLoginAccount: false,
      password: "",
    });
    clearError();
    setStaffDialogOpen(true);
  };

  const handleSaveStaff = async () => {
    if (editingStaff) {
      const success = await updateStaff(editingStaff.id, {
        firstName: staffForm.firstName,
        lastName: staffForm.lastName,
        email: staffForm.email,
        phone: staffForm.phone,
        bio: staffForm.bio || undefined,
        position: staffForm.position || undefined,
        department: staffForm.department || undefined,
        role: staffForm.role || undefined,
      });
      if (success) {
        setStaffDialogOpen(false);
        setEditingStaff(null);
      }
    } else {
      const payload: CreateStaffPayload = {
        firstName: staffForm.firstName,
        lastName: staffForm.lastName,
        email: staffForm.email,
        phone: staffForm.phone,
        bio: staffForm.bio || undefined,
        position: staffForm.position || undefined,
        department: staffForm.department || undefined,
        role: staffForm.role,
        createLoginAccount: staffForm.createLoginAccount,
        password: staffForm.createLoginAccount ? staffForm.password : undefined,
      };
      const success = await createStaff(payload);
      if (success) {
        setStaffDialogOpen(false);
        setStaffForm(emptyStaffForm);
      }
    }
  };

  const handleViewProfile = (s: StaffMember) => {
    setSelectedStaff(s);
    setProfileDialogOpen(true);
  };

  const handleOpenDeleteDialog = (s: StaffMember) => {
    setDeletingStaff(s);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingStaff) {
      const success = await deleteStaff(deletingStaff.id);
      if (success) {
        setDeleteDialogOpen(false);
        setDeletingStaff(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Staff Management
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your team members ({totalElements} staff)
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
            <p className="text-2xl font-bold text-gray-900">{totalElements}</p>
            <p className="text-sm text-foreground-muted">Total Staff</p>
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
              {staff.reduce((sum, s) => sum + s.totalBookings, 0)}
            </p>
            <p className="text-sm text-foreground-muted">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{avgRating}</p>
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

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )}

      {/* Staff Grid */}
      {!isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((s) => (
            <Card key={s.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary-700">
                        {s.firstName[0]}{s.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{s.firstName} {s.lastName}</h3>
                      <p className="text-sm text-foreground-muted">{getStaffRoleLabel(s.role)}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewProfile(s)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenEditDialog(s)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleOpenDeleteDialog(s)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    {s.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    {s.phone}
                  </div>
                </div>

                {s.department && (
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-xs">{s.department}</Badge>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  {s.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{s.rating}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No ratings</span>
                  )}
                  <div className="flex items-center gap-2">
                    {s.hasLoginAccount && (
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Login
                      </Badge>
                    )}
                    <Badge className={
                      s.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                      s.status === "ON_LEAVE" ? "bg-amber-100 text-amber-700" :
                      "bg-gray-100 text-gray-700"
                    }>
                      {getStaffStatusLabel(s.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No staff members found</p>
        </div>
      )}

      {/* Add/Edit Staff Dialog */}
      <Dialog open={staffDialogOpen} onOpenChange={setStaffDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingStaff ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
            <DialogDescription>
              {editingStaff ? "Update the staff member details." : "Enter the details for the new staff member."}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={staffForm.firstName}
                  onChange={(e) => setStaffForm({ ...staffForm, firstName: e.target.value })}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={staffForm.lastName}
                  onChange={(e) => setStaffForm({ ...staffForm, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={staffForm.email}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  placeholder="email@radiancewellness.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={staffForm.phone}
                  onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={staffForm.role}
                onValueChange={(value) => setStaffForm({ ...staffForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {STAFF_ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={staffForm.position}
                  onChange={(e) => setStaffForm({ ...staffForm, position: e.target.value })}
                  placeholder="e.g. Senior Therapist"
                />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input
                  value={staffForm.department}
                  onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                  placeholder="e.g. Massage & Therapy"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={staffForm.bio}
                onChange={(e) => setStaffForm({ ...staffForm, bio: e.target.value })}
                placeholder="Brief description about this staff member..."
                rows={3}
              />
            </div>

            {/* Login account section — only for new staff */}
            {!editingStaff && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Create Login Account</Label>
                    <p className="text-sm text-gray-500">
                      Allow this staff member to log into the staff portal
                    </p>
                  </div>
                  <Switch
                    checked={staffForm.createLoginAccount}
                    onCheckedChange={(checked) =>
                      setStaffForm({ ...staffForm, createLoginAccount: checked, password: "" })
                    }
                  />
                </div>

                {staffForm.createLoginAccount && (
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={staffForm.password}
                        onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                        placeholder="Min 8 chars, 1 uppercase, 1 number"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setStaffDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveStaff} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingStaff ? "Update Staff" : "Save Staff"
              )}
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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-700">
                    {selectedStaff.firstName[0]}{selectedStaff.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedStaff.firstName} {selectedStaff.lastName}
                  </h3>
                  <p className="text-sm text-foreground-muted">{getStaffRoleLabel(selectedStaff.role)}</p>
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

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary-600">{selectedStaff.totalBookings}</p>
                  <p className="text-xs text-gray-500">Total Bookings</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-amber-600">
                    {selectedStaff.rating > 0 ? (
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
                    {getStaffStatusLabel(selectedStaff.status)}
                  </p>
                  <p className="text-xs text-gray-500">Status</p>
                </div>
              </div>

              {selectedStaff.bio && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Bio</h4>
                  <p className="text-sm text-gray-600">{selectedStaff.bio}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedStaff.position && (
                  <div>
                    <span className="text-gray-500">Position:</span>{" "}
                    <span className="font-medium">{selectedStaff.position}</span>
                  </div>
                )}
                {selectedStaff.department && (
                  <div>
                    <span className="text-gray-500">Department:</span>{" "}
                    <span className="font-medium">{selectedStaff.department}</span>
                  </div>
                )}
                {selectedStaff.startDate && (
                  <div>
                    <span className="text-gray-500">Start Date:</span>{" "}
                    <span className="font-medium">{selectedStaff.startDate}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Login Access:</span>{" "}
                  <span className="font-medium">{selectedStaff.hasLoginAccount ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Staff Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingStaff?.firstName} {deletingStaff?.lastName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This will remove the staff member from the system. Their existing bookings will remain unaffected.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
