"use client";

import { useState, useRef } from "react";
import {
  Building2,
  Clock,
  Bell,
  Shield,
  Palette,
  Save,
  Calendar,
  CreditCard,
  Wallet,
  Users,
  Link2,
  Plug,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Check,
  Upload,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radiance/ui";

const roleMap: Record<string, string> = {
  admin: "Super Admin",
  manager: "Manager",
  receptionist: "Receptionist",
  accountant: "Accountant",
};

const roleKeyMap: Record<string, string> = {
  "Super Admin": "admin",
  Manager: "manager",
  Receptionist: "receptionist",
  Accountant: "accountant",
};

interface UserRecord {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: string;
}

interface Integration {
  name: string;
  description: string;
  status: string;
  action: string;
  lastSync?: string;
}

const initialUsers: UserRecord[] = [
  {
    name: "Adaeze Obi",
    email: "adaeze@radiancewellness.com",
    role: "Super Admin",
    lastLogin: "Mar 15, 2026, 9:12 AM",
    status: "Active",
  },
  {
    name: "Ibrahim Musa",
    email: "ibrahim@radiancewellness.com",
    role: "Manager",
    lastLogin: "Mar 15, 2026, 8:45 AM",
    status: "Active",
  },
  {
    name: "Blessing Eze",
    email: "blessing@radiancewellness.com",
    role: "Receptionist",
    lastLogin: "Mar 14, 2026, 5:30 PM",
    status: "Active",
  },
  {
    name: "Chukwuma Nwosu",
    email: "chukwuma@radiancewellness.com",
    role: "Accountant",
    lastLogin: "Mar 13, 2026, 2:15 PM",
    status: "Inactive",
  },
];

const initialIntegrations: Integration[] = [
  {
    name: "Paystack",
    description: "Payment processing for cards, bank transfers, and USSD",
    status: "Connected",
    action: "Manage",
    lastSync: "Mar 15, 2026, 9:00 AM",
  },
  {
    name: "Google Calendar",
    description: "Sync bookings and staff schedules with Google Calendar",
    status: "Not Connected",
    action: "Connect",
  },
  {
    name: "WhatsApp Business API",
    description: "Send booking confirmations and reminders via WhatsApp",
    status: "Not Connected",
    action: "Connect",
  },
  {
    name: "Airbnb",
    description: "Sync availability for 2 apartments with Airbnb listings",
    status: "Connected",
    action: "Manage",
    lastSync: "Mar 15, 2026, 8:30 AM",
  },
  {
    name: "SMS Provider",
    description: "Send SMS notifications and marketing messages",
    status: "Connected",
    action: "Manage",
    lastSync: "Mar 15, 2026, 7:45 AM",
  },
  {
    name: "Google Analytics",
    description: "Track website traffic and booking conversions",
    status: "Connected",
    action: "Manage",
    lastSync: "Mar 14, 2026, 11:00 PM",
  },
];

export default function SettingsPage() {
  // Save state
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  // Business info
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Radiance Wellness Center",
    email: "hello@radiancewellness.com",
    phone: "+234 800 123 4567",
    whatsapp: "+234 800 123 4567",
    address: "1 Setif Close, Adzope Crescent, Off Kumasi Crescent, Wuse 2, Abuja",
  });

  // Operating hours
  const [operatingHours, setOperatingHours] = useState([
    { day: "Monday", open: "08:00", close: "21:00", enabled: true },
    { day: "Tuesday", open: "08:00", close: "21:00", enabled: true },
    { day: "Wednesday", open: "08:00", close: "21:00", enabled: true },
    { day: "Thursday", open: "08:00", close: "21:00", enabled: true },
    { day: "Friday", open: "08:00", close: "21:00", enabled: true },
    { day: "Saturday", open: "09:00", close: "20:00", enabled: true },
    { day: "Sunday", open: "09:00", close: "20:00", enabled: true },
  ]);

  // Booking rules
  const [bookingRules, setBookingRules] = useState({
    minNotice: "2",
    maxAdvance: "30",
    cancelWindow: "24",
    bufferTime: "15",
    lateCancelFee: true,
    lateCancelAmount: "5000",
    allowWalkIns: true,
    autoConfirm: true,
    maxSlot: "3",
  });

  // Paystack
  const [showPaystackPublic, setShowPaystackPublic] = useState(false);
  const [showPaystackSecret, setShowPaystackSecret] = useState(false);
  const [paystackKeys, setPaystackKeys] = useState({
    publicKey: "pk_test_demo_placeholder_key",
    secretKey: "sk_test_demo_placeholder_key",
  });

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    testMode: false,
    enableVAT: true,
    vatRate: "7.5",
    paymentCard: true,
    paymentTransfer: true,
    paymentCash: true,
    paymentUSSD: false,
    requireDeposit: true,
    depositAmount: "30",
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailNewBooking: true,
    smsNewBooking: true,
    dailySummary: true,
    weeklyReports: false,
    lowInventory: true,
    customerFeedback: true,
  });

  // Security
  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30",
    minChars: true,
    requireUppercase: true,
    requireNumber: true,
    requireSpecial: true,
  });

  // Users
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "receptionist", sendInvite: true });

  // User action dialogs
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [editRoleUser, setEditRoleUser] = useState<UserRecord | null>(null);
  const [editRoleValue, setEditRoleValue] = useState("");

  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState<UserRecord | null>(null);

  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [deactivateUser, setDeactivateUser] = useState<UserRecord | null>(null);

  // Integrations
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [integrationDialogOpen, setIntegrationDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  // Logo upload
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);

  const handleSave = async () => {
    setSaveState("saving");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
    setUsers(prev => [
      ...prev,
      {
        name: newUser.name,
        email: newUser.email,
        role: roleMap[newUser.role] || newUser.role,
        lastLogin: formattedDate,
        status: "Active",
      },
    ]);
    setNewUser({ name: "", email: "", role: "receptionist", sendInvite: true });
    setAddUserOpen(false);
  };

  const handleEditRole = (user: UserRecord) => {
    setEditRoleUser(user);
    setEditRoleValue(roleKeyMap[user.role] || "receptionist");
    setEditRoleDialogOpen(true);
  };

  const handleConfirmEditRole = () => {
    if (editRoleUser) {
      setUsers(prev =>
        prev.map(u =>
          u.email === editRoleUser.email
            ? { ...u, role: roleMap[editRoleValue] || editRoleValue }
            : u
        )
      );
    }
    setEditRoleDialogOpen(false);
    setEditRoleUser(null);
  };

  const handleResetPassword = (user: UserRecord) => {
    setResetPasswordUser(user);
    setResetPasswordDialogOpen(true);
  };

  const handleConfirmResetPassword = () => {
    setResetPasswordDialogOpen(false);
    setResetPasswordUser(null);
  };

  const handleDeactivate = (user: UserRecord) => {
    setDeactivateUser(user);
    setDeactivateDialogOpen(true);
  };

  const handleConfirmDeactivate = () => {
    if (deactivateUser) {
      setUsers(prev =>
        prev.map(u =>
          u.email === deactivateUser.email
            ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
            : u
        )
      );
    }
    setDeactivateDialogOpen(false);
    setDeactivateUser(null);
  };

  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIntegrationDialogOpen(true);
  };

  const handleToggleIntegration = () => {
    if (selectedIntegration) {
      const isConnected = selectedIntegration.status === "Connected";
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
      setIntegrations(prev =>
        prev.map(i =>
          i.name === selectedIntegration.name
            ? {
                ...i,
                status: isConnected ? "Not Connected" : "Connected",
                action: isConnected ? "Connect" : "Manage",
                lastSync: isConnected ? undefined : formattedDate,
              }
            : i
        )
      );
      setIntegrationDialogOpen(false);
      setSelectedIntegration(null);
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      setLogoDialogOpen(true);
    }
  };

  const notificationKeys: { key: keyof typeof notifications; label: string }[] = [
    { key: "emailNewBooking", label: "Email notifications for new bookings" },
    { key: "smsNewBooking", label: "SMS notifications for new bookings" },
    { key: "dailySummary", label: "Daily summary email" },
    { key: "weeklyReports", label: "Weekly reports" },
    { key: "lowInventory", label: "Low inventory alerts" },
    { key: "customerFeedback", label: "Customer feedback alerts" },
  ];

  const passwordReqKeys: { key: keyof typeof security; label: string }[] = [
    { key: "minChars", label: "Minimum 8 characters" },
    { key: "requireUppercase", label: "Require uppercase letter" },
    { key: "requireNumber", label: "Require number" },
    { key: "requireSpecial", label: "Require special character" },
  ];

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
        <Button onClick={handleSave} disabled={saveState === "saving"}>
          {saveState === "saving" ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Saving...
            </>
          ) : saveState === "saved" ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
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
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger value="business" className="flex-shrink-0 flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Business</span>
          </TabsTrigger>
          <TabsTrigger value="hours" className="flex-shrink-0 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Hours</span>
          </TabsTrigger>
          <TabsTrigger value="booking-rules" className="flex-shrink-0 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Booking Rules</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex-shrink-0 flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-shrink-0 flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-shrink-0 flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-shrink-0 flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex-shrink-0 flex items-center gap-1">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-shrink-0 flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
        </TabsList>

        {/* Business Tab */}
        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessInfo.businessName}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={businessInfo.whatsapp}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, whatsapp: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  className="mt-1"
                />
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

        {/* Hours Tab */}
        <TabsContent value="hours" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {operatingHours.map((schedule, index) => (
                  <div key={schedule.day} className="flex items-center gap-4">
                    <span className="w-28 font-medium">{schedule.day}</span>
                    <Input
                      type="time"
                      value={schedule.open}
                      onChange={(e) => {
                        const updated = [...operatingHours];
                        updated[index] = { ...updated[index], open: e.target.value };
                        setOperatingHours(updated);
                      }}
                      className="w-32"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="time"
                      value={schedule.close}
                      onChange={(e) => {
                        const updated = [...operatingHours];
                        updated[index] = { ...updated[index], close: e.target.value };
                        setOperatingHours(updated);
                      }}
                      className="w-32"
                    />
                    <Switch
                      checked={schedule.enabled}
                      onCheckedChange={(checked) => {
                        const updated = [...operatingHours];
                        updated[index] = { ...updated[index], enabled: !!checked };
                        setOperatingHours(updated);
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Rules Tab */}
        <TabsContent value="booking-rules" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minNotice">Minimum Booking Notice</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="minNotice"
                      type="number"
                      value={bookingRules.minNotice}
                      onChange={(e) => setBookingRules({ ...bookingRules, minNotice: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">hours</span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-1">
                    How far in advance customers must book
                  </p>
                </div>
                <div>
                  <Label htmlFor="maxAdvance">Maximum Advance Booking</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="maxAdvance"
                      type="number"
                      value={bookingRules.maxAdvance}
                      onChange={(e) => setBookingRules({ ...bookingRules, maxAdvance: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">days</span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-1">
                    How far ahead customers can book
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="cancelWindow">Cancellation Policy Window</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="cancelWindow"
                      type="number"
                      value={bookingRules.cancelWindow}
                      onChange={(e) => setBookingRules({ ...bookingRules, cancelWindow: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">hours</span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-1">
                    Free cancellation window before appointment
                  </p>
                </div>
                <div>
                  <Label htmlFor="bufferTime">Buffer Between Appointments</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="bufferTime"
                      type="number"
                      value={bookingRules.bufferTime}
                      onChange={(e) => setBookingRules({ ...bookingRules, bufferTime: e.target.value })}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">minutes</span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-1">
                    Break time between consecutive bookings
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Late Cancellation Fee</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Switch
                    checked={bookingRules.lateCancelFee}
                    onCheckedChange={(checked) => setBookingRules({ ...bookingRules, lateCancelFee: !!checked })}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Fee amount:</span>
                    <Input
                      type="number"
                      value={bookingRules.lateCancelAmount}
                      onChange={(e) => setBookingRules({ ...bookingRules, lateCancelAmount: e.target.value })}
                      className="w-32"
                    />
                    <span className="text-sm text-gray-500">NGN</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-muted mt-1">
                  Charge when cancellation is within the policy window
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Walk-ins</Label>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Accept customers without prior booking
                    </p>
                  </div>
                  <Switch
                    checked={bookingRules.allowWalkIns}
                    onCheckedChange={(checked) => setBookingRules({ ...bookingRules, allowWalkIns: !!checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-confirm Bookings</Label>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Automatically confirm bookings without manual approval
                    </p>
                  </div>
                  <Switch
                    checked={bookingRules.autoConfirm}
                    onCheckedChange={(checked) => setBookingRules({ ...bookingRules, autoConfirm: !!checked })}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="maxSlot">Max Bookings Per Slot</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="maxSlot"
                    type="number"
                    value={bookingRules.maxSlot}
                    onChange={(e) => setBookingRules({ ...bookingRules, maxSlot: e.target.value })}
                    className="w-24"
                  />
                </div>
                <p className="text-xs text-foreground-muted mt-1">
                  Maximum concurrent bookings per time slot
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings Tab */}
        <TabsContent value="payments" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Paystack Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paystackPublic">Public Key</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="paystackPublic"
                    type={showPaystackPublic ? "text" : "password"}
                    value={paystackKeys.publicKey}
                    onChange={(e) => setPaystackKeys({ ...paystackKeys, publicKey: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPaystackPublic(!showPaystackPublic)}
                    type="button"
                  >
                    {showPaystackPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="paystackSecret">Secret Key</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="paystackSecret"
                    type={showPaystackSecret ? "text" : "password"}
                    value={paystackKeys.secretKey}
                    onChange={(e) => setPaystackKeys({ ...paystackKeys, secretKey: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPaystackSecret(!showPaystackSecret)}
                    type="button"
                  >
                    {showPaystackSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Test Mode</Label>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    Use test API keys for development
                  </p>
                </div>
                <Switch
                  checked={paymentSettings.testMode}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, testMode: !!checked })}
                />
              </div>
              <div>
                <Label>Webhook URL</Label>
                <Input
                  defaultValue="https://api.radiancewellness.com/webhooks/paystack"
                  className="mt-1 bg-gray-50"
                  readOnly
                />
                <p className="text-xs text-foreground-muted mt-1">
                  Add this URL to your Paystack dashboard webhook settings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable VAT</Label>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    Apply Value Added Tax to transactions
                  </p>
                </div>
                <Switch
                  checked={paymentSettings.enableVAT}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableVAT: !!checked })}
                />
              </div>
              <div>
                <Label htmlFor="vatRate">VAT Rate</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="vatRate"
                    type="number"
                    value={paymentSettings.vatRate}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, vatRate: e.target.value })}
                    className="w-24"
                    step="0.1"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accepted Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {([
                { key: "paymentCard" as const, label: "Card (Visa, Mastercard)" },
                { key: "paymentTransfer" as const, label: "Bank Transfer" },
                { key: "paymentCash" as const, label: "Cash" },
                { key: "paymentUSSD" as const, label: "USSD" },
              ]).map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <Label>{item.label}</Label>
                  <Switch
                    checked={paymentSettings[item.key]}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, [item.key]: !!checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deposit Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Deposit</Label>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    Collect a deposit when customers book
                  </p>
                </div>
                <Switch
                  checked={paymentSettings.requireDeposit}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, requireDeposit: !!checked })}
                />
              </div>
              <div>
                <Label htmlFor="depositAmount">Deposit Amount</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="depositAmount"
                    type="number"
                    value={paymentSettings.depositAmount}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, depositAmount: e.target.value })}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-500">% of service price</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  User Management
                </CardTitle>
                <Button onClick={() => setAddUserOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.email} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-sm">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant={user.role === "Super Admin" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{user.lastLogin}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={user.status === "Active" ? "success" : "error"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditRole(user)}>
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeactivate(user)}
                              >
                                {user.status === "Active" ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Add User Dialog */}
          <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="newUserName">Full Name</Label>
                  <Input
                    id="newUserName"
                    placeholder="Enter full name"
                    className="mt-1"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="newUserEmail">Email Address</Label>
                  <Input
                    id="newUserEmail"
                    type="email"
                    placeholder="Enter email address"
                    className="mt-1"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="newUserRole">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Super Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="accountant">Accountant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Send Invite Email</Label>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Send login credentials via email
                    </p>
                  </div>
                  <Switch
                    checked={newUser.sendInvite}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, sendInvite: !!checked })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Role Dialog */}
          <Dialog open={editRoleDialogOpen} onOpenChange={setEditRoleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Role</DialogTitle>
                <DialogDescription>
                  Change the role for {editRoleUser?.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label>Current Role</Label>
                  <p className="text-sm text-gray-600 mt-1">{editRoleUser?.role}</p>
                </div>
                <div>
                  <Label>New Role</Label>
                  <Select value={editRoleValue} onValueChange={setEditRoleValue}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Super Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="accountant">Accountant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmEditRole}>
                  Update Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Reset Password Dialog */}
          <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Send a password reset email to {resetPasswordUser?.name}?
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <p className="text-sm text-gray-600">
                  A password reset link will be sent to{" "}
                  <span className="font-medium">{resetPasswordUser?.email}</span>.
                  The user will need to create a new password.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setResetPasswordDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmResetPassword}>
                  Send Reset Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Deactivate/Activate Dialog */}
          <Dialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {deactivateUser?.status === "Active" ? "Deactivate" : "Activate"} User
                </DialogTitle>
                <DialogDescription>
                  {deactivateUser?.status === "Active"
                    ? `Are you sure you want to deactivate ${deactivateUser?.name}? They will lose access to the admin panel.`
                    : `Reactivate ${deactivateUser?.name}? They will regain access to the admin panel.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeactivateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant={deactivateUser?.status === "Active" ? "outline" : "default"}
                  className={deactivateUser?.status === "Active" ? "bg-red-600 text-white hover:bg-red-700 border-red-600" : ""}
                  onClick={handleConfirmDeactivate}
                >
                  {deactivateUser?.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationKeys.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <Label>{setting.label}</Label>
                  <Switch
                    checked={notifications[setting.key]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [setting.key]: !!checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-foreground-muted mb-2">Add an extra layer of security to admin accounts</p>
                <Switch
                  checked={security.twoFactor}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: !!checked })}
                />
              </div>

              <Separator />

              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-foreground-muted mb-2">Automatically log out after inactivity</p>
                <Input
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  className="w-32"
                />
                <span className="ml-2 text-sm text-gray-500">minutes</span>
              </div>

              <Separator />

              <div>
                <Label>Password Requirements</Label>
                <div className="mt-2 space-y-2">
                  {passwordReqKeys.map((req) => (
                    <div key={req.key} className="flex items-center justify-between">
                      <span className="text-sm">{req.label}</span>
                      <Switch
                        checked={security[req.key] as boolean}
                        onCheckedChange={(checked) =>
                          setSecurity({ ...security, [req.key]: !!checked })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.name}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {integration.name === "Paystack" && <CreditCard className="h-5 w-5 text-gray-700" />}
                        {integration.name === "Google Calendar" && <Calendar className="h-5 w-5 text-gray-700" />}
                        {integration.name === "WhatsApp Business API" && <Link2 className="h-5 w-5 text-gray-700" />}
                        {integration.name === "Airbnb" && <Building2 className="h-5 w-5 text-gray-700" />}
                        {integration.name === "SMS Provider" && <Bell className="h-5 w-5 text-gray-700" />}
                        {integration.name === "Google Analytics" && <Plug className="h-5 w-5 text-gray-700" />}
                      </div>
                      <Badge variant={integration.status === "Connected" ? "success" : "secondary"}>
                        {integration.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-foreground-muted mt-1 flex-1">{integration.description}</p>
                    <div className="mt-4">
                      <Button
                        variant={integration.status === "Connected" ? "outline" : "default"}
                        className="w-full"
                        size="sm"
                        onClick={() => handleIntegrationClick(integration)}
                      >
                        {integration.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration Dialog */}
          <Dialog open={integrationDialogOpen} onOpenChange={setIntegrationDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedIntegration?.status === "Connected"
                    ? `Manage ${selectedIntegration?.name}`
                    : `Connect ${selectedIntegration?.name}`}
                </DialogTitle>
                <DialogDescription>
                  {selectedIntegration?.status === "Connected"
                    ? `Manage your ${selectedIntegration?.name} integration settings.`
                    : `Set up ${selectedIntegration?.name} to integrate with Radiance Wellness.`}
                </DialogDescription>
              </DialogHeader>
              {selectedIntegration?.status === "Connected" ? (
                <div className="space-y-4 py-2">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <Badge variant="success">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Last Sync</span>
                      <span className="text-sm font-medium">{selectedIntegration.lastSync || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Integration</span>
                      <span className="text-sm font-medium">{selectedIntegration.name}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Setup Steps</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Sign in to your {selectedIntegration?.name} account</li>
                      <li>Generate API credentials</li>
                      <li>Click Connect below to authorize</li>
                    </ol>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIntegrationDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant={selectedIntegration?.status === "Connected" ? "outline" : "default"}
                  className={selectedIntegration?.status === "Connected" ? "bg-red-600 text-white hover:bg-red-700 border-red-600" : ""}
                  onClick={handleToggleIntegration}
                >
                  {selectedIntegration?.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Appearance Tab */}
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
                {logoFileName && (
                  <p className="text-sm text-green-600 mb-2">Current: {logoFileName}</p>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoFileChange}
                />
                <Button variant="outline" onClick={() => logoInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload Success Dialog */}
          <Dialog open={logoDialogOpen} onOpenChange={setLogoDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Logo Uploaded</DialogTitle>
                <DialogDescription>
                  Your logo file has been selected successfully.
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <p className="text-sm text-gray-600">
                  File: <span className="font-medium">{logoFileName}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click Save Changes to apply the new logo to your business profile.
                </p>
              </div>
              <DialogFooter>
                <Button onClick={() => setLogoDialogOpen(false)}>OK</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
