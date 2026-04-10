import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "LearnFlow — YouTube Playlists as Courses",
  description:
    "Transform any YouTube playlist into a structured, distraction-free course with sequential unlocking and progress tracking.",
  openGraph: {
    title: "LearnFlow",
    description: "Structured learning from any YouTube playlist.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
