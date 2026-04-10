"use client";

import { type KeyboardEvent } from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

interface PlaylistInputSectionProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  error?: string;
}

export default function PlaylistInputSection({
  value,
  onChange,
  onSubmit,
  loading,
  error,
}: PlaylistInputSectionProps) {
  const { t } = useTheme();

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="anim-fadeUp d3" style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
      {/* Input row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: t.surface,
          border: `1.5px solid ${error ? "#f56565" : t.border}`,
          borderRadius: 14,
          padding: "5px 5px 5px 14px",
          boxShadow: error
            ? "0 0 0 3px rgba(245,101,101,.15)"
            : `0 8px 40px ${t.accentGlow}`,
          transition: "border-color .2s, box-shadow .2s",
        }}
      >
        <Icon name="youtube" size={20} />
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Paste a YouTube playlist URL…"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: t.text,
            fontSize: 15,
            padding: "10px 4px",
            minWidth: 0,
          }}
        />
        <Button onClick={onSubmit} loading={loading} disabled={loading}>
          {loading ? "Loading…" : "Preview →"}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            fontSize: 12,
            color: "#f56565",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {/* Hint */}
      <p
        className="anim-fadeUp d4"
        style={{
          fontSize: 12.5,
          color: t.lockedText,
          textAlign: "center",
          marginTop: 12,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        Example: youtube.com/playlist?list=PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb
      </p>
    </div>
  );
}
