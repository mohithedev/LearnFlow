import type { ThemeKey, ThemeTokens } from "@/types";

export const themes: Record<ThemeKey, ThemeTokens> = {
  dark: {
    bg: "#0b0b10",
    surface: "#141419",
    card: "#1a1a22",
    border: "#24243a",
    accent: "#6c63ff",
    accentHover: "#8078ff",
    accentGlow: "rgba(108,99,255,0.22)",
    accentSoft: "rgba(108,99,255,0.09)",
    text: "#ededf5",
    text2: "#c0c0d4",
    muted: "#72728a",
    success: "#3ecf8e",
    locked: "#18182a",
    lockedText: "#44445e",
    shadow: "0 12px 48px rgba(0,0,0,0.55)",
  },
  midnight: {
    bg: "#030410",
    surface: "#080919",
    card: "#0d0e20",
    border: "#161728",
    accent: "#00d4ff",
    accentHover: "#33deff",
    accentGlow: "rgba(0,212,255,0.18)",
    accentSoft: "rgba(0,212,255,0.07)",
    text: "#e0e4f8",
    text2: "#a8aed0",
    muted: "#55608a",
    success: "#00e5b0",
    locked: "#0a0b1e",
    lockedText: "#282a50",
    shadow: "0 12px 48px rgba(0,0,0,0.75)",
  },
  light: {
    bg: "#f3f3f8",
    surface: "#ffffff",
    card: "#ffffff",
    border: "#e0e0ee",
    accent: "#5b4ef8",
    accentHover: "#4a3de6",
    accentGlow: "rgba(91,78,248,0.14)",
    accentSoft: "rgba(91,78,248,0.07)",
    text: "#0e0e18",
    text2: "#38384e",
    muted: "#7575a0",
    success: "#1ab87a",
    locked: "#eaeaf5",
    lockedText: "#c0c0d8",
    shadow: "0 4px 28px rgba(0,0,0,0.09)",
  },
};

export const themeIcons: Record<ThemeKey, string> = {
  dark: "moon",
  midnight: "star",
  light: "sun",
};

export const themeLabels: Record<ThemeKey, string> = {
  dark: "Dark",
  midnight: "Midnight",
  light: "Light",
};
