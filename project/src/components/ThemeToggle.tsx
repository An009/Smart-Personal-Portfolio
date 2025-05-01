import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./../contexts/ThemeContext.tsx";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        // Cycle through themes: dark → light → system → dark...
        if (theme === "dark") setTheme("light");
        else if (theme === "light") setTheme("system");
        else setTheme("dark");
      }}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-gray-300" />
      ) : theme === "light" ? (
        <Sun className="w-5 h-5 text-gray-500 dark:text-white" />
      ) : (
        <Monitor className="w-5 h-5 text-gray-800 dark:text-gray-300" />
      )}
    </button>
  );
}

export default ThemeToggle;
