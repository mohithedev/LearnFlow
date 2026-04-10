"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/ui/Icon";
import { buildEmbedUrl } from "@/lib/youtube";
import type { Video } from "@/types";

interface VideoPlayerProps {
  video: Video;
  onComplete: () => void;
}

export default function VideoPlayer({ video, onComplete }: VideoPlayerProps) {
  const { t } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  // Reset play state when video changes
  useEffect(() => {
    setPlaying(false);
  }, [video.id]);

  // YouTube IFrame API message listener
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        // YT IFrame API fires info events; state 0 = ended
        if (data?.event === "infoDelivery" && data?.info?.playerState === 0) {
          onComplete();
        }
      } catch {
        // Non-JSON messages — ignore
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onComplete]);

  const embedUrl = buildEmbedUrl(video.ytId, false);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        background: "#000",
        border: `1px solid ${t.border}`,
        boxShadow: "0 8px 40px rgba(0,0,0,.5)",
      }}
    >
      {playing ? (
        /* ── Real iframe ── */
        <iframe
          ref={iframeRef}
          className="yt-iframe"
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 16 }}
        />
      ) : (
        /* ── Poster / click-to-play ── */
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            background: "linear-gradient(145deg, #0e0e16 0%, #1a1a2c 100%)",
            cursor: "pointer",
          }}
          onClick={() => setPlaying(true)}
        >
          <div style={{ opacity: 0.3, marginBottom: 4 }}>
            <Icon name="youtube" size={44} />
          </div>
          <p
            style={{
              color: "#e8e8f5",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(13px, 2vw, 17px)",
              textAlign: "center",
              maxWidth: "80%",
              padding: "0 16px",
              lineHeight: 1.4,
            }}
          >
            {video.title}
          </p>
          <p
            style={{
              color: "#555570",
              fontSize: 13,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {video.duration}
          </p>

          {/* Play button */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: t.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 28px ${t.accentGlow}`,
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            <Icon name="play" size={22} color="#fff" />
          </div>

          <p style={{ fontSize: 12, color: "#444460", marginTop: 4 }}>
            Click to play in distraction-free mode
          </p>
        </div>
      )}
    </div>
  );
}
