"use client";

import { useState } from "react";
import { extractPlaylistId } from "@/lib/youtube";
import { MOCK_PLAYLIST } from "@/lib/mockData";
import type { Playlist } from "@/types";

type Status = "idle" | "loading" | "success" | "error";

export function usePlaylistInput() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const submit = async () => {
    setError("");
    if (!url.trim()) { setError("Please paste a YouTube playlist URL."); return; }
    const id = extractPlaylistId(url);
    if (!id) { setError("Couldn't detect a playlist ID. Make sure you're pasting a playlist URL."); return; }

    setStatus("loading");

    // In production: call fetchPlaylistFromYouTube(id)
    // Here we simulate with a delay + mock data
    await new Promise((r) => setTimeout(r, 900));
    setPlaylist({ ...MOCK_PLAYLIST, id });
    setStatus("success");
  };

  const reset = () => {
    setUrl(""); setStatus("idle"); setError(""); setPlaylist(null);
  };

  return { url, setUrl, status, error, playlist, submit, reset };
}
