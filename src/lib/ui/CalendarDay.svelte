<script lang="ts">
  import cn from '$utils/cn';

  import type { Day } from '$types/day';

  interface Props {
    available: Day['available'];
    day: Day['day'];
    isCurrentMonth: Day['isCurrentMonth'];
    isSelected: Day['isSelected'];
    isToday: Day['isToday'];
    month: Day['month'];
    onclick?: () => void;
    year: Day['year'];
  }

  let {
    available,
    day,
    isCurrentMonth,
    isSelected,
    isToday,
    month,
    onclick,
    year,
  }: Props = $props();
</script>

<button
  type="button"
  {onclick}
  class={cn(
    'p-3 bg-gray-800 ',
    isCurrentMonth && 'bg-gray-500 hover:bg-gray-600',
    !isCurrentMonth && 'hover:cursor-not-allowed',
    isSelected && 'bg-indigo-600',
    available && 'bg-gray-200 hover:cursor-pointer',
    !available && 'hover:cursor-not-allowed',
    isToday && 'text-red-700',
  )}
>
  <time datetime={`${year}-${month}-${day}`}>{day}</time>
</button>
