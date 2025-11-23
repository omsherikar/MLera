"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-white" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}

