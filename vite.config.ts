import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works from any subpath (e.g. GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        h2ster: resolve(__dirname, "h2ster/index.html"),
        weyd: resolve(__dirname, "weyd/index.html"),
        weydMagic: resolve(__dirname, "weyd-magic/index.html"),
        bheh2: resolve(__dirname, "bheh2/index.html"),
        sed: resolve(__dirname, "sed/index.html"),
        kwel: resolve(__dirname, "kwel/index.html"),
        // legacy redirect for old roots.html#view links
        roots: resolve(__dirname, "roots.html"),
      },
    },
  },
});
