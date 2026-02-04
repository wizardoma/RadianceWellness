"use client";

import { useState } from "react";
import { Building2, Clock, Bell, Shield, Palette, Save } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Switch, Tabs, TabsList, TabsTrigger, TabsContent, Separator } from "@radiance/ui";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-foreground-secondary mt-1">
            Configure your wellness center
          </p>
        </div>
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

      <Tabs defaultValue="business">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="business" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Business</span>
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Hours</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Radiance Wellness Center" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="hello@radiancewellness.com" className="mt-1" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 800 123 4567" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" defaultValue="+234 800 123 4567" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="1 Setif Close, Adzope Crescent, Off Kumasi Crescent, Wuse 2, Abuja" className="mt-1" />
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="NGN (₦)" className="mt-1" disabled />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="Africa/Lagos (WAT)" className="mt-1" disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: "Monday", open: "08:00", close: "21:00" },
                  { day: "Tuesday", open: "08:00", close: "21:00" },
                  { day: "Wednesday", open: "08:00", close: "21:00" },
                  { day: "Thursday", open: "08:00", close: "21:00" },
                  { day: "Friday", open: "08:00", close: "21:00" },
                  { day: "Saturday", open: "09:00", close: "20:00" },
                  { day: "Sunday", open: "09:00", close: "20:00" },
                ].map((schedule) => (
                  <div key={schedule.day} className="flex items-center gap-4">
                    <span className="w-28 font-medium">{schedule.day}</span>
                    <Input type="time" defaultValue={schedule.open} className="w-32" />
                    <span className="text-gray-500">to</span>
                    <Input type="time" defaultValue={schedule.close} className="w-32" />
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Email notifications for new bookings", defaultChecked: true },
                { label: "SMS notifications for new bookings", defaultChecked: true },
                { label: "Daily summary email", defaultChecked: true },
                { label: "Weekly reports", defaultChecked: false },
                { label: "Low inventory alerts", defaultChecked: true },
                { label: "Customer feedback alerts", defaultChecked: true },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Label htmlFor={`notif-${index}`}>{setting.label}</Label>
                  <Switch id={`notif-${index}`} defaultChecked={setting.defaultChecked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-foreground-muted mb-2">Add an extra layer of security to admin accounts</p>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-foreground-muted mb-2">Automatically log out after inactivity</p>
                <Input type="number" defaultValue="30" className="w-32" />
                <span className="ml-2 text-sm text-gray-500">minutes</span>
              </div>

              <Separator />

              <div>
                <Label>Password Requirements</Label>
                <div className="mt-2 space-y-2">
                  {[
                    "Minimum 8 characters",
                    "Require uppercase letter",
                    "Require number",
                    "Require special character",
                  ].map((req, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{req}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Brand Colors</Label>
                <div className="mt-2 flex gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Primary</p>
                    <div className="w-12 h-12 rounded-lg bg-primary-500 border-2 border-white shadow" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Accent</p>
                    <div className="w-12 h-12 rounded-lg bg-accent-500 border-2 border-white shadow" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Logo</Label>
                <p className="text-sm text-foreground-muted mb-2">Upload your business logo</p>
                <Button variant="outline">Upload Logo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
