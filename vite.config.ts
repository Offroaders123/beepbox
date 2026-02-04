import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    target: "esnext"
  },
  server: {
    port: 8081,
    strictPort: true
  },
  preview: {
    port: 8081,
    strictPort: true
  }
});
