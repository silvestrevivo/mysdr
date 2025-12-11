<script lang="ts">
  import { Button } from '$lib';
  import { slotsStore } from '$stores/slots.svelte';

  import type { AvailabilitySlot } from '$types/day';

  const timeOptions = { hour: '2-digit', minute: '2-digit' } as const;

  function slotFormatted(slot: AvailabilitySlot) {
    const startFormatted = new Date(slot.start).toLocaleTimeString(
      'en-US',
      timeOptions,
    );
    const endFormatted = new Date(slot.end).toLocaleTimeString(
      'en-US',
      timeOptions,
    );
    return `${startFormatted} - ${endFormatted}`;
  }
</script>

<div class="space-y-2">
  <h2 class="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">
    Available hours
  </h2>
  <div class="space-y-2 overflow-y-auto h-full">
    {#each slotsStore.slotsAvailableByDay as slot (slot.start)}
      {@const hour = slotFormatted(slot)}
      <Button
        label={hour}
        type="button"
        class="w-full"
        onclick={() => slotsStore.setSlotSelected(slot)}
      />
    {/each}
  </div>
</div>
