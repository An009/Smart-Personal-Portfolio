import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@posts": path.resolve(__dirname, "./src/posts"),
    },
  },
  assetsInclude: ["**/*.md", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["date-fns", "front-matter"],
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]",
        manualChunks(id) {
          if (id.includes("lucide-react")) {
            return "lucide";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./node_modules/lucide-react"),
        path.resolve(
          __dirname,
          "./node_modules/.deno/lucide-react@0.344.0/node_modules/lucide-react"
        ),
        path.resolve(__dirname, "./posts"),
      ],
    },
  },
});
