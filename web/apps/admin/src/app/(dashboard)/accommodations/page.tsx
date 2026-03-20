"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Building2,
  Bed,
  Bath,
  Users,
  MoreVertical,
  Loader2,
  AlertCircle,
  Trash2,
  Pencil,
  Eye,
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";
import { useAccommodationsStore } from "@/application/accommodations/accommodations.store";
import type {
  Accommodation,
  CreateAccommodationPayload,
  UpdateAccommodationPayload,
} from "@/infrastructure/api/accommodations.client";
import {
  ACCOMMODATION_TYPES,
  ACCOMMODATION_STATUS,
  COMMON_AMENITIES,
} from "@/infrastructure/api/accommodations.client";

// ── Form state ────────────────────────────────────────────────────────────────

interface AccommodationFormData {
  name: string;
  type: string;
  description: string;
  shortDescription: string;
  bedrooms: string;
  bathrooms: string;
  capacity: string;
  pricePerNight: string;
  pricePerWeek: string;
  pricePerMonth: string;
  amenities: string[];
  status: string;
}

const emptyForm: AccommodationFormData = {
  name: "",
  type: "STANDARD",
  description: "",
  shortDescription: "",
  bedrooms: "1",
  bathrooms: "1",
  capacity: "2",
  pricePerNight: "",
  pricePerWeek: "",
  pricePerMonth: "",
  amenities: [],
  status: "DRAFT",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function typeBadgeClass(type: string) {
  return type === "PREMIUM"
    ? "bg-purple-100 text-purple-700"
    : "bg-blue-100 text-blue-700";
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AccommodationsPage() {
  const {
    accommodations,
    isLoading,
    isSaving,
    error,
    fetchAccommodations,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
    clearError,
  } = useAccommodationsStore();

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Add / Edit dialog
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [form, setForm] = useState<AccommodationFormData>(emptyForm);

  // View dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingAccommodation, setViewingAccommodation] = useState<Accommodation | null>(null);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingAccommodation, setDeletingAccommodation] = useState<Accommodation | null>(null);

  // ── Fetch on mount ────────────────────────────────────────────────────────

  useEffect(() => {
    fetchAccommodations();
  }, [fetchAccommodations]);

  // ── Debounced search ──────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = debouncedQuery
    ? accommodations.filter((a) =>
        a.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : accommodations;

  // ── Stats ─────────────────────────────────────────────────────────────────

  const totalCount = accommodations.length;
  const activeCount = accommodations.filter((a) => a.status === "ACTIVE").length;
  const premiumCount = accommodations.filter((a) => a.type === "PREMIUM").length;
  const standardCount = accommodations.filter((a) => a.type === "STANDARD").length;

  // ── Add dialog ────────────────────────────────────────────────────────────

  const handleOpenAddDialog = () => {
    setEditingAccommodation(null);
    setForm(emptyForm);
    clearError();
    setFormDialogOpen(true);
  };

  // ── Edit dialog ───────────────────────────────────────────────────────────

  const handleOpenEditDialog = (acc: Accommodation) => {
    setEditingAccommodation(acc);
    setForm({
      name: acc.name,
      type: acc.type,
      description: acc.description,
      shortDescription: acc.shortDescription,
      bedrooms: acc.bedrooms.toString(),
      bathrooms: acc.bathrooms.toString(),
      capacity: acc.capacity.toString(),
      pricePerNight: acc.pricePerNight.toString(),
      pricePerWeek: acc.pricePerWeek?.toString() ?? "",
      pricePerMonth: acc.pricePerMonth?.toString() ?? "",
      amenities: acc.amenities ?? [],
      status: acc.status,
    });
    clearError();
    setFormDialogOpen(true);
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (editingAccommodation) {
      const payload: UpdateAccommodationPayload = {
        name: form.name,
        type: form.type,
        description: form.description,
        shortDescription: form.shortDescription,
        bedrooms: parseInt(form.bedrooms) || 1,
        bathrooms: parseInt(form.bathrooms) || 1,
        capacity: parseInt(form.capacity) || 2,
        pricePerNight: parseFloat(form.pricePerNight) || 0,
        pricePerWeek: form.pricePerWeek ? parseFloat(form.pricePerWeek) : undefined,
        pricePerMonth: form.pricePerMonth ? parseFloat(form.pricePerMonth) : undefined,
        amenities: form.amenities,
        status: form.status,
      };
      const success = await updateAccommodation(editingAccommodation.id, payload);
      if (success) {
        setFormDialogOpen(false);
        setEditingAccommodation(null);
        setForm(emptyForm);
      }
    } else {
      const payload: CreateAccommodationPayload = {
        name: form.name,
        type: form.type,
        description: form.description,
        shortDescription: form.shortDescription,
        bedrooms: parseInt(form.bedrooms) || 1,
        bathrooms: parseInt(form.bathrooms) || 1,
        capacity: parseInt(form.capacity) || 2,
        pricePerNight: parseFloat(form.pricePerNight) || 0,
        pricePerWeek: form.pricePerWeek ? parseFloat(form.pricePerWeek) : undefined,
        pricePerMonth: form.pricePerMonth ? parseFloat(form.pricePerMonth) : undefined,
        amenities: form.amenities,
      };
      const success = await createAccommodation(payload);
      if (success) {
        setFormDialogOpen(false);
        setForm(emptyForm);
      }
    }
  };

  // ── View dialog ───────────────────────────────────────────────────────────

  const handleOpenViewDialog = (acc: Accommodation) => {
    setViewingAccommodation(acc);
    setViewDialogOpen(true);
  };

  // ── Delete dialog ─────────────────────────────────────────────────────────

  const handleOpenDeleteDialog = (acc: Accommodation) => {
    setDeletingAccommodation(acc);
    clearError();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingAccommodation) {
      const success = await deleteAccommodation(deletingAccommodation.id);
      if (success) {
        setDeleteDialogOpen(false);
        setDeletingAccommodation(null);
      }
    }
  };

  // ── Amenity toggle ────────────────────────────────────────────────────────

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Accommodations
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your apartments and accommodation listings
          </p>
        </div>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Apartment
        </Button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-red-600"
            onClick={clearError}
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <Building2 className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Total</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Active</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Premium</p>
                <p className="text-2xl font-bold">{premiumCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Standard</p>
                <p className="text-2xl font-bold">{standardCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search apartments..."
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

      {/* Apartments Grid */}
      {!isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((acc) => (
            <Card key={acc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Title row */}
                <div className="flex justify-between items-start mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg truncate">{acc.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={typeBadgeClass(acc.type)}>
                        {acc.type === "PREMIUM" ? "Premium" : "Standard"}
                      </Badge>
                      <Badge className={statusBadgeClass(acc.status)}>
                        {acc.status.charAt(0) + acc.status.slice(1).toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenViewDialog(acc)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenEditDialog(acc)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleOpenDeleteDialog(acc)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Room details */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {acc.bedrooms} bed{acc.bedrooms !== 1 && "s"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {acc.bathrooms} bath{acc.bathrooms !== 1 && "s"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {acc.capacity} guest{acc.capacity !== 1 && "s"}
                  </span>
                </div>

                {/* Price & amenities */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary-600">
                    {formatCurrency(acc.pricePerNight)}
                    <span className="text-sm font-normal text-gray-400"> /night</span>
                  </span>
                  {acc.amenities && acc.amenities.length > 0 && (
                    <span className="text-xs text-gray-400">
                      {acc.amenities.length} amenities
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No apartments found</p>
        </div>
      )}

      {/* ── Add / Edit Dialog ──────────────────────────────────────────────── */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAccommodation ? "Edit Apartment" : "Add New Apartment"}
            </DialogTitle>
            <DialogDescription>
              {editingAccommodation
                ? "Update the apartment details below."
                : "Fill in the details for the new apartment."}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="acc-name">Name</Label>
              <Input
                id="acc-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Ocean View Suite"
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="acc-type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(value) => setForm({ ...form, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOMMODATION_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status (edit only) */}
            {editingAccommodation && (
              <div className="space-y-2">
                <Label htmlFor="acc-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => setForm({ ...form, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOMMODATION_STATUS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Short description */}
            <div className="space-y-2">
              <Label htmlFor="acc-short-desc">Short Description</Label>
              <Input
                id="acc-short-desc"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                placeholder="Brief one-liner..."
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="acc-desc">Description</Label>
              <Textarea
                id="acc-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Full description of the apartment..."
                rows={3}
              />
            </div>

            {/* Room details row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="acc-bedrooms">Bedrooms</Label>
                <Input
                  id="acc-bedrooms"
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-bathrooms">Bathrooms</Label>
                <Input
                  id="acc-bathrooms"
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-capacity">Max Guests</Label>
                <Input
                  id="acc-capacity"
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <Label>Pricing</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Per Night *</p>
                  <Input
                    type="number"
                    min="0"
                    value={form.pricePerNight}
                    onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Per Week</p>
                  <Input
                    type="number"
                    min="0"
                    value={form.pricePerWeek}
                    onChange={(e) => setForm({ ...form, pricePerWeek: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Per Month</p>
                  <Input
                    type="number"
                    min="0"
                    value={form.pricePerMonth}
                    onChange={(e) => setForm({ ...form, pricePerMonth: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COMMON_AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={form.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setFormDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !form.name || !form.pricePerNight}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editingAccommodation ? (
                "Update Apartment"
              ) : (
                "Save Apartment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View Details Dialog ────────────────────────────────────────────── */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apartment Details</DialogTitle>
            <DialogDescription>
              Full details for {viewingAccommodation?.name}
            </DialogDescription>
          </DialogHeader>

          {viewingAccommodation && (
            <div className="space-y-4 py-4">
              {/* Name & badges */}
              <div>
                <h3 className="text-lg font-semibold">{viewingAccommodation.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={typeBadgeClass(viewingAccommodation.type)}>
                    {viewingAccommodation.type === "PREMIUM" ? "Premium" : "Standard"}
                  </Badge>
                  <Badge className={statusBadgeClass(viewingAccommodation.status)}>
                    {viewingAccommodation.status.charAt(0) +
                      viewingAccommodation.status.slice(1).toLowerCase()}
                  </Badge>
                </div>
              </div>

              {/* Short description */}
              {viewingAccommodation.shortDescription && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Short Description</p>
                  <p className="text-sm">{viewingAccommodation.shortDescription}</p>
                </div>
              )}

              {/* Full description */}
              {viewingAccommodation.description && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-sm whitespace-pre-line">
                    {viewingAccommodation.description}
                  </p>
                </div>
              )}

              {/* Room details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium">{viewingAccommodation.bedrooms}</p>
                  <p className="text-xs text-gray-500">Bedrooms</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium">{viewingAccommodation.bathrooms}</p>
                  <p className="text-xs text-gray-500">Bathrooms</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm font-medium">{viewingAccommodation.capacity}</p>
                  <p className="text-xs text-gray-500">Max Guests</p>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Pricing</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Night</span>
                    <span className="font-medium">
                      {formatCurrency(viewingAccommodation.pricePerNight)}
                    </span>
                  </div>
                  {viewingAccommodation.pricePerWeek != null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per Week</span>
                      <span className="font-medium">
                        {formatCurrency(viewingAccommodation.pricePerWeek)}
                      </span>
                    </div>
                  )}
                  {viewingAccommodation.pricePerMonth != null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per Month</span>
                      <span className="font-medium">
                        {formatCurrency(viewingAccommodation.pricePerMonth)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              {viewingAccommodation.amenities &&
                viewingAccommodation.amenities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingAccommodation.amenities.map((a) => (
                        <Badge key={a} variant="secondary" className="text-xs">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {/* Check-in / Check-out */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium">{viewingAccommodation.checkInTime}</p>
                </div>
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium">{viewingAccommodation.checkOutTime}</p>
                </div>
              </div>

              {/* Min / Max stay */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Min Stay</p>
                  <p className="font-medium">
                    {viewingAccommodation.minStay} night{viewingAccommodation.minStay !== 1 && "s"}
                  </p>
                </div>
                {viewingAccommodation.maxStay != null && (
                  <div>
                    <p className="text-gray-500">Max Stay</p>
                    <p className="font-medium">
                      {viewingAccommodation.maxStay} night
                      {viewingAccommodation.maxStay !== 1 && "s"}
                    </p>
                  </div>
                )}
              </div>

              {/* Rating */}
              {viewingAccommodation.rating > 0 && (
                <div className="text-sm">
                  <p className="text-gray-500">Rating</p>
                  <p className="font-medium">
                    {viewingAccommodation.rating} ({viewingAccommodation.reviewCount} reviews)
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            {viewingAccommodation && (
              <Button
                onClick={() => {
                  setViewDialogOpen(false);
                  handleOpenEditDialog(viewingAccommodation);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ─────────────────────────────────────── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Apartment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingAccommodation?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This action cannot be undone. The apartment and all its associated data
              will be permanently removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isSaving}
            >
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
