import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  base: "",
  build: {
    cssCodeSplit: true,
    emptyOutDir: false,
    lib: {
      entry: "components/index.ts",
      formats: ['es', 'cjs', 'umd'],
      name: "solid-material-components",
    },
    rollupOptions: {
      external: ['solid-js'],
    },
    sourcemap: true,
    target: "modules",
    polyfillDynamicImport: false,
  },
});

