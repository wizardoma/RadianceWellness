"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Clock, Star, Loader2 } from "lucide-react";
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
  Switch,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";
import { useServicesStore } from "@/application/services/services.store";
import type { ServiceSummary, CreateServicePayload } from "@/infrastructure/api/services.client";

interface PricingEntry {
  duration: string;
  price: string;
}

const emptyServiceForm = {
  name: "",
  categoryId: "",
  shortDescription: "",
  description: "",
  isPopular: false,
};

const defaultPricingEntry: PricingEntry = { duration: "", price: "" };

export default function ServicesPage() {
  const {
    services,
    categories,
    isLoading,
    isCategoriesLoading,
    isSaving,
    categoryFilter,
    error,
    fetchServices,
    fetchCategories,
    setCategoryFilter,
    createService,
    updateService,
    deleteService,
    clearError,
  } = useServicesStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Add/Edit Service dialog
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceSummary | null>(null);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [pricingEntries, setPricingEntries] = useState<PricingEntry[]>([{ ...defaultPricingEntry }]);

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingService, setDeletingService] = useState<ServiceSummary | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, [fetchCategories, fetchServices]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter services locally by search (API already handles category filter)
  const filteredServices = debouncedQuery
    ? services.filter((s) =>
        s.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : services;

  const handleOpenAddDialog = () => {
    setEditingService(null);
    setServiceForm(emptyServiceForm);
    setPricingEntries([{ ...defaultPricingEntry }]);
    clearError();
    setServiceDialogOpen(true);
  };

  const handleOpenEditDialog = (service: ServiceSummary) => {
    setEditingService(service);
    const categoryMatch = categories.find((c) => c.slug === service.categorySlug);
    setServiceForm({
      name: service.name,
      categoryId: categoryMatch?.id ?? "",
      shortDescription: service.shortDescription,
      description: "",
      isPopular: service.isPopular,
    });
    // Populate pricing entries from the service's pricing map
    const entries = Object.entries(service.pricing).map(([dur, price]) => ({
      duration: dur.toString(),
      price: price.toString(),
    }));
    setPricingEntries(entries.length > 0 ? entries : [{ ...defaultPricingEntry }]);
    clearError();
    setServiceDialogOpen(true);
  };

  const handleAddPricingEntry = () => {
    setPricingEntries([...pricingEntries, { ...defaultPricingEntry }]);
  };

  const handleRemovePricingEntry = (index: number) => {
    if (pricingEntries.length <= 1) return;
    setPricingEntries(pricingEntries.filter((_, i) => i !== index));
  };

  const handlePricingChange = (index: number, field: keyof PricingEntry, value: string) => {
    const updated = [...pricingEntries];
    updated[index] = { ...updated[index], [field]: value };
    setPricingEntries(updated);
  };

  const handleSaveService = async () => {
    // Build pricing map and duration array from entries
    const pricing: Record<number, number> = {};
    const duration: number[] = [];

    for (const entry of pricingEntries) {
      const dur = parseInt(entry.duration);
      const price = parseFloat(entry.price);
      if (!isNaN(dur) && !isNaN(price) && dur > 0 && price > 0) {
        pricing[dur] = price;
        duration.push(dur);
      }
    }

    if (duration.length === 0) return;

    const payload = {
      name: serviceForm.name,
      categoryId: serviceForm.categoryId,
      description: serviceForm.description || serviceForm.shortDescription,
      shortDescription: serviceForm.shortDescription,
      pricing,
      duration,
      isPopular: serviceForm.isPopular,
    };

    if (editingService) {
      const success = await updateService(editingService.id, payload);
      if (success) {
        setServiceDialogOpen(false);
        setEditingService(null);
        setServiceForm(emptyServiceForm);
        setPricingEntries([{ ...defaultPricingEntry }]);
      }
    } else {
      const success = await createService(payload as CreateServicePayload);
      if (success) {
        setServiceDialogOpen(false);
        setServiceForm(emptyServiceForm);
        setPricingEntries([{ ...defaultPricingEntry }]);
      }
    }
  };

  const handleOpenDeleteDialog = (service: ServiceSummary) => {
    setDeletingService(service);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingService) {
      const success = await deleteService(deletingService.id);
      if (success) {
        setDeleteDialogOpen(false);
        setDeletingService(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Services
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your service catalog ({filteredServices.length} services)
          </p>
        </div>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={categoryFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={categoryFilter === category.slug ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )}

      {/* Services Grid */}
      {!isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-sm text-foreground-muted">
                      {service.categoryName}
                    </p>
                  </div>
                  {service.isPopular && (
                    <Badge className="bg-accent-100 text-accent-700">Popular</Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {service.duration.join("/")} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {service.rating} ({service.reviewCount})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {(() => {
                      const prices = Object.values(service.pricing).sort((a, b) => a - b);
                      return (
                        <>
                          <span className="font-bold text-primary-600">
                            {formatCurrency(prices[0])}
                          </span>
                          {prices.length > 1 && (
                            <span className="text-sm text-gray-400">
                              {" "}- {formatCurrency(prices[prices.length - 1])}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleOpenDeleteDialog(service)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No services found</p>
        </div>
      )}

      {/* Add/Edit Service Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update the service details below."
                : "Fill in the details for the new service."}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={serviceForm.name}
                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                placeholder="e.g. Swedish Massage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Category</Label>
              <Select
                value={serviceForm.categoryId}
                onValueChange={(value) => setServiceForm({ ...serviceForm, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDesc">Short Description</Label>
              <Textarea
                id="serviceDesc"
                value={serviceForm.shortDescription}
                onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                placeholder="Brief description of the service..."
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Duration & Pricing</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPricingEntry}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Option
                </Button>
              </div>
              {pricingEntries.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={entry.duration}
                      onChange={(e) => handlePricingChange(index, "duration", e.target.value)}
                      placeholder="Duration (min)"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={entry.price}
                      onChange={(e) => handlePricingChange(index, "price", e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                  {pricingEntries.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 shrink-0"
                      onClick={() => handleRemovePricingEntry(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-gray-400">Each duration maps to its own price</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Popular</Label>
                <p className="text-sm text-gray-500">
                  {serviceForm.isPopular ? "Marked as popular" : "Not marked as popular"}
                </p>
              </div>
              <Switch
                checked={serviceForm.isPopular}
                onCheckedChange={(checked) => setServiceForm({ ...serviceForm, isPopular: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                editingService ? "Update Service" : "Save Service"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deletingService?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This action cannot be undone. The service will be permanently removed from your catalog.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
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
