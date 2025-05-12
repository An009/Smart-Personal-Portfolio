import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";
type AppliedTheme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  appliedTheme: AppliedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["dark", "light", "system"].includes(savedTheme)) {
        return savedTheme;
      }
      return "system";
    }
    return "system";
  });

  const [appliedTheme, setAppliedTheme] = useState<AppliedTheme>("light");

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (themeToApply: AppliedTheme) => {
      root.classList.remove("dark", "light");
      root.classList.add(themeToApply);
      setAppliedTheme(themeToApply);
    };

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      applyTheme(systemTheme);
    } else {
      applyTheme(theme);
    }

    // Save preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Watch for system theme changes when in 'system' mode
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      const root = window.document.documentElement;
      root.classList.remove("dark", "light");
      root.classList.add(newTheme);
      setAppliedTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, appliedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
