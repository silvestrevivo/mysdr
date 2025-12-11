<script lang="ts">
  import { slotsStore } from '$stores/slots.svelte';
  import { GlobeIcon, LinkIcon, TimerIcon } from 'lucide-svelte';

  let timeSlotDisplayed = $derived(
    `${new Date(slotsStore.slotsSelected?.start ?? '').toLocaleTimeString()} - ${new Date(
      slotsStore.slotsSelected?.end ?? '',
    ).toLocaleTimeString()}`,
  );
</script>

<div>
  <h2
    class="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white"
  >
    Senior Design Engineer <br /> - Intro Call
  </h2>
  <div class="space-y-4">
    <p class="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
      Intro call (30 minutes)- you’ll meet <span class="text-indigo-400"
        >some of the team</span
      >
      (<span class="text-indigo-400">Maya</span> and
      <span class="text-indigo-400">Jacob</span>), and we get to know more about
      you and your experience.
    </p>

    {#if slotsStore.slotsSelected && timeSlotDisplayed}
      <p class="text-sm/6 text-gray-600 dark:text-white">
        {timeSlotDisplayed}
      </p>
    {:else}
      <ul class="space-y-3">
        <li class="flex items-center gap-2">
          <TimerIcon class="w-4 h-4" />
          <p class="text-sm/6 text-gray-600 dark:text-white">30 minutes</p>
        </li>
        <li class="flex items-center gap-2">
          <LinkIcon class="w-4 h-4" />
          <p class="text-sm/6 text-gray-600 dark:text-white">
            Organizer's default app
          </p>
        </li>
        <li class="flex items-center gap-2">
          <GlobeIcon class="w-4 h-4" />
          <p class="text-sm/6 text-gray-600 dark:text-white">
            Europe/Amsterdam
          </p>
        </li>
      </ul>
    {/if}
  </div>
</div>
