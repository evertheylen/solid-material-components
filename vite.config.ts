import { resolve } from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import pkg from './package.json';

export default defineConfig({
  plugins: [solid()],

  build: {
    lib: {
      name: pkg.name,
      fileName: 'index',
      entry: resolve(__dirname, 'components/index.ts'),
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
