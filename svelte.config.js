import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess(),
  inspector: process.env.NODE_ENV !== 'production',
  compilerOptions: { runes: true },
  kit: {
    output: {
      bundleStrategy: 'single'
    },
    adapter: adapter({
      pages: 'docs',
      assets: 'docs'
    }),

    // IMPORTANT: if you update aliases, run `pnpm run dev` for the configuration to update (tsconfig.json)
    alias: {
      'svelte-treeviews': path.resolve('.', 'src/lib'),
      $comp: path.resolve('./src/comp')
    },
    paths: {
      base: process.env.BASE_PATH,
      relative: false
    }
  },
  vitePlugin: {
    inspector: {
      toggleKeyCombo: 'control-shift',
      showToggleButton: 'always',
      toggleButtonPos: 'bottom-right'
    }
  }
};

export default config;
