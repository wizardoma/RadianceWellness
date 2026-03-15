"use client";

import { useState } from "react";
import {
  Plus,
  Users,
  DollarSign,
  TrendingUp,
  UserPlus,
  Edit,
  Eye,
  MoreVertical,
  Search,
  Crown,
  Star,
  Award,
  Check,
  X,
  BarChart3,
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
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@radiance/ui";
import { formatCurrency } from "@radiance/utils";

// Types
type Member = {
  id: string;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  renewalDate: string;
  status: string;
  totalSpent: number;
};

// Mock membership plans
const mockPlans = [
  {
    id: "P001",
    name: "Silver",
    price: 25000,
    color: "gray",
    icon: Award,
    activeMembers: 34,
    benefits: [
      "10% discount on services",
      "5% discount on products",
      "1 free sauna session/month",
      "Priority booking",
    ],
  },
  {
    id: "P002",
    name: "Gold",
    price: 45000,
    color: "amber",
    icon: Star,
    activeMembers: 38,
    benefits: [
      "15% discount on services",
      "10% discount on products",
      "2 free sauna sessions/month",
      "1 free basic massage/quarter",
      "Priority booking",
      "Free cancellation",
    ],
  },
  {
    id: "P003",
    name: "Platinum",
    price: 75000,
    color: "purple",
    icon: Crown,
    activeMembers: 14,
    benefits: [
      "20% discount on services",
      "15% discount on products",
      "Unlimited sauna access",
      "1 free premium massage/month",
      "Priority booking",
      "Free cancellation",
      "Complimentary birthday treatment",
      "VIP lounge access",
    ],
  },
];

// Mock members
const initialMembers: Member[] = [
  { id: "M001", name: "Ngozi Adekunle", email: "ngozi@email.com", plan: "Gold", startDate: "2025-06-15", renewalDate: "2026-06-15", status: "Active", totalSpent: 540000 },
  { id: "M002", name: "Emeka Obi", email: "emeka@email.com", plan: "Silver", startDate: "2025-09-01", renewalDate: "2026-09-01", status: "Active", totalSpent: 300000 },
  { id: "M003", name: "Fatima Bello", email: "fatima@email.com", plan: "Platinum", startDate: "2025-03-10", renewalDate: "2026-03-10", status: "Expiring Soon", totalSpent: 900000 },
  { id: "M004", name: "Adaora Nwachukwu", email: "adaora@email.com", plan: "Gold", startDate: "2025-08-22", renewalDate: "2026-08-22", status: "Active", totalSpent: 405000 },
  { id: "M005", name: "Chukwuma Okoro", email: "chukwuma@email.com", plan: "Silver", startDate: "2025-11-05", renewalDate: "2026-11-05", status: "Active", totalSpent: 175000 },
  { id: "M006", name: "Yetunde Afolabi", email: "yetunde@email.com", plan: "Gold", startDate: "2025-01-18", renewalDate: "2026-01-18", status: "Expired", totalSpent: 585000 },
  { id: "M007", name: "Obioma Eze", email: "obioma@email.com", plan: "Platinum", startDate: "2025-07-30", renewalDate: "2026-07-30", status: "Active", totalSpent: 750000 },
  { id: "M008", name: "Halima Yusuf", email: "halima@email.com", plan: "Silver", startDate: "2025-10-12", renewalDate: "2026-10-12", status: "Active", totalSpent: 225000 },
];

// Mock usage data
const mockUsageByTier = [
  { tier: "Silver", saunaSessions: 28, priorityBookings: 52, productPurchases: 41 },
  { tier: "Gold", saunaSessions: 64, priorityBookings: 89, massages: 12, productPurchases: 67 },
  { tier: "Platinum", saunaSessions: 45, priorityBookings: 38, massages: 14, productPurchases: 29, vipLounge: 22, birthdayTreatments: 3 },
];

const mostUsedBenefits = [
  { benefit: "Priority Booking", usage: 179, percentage: 92 },
  { benefit: "Sauna Sessions", usage: 137, percentage: 78 },
  { benefit: "Product Discounts", usage: 137, percentage: 75 },
  { benefit: "Service Discounts", usage: 124, percentage: 71 },
  { benefit: "Free Massages", usage: 26, percentage: 48 },
  { benefit: "VIP Lounge Access", usage: 22, percentage: 39 },
];

const monthlyUsageTrends = [
  { month: "Oct", total: 142 },
  { month: "Nov", total: 168 },
  { month: "Dec", total: 195 },
  { month: "Jan", total: 178 },
  { month: "Feb", total: 210 },
  { month: "Mar", total: 224 },
];

const getPlanBadge = (plan: string) => {
  const colors: Record<string, string> = {
    Silver: "bg-gray-100 text-gray-700",
    Gold: "bg-amber-100 text-amber-700",
    Platinum: "bg-purple-100 text-purple-700",
  };
  return <Badge className={colors[plan] || ""}>{plan}</Badge>;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-700">Active</Badge>;
    case "Expiring Soon":
      return <Badge className="bg-amber-100 text-amber-700">Expiring Soon</Badge>;
    case "Expired":
      return <Badge className="bg-red-100 text-red-700">Expired</Badge>;
    case "Paused":
      return <Badge className="bg-blue-100 text-blue-700">Paused</Badge>;
    case "Cancelled":
      return <Badge className="bg-gray-100 text-gray-700">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const planCardColors: Record<string, { bg: string; border: string; icon: string; badge: string; accent: string }> = {
  gray: { bg: "bg-gray-50", border: "border-gray-200", icon: "text-gray-600 bg-gray-100", badge: "bg-gray-100 text-gray-700", accent: "text-gray-700" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600 bg-amber-100", badge: "bg-amber-100 text-amber-700", accent: "text-amber-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600 bg-purple-100", badge: "bg-purple-100 text-purple-700", accent: "text-purple-700" },
};

export default function MembershipsPage() {
  // --- Stateful members ---
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // --- Tab control ---
  const [activeTab, setActiveTab] = useState("plans");

  // --- Plan dialog ---
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<typeof mockPlans[0] | null>(null);

  // --- Search/filter ---
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // --- Plan form ---
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");
  const [newPlanDescription, setNewPlanDescription] = useState("");
  const [newPlanServiceDiscount, setNewPlanServiceDiscount] = useState("");
  const [newPlanProductDiscount, setNewPlanProductDiscount] = useState("");
  const [newPlanBenefits, setNewPlanBenefits] = useState<string[]>([]);
  const [newBenefitInput, setNewBenefitInput] = useState("");
  const [newPlanActive, setNewPlanActive] = useState(true);

  // --- Member profile dialog ---
  const [memberProfileOpen, setMemberProfileOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // --- Change plan dialog ---
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [changePlanMember, setChangePlanMember] = useState<Member | null>(null);
  const [changePlanTarget, setChangePlanTarget] = useState("");

  // --- Pause membership dialog ---
  const [pauseConfirmOpen, setPauseConfirmOpen] = useState(false);
  const [pauseMember, setPauseMember] = useState<Member | null>(null);

  // --- Cancel membership dialog ---
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [cancelMember, setCancelMember] = useState<Member | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = !planFilter || member.plan === planFilter;
    const matchesStatus = !statusFilter || member.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddBenefit = () => {
    if (newBenefitInput.trim()) {
      setNewPlanBenefits([...newPlanBenefits, newBenefitInput.trim()]);
      setNewBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setNewPlanBenefits(newPlanBenefits.filter((_, i) => i !== index));
  };

  const resetPlanForm = () => {
    setEditingPlan(null);
    setNewPlanName("");
    setNewPlanPrice("");
    setNewPlanDescription("");
    setNewPlanServiceDiscount("");
    setNewPlanProductDiscount("");
    setNewPlanBenefits([]);
    setNewPlanActive(true);
  };

  const openCreateDialog = (plan?: typeof mockPlans[0]) => {
    if (plan) {
      setEditingPlan(plan);
      setNewPlanName(plan.name);
      setNewPlanPrice(String(plan.price));
      setNewPlanDescription("");
      setNewPlanServiceDiscount("");
      setNewPlanProductDiscount("");
      setNewPlanBenefits([...plan.benefits]);
      setNewPlanActive(true);
    } else {
      resetPlanForm();
    }
    setCreateDialogOpen(true);
  };

  const handleCreatePlan = () => {
    setCreateDialogOpen(false);
    resetPlanForm();
  };

  const handleViewMembers = (planName: string) => {
    setPlanFilter(planName);
    setActiveTab("members");
  };

  // --- Member action handlers ---
  const handleViewMemberProfile = (member: Member) => {
    setSelectedMember(member);
    setMemberProfileOpen(true);
  };

  const handleOpenChangePlan = (member: Member) => {
    setChangePlanMember(member);
    setChangePlanTarget(member.plan);
    setChangePlanOpen(true);
  };

  const handleConfirmChangePlan = () => {
    if (changePlanMember && changePlanTarget) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === changePlanMember.id ? { ...m, plan: changePlanTarget } : m
        )
      );
    }
    setChangePlanOpen(false);
    setChangePlanMember(null);
  };

  const handleOpenPause = (member: Member) => {
    setPauseMember(member);
    setPauseConfirmOpen(true);
  };

  const handleConfirmPause = () => {
    if (pauseMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === pauseMember.id ? { ...m, status: "Paused" } : m
        )
      );
    }
    setPauseConfirmOpen(false);
    setPauseMember(null);
  };

  const handleOpenCancel = (member: Member) => {
    setCancelMember(member);
    setCancelReason("");
    setCancelConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    if (cancelMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === cancelMember.id ? { ...m, status: "Cancelled" } : m
        )
      );
    }
    setCancelConfirmOpen(false);
    setCancelMember(null);
    setCancelReason("");
  };

  const maxUsageTrend = Math.max(...monthlyUsageTrends.map((d) => d.total));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Memberships
          </h1>
          <p className="text-foreground-secondary mt-1">
            Manage membership plans and members
          </p>
        </div>
        <Button onClick={() => openCreateDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Active Members</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{members.filter(m => m.status === "Active").length}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5 from last month
                </p>
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
                <p className="text-sm text-foreground-muted">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(1450000)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">Retention Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">92%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2% from last month
                </p>
              </div>
              <div className="p-3 bg-accent-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-muted">New This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3 from last month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs (controlled) */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {mockPlans.map((plan) => {
              const colors = planCardColors[plan.color];
              const IconComp = plan.icon;
              return (
                <Card key={plan.id} className={`${colors.bg} ${colors.border} border-2`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${colors.icon}`}>
                          <IconComp className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{plan.name}</h3>
                          <p className={`text-xl font-bold ${colors.accent}`}>
                            {formatCurrency(plan.price)}
                            <span className="text-sm font-normal text-gray-500">/month</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <ul className="space-y-2 mb-6">
                      {plan.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${colors.accent}`} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mb-4 p-3 bg-white/60 rounded-lg">
                      <span className="text-sm text-gray-600">Active members</span>
                      <span className="font-bold text-gray-900">{plan.activeMembers}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openCreateDialog(plan)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewMembers(plan.name)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View Members
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search members..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={planFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setPlanFilter(null)}
              >
                All Plans
              </Button>
              {["Silver", "Gold", "Platinum"].map((plan) => (
                <Button
                  key={plan}
                  variant={planFilter === plan ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlanFilter(plan)}
                >
                  {plan}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                All Status
              </Button>
              {["Active", "Expiring Soon", "Expired", "Paused", "Cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Members Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Name</th>
                      <th className="text-left p-4 font-medium text-gray-600">Email</th>
                      <th className="text-left p-4 font-medium text-gray-600">Plan</th>
                      <th className="text-left p-4 font-medium text-gray-600">Start Date</th>
                      <th className="text-left p-4 font-medium text-gray-600">Renewal Date</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-right p-4 font-medium text-gray-600">Total Spent</th>
                      <th className="text-right p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="border-b border-border hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-700">
                                {member.name.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{member.email}</td>
                        <td className="p-4">{getPlanBadge(member.plan)}</td>
                        <td className="p-4 text-sm text-gray-600">{formatDate(member.startDate)}</td>
                        <td className="p-4 text-sm text-gray-600">{formatDate(member.renewalDate)}</td>
                        <td className="p-4">{getStatusBadge(member.status)}</td>
                        <td className="p-4 text-right font-medium">{formatCurrency(member.totalSpent)}</td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewMemberProfile(member)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenChangePlan(member)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Change Plan
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenPause(member)}>
                                Pause Membership
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleOpenCancel(member)}>
                                Cancel Membership
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

        {/* Usage Tab */}
        <TabsContent value="usage" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Benefit Usage by Tier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Benefit Usage by Tier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockUsageByTier.map((tier) => {
                    const tierColors: Record<string, string> = {
                      Silver: "from-gray-400 to-gray-500",
                      Gold: "from-amber-400 to-amber-500",
                      Platinum: "from-purple-400 to-purple-500",
                    };
                    const entries = Object.entries(tier).filter(([key]) => key !== "tier");
                    const maxVal = Math.max(...entries.map(([, v]) => v as number));
                    return (
                      <div key={tier.tier}>
                        <p className="font-medium mb-2">{tier.tier}</p>
                        <div className="space-y-2">
                          {entries.map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3">
                              <span className="w-32 text-xs text-gray-500 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${tierColors[tier.tier]} rounded-full flex items-center justify-end pr-2`}
                                  style={{ width: `${((value as number) / maxVal) * 100}%` }}
                                >
                                  <span className="text-[10px] text-white font-medium">{value as number}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Most Used Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Most Used Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostUsedBenefits.map((item, index) => (
                    <div key={item.benefit} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{item.benefit}</p>
                          <p className="text-xs text-gray-500">{item.usage} uses this month</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Usage Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Usage Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyUsageTrends.map((data) => (
                  <div key={data.month} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-gray-600">{data.month}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-end pr-3"
                        style={{ width: `${(data.total / maxUsageTrend) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {data.total} uses
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Plan Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan ? `Edit ${editingPlan.name} Plan` : "Create Membership Plan"}</DialogTitle>
            <DialogDescription>
              {editingPlan ? "Update the membership plan details." : "Set up a new membership tier for your customers."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                placeholder="e.g. Diamond"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="planPrice">Monthly Price (NGN)</Label>
              <Input
                id="planPrice"
                type="number"
                placeholder="e.g. 50000"
                value={newPlanPrice}
                onChange={(e) => setNewPlanPrice(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="planDescription">Description</Label>
              <Input
                id="planDescription"
                placeholder="Brief description of this plan"
                value={newPlanDescription}
                onChange={(e) => setNewPlanDescription(e.target.value)}
                className="mt-1"
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceDiscount">Discount % on Services</Label>
                <Input
                  id="serviceDiscount"
                  type="number"
                  placeholder="e.g. 15"
                  value={newPlanServiceDiscount}
                  onChange={(e) => setNewPlanServiceDiscount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="productDiscount">Discount % on Products</Label>
                <Input
                  id="productDiscount"
                  type="number"
                  placeholder="e.g. 10"
                  value={newPlanProductDiscount}
                  onChange={(e) => setNewPlanProductDiscount(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Separator />

            <div>
              <Label>Benefits</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="Add a benefit..."
                  value={newBenefitInput}
                  onChange={(e) => setNewBenefitInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBenefit();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddBenefit}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newPlanBenefits.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {newPlanBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                      <span className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-600" />
                        {benefit}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveBenefit(index)}
                      >
                        <X className="h-3 w-3 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="planStatus">Status</Label>
                <p className="text-sm text-foreground-muted">Enable this plan for new sign-ups</p>
              </div>
              <Switch
                id="planStatus"
                checked={newPlanActive}
                onCheckedChange={setNewPlanActive}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlan}>
              {editingPlan ? "Save Changes" : "Create Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Member Profile Dialog */}
      <Dialog open={memberProfileOpen} onOpenChange={setMemberProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Member Profile</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-700">
                    {selectedMember.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold">{selectedMember.name}</p>
                  <p className="text-sm text-foreground-muted">{selectedMember.email}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground-muted">Plan</p>
                  {getPlanBadge(selectedMember.plan)}
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Status</p>
                  {getStatusBadge(selectedMember.status)}
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Start Date</p>
                  <p className="font-medium">{formatDate(selectedMember.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Renewal Date</p>
                  <p className="font-medium">{formatDate(selectedMember.renewalDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-foreground-muted">Total Spent</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrency(selectedMember.totalSpent)}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Recent Visits</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                    <span>Swedish Massage (60 min)</span>
                    <span className="text-gray-500">Mar 12, 2026</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                    <span>Sauna Session</span>
                    <span className="text-gray-500">Mar 8, 2026</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                    <span>Classic Facial (45 min)</span>
                    <span className="text-gray-500">Feb 28, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberProfileOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan Dialog */}
      <Dialog open={changePlanOpen} onOpenChange={setChangePlanOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>
              Update the membership plan for {changePlanMember?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Current Plan</Label>
              <p className="mt-1">{changePlanMember && getPlanBadge(changePlanMember.plan)}</p>
            </div>
            <div>
              <Label>New Plan</Label>
              <Select value={changePlanTarget} onValueChange={setChangePlanTarget}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangePlanOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmChangePlan}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pause Membership Confirmation */}
      <Dialog open={pauseConfirmOpen} onOpenChange={setPauseConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Pause Membership?</DialogTitle>
            <DialogDescription>
              Are you sure you want to pause the membership for {pauseMember?.name}? They will retain their plan but benefits will be suspended.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPauseConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmPause}>Yes, Pause</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Membership Confirmation */}
      <Dialog open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cancel Membership?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel the membership for {cancelMember?.name}? This action will end their membership.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancelReason">Reason for cancellation</Label>
              <Textarea
                id="cancelReason"
                placeholder="Enter reason (optional)..."
                className="mt-1"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelConfirmOpen(false)}>Keep Active</Button>
            <Button variant="default" className="bg-red-600 hover:bg-red-700" onClick={handleConfirmCancel}>
              Cancel Membership
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
