import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Required for aliases

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets") // Add this line
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["date-fns"]
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]" // Better asset handling
      }
    }
  }
});
