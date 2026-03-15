"use client";

import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Copy,
  Edit,
  Megaphone,
  Gift,
  Users,
  Mail,
  MessageSquare,
  Tag,
  Percent,
  TrendingUp,
  Send,
  Ban,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
type PromoCode = {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  usageCount: number;
  usageLimit: number | null;
  validFrom: string;
  validTo: string;
  status: "Active" | "Expired" | "Disabled";
  applicableTo: "All" | "Services" | "Products";
};

type GiftCard = {
  id: string;
  code: string;
  purchaser: string;
  recipient: string;
  originalValue: number;
  balance: number;
  status: "Active" | "Redeemed" | "Expired" | "Disabled";
  purchaseDate: string;
  recipientEmail?: string;
  message?: string;
};

type Campaign = {
  id: string;
  name: string;
  type: "Email" | "SMS" | "WhatsApp";
  recipients: number;
  status: "Sent" | "Scheduled" | "Draft";
  openRate: number | null;
  date: string;
  subject?: string;
  messageBody?: string;
  recipientGroup?: string;
};

// Initial mock data
const initialPromoCodes: PromoCode[] = [
  { id: "P001", code: "WELCOME20", description: "New customer welcome discount", discountType: "percentage", discountValue: 20, usageCount: 45, usageLimit: 100, validFrom: "2026-01-01", validTo: "2026-06-30", status: "Active", applicableTo: "All" },
  { id: "P002", code: "SUMMER15", description: "Summer season special", discountType: "percentage", discountValue: 15, usageCount: 78, usageLimit: 200, validFrom: "2026-03-01", validTo: "2026-08-31", status: "Active", applicableTo: "Services" },
  { id: "P003", code: "VIP5000", description: "VIP flat discount", discountType: "fixed", discountValue: 5000, usageCount: 12, usageLimit: 50, validFrom: "2026-01-15", validTo: "2026-12-31", status: "Active", applicableTo: "All" },
  { id: "P004", code: "BDAY10", description: "Birthday month discount", discountType: "percentage", discountValue: 10, usageCount: 34, usageLimit: null, validFrom: "2025-06-01", validTo: "2026-12-31", status: "Active", applicableTo: "All" },
  { id: "P005", code: "NEWYEAR25", description: "New year celebration promo", discountType: "percentage", discountValue: 25, usageCount: 150, usageLimit: 150, validFrom: "2025-12-20", validTo: "2026-01-10", status: "Expired", applicableTo: "All" },
  { id: "P006", code: "FLASH50", description: "Flash sale - 50% off facials", discountType: "percentage", discountValue: 50, usageCount: 30, usageLimit: 100, validFrom: "2026-02-01", validTo: "2026-04-30", status: "Disabled", applicableTo: "Services" },
];

const initialGiftCards: GiftCard[] = [
  { id: "GC001", code: "GC-AX4R-9KM2", purchaser: "Ngozi Adekunle", recipient: "Fatima Bello", originalValue: 50000, balance: 50000, status: "Active", purchaseDate: "2026-03-10", recipientEmail: "fatima@email.com" },
  { id: "GC002", code: "GC-BT7P-3LN8", purchaser: "Emeka Obi", recipient: "Adaora Nwachukwu", originalValue: 100000, balance: 35000, status: "Active", purchaseDate: "2026-03-08", recipientEmail: "adaora@email.com" },
  { id: "GC003", code: "GC-CW2M-6HJ5", purchaser: "Chukwuma Okoro", recipient: "Yetunde Afolabi", originalValue: 25000, balance: 0, status: "Redeemed", purchaseDate: "2026-02-14", recipientEmail: "yetunde@email.com" },
  { id: "GC004", code: "GC-DY9K-1QR4", purchaser: "Obioma Eze", recipient: "Halima Yusuf", originalValue: 75000, balance: 75000, status: "Active", purchaseDate: "2026-03-05", recipientEmail: "halima@email.com" },
  { id: "GC005", code: "GC-EZ3N-8FV7", purchaser: "Fatima Bello", recipient: "Ngozi Adekunle", originalValue: 10000, balance: 0, status: "Redeemed", purchaseDate: "2026-01-20", recipientEmail: "ngozi@email.com" },
  { id: "GC006", code: "GC-FU5L-2WT6", purchaser: "Adaora Nwachukwu", recipient: "Emeka Obi", originalValue: 50000, balance: 50000, status: "Expired", purchaseDate: "2025-09-15", recipientEmail: "emeka@email.com" },
];

// Mock referrers
const mockReferrers = [
  { id: "R001", name: "Fatima Bello", email: "fatima@email.com", phone: "+234 801 234 5678", referralsMade: 12, successful: 9, totalEarned: 45000, joinDate: "2024-06-15" },
  { id: "R002", name: "Ngozi Adekunle", email: "ngozi@email.com", phone: "+234 802 345 6789", referralsMade: 8, successful: 6, totalEarned: 30000, joinDate: "2024-08-20" },
  { id: "R003", name: "Obioma Eze", email: "obioma@email.com", phone: "+234 803 456 7890", referralsMade: 7, successful: 5, totalEarned: 25000, joinDate: "2024-09-10" },
  { id: "R004", name: "Chukwuma Okoro", email: "chukwuma@email.com", phone: "+234 804 567 8901", referralsMade: 5, successful: 4, totalEarned: 20000, joinDate: "2024-11-01" },
  { id: "R005", name: "Emeka Obi", email: "emeka@email.com", phone: "+234 805 678 9012", referralsMade: 4, successful: 2, totalEarned: 10000, joinDate: "2025-01-15" },
];

const initialCampaigns: Campaign[] = [
  { id: "CM001", name: "Welcome Series", type: "Email", recipients: 320, status: "Sent", openRate: 42, date: "2026-03-12", subject: "Welcome to Radiance Wellness!", messageBody: "Thank you for joining us...", recipientGroup: "New Customers" },
  { id: "CM002", name: "March Newsletter", type: "Email", recipients: 1250, status: "Scheduled", openRate: null, date: "2026-03-20", subject: "March at Radiance Wellness", messageBody: "Here's what's new this month...", recipientGroup: "All Subscribers" },
  { id: "CM003", name: "Birthday Promos", type: "WhatsApp", recipients: 45, status: "Sent", openRate: 68, date: "2026-03-01", subject: "Happy Birthday!", messageBody: "Celebrate your special day with us...", recipientGroup: "Birthday This Month" },
  { id: "CM004", name: "Re-engagement Campaign", type: "SMS", recipients: 180, status: "Draft", openRate: null, date: "2026-03-15", subject: "We miss you!", messageBody: "It's been a while since your last visit...", recipientGroup: "Inactive Customers" },
];

const getStatusBadge = (status: string) => {
  const colors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Expired: "bg-gray-100 text-gray-700",
    Disabled: "bg-red-100 text-red-700",
    Redeemed: "bg-blue-100 text-blue-700",
    Sent: "bg-green-100 text-green-700",
    Scheduled: "bg-amber-100 text-amber-700",
    Draft: "bg-gray-100 text-gray-700",
  };
  return <Badge className={colors[status] || "bg-gray-100 text-gray-700"}>{status}</Badge>;
};

const getCampaignTypeBadge = (type: string) => {
  const colors: Record<string, string> = {
    Email: "bg-blue-100 text-blue-700",
    SMS: "bg-purple-100 text-purple-700",
    WhatsApp: "bg-green-100 text-green-700",
  };
  return <Badge className={colors[type] || "bg-gray-100 text-gray-700"}>{type}</Badge>;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function MarketingPage() {
  // --- Stateful lists ---
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(initialPromoCodes);
  const [giftCards, setGiftCards] = useState<GiftCard[]>(initialGiftCards);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  // --- Promo dialog ---
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoDesc, setPromoDesc] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [promoMinOrder, setPromoMinOrder] = useState("");
  const [promoUsageLimit, setPromoUsageLimit] = useState("");
  const [promoValidFrom, setPromoValidFrom] = useState("");
  const [promoValidTo, setPromoValidTo] = useState("");
  const [promoApplicableTo, setPromoApplicableTo] = useState<"All" | "Services" | "Products">("All");
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);

  // --- Gift card dialog ---
  const [giftCardDialogOpen, setGiftCardDialogOpen] = useState(false);
  const [giftCardValue, setGiftCardValue] = useState<number | "">("");
  const [gcRecipientName, setGcRecipientName] = useState("");
  const [gcRecipientEmail, setGcRecipientEmail] = useState("");
  const [gcMessage, setGcMessage] = useState("");
  const [gcPurchaserName, setGcPurchaserName] = useState("");

  // --- Gift card detail dialog ---
  const [gcDetailDialogOpen, setGcDetailDialogOpen] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<GiftCard | null>(null);
  const [resendingGcId, setResendingGcId] = useState<string | null>(null);

  // --- Referral settings ---
  const [referralSettingsOpen, setReferralSettingsOpen] = useState(false);
  const [referralReward, setReferralReward] = useState("5000");
  const [referralMinBooking, setReferralMinBooking] = useState("15000");
  const [referralExpiryDays, setReferralExpiryDays] = useState("30");
  const [savedReferralReward, setSavedReferralReward] = useState(5000);
  const [savedReferralMinBooking, setSavedReferralMinBooking] = useState(15000);
  const [savedReferralExpiryDays, setSavedReferralExpiryDays] = useState(30);

  // --- Referrer dialogs ---
  const [referrerProfileOpen, setReferrerProfileOpen] = useState(false);
  const [selectedReferrer, setSelectedReferrer] = useState<typeof mockReferrers[0] | null>(null);
  const [referrerEmailOpen, setReferrerEmailOpen] = useState(false);
  const [referrerEmailSubject, setReferrerEmailSubject] = useState("");
  const [referrerEmailBody, setReferrerEmailBody] = useState("");
  const [referrerEmailSending, setReferrerEmailSending] = useState(false);

  // --- Campaign dialog ---
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState<"Email" | "SMS" | "WhatsApp">("Email");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [campaignRecipientGroup, setCampaignRecipientGroup] = useState("");
  const [campaignDate, setCampaignDate] = useState("");

  // --- Campaign detail/confirm dialogs ---
  const [campaignDetailOpen, setCampaignDetailOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [sendNowConfirmOpen, setSendNowConfirmOpen] = useState(false);
  const [campaignToSend, setCampaignToSend] = useState<Campaign | null>(null);

  // --- Helper: reset promo form ---
  const resetPromoForm = () => {
    setEditingPromo(null);
    setPromoCode("");
    setPromoDesc("");
    setDiscountType("percentage");
    setDiscountValue("");
    setPromoMinOrder("");
    setPromoUsageLimit("");
    setPromoValidFrom("");
    setPromoValidTo("");
    setPromoApplicableTo("All");
  };

  const openPromoDialog = (promo?: PromoCode) => {
    if (promo) {
      setEditingPromo(promo);
      setPromoCode(promo.code);
      setPromoDesc(promo.description);
      setDiscountType(promo.discountType);
      setDiscountValue(String(promo.discountValue));
      setPromoUsageLimit(promo.usageLimit !== null ? String(promo.usageLimit) : "");
      setPromoValidFrom(promo.validFrom);
      setPromoValidTo(promo.validTo);
      setPromoApplicableTo(promo.applicableTo);
    } else {
      resetPromoForm();
    }
    setPromoDialogOpen(true);
  };

  const handleSavePromo = () => {
    if (editingPromo) {
      setPromoCodes((prev) =>
        prev.map((p) =>
          p.id === editingPromo.id
            ? {
                ...p,
                code: promoCode.toUpperCase(),
                description: promoDesc,
                discountType,
                discountValue: Number(discountValue) || 0,
                usageLimit: promoUsageLimit ? Number(promoUsageLimit) : null,
                validFrom: promoValidFrom,
                validTo: promoValidTo,
                applicableTo: promoApplicableTo,
              }
            : p
        )
      );
    } else {
      const newPromo: PromoCode = {
        id: `P${String(promoCodes.length + 1).padStart(3, "0")}`,
        code: promoCode.toUpperCase(),
        description: promoDesc,
        discountType,
        discountValue: Number(discountValue) || 0,
        usageCount: 0,
        usageLimit: promoUsageLimit ? Number(promoUsageLimit) : null,
        validFrom: promoValidFrom,
        validTo: promoValidTo,
        status: "Active",
        applicableTo: promoApplicableTo,
      };
      setPromoCodes((prev) => [...prev, newPromo]);
    }
    setPromoDialogOpen(false);
    resetPromoForm();
  };

  const handleCopyPromoCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPromoId(id);
    setTimeout(() => setCopiedPromoId(null), 1500);
  };

  const handleDeactivatePromo = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Disabled" } : p))
    );
  };

  // --- Gift card handlers ---
  const resetGiftCardForm = () => {
    setGiftCardValue("");
    setGcRecipientName("");
    setGcRecipientEmail("");
    setGcMessage("");
    setGcPurchaserName("");
  };

  const handleSaveGiftCard = () => {
    const value = typeof giftCardValue === "number" ? giftCardValue : 0;
    if (!value || !gcRecipientName || !gcPurchaserName) return;
    const newGc: GiftCard = {
      id: `GC${String(giftCards.length + 1).padStart(3, "0")}`,
      code: `GC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      purchaser: gcPurchaserName,
      recipient: gcRecipientName,
      originalValue: value,
      balance: value,
      status: "Active",
      purchaseDate: new Date().toISOString().split("T")[0],
      recipientEmail: gcRecipientEmail,
      message: gcMessage,
    };
    setGiftCards((prev) => [...prev, newGc]);
    setGiftCardDialogOpen(false);
    resetGiftCardForm();
  };

  const handleViewGiftCardDetails = (gc: GiftCard) => {
    setSelectedGiftCard(gc);
    setGcDetailDialogOpen(true);
  };

  const handleResendGiftCard = (gcId: string) => {
    setResendingGcId(gcId);
    setTimeout(() => setResendingGcId(null), 1500);
  };

  const handleDeactivateGiftCard = (id: string) => {
    setGiftCards((prev) =>
      prev.map((gc) => (gc.id === id ? { ...gc, status: "Disabled" } : gc))
    );
  };

  // --- Referral settings handlers ---
  const handleSaveReferralSettings = () => {
    setSavedReferralReward(Number(referralReward) || 0);
    setSavedReferralMinBooking(Number(referralMinBooking) || 0);
    setSavedReferralExpiryDays(Number(referralExpiryDays) || 0);
    setReferralSettingsOpen(false);
  };

  const openReferralSettings = () => {
    setReferralReward(String(savedReferralReward));
    setReferralMinBooking(String(savedReferralMinBooking));
    setReferralExpiryDays(String(savedReferralExpiryDays));
    setReferralSettingsOpen(true);
  };

  // --- Referrer handlers ---
  const handleViewReferrerProfile = (referrer: typeof mockReferrers[0]) => {
    setSelectedReferrer(referrer);
    setReferrerProfileOpen(true);
  };

  const handleOpenReferrerEmail = (referrer: typeof mockReferrers[0]) => {
    setSelectedReferrer(referrer);
    setReferrerEmailSubject("");
    setReferrerEmailBody("");
    setReferrerEmailOpen(true);
  };

  const handleSendReferrerEmail = () => {
    setReferrerEmailSending(true);
    setTimeout(() => {
      setReferrerEmailSending(false);
      setReferrerEmailOpen(false);
    }, 1500);
  };

  // --- Campaign handlers ---
  const resetCampaignForm = () => {
    setEditingCampaign(null);
    setCampaignName("");
    setCampaignType("Email");
    setCampaignSubject("");
    setCampaignMessage("");
    setCampaignRecipientGroup("");
    setCampaignDate("");
  };

  const openCampaignDialog = (campaign?: Campaign) => {
    if (campaign) {
      setEditingCampaign(campaign);
      setCampaignName(campaign.name);
      setCampaignType(campaign.type);
      setCampaignSubject(campaign.subject || "");
      setCampaignMessage(campaign.messageBody || "");
      setCampaignRecipientGroup(campaign.recipientGroup || "");
      setCampaignDate(campaign.date);
    } else {
      resetCampaignForm();
    }
    setCampaignDialogOpen(true);
  };

  const handleSaveCampaign = () => {
    if (editingCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaign.id
            ? {
                ...c,
                name: campaignName,
                type: campaignType,
                subject: campaignSubject,
                messageBody: campaignMessage,
                recipientGroup: campaignRecipientGroup,
                date: campaignDate,
              }
            : c
        )
      );
    } else {
      const newCampaign: Campaign = {
        id: `CM${String(campaigns.length + 1).padStart(3, "0")}`,
        name: campaignName,
        type: campaignType,
        recipients: 0,
        status: "Draft",
        openRate: null,
        date: campaignDate,
        subject: campaignSubject,
        messageBody: campaignMessage,
        recipientGroup: campaignRecipientGroup,
      };
      setCampaigns((prev) => [...prev, newCampaign]);
    }
    setCampaignDialogOpen(false);
    resetCampaignForm();
  };

  const handleViewCampaignDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCampaignDetailOpen(true);
  };

  const handleDuplicateCampaign = (campaign: Campaign) => {
    const duplicate: Campaign = {
      ...campaign,
      id: `CM${String(campaigns.length + 1).padStart(3, "0")}`,
      name: `${campaign.name} (Copy)`,
      status: "Draft",
      openRate: null,
    };
    setCampaigns((prev) => [...prev, duplicate]);
  };

  const handleSendNow = (campaign: Campaign) => {
    setCampaignToSend(campaign);
    setSendNowConfirmOpen(true);
  };

  const confirmSendNow = () => {
    if (campaignToSend) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaignToSend.id ? { ...c, status: "Sent", date: new Date().toISOString().split("T")[0] } : c
        )
      );
    }
    setSendNowConfirmOpen(false);
    setCampaignToSend(null);
  };

  const giftCardStats = {
    totalSold: giftCards.reduce((sum, gc) => sum + gc.originalValue, 0),
    activeBalance: giftCards.filter(gc => gc.status === "Active").reduce((sum, gc) => sum + gc.balance, 0),
    redeemed: giftCards.filter(gc => gc.status === "Redeemed").reduce((sum, gc) => sum + gc.originalValue, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Marketing
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage campaigns, promos, and customer engagement
          </p>
        </div>
        <Button onClick={() => openCampaignDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{campaigns.filter(c => c.status !== "Draft").length}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <Megaphone className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Gift Cards Sold</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(giftCardStats.totalSold)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Referral Signups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">28</p>
              </div>
              <div className="p-3 bg-accent-100 rounded-xl">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Email Open Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">34%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="promo-codes">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="promo-codes" className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">Promo Codes</span>
          </TabsTrigger>
          <TabsTrigger value="gift-cards" className="flex items-center gap-1">
            <Gift className="h-4 w-4" />
            <span className="hidden sm:inline">Gift Cards</span>
          </TabsTrigger>
          <TabsTrigger value="referral" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Referral</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Comms</span>
          </TabsTrigger>
        </TabsList>

        {/* Promo Codes Tab */}
        <TabsContent value="promo-codes" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openPromoDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Promo Code
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Code</th>
                      <th className="text-left p-4 font-medium text-gray-600">Description</th>
                      <th className="text-left p-4 font-medium text-gray-600">Discount</th>
                      <th className="text-left p-4 font-medium text-gray-600">Usage</th>
                      <th className="text-left p-4 font-medium text-gray-600">Valid Period</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promo) => (
                      <tr key={promo.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono font-semibold text-primary-700 bg-primary-50 px-2 py-1 rounded">
                            {promo.code}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{promo.description}</td>
                        <td className="p-4">
                          <span className="font-medium">
                            {promo.discountType === "percentage"
                              ? `${promo.discountValue}%`
                              : formatCurrency(promo.discountValue)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-600">
                            {promo.usageCount}/{promo.usageLimit ?? "Unlimited"}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {formatDate(promo.validFrom)} - {formatDate(promo.validTo)}
                        </td>
                        <td className="p-4">{getStatusBadge(promo.status)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openPromoDialog(promo)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCopyPromoCode(promo.code, promo.id)}>
                                <Copy className="h-4 w-4 mr-2" />
                                {copiedPromoId === promo.id ? "Copied!" : "Copy Code"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeactivatePromo(promo.id)}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Deactivate
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
        </TabsContent>

        {/* Gift Cards Tab */}
        <TabsContent value="gift-cards" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { resetGiftCardForm(); setGiftCardDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Gift Card
            </Button>
          </div>

          {/* Gift Card Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(giftCardStats.totalSold)}</p>
                <p className="text-sm text-foreground-muted">Total Sold</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(giftCardStats.activeBalance)}</p>
                <p className="text-sm text-foreground-muted">Active Balance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(giftCardStats.redeemed)}</p>
                <p className="text-sm text-foreground-muted">Redeemed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Card Code</th>
                      <th className="text-left p-4 font-medium text-gray-600">Purchaser</th>
                      <th className="text-left p-4 font-medium text-gray-600">Recipient</th>
                      <th className="text-left p-4 font-medium text-gray-600">Original Value</th>
                      <th className="text-left p-4 font-medium text-gray-600">Balance</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Purchase Date</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {giftCards.map((gc) => (
                      <tr key={gc.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-mono text-sm font-medium">{gc.code}</span>
                        </td>
                        <td className="p-4 text-gray-600">{gc.purchaser}</td>
                        <td className="p-4 text-gray-600">{gc.recipient}</td>
                        <td className="p-4 font-medium">{formatCurrency(gc.originalValue)}</td>
                        <td className="p-4 font-medium">
                          <span className={gc.balance > 0 ? "text-green-600" : "text-gray-400"}>
                            {formatCurrency(gc.balance)}
                          </span>
                        </td>
                        <td className="p-4">{getStatusBadge(gc.status)}</td>
                        <td className="p-4 text-sm text-gray-500">{formatDate(gc.purchaseDate)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewGiftCardDetails(gc)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResendGiftCard(gc.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                {resendingGcId === gc.id ? "Sending..." : "Resend to Recipient"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeactivateGiftCard(gc.id)}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Deactivate
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
        </TabsContent>

        {/* Referral Program Tab */}
        <TabsContent value="referral" className="mt-6 space-y-6">
          {/* Referral Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Total Referrals</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Successful</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">28</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Revenue Generated</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(1250000)}</p>
                  </div>
                  <div className="p-3 bg-accent-100 rounded-xl">
                    <Percent className="h-6 w-6 text-accent-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground-muted">Reward per Referral</p>
                    <p className="text-2xl font-bold text-primary-600 mt-1">{formatCurrency(savedReferralReward)}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Referral Program Settings</CardTitle>
                <Button variant="outline" size="sm" onClick={openReferralSettings}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-foreground-muted mb-1">Reward Amount</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(savedReferralReward)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-foreground-muted mb-1">Minimum Booking Value</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(savedReferralMinBooking)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-foreground-muted mb-1">Referral Expiry</p>
                  <p className="text-lg font-semibold text-gray-900">{savedReferralExpiryDays} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                      <th className="text-left p-4 font-medium text-gray-600">Referrals Made</th>
                      <th className="text-left p-4 font-medium text-gray-600">Successful</th>
                      <th className="text-left p-4 font-medium text-gray-600">Total Earned</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReferrers.map((referrer, index) => (
                      <tr key={referrer.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-700">
                                {referrer.name.split(" ").map(n => n[0]).join("")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{referrer.name}</span>
                              {index === 0 && (
                                <Badge className="bg-amber-100 text-amber-700">Top Referrer</Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{referrer.referralsMade}</td>
                        <td className="p-4">
                          <span className="text-green-600 font-medium">{referrer.successful}</span>
                        </td>
                        <td className="p-4 font-medium">{formatCurrency(referrer.totalEarned)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewReferrerProfile(referrer)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenReferrerEmail(referrer)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
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
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openCampaignDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Campaign Name</th>
                      <th className="text-left p-4 font-medium text-gray-600">Type</th>
                      <th className="text-left p-4 font-medium text-gray-600">Recipients</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Open Rate</th>
                      <th className="text-left p-4 font-medium text-gray-600">Date</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4 font-medium">{campaign.name}</td>
                        <td className="p-4">{getCampaignTypeBadge(campaign.type)}</td>
                        <td className="p-4 text-gray-600">{campaign.recipients.toLocaleString()}</td>
                        <td className="p-4">{getStatusBadge(campaign.status)}</td>
                        <td className="p-4">
                          {campaign.openRate !== null ? (
                            <span className="font-medium">{campaign.openRate}%</span>
                          ) : (
                            <span className="text-gray-400">--</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-gray-500">{formatDate(campaign.date)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCampaignDetails(campaign)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openCampaignDialog(campaign)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              {campaign.status === "Draft" && (
                                <DropdownMenuItem onClick={() => handleSendNow(campaign)}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Now
                                </DropdownMenuItem>
                              )}
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
        </TabsContent>
      </Tabs>

      {/* Create/Edit Promo Code Dialog */}
      <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPromo ? "Edit Promo Code" : "Create Promo Code"}</DialogTitle>
            <DialogDescription>
              {editingPromo ? "Update the promotional code details." : "Set up a new promotional code for your customers."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promoCode">Code</Label>
                <Input
                  id="promoCode"
                  placeholder="e.g. SUMMER20"
                  className="mt-1 font-mono uppercase"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="promoDesc">Description</Label>
                <Input
                  id="promoDesc"
                  placeholder="Short description"
                  className="mt-1"
                  value={promoDesc}
                  onChange={(e) => setPromoDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Discount Type</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={discountType === "percentage" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setDiscountType("percentage")}
                  >
                    Percentage
                  </Button>
                  <Button
                    variant={discountType === "fixed" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setDiscountType("fixed")}
                  >
                    Fixed
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="discountValue">Discount Value</Label>
                <Input
                  id="discountValue"
                  type="number"
                  placeholder={discountType === "percentage" ? "e.g. 20" : "e.g. 5000"}
                  className="mt-1"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minOrder">Minimum Order</Label>
                <Input
                  id="minOrder"
                  type="number"
                  placeholder="0"
                  className="mt-1"
                  value={promoMinOrder}
                  onChange={(e) => setPromoMinOrder(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  placeholder="Unlimited"
                  className="mt-1"
                  value={promoUsageLimit}
                  onChange={(e) => setPromoUsageLimit(e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="validFrom">Valid From</Label>
                <Input
                  id="validFrom"
                  type="date"
                  className="mt-1"
                  value={promoValidFrom}
                  onChange={(e) => setPromoValidFrom(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="validTo">Valid To</Label>
                <Input
                  id="validTo"
                  type="date"
                  className="mt-1"
                  value={promoValidTo}
                  onChange={(e) => setPromoValidTo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Applicable To</Label>
              <div className="flex gap-2 mt-1">
                {(["All", "Services", "Products"] as const).map((option) => (
                  <Button
                    key={option}
                    variant={promoApplicableTo === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPromoApplicableTo(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPromoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePromo}>
              {editingPromo ? "Save Changes" : "Create Promo Code"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Gift Card Dialog */}
      <Dialog open={giftCardDialogOpen} onOpenChange={setGiftCardDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Gift Card</DialogTitle>
            <DialogDescription>
              Issue a new gift card for a customer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                placeholder="Enter recipient's name"
                className="mt-1"
                value={gcRecipientName}
                onChange={(e) => setGcRecipientName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                placeholder="Enter recipient's email"
                className="mt-1"
                value={gcRecipientEmail}
                onChange={(e) => setGcRecipientEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Value</Label>
              <div className="grid grid-cols-5 gap-2 mt-1">
                {[10000, 25000, 50000, 100000].map((value) => (
                  <Button
                    key={value}
                    variant={giftCardValue === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGiftCardValue(value)}
                  >
                    {value >= 1000 ? `${formatCurrency(value).replace("NGN", "").trim()}` : formatCurrency(value)}
                  </Button>
                ))}
                <Button
                  variant={typeof giftCardValue === "number" && ![10000, 25000, 50000, 100000].includes(giftCardValue) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGiftCardValue("")}
                >
                  Custom
                </Button>
              </div>
              {(giftCardValue === "" || (typeof giftCardValue === "number" && ![10000, 25000, 50000, 100000].includes(giftCardValue))) && (
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  className="mt-2"
                  onChange={(e) => setGiftCardValue(e.target.value ? Number(e.target.value) : "")}
                />
              )}
            </div>

            <div>
              <Label htmlFor="giftMessage">Personal Message</Label>
              <Input
                id="giftMessage"
                placeholder="Add a personal message (optional)"
                className="mt-1"
                value={gcMessage}
                onChange={(e) => setGcMessage(e.target.value)}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="purchaserName">Purchaser Name</Label>
              <Input
                id="purchaserName"
                placeholder="Enter purchaser's name"
                className="mt-1"
                value={gcPurchaserName}
                onChange={(e) => setGcPurchaserName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setGiftCardDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGiftCard}>
              Create Gift Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gift Card Detail Dialog */}
      <Dialog open={gcDetailDialogOpen} onOpenChange={setGcDetailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gift Card Details</DialogTitle>
          </DialogHeader>
          {selectedGiftCard && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="font-mono text-lg font-bold text-primary-700">{selectedGiftCard.code}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-muted">Purchaser</p>
                  <p className="font-medium">{selectedGiftCard.purchaser}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Recipient</p>
                  <p className="font-medium">{selectedGiftCard.recipient}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Original Value</p>
                  <p className="font-medium">{formatCurrency(selectedGiftCard.originalValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Remaining Balance</p>
                  <p className="font-medium text-green-600">{formatCurrency(selectedGiftCard.balance)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Status</p>
                  {getStatusBadge(selectedGiftCard.status)}
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Purchase Date</p>
                  <p className="font-medium">{formatDate(selectedGiftCard.purchaseDate)}</p>
                </div>
                {selectedGiftCard.recipientEmail && (
                  <div className="col-span-2">
                    <p className="text-sm text-foreground-muted">Recipient Email</p>
                    <p className="font-medium">{selectedGiftCard.recipientEmail}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setGcDetailDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Referral Settings Dialog */}
      <Dialog open={referralSettingsOpen} onOpenChange={setReferralSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Referral Settings</DialogTitle>
            <DialogDescription>
              Update your referral program configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="referralReward">Reward Amount (NGN)</Label>
              <Input
                id="referralReward"
                type="number"
                className="mt-1"
                value={referralReward}
                onChange={(e) => setReferralReward(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="referralMinBooking">Minimum Booking Value (NGN)</Label>
              <Input
                id="referralMinBooking"
                type="number"
                className="mt-1"
                value={referralMinBooking}
                onChange={(e) => setReferralMinBooking(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="referralExpiryDays">Expiry Days</Label>
              <Input
                id="referralExpiryDays"
                type="number"
                className="mt-1"
                value={referralExpiryDays}
                onChange={(e) => setReferralExpiryDays(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReferralSettingsOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveReferralSettings}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Referrer Profile Dialog */}
      <Dialog open={referrerProfileOpen} onOpenChange={setReferrerProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Referrer Profile</DialogTitle>
          </DialogHeader>
          {selectedReferrer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-700">
                    {selectedReferrer.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold">{selectedReferrer.name}</p>
                  <p className="text-sm text-foreground-muted">{selectedReferrer.email}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-muted">Phone</p>
                  <p className="font-medium">{selectedReferrer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Member Since</p>
                  <p className="font-medium">{formatDate(selectedReferrer.joinDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Referrals Made</p>
                  <p className="font-medium">{selectedReferrer.referralsMade}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Successful</p>
                  <p className="font-medium text-green-600">{selectedReferrer.successful}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-foreground-muted">Total Earned</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(selectedReferrer.totalEarned)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReferrerProfileOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email to Referrer Dialog */}
      <Dialog open={referrerEmailOpen} onOpenChange={setReferrerEmailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedReferrer?.name}</DialogTitle>
            <DialogDescription>
              Compose and send an email to this referrer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>To</Label>
              <Input className="mt-1" value={selectedReferrer?.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="emailSubject">Subject</Label>
              <Input
                id="emailSubject"
                placeholder="Email subject"
                className="mt-1"
                value={referrerEmailSubject}
                onChange={(e) => setReferrerEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emailBody">Message</Label>
              <Textarea
                id="emailBody"
                placeholder="Write your message..."
                className="mt-1"
                value={referrerEmailBody}
                onChange={(e) => setReferrerEmailBody(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReferrerEmailOpen(false)}>Cancel</Button>
            <Button onClick={handleSendReferrerEmail} disabled={referrerEmailSending}>
              {referrerEmailSending ? "Sending..." : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Campaign Dialog */}
      <Dialog open={campaignDialogOpen} onOpenChange={setCampaignDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCampaign ? "Edit Campaign" : "New Campaign"}</DialogTitle>
            <DialogDescription>
              {editingCampaign ? "Update the campaign details." : "Create a new marketing campaign."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                placeholder="e.g. Spring Promotion"
                className="mt-1"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            <div>
              <Label>Type</Label>
              <div className="flex gap-2 mt-1">
                {(["Email", "SMS", "WhatsApp"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={campaignType === type ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setCampaignType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="campaignSubject">Subject / Title</Label>
              <Input
                id="campaignSubject"
                placeholder="Subject line or title"
                className="mt-1"
                value={campaignSubject}
                onChange={(e) => setCampaignSubject(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="campaignMessage">Message</Label>
              <Textarea
                id="campaignMessage"
                placeholder="Compose your message..."
                className="mt-1"
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
              />
            </div>
            <div>
              <Label>Recipient Group</Label>
              <Select value={campaignRecipientGroup} onValueChange={setCampaignRecipientGroup}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select recipient group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Subscribers">All Subscribers</SelectItem>
                  <SelectItem value="New Customers">New Customers</SelectItem>
                  <SelectItem value="Active Members">Active Members</SelectItem>
                  <SelectItem value="Inactive Customers">Inactive Customers</SelectItem>
                  <SelectItem value="Birthday This Month">Birthday This Month</SelectItem>
                  <SelectItem value="VIP Customers">VIP Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="campaignDate">Schedule Date</Label>
              <Input
                id="campaignDate"
                type="date"
                className="mt-1"
                value={campaignDate}
                onChange={(e) => setCampaignDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCampaignDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCampaign}>
              {editingCampaign ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Detail Dialog */}
      <Dialog open={campaignDetailOpen} onOpenChange={setCampaignDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-foreground-muted">Name</p>
                <p className="text-lg font-semibold">{selectedCampaign.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-muted">Type</p>
                  {getCampaignTypeBadge(selectedCampaign.type)}
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Status</p>
                  {getStatusBadge(selectedCampaign.status)}
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Recipients</p>
                  <p className="font-medium">{selectedCampaign.recipients.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Open Rate</p>
                  <p className="font-medium">
                    {selectedCampaign.openRate !== null ? `${selectedCampaign.openRate}%` : "--"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Date</p>
                  <p className="font-medium">{formatDate(selectedCampaign.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Recipient Group</p>
                  <p className="font-medium">{selectedCampaign.recipientGroup || "--"}</p>
                </div>
              </div>
              {selectedCampaign.subject && (
                <div>
                  <p className="text-sm text-foreground-muted">Subject</p>
                  <p className="font-medium">{selectedCampaign.subject}</p>
                </div>
              )}
              {selectedCampaign.messageBody && (
                <div>
                  <p className="text-sm text-foreground-muted">Message</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedCampaign.messageBody}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCampaignDetailOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Now Confirmation Dialog */}
      <Dialog open={sendNowConfirmOpen} onOpenChange={setSendNowConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Send Campaign Now?</DialogTitle>
            <DialogDescription>
              Are you sure you want to send &quot;{campaignToSend?.name}&quot; immediately? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendNowConfirmOpen(false)}>Cancel</Button>
            <Button onClick={confirmSendNow}>Yes, Send Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
