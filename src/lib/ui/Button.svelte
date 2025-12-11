<script lang="ts">
  import cn from '$lib/utils/cn';

  interface Props {
    class?: string;
    label: string;
    loading?: boolean;
    onclick?: () => void;
    type?: 'button' | 'reset' | 'submit';
  }

  let {
    class: className,
    label,
    loading = false,
    onclick,
    type = 'submit',
  }: Props = $props();
</script>

<button
  {onclick}
  disabled={loading}
  {type}
  class={cn(
    'bg-black px-4 py-2 rounded-md border-gray-500 border-solid border font-medium tracking-tight text-gray-900 dark:text-white hover:bg-gray-700 hover:cursor-pointer',
    className,
  )}
>
  {label}
</button>
