import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $constants: 'src/lib/constants/',
      $stores: 'src/lib/stores/',
      $types: 'src/lib/types/',
      $utils: 'src/lib/utils/',
    },
  },
  preprocess: vitePreprocess(),
  vitePlugin: {
    inspector: {
      holdMode: true,
      showToggleButton: 'always',
      toggleButtonPos: 'top-right',
      toggleKeyCombo: 'meta-shift',
    },
  },
};

export default config;
