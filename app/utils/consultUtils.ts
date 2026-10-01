/**
 * Utility functions for the consultation booking flow.
 */

/**
 * Formats an ISO date string into a human-readable date/time label
 * using the Indian locale and IST timezone.
 *
 * Example output: "Fri, 3 Oct, 10:30 am"
 */
export function formatSlot(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

/**
 * Returns today's date as a YYYY-MM-DD string adjusted for the local timezone,
 * suitable for use as the `min` attribute on a date input.
 */
export function getTodayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
