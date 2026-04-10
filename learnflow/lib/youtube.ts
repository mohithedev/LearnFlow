import type { Playlist, Video, YouTubePlaylistItem, YouTubeVideoDetails } from "@/types";

/** Extract playlist ID from any YouTube URL format */
export function extractPlaylistId(url: string): string | null {
  try {
    const u = new URL(url);
    return u.searchParams.get("list");
  } catch {
    const match = url.match(/[?&]list=([^&]+)/);
    return match ? match[1] : null;
  }
}

/** Convert ISO 8601 duration (PT4M13S) to mm:ss string */
export function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const h = parseInt(match[1] ?? "0");
  const m = parseInt(match[2] ?? "0");
  const s = parseInt(match[3] ?? "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Sum durations array into "Xh Ym" label */
export function sumDurations(durations: string[]): string {
  let totalSec = 0;
  for (const d of durations) {
    const parts = d.split(":").map(Number);
    if (parts.length === 3) totalSec += parts[0] * 3600 + parts[1] * 60 + parts[2];
    else if (parts.length === 2) totalSec += parts[0] * 60 + parts[1];
  }
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Build distraction-free YouTube embed URL */
export function buildEmbedUrl(ytId: string, autoplay = false): string {
  const p = new URLSearchParams({
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    fs: "1",
    color: "white",
    ...(autoplay && { autoplay: "1" }),
  });
  return `https://www.youtube.com/embed/${ytId}?${p.toString()}`;
}

/**
 * Fetch full playlist data from YouTube Data API v3.
 * Requires NEXT_PUBLIC_YOUTUBE_API_KEY in .env.local
 */
export async function fetchPlaylistFromYouTube(playlistId: string): Promise<Playlist> {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!API_KEY) throw new Error("Missing NEXT_PUBLIC_YOUTUBE_API_KEY");

  // 1. Fetch playlist items (up to 50 per page — add pagination for larger playlists)
  const itemsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  );
  if (!itemsRes.ok) throw new Error("Failed to fetch playlist items");
  const itemsData = await itemsRes.json();
  const items: YouTubePlaylistItem[] = itemsData.items ?? [];

  // 2. Fetch video durations in bulk (max 50 IDs per request)
  const videoIds = items.map((i) => i.snippet.resourceId.videoId).join(",");
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`
  );
  if (!detailsRes.ok) throw new Error("Failed to fetch video details");
  const detailsData = await detailsRes.json();
  const details: YouTubeVideoDetails[] = detailsData.items ?? [];
  const detailsMap = new Map(details.map((d) => [d.id, d]));

  // 3. Build video list
  const videos: Video[] = items.map((item, idx) => {
    const ytId = item.snippet.resourceId.videoId;
    const detail = detailsMap.get(ytId);
    const duration = detail ? parseDuration(detail.contentDetails.duration) : "0:00";
    const thumb =
      item.snippet.thumbnails.medium?.url ??
      item.snippet.thumbnails.default?.url ??
      `https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`;

    return {
      id: idx + 1,
      ytId,
      title: item.snippet.title,
      duration,
      thumbnail: thumb,
      completed: false,
      unlocked: idx === 0,   // Only first video unlocked initially
      order: idx + 1,
    };
  });

  const durations = videos.map((v) => v.duration);

  // 4. Get playlist channel name from first video snippet
  const channelName = items[0]?.snippet?.title
    ? (detailsData.items[0]?.snippet?.channelTitle ?? "Unknown Channel")
    : "Unknown Channel";

  return {
    id: playlistId,
    title: itemsData.items[0]?.snippet?.title ?? "Untitled Playlist",
    channel: channelName,
    thumbnail: items[0]?.snippet?.thumbnails?.medium?.url ?? "",
    totalVideos: videos.length,
    totalDuration: sumDurations(durations),
    videos,
    createdAt: new Date().toISOString(),
  };
}
