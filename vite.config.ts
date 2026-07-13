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
        roots: resolve(__dirname, "roots.html"),
      },
    },
  },
});
