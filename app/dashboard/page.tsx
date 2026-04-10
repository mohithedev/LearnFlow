"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import NavBar from "@/components/ui/NavBar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsRow from "@/components/dashboard/StatsRow";
import CourseCard from "@/components/dashboard/CourseCard";
import AddPlaylistModal from "@/components/dashboard/AddPlaylistModal";
import { MOCK_USER_PLAYLISTS } from "@/lib/mockData";

export default function DashboardPage() {
  const { t } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        display: "flex",
        flexDirection: "column",
        transition: "background .25s, color .25s",
      }}
    >
      {/* Nav */}
      <NavBar
        showMenu
        onMenuClick={() => setSidebarOpen(true)}
        rightSlot={
          <>
            <ThemeToggle />
            <Button
              iconLeft="plus"
              onClick={() => setModalOpen(true)}
              size="sm"
            >
              Add Playlist
            </Button>
          </>
        }
      />

      {/* Layout */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar — hidden on mobile via CSS, shown as overlay when sidebarOpen */}
        <div
          style={{
            // On desktop (≥900px): visible sticky sidebar
            // On mobile: position fixed, off-screen until open
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              #dash-sidebar {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                bottom: 0 !important;
                z-index: 50 !important;
                height: 100vh !important;
                transform: ${sidebarOpen ? "translateX(0)" : "translateX(-100%)"} !important;
                transition: transform .28s cubic-bezier(.4,0,.2,1) !important;
                box-shadow: ${sidebarOpen ? "0 0 60px rgba(0,0,0,.6)" : "none"} !important;
              }
            }
          `}</style>
          <div id="dash-sidebar">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: "clamp(24px, 4vw, 40px)",
            minWidth: 0,
            overflowX: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 3vw, 30px)",
                  letterSpacing: "-.8px",
                  color: t.text,
                }}
              >
                My Courses
              </h1>
              <p style={{ fontSize: 14, color: t.muted, marginTop: 4 }}>
                {MOCK_USER_PLAYLISTS.length} active · keep the momentum going 🚀
              </p>
            </div>
            {/* Desktop add button — also in nav on mobile */}
            <Button
              iconLeft="plus"
              onClick={() => setModalOpen(true)}
              style={{ alignSelf: "flex-start" }}
            >
              Add Playlist
            </Button>
          </div>

          {/* Stats */}
          <StatsRow />

          {/* Course list */}
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: t.text,
              marginBottom: 14,
              letterSpacing: "-.3px",
            }}
          >
            Continue Learning
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_USER_PLAYLISTS.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </main>
      </div>

      {/* Add Playlist modal */}
      <AddPlaylistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
