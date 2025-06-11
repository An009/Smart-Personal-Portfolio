import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import "./index.css";
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <SpeedInsights />
    </ThemeProvider>
  </StrictMode>
);

if (import.meta.env.PROD) {
  inject();
  injectSpeedInsights();
}