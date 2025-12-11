<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib';
  import { slotsStore } from '$stores/slots.svelte';
  import { ArrowLeftIcon } from 'lucide-svelte';

  // import type { SubmitFunction } from '@sveltejs/kit';

  let loading = $state(false);
  let formError = $state({
    email: false,
    error: false,
    name: false,
  });
</script>

<svelte:window
  on:keydown={() => {
    if (formError.name || formError.email || formError.error) {
      formError.error = false;
      formError.name = false;
      formError.email = false;
    }
  }}
/>

<form
  method="post"
  action="/?/book"
  use:enhance={handleSubmit}
  class="flex flex-col gap-4 h-full justify-between"
>
  <input
    type="hidden"
    name="slot-start"
    value={slotsStore.slotsSelected?.start}
  />
  <input type="hidden" name="slot-end" value={slotsStore.slotsSelected?.end} />
  <div class="space-y-4">
    <div>
      <label
        for="email"
        class="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >Name*</label
      >
      <div class="mt-2">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="your name"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
        />
      </div>
      {#if formError.name}
        <p class="text-sm/6 text-red-500 dark:text-red-400">Name is required</p>
      {/if}
    </div>
    <div>
      <label
        for="email"
        class="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >Email*</label
      >
      <div class="mt-2">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
        />
        {#if formError.email}
          <p class="text-sm/6 text-red-500 dark:text-red-400">
            Email is required
          </p>
        {/if}
      </div>
    </div>
  </div>
  {#if formError.error}
    <p class="text-sm/6 text-red-500 dark:text-red-400">{formError.error}</p>
  {/if}
  <div class="flex gap-2 items-center justify-between">
    <p class="text-sm/6 text-gray-500 dark:text-gray-400">
      By proceeding, you agree to our Terms and Privacy Policy.
    </p>
    <div class="flex gap-4 items-center">
      <button
        type="button"
        onclick={() => {
          slotsStore.setSlotSelected(undefined);
        }}
        class="flex items-center gap-2 hover:cursor-pointer"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        Back</button
      >
      <Button label="Book" class="w-40" {loading} />
    </div>
  </div>
</form>
