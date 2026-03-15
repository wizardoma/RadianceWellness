"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Gift,
  Settings,
  Shield,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Badge,
  Separator,
  Button,
  Input,
  Label,
  Switch,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@radiance/ui";

const user = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+234 812 345 6789",
  gender: "Female",
  dateOfBirth: "1992-03-15",
  memberTier: "Gold",
  memberSince: "January 2024",
  points: 2450,
  totalVisits: 24,
};

const favoriteServices = [
  { id: "1", name: "Swedish Massage", duration: "60 min", price: 25000 },
  { id: "2", name: "Hydrating Facial", duration: "45 min", price: 18000 },
  { id: "3", name: "Hot Stone Therapy", duration: "90 min", price: 35000 },
];

const faqItems = [
  {
    question: "How do I cancel a booking?",
    answer: "You can cancel a booking up to 24 hours before your appointment by going to your bookings and tapping the cancel button. Cancellations within 24 hours may incur a fee.",
  },
  {
    question: "How do reward points work?",
    answer: "You earn 1 point for every \u20A6100 spent on services. Points can be redeemed for discounts, free add-ons, and special experiences in the Rewards section.",
  },
  {
    question: "What is the refund policy?",
    answer: "Refunds are processed within 5-7 business days. Gift card purchases are non-refundable. Service credits do not expire.",
  },
  {
    question: "How do I change my appointment time?",
    answer: "Go to your bookings, select the appointment, and tap 'Reschedule'. You can pick a new available time slot up to 12 hours before your appointment.",
  },
];

type DialogType =
  | "personal-info"
  | "payments"
  | "notifications"
  | "security"
  | "favorites"
  | "help"
  | "contact"
  | "settings"
  | null;

export default function ProfilePage() {
  const router = useRouter();
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  // Personal Information state
  const [profileName, setProfileName] = useState(user.name);
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profilePhone, setProfilePhone] = useState(user.phone);
  const [profileGender, setProfileGender] = useState(user.gender);
  const [profileDob, setProfileDob] = useState(user.dateOfBirth);
  const [profileSaved, setProfileSaved] = useState(false);

  // Notifications state
  const [notifBookings, setNotifBookings] = useState(true);
  const [notifReminders, setNotifReminders] = useState(true);
  const [notifPromotions, setNotifPromotions] = useState(false);
  const [notifNewsletter, setNotifNewsletter] = useState(true);
  const [notifSms, setNotifSms] = useState(false);

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Settings state
  const [language] = useState("English");
  const [darkMode, setDarkMode] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  // Help FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Payment state
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleChangePassword = () => {
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const openDialog = (type: DialogType) => {
    setActiveDialog(type);
    // Reset transient states
    setProfileSaved(false);
    setPasswordSaved(false);
    setCacheCleared(false);
    setShowAddCard(false);
  };

  const menuSections = [
    {
      section: "Account",
      items: [
        { icon: User, label: "Personal Information", action: () => openDialog("personal-info") },
        { icon: CreditCard, label: "Payment Methods", action: () => openDialog("payments") },
        { icon: Bell, label: "Notifications", action: () => openDialog("notifications") },
        { icon: Shield, label: "Privacy & Security", action: () => openDialog("security") },
      ],
    },
    {
      section: "Membership",
      items: [
        { icon: Star, label: "Membership Benefits", action: () => router.push("/rewards") },
        { icon: Gift, label: "Gift Cards", action: () => router.push("/gift-cards") },
        { icon: Heart, label: "Favorites", action: () => openDialog("favorites") },
      ],
    },
    {
      section: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: () => openDialog("help") },
        { icon: MessageCircle, label: "Contact Us", action: () => openDialog("contact") },
        { icon: Settings, label: "App Settings", action: () => openDialog("settings") },
      ],
    },
  ];

  return (
    <div className="space-y-6 px-4 pt-4">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
          <span className="text-2xl font-bold text-primary-700">SJ</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mt-3">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge className="bg-amber-100 text-amber-700">{user.memberTier} Member</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-primary-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-primary-700">{user.points}</p>
          <p className="text-xs text-gray-500">Points</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-green-700">{user.totalVisits}</p>
          <p className="text-xs text-gray-500">Visits</p>
        </div>
        <div className="bg-accent-50 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-accent-700">15%</p>
          <p className="text-xs text-gray-500">Discount</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6">
        {menuSections.map((section) => (
          <div key={section.section}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {section.section}
            </h3>
            <div className="bg-white rounded-xl border border-border overflow-hidden divide-y">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => router.push("/")}
        className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>

      {/* Version */}
      <p className="text-center text-xs text-gray-400 pb-4">
        Radiance Wellness v1.0.0
      </p>

      {/* ===== DIALOGS ===== */}

      {/* Personal Information Dialog */}
      <Dialog open={activeDialog === "personal-info"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Personal Information</DialogTitle>
            <DialogDescription>Update your profile details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input id="profile-name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone</Label>
              <Input id="profile-phone" type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-gender">Gender</Label>
              <Input id="profile-gender" value={profileGender} onChange={(e) => setProfileGender(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-dob">Date of Birth</Label>
              <Input id="profile-dob" type="date" value={profileDob} onChange={(e) => setProfileDob(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            {profileSaved && (
              <span className="flex items-center gap-1 text-sm text-green-600 mr-auto">
                <Check className="h-4 w-4" /> Saved successfully
              </span>
            )}
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Methods Dialog */}
      <Dialog open={activeDialog === "payments"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Methods</DialogTitle>
            <DialogDescription>Manage your saved payment methods.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Existing card */}
            <div className="flex items-center justify-between p-4 border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/27</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Default</Badge>
            </div>

            <Separator />

            {!showAddCard ? (
              <Button variant="outline" className="w-full" onClick={() => setShowAddCard(true)}>
                + Add New Card
              </Button>
            ) : (
              <div className="space-y-3 border rounded-xl p-4">
                <h4 className="font-medium text-gray-900">Add New Card</h4>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Expiry</Label>
                    <Input id="card-expiry" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input id="card-cvv" placeholder="123" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowAddCard(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={() => setShowAddCard(false)}>Add Card</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={activeDialog === "notifications"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>Choose which notifications you receive.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Booking Confirmations</p>
                <p className="text-sm text-gray-500">Get notified when a booking is confirmed</p>
              </div>
              <Switch checked={notifBookings} onCheckedChange={setNotifBookings} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Reminders</p>
                <p className="text-sm text-gray-500">Appointment reminders before your visit</p>
              </div>
              <Switch checked={notifReminders} onCheckedChange={setNotifReminders} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Promotions</p>
                <p className="text-sm text-gray-500">Special offers and discounts</p>
              </div>
              <Switch checked={notifPromotions} onCheckedChange={setNotifPromotions} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Newsletter</p>
                <p className="text-sm text-gray-500">Weekly wellness tips and updates</p>
              </div>
              <Switch checked={notifNewsletter} onCheckedChange={setNotifNewsletter} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via text message</p>
              </div>
              <Switch checked={notifSms} onCheckedChange={setNotifSms} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy & Security Dialog */}
      <Dialog open={activeDialog === "security"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy & Security</DialogTitle>
            <DialogDescription>Manage your password and account security.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Change Password</h4>
            <div className="space-y-2">
              <Label htmlFor="current-pw">Current Password</Label>
              <Input id="current-pw" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pw">New Password</Label>
              <Input id="new-pw" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pw">Confirm New Password</Label>
              <Input id="confirm-pw" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {passwordSaved && (
              <p className="flex items-center gap-1 text-sm text-green-600">
                <Check className="h-4 w-4" /> Password updated successfully
              </p>
            )}
            <Button
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
              className="w-full"
            >
              Update Password
            </Button>

            <Separator />

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-medium text-red-800">Delete Account</h4>
              <p className="text-sm text-red-600 mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="outline" className="mt-3 border-red-300 text-red-600 hover:bg-red-100">
                Delete My Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Favorites Dialog */}
      <Dialog open={activeDialog === "favorites"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Favorites</DialogTitle>
            <DialogDescription>Your saved favorite services.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {favoriteServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 border rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>
                <Button size="sm" onClick={() => { setActiveDialog(null); router.push("/book"); }}>
                  Book
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Center Dialog */}
      <Dialog open={activeDialog === "help"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Help Center</DialogTitle>
            <DialogDescription>Frequently asked questions and support.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-gray-900 pr-2">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            <Separator />
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">Still need help?</p>
              <Button variant="outline" onClick={() => { setActiveDialog("contact"); }}>
                Contact Support
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Us Dialog */}
      <Dialog open={activeDialog === "contact"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>Get in touch with our team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <a href="tel:+2348001234567" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-sm text-gray-500">+234 800 123 4567</p>
              </div>
            </a>
            <a href="mailto:support@radiancewellness.com" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-500">support@radiancewellness.com</p>
              </div>
            </a>
            <a href="https://wa.me/2348001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-500">+234 800 123 4567</p>
              </div>
            </a>
            <a href="https://maps.google.com/?q=Radiance+Wellness+Lagos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Visit Us</p>
                <p className="text-sm text-gray-500">15 Admiralty Way, Lekki Phase 1, Lagos</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* App Settings Dialog */}
      <Dialog open={activeDialog === "settings"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>App Settings</DialogTitle>
            <DialogDescription>Customize your app experience.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Language</p>
                <p className="text-sm text-gray-500">{language}</p>
              </div>
              <Badge variant="secondary">English</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Clear Cache</p>
                <p className="text-sm text-gray-500">Free up storage space</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCacheCleared(true)}
                disabled={cacheCleared}
              >
                {cacheCleared ? (
                  <span className="flex items-center gap-1">
                    <Check className="h-4 w-4" /> Cleared
                  </span>
                ) : (
                  "Clear"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
