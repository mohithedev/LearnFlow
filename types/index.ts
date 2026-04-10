// ─── Theme ────────────────────────────────────────────────────────
export type ThemeKey = "dark" | "midnight" | "light";

export interface ThemeTokens {
  bg: string;
  surface: string;
  card: string;
  border: string;
  accent: string;
  accentHover: string;
  accentGlow: string;
  accentSoft: string;
  text: string;
  text2: string;
  muted: string;
  success: string;
  locked: string;
  lockedText: string;
  shadow: string;
}

// ─── Video & Playlist ─────────────────────────────────────────────
export interface Video {
  id: number;
  ytId: string;
  title: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
  unlocked: boolean;
  order: number;
}

export interface Playlist {
  id: string;
  title: string;
  channel: string;
  channelId?: string;
  thumbnail: string;
  totalVideos: number;
  totalDuration: string;
  videos: Video[];
  createdAt: string;
}

// ─── User / Dashboard ─────────────────────────────────────────────
export interface UserPlaylist {
  id: number;
  playlistId: string;
  title: string;
  channel: string;
  progress: number;        // 0-100
  totalVideos: number;
  completedCount: number;
  thumbnail: string;
  lastWatched?: string;
}

export interface UserStats {
  totalVideos: number;
  completedVideos: number;
  streakDays: number;
  totalMinutes: number;
}

// ─── YouTube API ──────────────────────────────────────────────────
export interface YouTubePlaylistItem {
  snippet: {
    title: string;
    description: string;
    position: number;
    resourceId: { videoId: string };
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
      default?: { url: string };
    };
  };
}

export interface YouTubeVideoDetails {
  id: string;
  contentDetails: { duration: string };   // ISO 8601
  snippet: { title: string; thumbnails: Record<string, { url: string }> };
}

// ─── Component Props ──────────────────────────────────────────────
export interface ProgressBarProps {
  value: number;
  height?: number;
  showLabel?: boolean;
  color?: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}
