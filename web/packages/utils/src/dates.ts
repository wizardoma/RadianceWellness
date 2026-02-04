import {
  format,
  formatDistanceToNow,
  addDays,
  addMinutes,
  parseISO,
  isToday,
  isTomorrow,
  isThisWeek,
  startOfDay,
  endOfDay,
  eachDayOfInterval,
  isBefore,
  isAfter,
} from "date-fns";

/**
 * Format date for display
 */
export function formatDate(date: string | Date, formatStr: string = "MMM d, yyyy"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

/**
 * Format date with day name
 */
export function formatDateWithDay(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "EEEE, MMMM d, yyyy");
}

/**
 * Format time (24h to 12h)
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return format(date, "h:mm a");
}

/**
 * Format duration in minutes to human readable
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Get friendly date label
 */
export function getFriendlyDateLabel(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  if (isToday(dateObj)) return "Today";
  if (isTomorrow(dateObj)) return "Tomorrow";
  if (isThisWeek(dateObj)) return format(dateObj, "EEEE");
  return format(dateObj, "MMM d");
}

/**
 * Generate time slots for a day
 */
export function generateTimeSlots(
  startHour: number = 9,
  endHour: number = 20,
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = [];
  const start = new Date();
  start.setHours(startHour, 0, 0, 0);
  const end = new Date();
  end.setHours(endHour, 0, 0, 0);

  let current = start;
  while (isBefore(current, end)) {
    slots.push(format(current, "HH:mm"));
    current = addMinutes(current, intervalMinutes);
  }

  return slots;
}

/**
 * Get dates for the next N days
 */
export function getNextDays(days: number = 30): Date[] {
  const today = startOfDay(new Date());
  const endDate = addDays(today, days);
  return eachDayOfInterval({ start: today, end: endDate });
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isBefore(endOfDay(dateObj), new Date());
}

/**
 * Calculate end time from start time and duration
 */
export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const start = new Date();
  start.setHours(hours, minutes);
  const end = addMinutes(start, durationMinutes);
  return format(end, "HH:mm");
}

export {
  format,
  parseISO,
  addDays,
  addMinutes,
  isToday,
  isTomorrow,
  isThisWeek,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
};
