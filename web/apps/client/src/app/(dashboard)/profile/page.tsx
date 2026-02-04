"use client";

import { useState } from "react";
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
} from "@radiance/ui";

// Mock user data
const mockUser = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@example.com",
  phone: "+234 812 345 6789",
  dateOfBirth: "1990-05-15",
  address: "15 Admiralty Way, Lekki Phase 1, Lagos",
  memberSince: "January 2024",
  membershipTier: "Gold",
  preferences: {
    preferredTherapist: "Chidi Eze",
    communicationPreference: "email",
    marketingOptIn: true,
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(mockUser);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-semibold text-primary-700">
                    {formData.firstName[0]}{formData.lastName[0]}
                  </span>
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-gray-900">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-sm text-foreground-muted">{formData.email}</p>
              
              <div className="mt-4 p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white">
                <p className="text-sm opacity-80">Membership</p>
                <p className="font-semibold text-lg">{formData.membershipTier} Member</p>
              </div>

              <p className="mt-4 text-sm text-foreground-muted">
                Member since {formData.memberSince}
              </p>
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
                    <div className="space-y-3">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="mt-4">Update Password</Button>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-red-600">Delete Account</Label>
                    <p className="text-sm text-foreground-muted mt-1 mb-4">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
