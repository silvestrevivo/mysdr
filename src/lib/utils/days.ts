import type { AvailabilitySlot } from '$types/day';

/**
 * Converts a UTC date string (ending with Z) to an ISO string with explicit timezone offset.
 * @param dateString - Date string in UTC format (e.g., '2025-12-19T17:00:00Z')
 * @param offsetHours - Timezone offset in hours (e.g., 1 for CET, 2 for CEST, -5 for EST)
 * @returns Date string with explicit offset (e.g., '2025-12-19T18:00:00+01:00')
 */
export function convertToTimezoneOffset(
  dateString: string,
  offsetHours: number = 1,
): string {
  const date = new Date(dateString);

  // Add the offset to get local time
  const localDate = new Date(date.getTime() + offsetHours * 60 * 60 * 1000);

  // Format the date part
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');

  // Format the offset
  const sign = offsetHours >= 0 ? '+' : '-';
  const absOffset = Math.abs(offsetHours);
  const offsetStr = `${sign}${String(Math.floor(absOffset)).padStart(2, '0')}:${String((absOffset % 1) * 60).padStart(2, '0')}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetStr}`;
}

/**
 * Checks if a given day falls within any of the availability slots.
 * A day is considered available if it overlaps with any slot's date range.
 */
export function isDayAvailable(
  day: number,
  month: number,
  year: number,
  slots: AvailabilitySlot[],
): boolean {
  // Create date for the start of the given day (midnight)
  const dayStart = new Date(year, month, day, 0, 0, 0, 0);
  // Create date for the end of the given day (23:59:59.999)
  const dayEnd = new Date(year, month, day, 23, 59, 59, 999);

  // Return false if the date is in the past
  const now = new Date();
  if (dayEnd < now) {
    return false;
  }

  return slots.some(slot => {
    const slotStart = new Date(slot.start);
    const slotEnd = new Date(slot.end);

    // Check if there's any overlap between the day and the slot
    return dayStart <= slotEnd && dayEnd >= slotStart;
  });
}
