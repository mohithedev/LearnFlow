"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import NavBar from "@/components/ui/NavBar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import PlaylistInputSection from "@/components/guest/PlaylistInputSection";
import PreviewCard from "@/components/guest/PreviewCard";
import { usePlaylistInput } from "@/hooks/usePlaylistInput";

const FEATURES = [
  { emoji: "🔒", title: "Sequential Unlocking",  desc: "Each lesson unlocks only after completing the previous. No skipping ahead." },
  { emoji: "📊", title: "Progress Tracking",     desc: "See exactly where you stand across every course. Resume right where you left off." },
  { emoji: "🎯", title: "Focus Mode",            desc: "Zero distractions. No recommendations, no comments — just you and the content." },
  { emoji: "⚡", title: "Instant Import",        desc: "Paste any playlist URL. Your structured course is ready in seconds." },
];

export default function GuestPage() {
  const { t } = useTheme();
  const { url, setUrl, status, error, playlist, submit } = usePlaylistInput();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        overflowX: "hidden",
        transition: "background .25s, color .25s",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(ellipse 80% 60% at 15% 5%, ${t.accentGlow}, transparent 60%),
                       radial-gradient(ellipse 50% 45% at 85% 80%, rgba(255,80,80,.05), transparent 60%)`,
        }}
      />

      {/* Nav */}
      <NavBar
        rightSlot={
          <>
            <ThemeToggle />
            <Link
              href="/dashboard"
              style={{
                background: "none",
                border: `1px solid ${t.border}`,
                color: t.muted,
                padding: "7px 16px",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: 500,
                transition: "border-color .15s",
              }}
            >
              Sign in
            </Link>
            <Button onClick={() => (window.location.href = "/dashboard")}>
              Get Started
            </Button>
          </>
        }
      />

      {/* Hero */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(16px, 4vw, 40px) 48px",
          textAlign: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Badge */}
        <div
          className="anim-fadeUp"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: t.accentSoft,
            border: `1px solid ${t.accent}33`,
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 28,
            fontSize: 11.5,
            fontWeight: 600,
            color: t.accent,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: ".04em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: t.accent,
              boxShadow: `0 0 8px ${t.accent}`,
            }}
          />
          YouTube → Structured Learning
        </div>

        {/* Title */}
        <h1
          className="anim-fadeUp d1"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(38px, 7.5vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "clamp(-1.5px, -0.03em, -3px)",
            marginBottom: 22,
            color: t.text,
          }}
        >
          Turn any playlist
          <br />
          <span style={{ color: t.accent }}>into a course.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="anim-fadeUp d2"
          style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: t.muted,
            lineHeight: 1.75,
            margin: "0 auto 48px",
            maxWidth: 520,
          }}
        >
          No distractions. No rabbit holes.
          <br />
          Focused sequential learning with real progress tracking — free, forever.
        </p>

        {/* Playlist input */}
        <PlaylistInputSection
          value={url}
          onChange={setUrl}
          onSubmit={submit}
          loading={status === "loading"}
          error={error}
        />

        {/* Preview card */}
        {status === "success" && playlist && (
          <PreviewCard playlist={playlist} />
        )}
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px) 90px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <h2
          className="anim-fadeUp"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 3.5vw, 32px)",
            textAlign: "center",
            marginBottom: 36,
            letterSpacing: "-.8px",
            color: t.text,
          }}
        >
          Everything YouTube is missing
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 14,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`anim-fadeUp d${i + 1}`}
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 16,
                padding: "22px 20px",
                transition: "border-color .2s, transform .2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${t.accent}55`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = t.border;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.emoji}</div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 14.5,
                  marginBottom: 7,
                  fontFamily: "'Syne', sans-serif",
                  color: t.text,
                }}
              >
                {f.title}
              </p>
              <p style={{ fontSize: 13.5, color: t.muted, lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${t.border}`,
          padding: "24px clamp(16px, 4vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          position: "relative",
          zIndex: 5,
        }}
      >
        <span style={{ fontSize: 13, color: t.muted }}>© 2024 LearnFlow</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "GitHub"].map((l) => (
            <span key={l} style={{ fontSize: 13, color: t.muted, cursor: "pointer" }}>
              {l}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
