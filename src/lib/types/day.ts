export interface AvailabilitySlot {
  end: string;
  start: string;
}

export interface Day {
  available: boolean;
  day: number;
  id?: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  month: number;
  year: number;
}
