"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { extractPlaylistId } from "@/lib/youtube";

interface AddPlaylistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddPlaylistModal({ open, onClose }: AddPlaylistModalProps) {
  const { t } = useTheme();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setError("");
    if (!url.trim()) { setError("Please paste a YouTube playlist URL."); return; }
    const id = extractPlaylistId(url);
    if (!id) { setError("Couldn't detect a playlist ID. Check your URL."); return; }

    setLoading(true);
    // Simulate API delay — replace with real fetchPlaylistFromYouTube(id)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onClose();
    router.push(`/learn/${id}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "-.5px",
          color: t.text,
          marginBottom: 8,
        }}
      >
        Import a Playlist
      </h2>
      <p style={{ fontSize: 14, color: t.muted, marginBottom: 22, lineHeight: 1.65 }}>
        Paste any YouTube playlist URL. We&apos;ll convert it into a structured course
        with sequential unlocking and progress tracking.
      </p>

      <input
        autoFocus
        type="url"
        placeholder="https://youtube.com/playlist?list=…"
        value={url}
        onChange={(e) => { setUrl(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && handleImport()}
        style={{
          width: "100%",
          background: t.surface,
          border: `1.5px solid ${error ? "#f56565" : t.border}`,
          borderRadius: 11,
          padding: "12px 16px",
          color: t.text,
          fontSize: 14.5,
          outline: "none",
          marginBottom: error ? 6 : 16,
          transition: "border-color .2s, box-shadow .2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accentSoft}`)
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />
      {error && (
        <p style={{ fontSize: 12, color: "#f56565", marginBottom: 14 }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button
          onClick={handleImport}
          loading={loading}
          style={{ flex: 2 }}
        >
          Import &amp; Build Course →
        </Button>
      </div>
    </Modal>
  );
}
