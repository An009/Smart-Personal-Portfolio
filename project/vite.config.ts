import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@posts": path.resolve(__dirname, "./src/posts"),
      '@public': path.resolve(__dirname, './public'),
    },
  },
  assetsInclude: ["**/*.md", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["date-fns", "front-matter"],
  },
  build: {
    assetsInlineLimit: 4096, // 4kb (files smaller than this get inlined)
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          if (assetInfo.name && /\.(png|jpe?g|svg|gif)$/.test(assetInfo.name)) {
            return "assets/images/[name].[hash][extname]";
          }
          return "assets/[name].[hash][extname]";
        },
      },
    },
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./node_modules/lucide-react"),
        path.resolve(__dirname, "./posts"),
      ],
    },
  },
});
