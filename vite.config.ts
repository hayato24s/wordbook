import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path/posix";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        main: resolve(__dirname, "src/main.ts"),
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue()],
});
