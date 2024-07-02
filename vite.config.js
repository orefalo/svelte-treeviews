import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { exampleImportPlugin } from './scripts/vite/example-import.js';
import {
  minifiedSizeAnalyzingPlugin,
  manualChunksForAnalyzing
} from './scripts/vite/minified-size-analyzing.js';

const warnIgnores = {
  'css-unused-selector': {
    capture: /.*"(.*)"$/,
    ignore: [
      /^\.he-tree--rtl/
      // /^\.p\d+/,
      // /^\.sm\d+/,
      // /^\.md\d+/,
      // /^\.lg\d+/,
      // /^\.xg\d+/,
      // /^\.all\d+/,
      // /^\.row(::after)?/
    ]
  }
};

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [sveltekit(), exampleImportPlugin(), minifiedSizeAnalyzingPlugin()],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core']
  },
  build: {
    // minify: true, // We specify this explicitly, since we need the server code to be minified for size computation.
    rollupOptions: {
      // Explicitely ignore warnings
      onwarn: (warning, handler) => {
        const { message, code } = warning;
        // @ts-ignore
        const patterns = warnIgnores[code];

        console.log('HEEEERRREE ' + code);
        if (patterns != undefined) {
          /* Find the meat. */
          const meat = message.match(patterns.capture);
          console.log(meat);
          if (meat != null) {
            for (var i = 0; i < patterns.ignore.length; i++) {
              if (meat[1].match(patterns.ignore[i]) != null) {
                return;
              }
            }
          }
        }
        handler(warning);
      },

      output: {
        manualChunks: manualChunksForAnalyzing
      }
    }
  }
});
