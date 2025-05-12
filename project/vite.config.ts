import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["date-fns"],
  },
  build: {
    target: "esnext", // Use a modern target that supports top-level await
  },
});
