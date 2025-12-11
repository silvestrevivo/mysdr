import type { AvailabilitySlot } from '$types/day';

class SlotsStore {
  slotsAvailableByDay = $state<AvailabilitySlot[]>([]);
  slotsSelected = $state<AvailabilitySlot>();

  getSlotsAvailableByDay(slots: AvailabilitySlot[]) {
    this.slotsAvailableByDay = slots;
  }

  setSlotSelected(slot: AvailabilitySlot | undefined) {
    this.slotsSelected = slot;
  }
}

export const slotsStore = new SlotsStore();
