"use client";

import { useEffect, type ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { ModalProps } from "@/types";

export default function Modal({ open, onClose, children, maxWidth = 480 }: ModalProps) {
  const { t } = useTheme();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="anim-fadeIn"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        className="anim-pop"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.card,
          border: `1px solid ${t.border}`,
          borderRadius: 22,
          padding: "clamp(24px, 5vw, 36px) clamp(20px, 4vw, 32px)",
          width: "100%",
          maxWidth,
          boxShadow: t.shadow,
        }}
      >
        {children}
      </div>
    </div>
  );
}
