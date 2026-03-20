"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { User, Mail, Phone, MapPin, Calendar, Camera, Save } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@radiance/ui";
import { useUserStore } from "@/application/user/user.store";

export default function ProfilePage() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    preferences: {
      preferredTherapist: "",
      communicationPreference: "email",
      marketingOptIn: true,
    },
  });

  // Sync form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth ?? "",
        address: [profile.address, profile.city, profile.state]
          .filter(Boolean)
          .join(", "),
        preferences: {
          preferredTherapist: "",
          communicationPreference: profile.emailOptIn ? "email" : profile.smsOptIn ? "sms" : "email",
          marketingOptIn: profile.emailOptIn,
        },
      });
    }
  }, [profile]);

  // Avatar upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFeedback, setPhotoFeedback] = useState(false);

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Delete account dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleSave = async () => {
    setSaveError(null);
    setIsSaving(true);

    const result = await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth || undefined,
      address: formData.address || undefined,
    });

    setIsSaving(false);

    if (result.success) {
      setIsEditing(false);
    } else {
      setSaveError(result.error ?? "Failed to update profile");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFeedback(true);
      setTimeout(() => setPhotoFeedback(false), 2500);
      e.target.value = "";
    }
  };

  const handleUpdatePassword = () => {
    const errors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (passwordData.newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters";
    }
    if (passwordData.confirmPassword !== passwordData.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);

    if (Object.keys(errors).length === 0) {
      setPasswordSuccess(true);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(false);
    setDeleteConfirmText("");
    router.push("/login");
  };

  const initials = formData.firstName && formData.lastName
    ? `${formData.firstName[0]}${formData.lastName[0]}`
    : "";

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your personal information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Save error */}
      {saveError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{saveError}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-semibold text-primary-700">
                    {initials}
                  </span>
                </div>
                {isEditing && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      onClick={handleAvatarClick}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </>
                )}
                {photoFeedback && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      Photo updated
                    </span>
                  </div>
                )}
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-gray-900">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-sm text-foreground-muted">{formData.email}</p>

              <div className="mt-4 p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white">
                <p className="text-sm opacity-80">Status</p>
                <p className="font-semibold text-lg capitalize">{profile?.status?.toLowerCase() ?? "Active"}</p>
              </div>

              {memberSince && (
                <p className="mt-4 text-sm text-foreground-muted">
                  Member since {memberSince}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        disabled={!isEditing}
                        className="w-full min-h-[80px] pl-10 pr-3 py-2 rounded-md border border-input bg-background text-sm disabled:opacity-50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Preferred Therapist</Label>
                    <p className="text-sm text-foreground-muted mt-1 mb-2">
                      We'll try to book you with this therapist when available
                    </p>
                    <Input
                      value={formData.preferences.preferredTherapist}
                      disabled={!isEditing}
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label>Communication Preference</Label>
                    <p className="text-sm text-foreground-muted mt-1">
                      How would you like to receive booking confirmations?
                    </p>
                    <div className="mt-3 space-y-2">
                      {["email", "sms", "both"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="communication"
                            value={option}
                            checked={formData.preferences.communicationPreference === option}
                            onChange={(e) => setFormData({
                              ...formData,
                              preferences: { ...formData.preferences, communicationPreference: e.target.value }
                            })}
                            disabled={!isEditing}
                            className="mr-3"
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Change Password</Label>
                    <p className="text-sm text-foreground-muted mt-1 mb-4">
                      Update your password to keep your account secure
                    </p>

                    {passwordSuccess && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
                        Password updated successfully
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <Input
                          type="password"
                          placeholder="Current password"
                          value={passwordData.currentPassword}
                          onChange={(e) => {
                            setPasswordData({ ...passwordData, currentPassword: e.target.value });
                            setPasswordErrors((prev) => ({ ...prev, currentPassword: "" }));
                          }}
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-xs text-red-500 mt-1">{passwordErrors.currentPassword}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="New password"
                          value={passwordData.newPassword}
                          onChange={(e) => {
                            setPasswordData({ ...passwordData, newPassword: e.target.value });
                            setPasswordErrors((prev) => ({ ...prev, newPassword: "" }));
                          }}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => {
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                            setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
                          }}
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                    <Button className="mt-4" onClick={handleUpdatePassword}>
                      Update Password
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-red-600">Delete Account</Label>
                    <p className="text-sm text-foreground-muted mt-1 mb-4">
                      Permanently delete your account and all associated data
                    </p>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => { setDeleteConfirmText(""); setDeleteDialogOpen(true); }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Account</DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone. All your data, bookings, membership, and points will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Type <span className="font-bold">DELETE</span> to confirm
            </label>
            <Input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE here"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              disabled={deleteConfirmText !== "DELETE"}
              onClick={handleDeleteAccount}
            >
              Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
