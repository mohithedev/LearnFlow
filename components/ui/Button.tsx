"use client";

import { type ReactNode, type CSSProperties } from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "./Icon";

type Variant = "primary" | "ghost" | "soft" | "success";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  iconLeft?: string;
  iconRight?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled,
  loading,
  fullWidth,
  size = "md",
  iconLeft,
  iconRight,
  style,
  type = "button",
}: ButtonProps) {
  const { t } = useTheme();

  const paddings = { sm: "7px 14px", md: "10px 20px", lg: "13px 28px" };
  const fontSizes = { sm: 12, md: 14, lg: 15 };
  const iconSizes = { sm: 12, md: 14, lg: 15 };

  const variantStyles: Record<Variant, CSSProperties> = {
    primary: { background: t.accent, color: "#fff", border: "none" },
    ghost: { background: "none", color: t.muted, border: `1px solid ${t.border}` },
    soft: {
      background: t.accentSoft,
      color: t.accent,
      border: `1px solid ${t.accent}33`,
    },
    success: {
      background: `${t.success}1a`,
      color: t.success,
      border: `1px solid ${t.success}44`,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: paddings[size],
        borderRadius: 10,
        fontSize: fontSizes[size],
        fontWeight: 700,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        width: fullWidth ? "100%" : undefined,
        transition: "background .15s, transform .1s, opacity .15s",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        if (variant === "primary")
          (e.currentTarget as HTMLButtonElement).style.background = t.accentHover;
      }}
      onMouseLeave={(e) => {
        if (variant === "primary")
          (e.currentTarget as HTMLButtonElement).style.background = t.accent;
      }}
    >
      {loading && <Icon name="spinner" size={iconSizes[size]} color="currentColor" />}
      {!loading && iconLeft && (
        <Icon name={iconLeft} size={iconSizes[size]} color="currentColor" />
      )}
      {children}
      {!loading && iconRight && (
        <Icon name={iconRight} size={iconSizes[size]} color="currentColor" />
      )}
    </button>
  );
}
