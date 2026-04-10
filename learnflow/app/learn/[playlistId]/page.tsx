"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import VideoPlayer from "@/components/learn/VideoPlayer";
import PlaylistSidebar from "@/components/learn/PlaylistSidebar";
import LockedModal from "@/components/learn/LockedModal";
import ProgressBar from "@/components/ui/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import { MOCK_PLAYLIST } from "@/lib/mockData";

export default function LearnPage() {
  const { t } = useTheme();
  const router = useRouter();

  const { videos, activeVideo, activeId, completedCount, progress, markComplete, selectVideo } =
    useProgress(MOCK_PLAYLIST.videos);

  const [focusMode, setFocusMode] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [lockedTitle, setLockedTitle] = useState<string | null>(null);
  const [playlistMobileOpen, setPlaylistMobileOpen] = useState(false);

  const handleSelect = (id: number) => {
    const result = selectVideo(id);
    if (result === "locked") {
      const v = videos.find((x) => x.id === id);
      setLockedTitle(v?.title ?? "");
    } else {
      setPlaylistMobileOpen(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        display: "flex",
        flexDirection: "column",
        transition: "background .25s, color .25s",
      }}
    >
      {/* ── Top bar ─────────────────────────── */}
      <div
        style={{
          height: 62,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 clamp(16px, 4vw, 24px)",
          background: `color-mix(in srgb, ${t.bg} 90%, transparent)`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${t.border}`,
          position: "sticky",
          top: 0,
          zIndex: 60,
          flexShrink: 0,
          opacity: focusMode ? 0 : 1,
          pointerEvents: focusMode ? "none" : "all",
          transition: "opacity .3s",
        }}
      >
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: `1px solid ${t.border}`,
            color: t.muted,
            padding: "7px 13px",
            borderRadius: 9,
            fontSize: 13,
            cursor: "pointer",
            flexShrink: 0,
            transition: "border-color .15s, color .15s",
            whiteSpace: "nowrap",
          }}
        >
          <Icon name="arrowLeft" size={13} color={t.muted} />
          <span className="hide-xs">Dashboard</span>
        </button>

        {/* Title + progress */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(13px, 2vw, 15px)",
              color: t.text,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {MOCK_PLAYLIST.title}
          </p>
          <p style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>
            {completedCount} / {videos.length} completed · {progress}%
          </p>
        </div>

        {/* Desktop progress bar */}
        <div
          className="hide-sm"
          style={{ width: 120, flexShrink: 0 }}
        >
          <ProgressBar value={progress} />
        </div>

        <Button
          variant="soft"
          size="sm"
          onClick={() => setFocusMode(true)}
          iconLeft="focus"
        >
          <span className="hide-xs">Focus Mode</span>
        </Button>

        <ThemeToggle />
      </div>

      {/* ── Focus exit bar ───────────────────── */}
      {focusMode && (
        <div
          className="anim-slideL"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 70,
            background: `color-mix(in srgb, ${t.bg} 90%, transparent)`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "10px",
          }}
        >
          <Icon name="focus" size={14} color={t.muted} />
          <span style={{ fontSize: 13, color: t.muted }}>
            Focus Mode — distractions hidden
          </span>
          <button
            onClick={() => setFocusMode(false)}
            style={{
              background: "none",
              border: `1px solid ${t.border}`,
              color: t.text,
              padding: "5px 14px",
              borderRadius: 7,
              fontSize: 12.5,
              cursor: "pointer",
              transition: "border-color .15s",
            }}
          >
            Exit
          </button>
        </div>
      )}

      {/* ── Body ────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          paddingTop: focusMode ? 44 : 0,
        }}
      >
        {/* Player panel */}
        <div
          style={{
            flex: 1,
            padding: "clamp(12px, 3vw, 24px)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflowY: "auto",
            minWidth: 0,
          }}
        >
          <VideoPlayer video={activeVideo} onComplete={markComplete} />

          {/* Video info bar */}
          <div
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: t.text,
                  marginBottom: 4,
                }}
              >
                {activeVideo.title}
              </p>
              <p style={{ fontSize: 13, color: t.muted }}>
                {MOCK_PLAYLIST.channel} · {activeVideo.duration}
              </p>
            </div>

            {activeVideo.completed ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: t.success,
                  fontSize: 14,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                <Icon name="check" size={15} color={t.success} />
                Completed
              </div>
            ) : (
              <Button
                variant="success"
                iconLeft="check"
                onClick={markComplete}
              >
                Mark Complete
              </Button>
            )}
          </div>
        </div>

        {/* Playlist sidebar — desktop always visible, mobile slide-in */}
        <div>
          <style>{`
            @media (max-width: 900px) {
              #playlist-panel {
                position: fixed !important;
                top: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                z-index: 50 !important;
                height: 100vh !important;
                width: min(340px, 92vw) !important;
                transform: ${playlistMobileOpen && !focusMode ? "translateX(0)" : "translateX(100%)"} !important;
                transition: transform .28s cubic-bezier(.4,0,.2,1) !important;
                box-shadow: ${playlistMobileOpen ? "0 0 60px rgba(0,0,0,.6)" : "none"} !important;
              }
              #playlist-fab { display: flex !important; }
            }
            .hide-xs { display: inline; }
            .hide-sm { display: flex; }
            @media (max-width: 600px) {
              .hide-xs { display: none !important; }
              .hide-sm { display: none !important; }
            }
          `}</style>

          <div
            id="playlist-panel"
            style={{
              display: focusMode ? "none" : undefined,
            }}
          >
            <PlaylistSidebar
              videos={videos}
              activeId={activeId}
              completedCount={completedCount}
              progress={progress}
              sortAsc={sortAsc}
              onSort={() => setSortAsc((p) => !p)}
              onSelect={handleSelect}
              mobileOpen={playlistMobileOpen}
              onMobileClose={() => setPlaylistMobileOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Mobile playlist FAB */}
      {!focusMode && (
        <button
          id="playlist-fab"
          aria-label="Show playlist"
          onClick={() => setPlaylistMobileOpen(true)}
          style={{
            display: "none", // shown via CSS on mobile
            position: "fixed",
            bottom: 24,
            right: 20,
            zIndex: 50,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: t.accent,
            boxShadow: `0 4px 24px ${t.accentGlow}`,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            transition: "transform .15s",
          }}
        >
          <Icon name="list" size={20} color="#fff" />
        </button>
      )}

      {/* Locked video modal */}
      <LockedModal
        open={lockedTitle !== null}
        videoTitle={lockedTitle ?? ""}
        onClose={() => setLockedTitle(null)}
      />
    </div>
  );
}
