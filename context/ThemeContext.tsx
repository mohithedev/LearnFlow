"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { themes } from "@/lib/themes";
import type { ThemeKey, ThemeTokens } from "@/types";

interface ThemeContextValue {
  themeKey: ThemeKey;
  t: ThemeTokens;
  cycleTheme: () => void;
  setTheme: (k: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeKey: "dark",
  t: themes.dark,
  cycleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKey] = useState<ThemeKey>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lf-theme") as ThemeKey | null;
    if (saved && themes[saved]) setThemeKey(saved);
  }, []);

  const cycleTheme = () => {
    const keys = Object.keys(themes) as ThemeKey[];
    const next = keys[(keys.indexOf(themeKey) + 1) % keys.length];
    setThemeKey(next);
    localStorage.setItem("lf-theme", next);
  };

  const setTheme = (k: ThemeKey) => {
    setThemeKey(k);
    localStorage.setItem("lf-theme", k);
  };

  // Prevent flash of wrong theme on first render
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ themeKey: "dark", t: themes.dark, cycleTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ themeKey, t: themes[themeKey], cycleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
