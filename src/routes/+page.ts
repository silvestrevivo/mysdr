import { monthStore } from '$stores/month.svelte';

import type { AvailabilitySlot } from '$types/day';

/**
 * Loads the availability slots for the calendar.
 */
export async function load({ fetch }) {
  const now = new Date();
  const firstDayOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const response = await fetch(
    `https://calendar.meetchase.ai/api/availability?start=${firstDayOfMonth}&end=${monthStore.month}`,
  );
  const data: AvailabilitySlot[] = await response.json();
  return {
    availability: data,
  };
}
