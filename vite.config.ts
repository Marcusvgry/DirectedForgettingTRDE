import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/data": "http://localhost:3000",
    },
  },
});
