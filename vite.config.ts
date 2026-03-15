import { defineConfig } from "vite";

export default defineConfig({
  base: "/DirectedForgettingTRDE/",
  build: {
    outDir: "docs",
    sourcemap: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/data": "http://localhost:3000",
    },
  },
});
