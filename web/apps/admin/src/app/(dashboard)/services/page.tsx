"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Clock, Star } from "lucide-react";
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
import { services as initialServices, serviceCategories } from "@radiance/mock-data";
import { formatCurrency } from "@radiance/utils";

type ServiceItem = typeof initialServices[number];

const emptyServiceForm = {
  name: "",
  category: "",
  shortDescription: "",
  duration: "",
  price: "",
  isActive: true,
  requiresStaff: true,
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [servicesList, setServicesList] = useState(initialServices);

  // Add/Edit Service dialog
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingService, setDeletingService] = useState<ServiceItem | null>(null);

  const filteredServices = servicesList.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddDialog = () => {
    setEditingService(null);
    setServiceForm(emptyServiceForm);
    setServiceDialogOpen(true);
  };

  const handleOpenEditDialog = (service: ServiceItem) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      shortDescription: service.shortDescription,
      duration: service.duration[0]?.toString() ?? "",
      price: Object.values(service.price)[0]?.toString() ?? "",
      isActive: true,
      requiresStaff: true,
    });
    setServiceDialogOpen(true);
  };

  const handleSaveService = () => {
    // In a real app this would call an API
    setServiceDialogOpen(false);
    setEditingService(null);
    setServiceForm(emptyServiceForm);
  };

  const handleOpenDeleteDialog = (service: ServiceItem) => {
    setDeletingService(service);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingService) {
      setServicesList((prev) => prev.filter((s) => s.id !== deletingService.id));
    }
    setDeleteDialogOpen(false);
    setDeletingService(null);
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
            Manage your service catalog
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
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {serviceCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-foreground-muted capitalize">
                    {service.category.replace("-", " & ")}
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
                  <span className="font-bold text-primary-600">
                    {formatCurrency(Object.values(service.price)[0])}
                  </span>
                  {Object.keys(service.price).length > 1 && (
                    <span className="text-sm text-gray-400"> - {formatCurrency(Object.values(service.price).pop()!)}</span>
                  )}
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
                value={serviceForm.category}
                onValueChange={(value) => setServiceForm({ ...serviceForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceDuration">Duration (minutes)</Label>
                <Input
                  id="serviceDuration"
                  type="number"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  placeholder="60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicePrice">Price</Label>
                <Input
                  id="servicePrice"
                  type="number"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  placeholder="25000"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Status</Label>
                <p className="text-sm text-gray-500">{serviceForm.isActive ? "Active" : "Inactive"}</p>
              </div>
              <Switch
                checked={serviceForm.isActive}
                onCheckedChange={(checked) => setServiceForm({ ...serviceForm, isActive: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Requires Staff</Label>
                <p className="text-sm text-gray-500">
                  {serviceForm.requiresStaff ? "Staff member required" : "Self-service"}
                </p>
              </div>
              <Switch
                checked={serviceForm.requiresStaff}
                onCheckedChange={(checked) => setServiceForm({ ...serviceForm, requiresStaff: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveService}>
              {editingService ? "Update Service" : "Save Service"}
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
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
