"use client";

import { useState, useRef } from "react";
import {
  Save,
  Upload,
  X,
  Plus,
  Star,
  Calendar,
  Users,
  DollarSign,
  Bell,
  Mail,
  MessageSquare,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Textarea,
  Label,
  Switch,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

export default function MyProfilePage() {
  // Personal info state
  const [fullName, setFullName] = useState("Chidi Eze");
  const [email, setEmail] = useState("chidi@radiancewellness.com");
  const [phone, setPhone] = useState("+234 812 345 6789");
  const [bio, setBio] = useState(
    "Senior Massage Therapist with 8 years of experience specializing in Swedish and Deep Tissue massage techniques."
  );

  // Specialties state
  const [specialties, setSpecialties] = useState([
    "Swedish Massage",
    "Deep Tissue",
    "Hot Stone",
  ]);
  const [newSpecialty, setNewSpecialty] = useState("");

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    newBookingEmail: true,
    newBookingSms: true,
    bookingReminders: true,
    scheduleChanges: true,
    customerMessages: false,
    weeklyReport: true,
  });

  // Save feedback
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const handleAddSpecialty = () => {
    const trimmed = newSpecialty.trim();
    if (trimmed && !specialties.includes(trimmed)) {
      setSpecialties([...specialties, trimmed]);
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage your personal information
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* Two-column grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">
                  {initials}
                </span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Professional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Read-only fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground-muted">Role</Label>
                <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-lg px-4 py-2.5">
                  Senior Therapist
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground-muted">Department</Label>
                <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-lg px-4 py-2.5">
                  Massage &amp; Therapy
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground-muted">Start Date</Label>
                <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-lg px-4 py-2.5">
                  January 2024
                </p>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <Label>Specialties</Label>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    className="bg-primary-100 text-primary-700 pl-3 pr-1.5 py-1.5 flex items-center gap-1.5"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(specialty)}
                      className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a specialty..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSpecialty();
                    }
                  }}
                />
                <Button
                  variant="outline"
                  onClick={handleAddSpecialty}
                  disabled={!newSpecialty.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Performance Summary</CardTitle>
          <span className="text-sm text-foreground-muted cursor-not-allowed">
            View Full Performance
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-primary-50 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-primary-700">48</p>
              <p className="text-sm text-primary-600">This Month</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-amber-700">4.9/5</p>
              <p className="text-sm text-amber-600">Rating</p>
            </div>

            <div className="p-4 bg-green-50 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-700">312</p>
              <p className="text-sm text-green-600">Total Clients Served</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-700">
                {formatCurrency(2450000)}
              </p>
              <p className="text-sm text-purple-600">Revenue Generated</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-foreground-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New booking notifications (Email)
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Receive an email when a new booking is assigned to you
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.newBookingEmail}
                onCheckedChange={() => toggleNotification("newBookingEmail")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-foreground-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New booking notifications (SMS)
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Get an SMS alert for new bookings
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.newBookingSms}
                onCheckedChange={() => toggleNotification("newBookingSms")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-foreground-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Booking reminders
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Reminder 1 hour before each appointment
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.bookingReminders}
                onCheckedChange={() => toggleNotification("bookingReminders")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-foreground-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Schedule changes
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Notify when your schedule is modified
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.scheduleChanges}
                onCheckedChange={() => toggleNotification("scheduleChanges")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-foreground-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Customer messages
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Receive notifications for customer messages
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.customerMessages}
                onCheckedChange={() => toggleNotification("customerMessages")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-foreground-muted" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Weekly performance report
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Receive a summary of your weekly performance every Monday
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={() => toggleNotification("weeklyReport")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
