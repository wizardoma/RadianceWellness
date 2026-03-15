"use client";

import { useState } from "react";
import {
  Clock,
  Plus,
  Trash2,
  Save,
  CalendarDays,
  CheckCircle,
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
  Separator,
  Switch,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radiance/ui";

// Types
interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface ScheduleException {
  id: string;
  date: string;
  type: "Modified Hours" | "Day Off" | "Extended Hours";
  startTime: string;
  endTime: string;
  reason: string;
}

// Default schedule for Chidi Eze
const initialWeeklySchedule: DaySchedule[] = [
  { day: "Monday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "Thursday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "Friday", enabled: true, startTime: "09:00", endTime: "18:00" },
  { day: "Saturday", enabled: true, startTime: "10:00", endTime: "16:00" },
  { day: "Sunday", enabled: false, startTime: "09:00", endTime: "18:00" },
];

const initialExceptions: ScheduleException[] = [
  {
    id: "EX001",
    date: "2026-03-20",
    type: "Modified Hours",
    startTime: "10:00",
    endTime: "14:00",
    reason: "Dentist appointment",
  },
  {
    id: "EX002",
    date: "2026-03-25",
    type: "Day Off",
    startTime: "",
    endTime: "",
    reason: "Personal",
  },
  {
    id: "EX003",
    date: "2026-04-02",
    type: "Extended Hours",
    startTime: "08:00",
    endTime: "20:00",
    reason: "Covering for colleague",
  },
];

const emptyExceptionForm = {
  date: "",
  type: "" as string,
  startTime: "09:00",
  endTime: "17:00",
  reason: "",
};

function getExceptionTypeBadge(type: ScheduleException["type"]) {
  switch (type) {
    case "Modified Hours":
      return <Badge className="bg-amber-100 text-amber-700">Modified Hours</Badge>;
    case "Day Off":
      return <Badge className="bg-red-100 text-red-700">Day Off</Badge>;
    case "Extended Hours":
      return <Badge className="bg-blue-100 text-blue-700">Extended Hours</Badge>;
  }
}

function formatDateDisplay(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Get the current week's Monday through Sunday
function getCurrentWeekDates(): { day: string; date: Date }[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { day, date: d };
  });
}

export default function AvailabilityPage() {
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>(initialWeeklySchedule);
  const [exceptions, setExceptions] = useState<ScheduleException[]>(initialExceptions);
  const [exceptionDialogOpen, setExceptionDialogOpen] = useState(false);
  const [exceptionForm, setExceptionForm] = useState(emptyExceptionForm);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const weekDates = getCurrentWeekDates();

  // Schedule handlers
  const toggleDay = (index: number) => {
    setWeeklySchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const updateStartTime = (index: number, value: string) => {
    setWeeklySchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, startTime: value } : item
      )
    );
  };

  const updateEndTime = (index: number, value: string) => {
    setWeeklySchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, endTime: value } : item
      )
    );
  };

  const handleSaveSchedule = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  // Exception handlers
  const handleAddException = () => {
    if (!exceptionForm.date || !exceptionForm.type) return;
    const newException: ScheduleException = {
      id: `EX${Date.now()}`,
      date: exceptionForm.date,
      type: exceptionForm.type as ScheduleException["type"],
      startTime: exceptionForm.type === "Day Off" ? "" : exceptionForm.startTime,
      endTime: exceptionForm.type === "Day Off" ? "" : exceptionForm.endTime,
      reason: exceptionForm.reason,
    };
    setExceptions((prev) => [...prev, newException]);
    setExceptionForm(emptyExceptionForm);
    setExceptionDialogOpen(false);
  };

  const handleRemoveException = (id: string) => {
    setExceptions((prev) => prev.filter((e) => e.id !== id));
  };

  // Week preview logic
  const getWeekPreview = () => {
    return weekDates.map(({ day, date }) => {
      const dateStr = date.toISOString().split("T")[0];
      const exception = exceptions.find((e) => e.date === dateStr);

      if (exception) {
        if (exception.type === "Day Off") {
          return { day, label: "OFF", color: "gray" as const };
        }
        return {
          day,
          label: `${exception.startTime} - ${exception.endTime}`,
          color: "amber" as const,
        };
      }

      // Map short day to full day
      const dayMap: Record<string, string> = {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
      };
      const schedule = weeklySchedule.find((s) => s.day === dayMap[day]);
      if (!schedule || !schedule.enabled) {
        return { day, label: "OFF", color: "gray" as const };
      }
      return {
        day,
        label: `${schedule.startTime} - ${schedule.endTime}`,
        color: "green" as const,
      };
    });
  };

  const weekPreview = getWeekPreview();

  const previewColorClasses = {
    green: "bg-green-50 text-green-700 border-green-200",
    gray: "bg-gray-50 text-gray-400 border-gray-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
          My Availability
        </h1>
        <p className="text-foreground-secondary mt-1">
          Manage your working hours and schedule
        </p>
      </div>

      {/* Two-column grid: Weekly Schedule + Exceptions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Section 1: Default Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-600" />
              Default Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklySchedule.map((item, index) => (
              <div
                key={item.day}
                className="flex items-center gap-3 py-2 border-b border-border last:border-b-0"
              >
                <div className="w-24 font-medium text-sm text-gray-700">
                  {item.day}
                </div>
                <Switch
                  checked={item.enabled}
                  onCheckedChange={() => toggleDay(index)}
                />
                {item.enabled ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={item.startTime}
                      onChange={(e) => updateStartTime(index, e.target.value)}
                      className="w-32"
                    />
                    <span className="text-sm text-gray-500">to</span>
                    <Input
                      type="time"
                      value={item.endTime}
                      onChange={(e) => updateEndTime(index, e.target.value)}
                      className="w-32"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 italic">Day Off</span>
                )}
              </div>
            ))}

            <Separator />

            <div className="flex items-center gap-3">
              <Button onClick={handleSaveSchedule}>
                <Save className="mr-2 h-4 w-4" />
                Save Schedule
              </Button>
              {savedFeedback && (
                <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Saved!
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Schedule Exceptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary-600" />
              Schedule Exceptions
            </CardTitle>
            <Button
              size="sm"
              onClick={() => {
                setExceptionForm(emptyExceptionForm);
                setExceptionDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Exception
            </Button>
          </CardHeader>
          <CardContent>
            {exceptions.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No upcoming exceptions. Your default schedule applies.
              </p>
            ) : (
              <div className="space-y-3">
                {exceptions.map((exception) => (
                  <div
                    key={exception.id}
                    className="flex items-start justify-between p-3 rounded-lg border border-border bg-gray-50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {formatDateDisplay(exception.date)}
                        </span>
                        {getExceptionTypeBadge(exception.type)}
                      </div>
                      {exception.type !== "Day Off" && (
                        <p className="text-sm text-gray-600">
                          {exception.startTime} - {exception.endTime}
                        </p>
                      )}
                      {exception.reason && (
                        <p className="text-xs text-gray-500">{exception.reason}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveException(exception.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Upcoming Week Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary-600" />
            Upcoming Week Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekPreview.map((item) => (
              <div
                key={item.day}
                className={`text-center p-3 rounded-lg border ${previewColorClasses[item.color]}`}
              >
                <p className="font-semibold text-sm">{item.day}</p>
                <p className="mt-1 text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-200 border border-green-300" />
              Working
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gray-200 border border-gray-300" />
              Off
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber-200 border border-amber-300" />
              Modified
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Exception Dialog */}
      <Dialog open={exceptionDialogOpen} onOpenChange={setExceptionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Schedule Exception</DialogTitle>
            <DialogDescription>
              Override your default schedule for a specific date.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exceptionDate">Date</Label>
              <Input
                id="exceptionDate"
                type="date"
                value={exceptionForm.date}
                onChange={(e) =>
                  setExceptionForm({ ...exceptionForm, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Exception Type</Label>
              <Select
                value={exceptionForm.type}
                onValueChange={(value) =>
                  setExceptionForm({ ...exceptionForm, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Modified Hours">Modified Hours</SelectItem>
                  <SelectItem value="Day Off">Day Off</SelectItem>
                  <SelectItem value="Extended Hours">Extended Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {exceptionForm.type && exceptionForm.type !== "Day Off" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="excStartTime">Start Time</Label>
                  <Input
                    id="excStartTime"
                    type="time"
                    value={exceptionForm.startTime}
                    onChange={(e) =>
                      setExceptionForm({
                        ...exceptionForm,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excEndTime">End Time</Label>
                  <Input
                    id="excEndTime"
                    type="time"
                    value={exceptionForm.endTime}
                    onChange={(e) =>
                      setExceptionForm({
                        ...exceptionForm,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="excReason">Reason</Label>
              <Textarea
                id="excReason"
                placeholder="Optional reason for this exception"
                value={exceptionForm.reason}
                onChange={(e) =>
                  setExceptionForm({ ...exceptionForm, reason: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExceptionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddException}>Save Exception</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
