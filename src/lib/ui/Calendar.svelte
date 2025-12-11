<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/state';
  import { MONTHS } from '$constants/months';
  import { CalendarDay } from '$lib';
  import { monthStore } from '$stores/month.svelte';
  import { slotsStore } from '$stores/slots.svelte';
  import cn from '$utils/cn';
  import { isDayAvailable } from '$utils/days';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  import type { AvailabilitySlot } from '$types/day';
  import type { Day } from '$types/day';

  const TODAY = new Date();

  let currentDate = $state(new Date());
  let previousMonthDays = $state<Day[]>([]);
  let currentMonthDays = $state<Day[]>([]);
  let nextMonthDays = $state<Day[]>([]);
  let currentMonth = $state<string>('');
  let isCurrentMonth = $derived(currentMonth === MONTHS[TODAY.getMonth()]);

  onMount(() => {
    renderCalendar(currentDate);
    const firstDayAvailable = currentMonthDays.find(
      day => day.available,
    ) as Day;
    if (firstDayAvailable) {
      filterSlotsAvailableByDay(firstDayAvailable);
    }
  });

  function renderCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    currentMonth = MONTHS[month];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    previousMonthDays = [];
    currentMonthDays = [];
    nextMonthDays = [];

    // Previous month's dates
    for (let i = firstDay; i > 0; i--) {
      previousMonthDays.push({
        available: false,
        day: prevMonthLastDay - i + 1,
        id: crypto.randomUUID(),
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        month: month - 1,
        year: year,
      });
    }

    // Current month's dates
    for (let i = 1; i <= lastDay; i++) {
      let isToday = false;
      if (
        i === TODAY.getDate() &&
        month === TODAY.getMonth() &&
        year === TODAY.getFullYear()
      ) {
        isToday = true;
      }
      currentMonthDays.push({
        available: isDayAvailable(i, month, year, page.data.availability),
        day: i,
        id: crypto.randomUUID(),
        isCurrentMonth: true,
        isSelected: false,
        isToday,
        month: month,
        year: year,
      });
    }

    // Next month's dates
    const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
    for (let i = 1; i <= nextMonthStartDay; i++) {
      nextMonthDays.push({
        available: false,
        day: i,
        id: crypto.randomUUID(),
        isCurrentMonth: false,
        isSelected: false,
        isToday: false,
        month: month + 1,
        year: year,
      });
    }
  }

  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  }

  async function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const lastDayOfNextMonth = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
    monthStore.setMonth(lastDayOfNextMonth);
    await invalidateAll();
    renderCalendar(currentDate);
  }

  function filterSlotsAvailableByDay(day: Day) {
    const slotsAvailableByMonth = page.data.availability;
    const filteredSlots = slotsAvailableByMonth.filter(
      (slot: AvailabilitySlot) => {
        const slotDate = new Date(slot.start);
        return (
          slotDate.getDate() === day.day &&
          slotDate.getMonth() === day.month &&
          slotDate.getFullYear() === day.year
        );
      },
    );
    slotsStore.getSlotsAvailableByDay(filteredSlots);
  }
</script>

<div>
  <div
    class="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9"
  >
    <div class="flex items-center text-gray-900 dark:text-white">
      <button
        onclick={() => {
          if (!isCurrentMonth) {
            prevMonth();
          }
        }}
        type="button"
        class={cn(
          '-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 dark:text-gray-500',
          !isCurrentMonth && 'hover:text-gray-500 dark:hover:text-white',
        )}
      >
        <span class="sr-only">Previous month</span>
        <ChevronLeft />
      </button>
      <div class="flex-auto text-sm font-semibold">{currentMonth}</div>
      <button
        onclick={nextMonth}
        type="button"
        class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
      >
        <span class="sr-only">Next month</span>
        <ChevronRight />
      </button>
    </div>
    <div
      class="mt-3 grid grid-cols-7 text-xs/6 text-gray-500 dark:text-gray-400"
    >
      <div>M</div>
      <div>T</div>
      <div>W</div>
      <div>T</div>
      <div>F</div>
      <div>S</div>
      <div>S</div>
    </div>
    <div
      class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-white/15 dark:shadow-none dark:ring-white/15 overflow-hidden"
    >
      {#each previousMonthDays as day (day.id)}
        <CalendarDay {...day} />
      {/each}
      {#each currentMonthDays as day (day.id)}
        <CalendarDay
          {...day}
          onclick={() => {
            if (day.available) {
              filterSlotsAvailableByDay(day);
            }
          }}
        />
      {/each}
      {#each nextMonthDays as day (day.id)}
        <CalendarDay {...day} />
      {/each}
    </div>
  </div>
</div>
