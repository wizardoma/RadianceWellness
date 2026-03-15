"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Palmtree,
  CalendarDays,
  Users,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
} from "@radiance/ui";

// Types
type RequestStatus = "Approved" | "Pending" | "Rejected";
type LeaveType = "Vacation" | "Sick Leave" | "Personal" | "Other";

interface TimeOffRequest {
  id: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: RequestStatus;
}

interface TeamTimeOff {
  name: string;
  dates: string;
  type: string;
}

// Mock data
const initialRequests: TimeOffRequest[] = [
  {
    id: "TO001",
    type: "Vacation",
    startDate: "2026-03-28",
    endDate: "2026-03-30",
    duration: 3,
    reason: "Family event",
    status: "Approved",
  },
  {
    id: "TO002",
    type: "Personal",
    startDate: "2026-04-10",
    endDate: "2026-04-10",
    duration: 1,
    reason: "Doctor's appointment",
    status: "Pending",
  },
  {
    id: "TO003",
    type: "Vacation",
    startDate: "2026-05-01",
    endDate: "2026-05-05",
    duration: 5,
    reason: "Annual leave",
    status: "Approved",
  },
  {
    id: "TO004",
    type: "Sick Leave",
    startDate: "2026-02-15",
    endDate: "2026-02-15",
    duration: 1,
    reason: "Flu",
    status: "Approved",
  },
  {
    id: "TO005",
    type: "Personal",
    startDate: "2026-01-20",
    endDate: "2026-01-20",
    duration: 1,
    reason: "Moving house",
    status: "Approved",
  },
];

const teamTimeOff: TeamTimeOff[] = [
  { name: "Fatima Mohammed", dates: "Mar 22-24", type: "Vacation" },
  { name: "Grace Okafor", dates: "Apr 1", type: "Personal" },
  { name: "Amina Bello", dates: "Apr 5-7", type: "Vacation" },
];

const emptyRequestForm = {
  type: "" as string,
  startDate: "",
  endDate: "",
  reason: "",
};

function getTypeBadge(type: LeaveType) {
  const styles: Record<LeaveType, string> = {
    Vacation: "bg-blue-100 text-blue-700",
    "Sick Leave": "bg-red-100 text-red-700",
    Personal: "bg-purple-100 text-purple-700",
    Other: "bg-gray-100 text-gray-700",
  };
  return <Badge className={styles[type]}>{type}</Badge>;
}

function getStatusBadge(status: RequestStatus) {
  switch (status) {
    case "Approved":
      return (
        <Badge className="bg-green-100 text-green-700">
          <CheckCircle className="mr-1 h-3 w-3" />
          Approved
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-amber-100 text-amber-700">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case "Rejected":
      return (
        <Badge className="bg-red-100 text-red-700">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
  }
}

function formatDateDisplay(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
}

function formatDateRange(startDate: string, endDate: string) {
  if (startDate === endDate) {
    return formatDateDisplay(startDate);
  }
  return `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`;
}

function calculateDuration(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 0;
}

export default function TimeOffPage() {
  const [requests, setRequests] = useState<TimeOffRequest[]>(initialRequests);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestForm, setRequestForm] = useState(emptyRequestForm);

  // Computed stats
  const usedDays = requests
    .filter((r) => r.status === "Approved")
    .reduce((sum, r) => sum + r.duration, 0);
  const totalAllowance = 20;
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const availableDays = totalAllowance - usedDays;

  // Dialog duration preview
  const formDuration = calculateDuration(requestForm.startDate, requestForm.endDate);

  const handleSubmitRequest = () => {
    if (!requestForm.type || !requestForm.startDate || !requestForm.endDate) return;
    const duration = calculateDuration(requestForm.startDate, requestForm.endDate);
    if (duration <= 0) return;

    const newRequest: TimeOffRequest = {
      id: `TO${Date.now()}`,
      type: requestForm.type as LeaveType,
      startDate: requestForm.startDate,
      endDate: requestForm.endDate,
      duration,
      reason: requestForm.reason,
      status: "Pending",
    };
    setRequests((prev) => [newRequest, ...prev]);
    setRequestForm(emptyRequestForm);
    setRequestDialogOpen(false);
  };

  const handleCancelRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Time Off
          </h1>
          <p className="text-foreground-secondary mt-1">
            Request and manage your leave
          </p>
        </div>
        <Button
          onClick={() => {
            setRequestForm(emptyRequestForm);
            setRequestDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Request Time Off
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CalendarDays className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{availableDays}</p>
                <p className="text-sm text-foreground-muted">
                  Available Days{" "}
                  <span className="text-xs text-gray-400">
                    of {totalAllowance}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-sm text-foreground-muted">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Palmtree className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{usedDays}</p>
                <p className="text-sm text-foreground-muted">Used This Year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Requests + Team Calendar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Section 1: My Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-600" />
                My Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No time off requests yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-gray-500">
                          Type
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">
                          Dates
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">
                          Duration
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">
                          Reason
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-gray-500">
                          Status
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b border-border last:border-b-0 hover:bg-gray-50"
                        >
                          <td className="py-3 px-2">
                            {getTypeBadge(request.type)}
                          </td>
                          <td className="py-3 px-2 text-gray-700">
                            {formatDateRange(request.startDate, request.endDate)}
                          </td>
                          <td className="py-3 px-2 text-gray-700">
                            {request.duration} {request.duration === 1 ? "day" : "days"}
                          </td>
                          <td className="py-3 px-2 text-gray-600 max-w-[200px] truncate">
                            {request.reason}
                          </td>
                          <td className="py-3 px-2">
                            {getStatusBadge(request.status)}
                          </td>
                          <td className="py-3 px-2 text-right">
                            {request.status === "Pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleCancelRequest(request.id)}
                              >
                                Cancel
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section 2: Team Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-600" />
              Team Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500 mb-4">
              Upcoming time off from your team
            </p>
            <div className="space-y-3">
              {teamTimeOff.map((member, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary-700">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {member.dates}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-xs"
                    >
                      {member.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Time Off Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Time Off</DialogTitle>
            <DialogDescription>
              Submit a new time off request for approval.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Leave Type</Label>
              <Select
                value={requestForm.type}
                onValueChange={(value) =>
                  setRequestForm({ ...requestForm, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                  <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={requestForm.startDate}
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={requestForm.endDate}
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            {formDuration > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Duration: {formDuration} {formDuration === 1 ? "day" : "days"}
                </span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Reason for your time off request"
                value={requestForm.reason}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, reason: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRequestDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
