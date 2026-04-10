"use client";

import { useState, useCallback } from "react";
import type { Video } from "@/types";

export function useProgress(initialVideos: Video[]) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [activeId, setActiveId] = useState<number>(
    initialVideos.find((v) => v.unlocked && !v.completed)?.id ?? initialVideos[0]?.id ?? 1
  );

  const activeVideo = videos.find((v) => v.id === activeId) ?? videos[0];
  const completedCount = videos.filter((v) => v.completed).length;
  const progress = videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;

  /** Mark current video complete and unlock the next */
  const markComplete = useCallback(() => {
    setVideos((prev) => {
      const idx = prev.findIndex((v) => v.id === activeId);
      if (idx < 0) return prev;
      const updated = prev.map((v, i) => {
        if (i === idx) return { ...v, completed: true };
        if (i === idx + 1) return { ...v, unlocked: true };
        return v;
      });
      // Auto-advance to next video
      const next = updated[idx + 1];
      if (next) setActiveId(next.id);
      return updated;
    });
  }, [activeId]);

  /** Select a video — returns "locked" if not yet unlocked */
  const selectVideo = useCallback(
    (id: number): "ok" | "locked" => {
      const v = videos.find((x) => x.id === id);
      if (!v) return "locked";
      if (!v.unlocked) return "locked";
      setActiveId(id);
      return "ok";
    },
    [videos]
  );

  return {
    videos,
    activeVideo,
    activeId,
    completedCount,
    progress,
    markComplete,
    selectVideo,
  };
}
