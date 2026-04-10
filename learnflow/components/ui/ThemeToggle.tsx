"use client";

import { useTheme } from "@/context/ThemeContext";
import { themeIcons, themeLabels } from "@/lib/themes";
import Icon from "./Icon";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { themeKey, t, cycleTheme } = useTheme();

  return (
    <button
      onClick={cycleTheme}
      title={`Theme: ${themeLabels[themeKey]} — click to cycle`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: t.surface,
        border: `1px solid ${t.border}`,
        color: t.muted,
        padding: showLabel ? "8px 14px" : "8px 10px",
        borderRadius: 9,
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
        transition: "border-color .15s, background .15s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.borderColor = t.accent)
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.borderColor = t.border)
      }
    >
      <Icon name={themeIcons[themeKey]} size={14} color={t.accent} />
      {showLabel && (
        <span style={{ color: t.text2 }}>{themeLabels[themeKey]}</span>
      )}
    </button>
  );
}
