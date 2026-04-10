"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import type { Playlist } from "@/types";

interface PreviewCardProps {
  playlist: Playlist;
}

export default function PreviewCard({ playlist }: PreviewCardProps) {
  const { t } = useTheme();
  const router = useRouter();

  const previewVideos = playlist.videos.slice(0, 5);
  const remaining = playlist.totalVideos - 5;

  return (
    <div
      className="anim-fadeUp"
      style={{
        maxWidth: 600,
        margin: "36px auto 0",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 18,
        overflow: "hidden",
        textAlign: "left",
        boxShadow: t.shadow,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 20px",
          borderBottom: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 90,
            height: 58,
            borderRadius: 9,
            overflow: "hidden",
            flexShrink: 0,
            background: t.border,
          }}
        >
          <Image
            src={playlist.thumbnail}
            alt={playlist.title}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>

        <div style={{ flex: 1, minWidth: 140 }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: 14.5,
              fontFamily: "'Syne', sans-serif",
              color: t.text,
              marginBottom: 4,
              lineHeight: 1.3,
            }}
          >
            {playlist.title}
          </p>
          <p style={{ fontSize: 12, color: t.muted }}>{playlist.channel}</p>
        </div>

        <div style={{ display: "flex", gap: 20, flexShrink: 0 }}>
          <StatChip label="Videos" value={String(playlist.totalVideos)} />
          <StatChip label="Duration" value={playlist.totalDuration} />
        </div>
      </div>

      {/* Video list */}
      <div>
        {previewVideos.map((v, i) => (
          <div
            key={v.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 20px",
              borderBottom: i < previewVideos.length - 1 ? `1px solid ${t.border}` : "none",
              opacity: i === 0 ? 1 : i < 3 ? 0.65 : 0.3,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: i === 0 ? t.accent : t.locked,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {i === 0 ? (
                <Icon name="play" size={12} color="#fff" />
              ) : (
                <Icon name="lock" size={12} color={t.lockedText} />
              )}
            </div>
            <span
              style={{
                fontSize: 13.5,
                flex: 1,
                color: i === 0 ? t.text : t.muted,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              {v.title}
            </span>
            <span
              style={{
                fontSize: 11.5,
                color: t.muted,
                fontFamily: "'DM Mono', monospace",
                flexShrink: 0,
              }}
            >
              {v.duration}
            </span>
          </div>
        ))}
        {remaining > 0 && (
          <p
            style={{
              padding: "12px 20px",
              fontSize: 13,
              color: t.muted,
              textAlign: "center",
              borderTop: `1px solid ${t.border}`,
            }}
          >
            + {remaining} more lessons — unlock with free account
          </p>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${t.border}` }}>
        <Button
          size="lg"
          fullWidth
          onClick={() => router.push("/dashboard")}
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-.2px" }}
        >
          Start Learning for Free →
        </Button>
      </div>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  const { t } = useTheme();
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "-.5px",
          color: t.text,
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>{label}</p>
    </div>
  );
}
