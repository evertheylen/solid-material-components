import { resolve } from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import pkg from './package.json';

const entry = resolve(__dirname, 'src/index.ts');

export default defineConfig({
  plugins: [solid()],

  build: {
    lib: {
      name: pkg.name,
      fileName: 'index',
      entry,
    },

    rollupOptions: {
      external: [
        'solid-js',
        'solid-js/web',
        'solid-js/store',
      ],

      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'solid-js': 'Solid',
          'solid-js/web': 'SolidWeb',
          'solid-js/store': 'SolidStore',
        },
      },
    },
  },
});
