"use client";

import { useTheme } from "@/context/ThemeContext";
import type { ProgressBarProps } from "@/types";

export default function ProgressBar({
  value,
  height = 4,
  showLabel = false,
  color,
}: ProgressBarProps) {
  const { t } = useTheme();
  const clampedValue = Math.min(100, Math.max(0, value));
  const barColor = color ?? t.accent;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          flex: 1,
          height,
          background: t.border,
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${clampedValue}%`,
            height: "100%",
            background: barColor,
            borderRadius: 100,
            transition: "width .5s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
      {showLabel && (
        <span
          style={{
            fontSize: 11,
            fontFamily: "'DM Mono', monospace",
            color: barColor,
            fontWeight: 500,
            minWidth: 30,
            textAlign: "right",
          }}
        >
          {clampedValue}%
        </span>
      )}
    </div>
  );
}
