"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/ui/Icon";
import ProgressBar from "@/components/ui/ProgressBar";
import type { Video } from "@/types";

interface PlaylistSidebarProps {
  videos: Video[];
  activeId: number;
  completedCount: number;
  progress: number;
  sortAsc: boolean;
  onSort: () => void;
  onSelect: (id: number) => void;
  /** Mobile: controlled open state */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function PlaylistSidebar({
  videos,
  activeId,
  completedCount,
  progress,
  sortAsc,
  onSort,
  onSelect,
  mobileOpen,
  onMobileClose,
}: PlaylistSidebarProps) {
  const { t } = useTheme();

  const sorted = sortAsc ? [...videos] : [...videos].reverse();

  // Lock scroll on mobile
  useEffect(() => {
    if (mobileOpen !== undefined) {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="anim-fadeIn"
          onClick={onMobileClose}
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

      <div
        style={{
          width: 340,
          background: t.surface,
          borderLeft: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 18px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: t.text,
              }}
            >
              Playlist · {videos.length} Videos
            </span>
            <button
              onClick={onSort}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: t.accentSoft,
                border: `1px solid ${t.accent}22`,
                color: t.accent,
                padding: "5px 10px",
                borderRadius: 7,
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background .15s",
              }}
            >
              <Icon name="filter" size={10} color={t.accent} />
              {sortAsc ? "Old → New" : "New → Old"}
            </button>
          </div>
          <ProgressBar value={progress} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <span style={{ fontSize: 11, color: t.muted }}>
              {completedCount} completed
            </span>
            <span
              style={{
                fontSize: 11,
                color: t.accent,
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Video list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {sorted.map((video) => {
            const isActive = video.id === activeId;
            const iconClass = video.completed
              ? "done"
              : isActive
              ? "current"
              : video.unlocked
              ? "unlocked"
              : "locked";

            const iconBg =
              iconClass === "done"
                ? `${t.success}22`
                : iconClass === "current"
                ? t.accent
                : iconClass === "unlocked"
                ? t.accentSoft
                : t.locked;

            return (
              <div
                key={video.id}
                onClick={() => onSelect(video.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 16px",
                  borderLeft: `3px solid ${isActive ? t.accent : "transparent"}`,
                  borderBottom: `1px solid ${t.border}`,
                  background: isActive ? t.accentSoft : "none",
                  cursor: video.unlocked ? "pointer" : "not-allowed",
                  transition: "background .12s",
                  opacity: !video.unlocked && !isActive ? 0.55 : 1,
                }}
                onMouseEnter={(e) => {
                  if (video.unlocked)
                    (e.currentTarget as HTMLDivElement).style.background = t.accentSoft;
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLDivElement).style.background = "none";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    background: iconBg,
                    border: `1px solid ${
                      iconClass === "done"
                        ? `${t.success}44`
                        : iconClass === "current"
                        ? t.accent
                        : t.border
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {video.completed ? (
                    <Icon name="check" size={13} color={t.success} />
                  ) : isActive ? (
                    <Icon name="play" size={12} color="#fff" />
                  ) : video.unlocked ? (
                    <Icon name="play" size={12} color={t.accent} />
                  ) : (
                    <Icon name="lock" size={12} color={t.lockedText} />
                  )}
                </div>

                <span
                  style={{
                    fontSize: 13,
                    flex: 1,
                    fontWeight: isActive ? 600 : 400,
                    color: video.unlocked || isActive ? t.text : t.lockedText,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                  }}
                >
                  {video.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: t.muted,
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                  }}
                >
                  {video.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
