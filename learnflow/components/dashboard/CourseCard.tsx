"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import type { UserPlaylist } from "@/types";

interface CourseCardProps {
  course: UserPlaylist;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { t } = useTheme();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/learn/${course.playlistId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/learn/${course.playlistId}`)}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        transition: "border-color .2s, transform .15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${t.accent}44`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = t.border;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: 80,
          height: 52,
          borderRadius: 9,
          overflow: "hidden",
          flexShrink: 0,
          background: t.border,
        }}
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, transparent 60%, rgba(0,0,0,.4))",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: 14.5,
            fontFamily: "'Syne', sans-serif",
            color: t.text,
            marginBottom: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {course.title}
        </p>
        <p style={{ fontSize: 12, color: t.muted, marginBottom: 10 }}>
          {course.channel} · {course.completedCount}/{course.totalVideos} videos
          {course.lastWatched && (
            <span style={{ color: t.lockedText }}> · {course.lastWatched}</span>
          )}
        </p>
        <ProgressBar value={course.progress} showLabel />
      </div>

      {/* CTA */}
      <Button
        variant="soft"
        size="sm"
        onClick={(e) => {
          // Prevent double-firing from parent onClick
          (e as unknown as React.MouseEvent).stopPropagation();
          router.push(`/learn/${course.playlistId}`);
        }}
      >
        Continue →
      </Button>
    </div>
  );
}
