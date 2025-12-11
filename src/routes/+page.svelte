<script lang="ts">
  import { Calendar, CallDetails, Card, Form, SlotsAvailable } from '$lib';
  import { slotsStore } from '$stores/slots.svelte';
  import cn from '$utils/cn';
</script>

<div
  class="bg-gray-50 dark:bg-gray-900 h-screen lg:flex lg:items-center lg:justify-center"
>
  <div
    class="mx-auto max-w-2xl px-3 lg:max-w-7xl lg:px-8 h-full lg:h-auto pt-2"
  >
    <h1
      class="text-2xl font-bold ml-2 py-2 px-4 inline-block mb-2 bg-gray-700 rounded-lg"
    >
      MySDR
    </h1>
    <div
      class={cn(
        'flex flex-col lg:grid gap-2 lg:grid-cols-4 h-[calc(100%-4rem)] lg:h-auto',
        slotsStore.slotsSelected && 'lg:grid-cols-3',
      )}
    >
      <Card>
        <CallDetails />
      </Card>

      <Card span="2">
        {#if !slotsStore.slotsSelected}
          <Calendar />
        {:else}
          <Form />
        {/if}
      </Card>

      {#if !slotsStore.slotsSelected}
        <Card>
          <SlotsAvailable />
        </Card>
      {/if}
    </div>
  </div>
</div>
