"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";

interface NavBarProps {
  /** Show hamburger + call onMenuClick */
  showMenu?: boolean;
  onMenuClick?: () => void;
  rightSlot?: React.ReactNode;
}

export default function NavBar({ showMenu, onMenuClick, rightSlot }: NavBarProps) {
  const { t } = useTheme();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        height: 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 40px)",
        background: `color-mix(in srgb, ${t.bg} 88%, transparent)`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: `1px solid ${t.border}`,
        transition: "background .25s, border-color .25s",
      }}
    >
      {/* Left: optional hamburger + logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showMenu && (
          <button
            aria-label="Open navigation"
            onClick={onMenuClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 9,
              background: t.surface,
              border: `1px solid ${t.border}`,
              color: t.muted,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Icon name="menu" size={17} color={t.muted} />
          </button>
        )}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: t.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 18px ${t.accentGlow}`,
              flexShrink: 0,
            }}
          >
            <Icon name="play" size={13} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-.5px",
              color: t.text,
            }}
          >
            LearnFlow
          </span>
        </Link>
      </div>

      {/* Right slot */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {rightSlot}
      </div>
    </nav>
  );
}
