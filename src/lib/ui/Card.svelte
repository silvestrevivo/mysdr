<script lang="ts">
  import cn from '$lib/utils/cn';

  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    span?: string;
  }

  let { children, span = '1' }: Props = $props();
</script>

<div
  class={cn(
    'flex p-px lg:h-96 h-1/3',
    span === '1' ? 'lg:col-span-1' : 'lg:col-span-2',
  )}
>
  <div
    class="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 dark:bg-gray-800 dark:shadow-none dark:outline-white/15 p-6"
  >
    {@render children()}
  </div>
</div>
