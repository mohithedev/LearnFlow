"use client";

import { useTheme } from "@/context/ThemeContext";
import { MOCK_USER_STATS } from "@/lib/mockData";

export default function StatsRow() {
  const { t } = useTheme();
  const s = MOCK_USER_STATS;

  const items = [
    { label: "Total Videos",  value: String(s.totalVideos),  sub: "across all courses",   highlight: false },
    { label: "Completed",     value: String(s.completedVideos), sub: `${Math.round((s.completedVideos / s.totalVideos) * 100)}% overall`, highlight: false },
    { label: "Day Streak",    value: String(s.streakDays),   sub: "🔥 keep it up!",       highlight: true  },
    { label: "Hours Learned", value: `${Math.round(s.totalMinutes / 60)}h`, sub: `${s.totalMinutes} minutes`, highlight: false },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 14,
        marginBottom: 30,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: t.surface,
            border: `1px solid ${item.highlight ? `${t.accent}33` : t.border}`,
            borderRadius: 14,
            padding: "18px 18px",
          }}
        >
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 3vw, 30px)",
              letterSpacing: "-1px",
              color: item.highlight ? t.accent : t.text,
            }}
          >
            {item.value}
          </p>
          <p style={{ fontSize: 12, fontWeight: 600, color: t.text2, marginTop: 4 }}>
            {item.label}
          </p>
          <p style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{item.sub}</p>
        </div>
      ))}
    </div>
  );
}
