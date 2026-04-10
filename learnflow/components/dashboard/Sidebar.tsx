"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Icon from "@/components/ui/Icon";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "My Courses",  href: "/dashboard", icon: "book"  },
  { label: "In Progress", href: "/dashboard", icon: "clock" },
  { label: "Completed",   href: "/dashboard", icon: "check" },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTheme();
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sidebarStyle: React.CSSProperties = {
    width: 228,
    background: t.surface,
    borderRight: `1px solid ${t.border}`,
    padding: "24px 14px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="anim-fadeIn"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          ...sidebarStyle,
          // Desktop: sticky column
          height: "calc(100vh - 62px)",
          position: "sticky",
          top: 62,
          flexShrink: 0,

          // Mobile override via media query can't be done inline, so we use a
          // CSS class injected via a <style> tag in layout
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 6px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: t.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 14px ${t.accentGlow}`,
              flexShrink: 0,
            }}
          >
            <Icon name="play" size={12} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: "-.4px",
              color: t.text,
            }}
          >
            LearnFlow
          </span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: item.label === "My Courses" ? 600 : 400,
                color: item.label === "My Courses" ? t.accent : t.muted,
                background: item.label === "My Courses" ? t.accentSoft : "none",
                border: `1px solid ${item.label === "My Courses" ? `${t.accent}22` : "transparent"}`,
                textDecoration: "none",
                transition: "background .15s, color .15s",
              }}
            >
              <Icon
                name={item.icon}
                size={14}
                color={item.label === "My Courses" ? t.accent : t.muted}
              />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div
          style={{
            borderTop: `1px solid ${t.border}`,
            paddingTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ padding: "4px 6px" }}>
            <ThemeToggle showLabel />
          </div>
          <button
            onClick={() => router.push("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 10,
              cursor: "pointer",
              background: "none",
              border: "1px solid transparent",
              color: t.muted,
              fontSize: 14,
              transition: "background .15s",
            }}
          >
            <Icon name="logout" size={14} color={t.muted} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
