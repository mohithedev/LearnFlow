# LearnFlow 🎓

> Turn any YouTube playlist into a structured, distraction-free course with sequential unlocking and progress tracking.

---

## Tech Stack

| Layer        | Tech                              |
|--------------|-----------------------------------|
| Framework    | Next.js 14 (App Router)           |
| Language     | TypeScript 5                      |
| Styling      | CSS-in-JS (inline styles) + globals.css |
| State        | React hooks (`useState`, `useCallback`) |
| Auth         | Ready for Supabase Auth           |
| Database     | Ready for Supabase (PostgreSQL)   |
| APIs         | YouTube Data API v3, IFrame API   |
| Hosting      | Vercel (recommended)              |

---

## Project Structure

```
learnflow/
├── app/
│   ├── layout.tsx              # Root layout + ThemeProvider
│   ├── globals.css             # Reset, animations, utility classes
│   ├── page.tsx                # Guest / Landing page
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard
│   └── learn/[playlistId]/
│       └── page.tsx            # Video player + course view
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button (primary/ghost/soft/success)
│   │   ├── Icon.tsx            # Inline SVG icon library
│   │   ├── Modal.tsx           # Accessible overlay modal
│   │   ├── NavBar.tsx          # Shared sticky top nav
│   │   ├── ProgressBar.tsx     # Animated progress bar
│   │   └── ThemeToggle.tsx     # Dark / Midnight / Light cycle button
│   ├── guest/
│   │   ├── PlaylistInputSection.tsx
│   │   └── PreviewCard.tsx
│   ├── dashboard/
│   │   ├── AddPlaylistModal.tsx
│   │   ├── CourseCard.tsx
│   │   ├── Sidebar.tsx
│   │   └── StatsRow.tsx
│   └── learn/
│       ├── LockedModal.tsx
│       ├── PlaylistSidebar.tsx
│       └── VideoPlayer.tsx
├── context/
│   └── ThemeContext.tsx         # Theme provider + useTheme hook
├── hooks/
│   ├── usePlaylistInput.ts      # URL input + playlist fetch state
│   └── useProgress.ts           # Video completion + unlock logic
├── lib/
│   ├── mockData.ts              # Mock playlists & user data
│   ├── themes.ts                # Theme token definitions
│   └── youtube.ts               # YouTube API helpers + URL parser
├── types/
│   └── index.ts                 # All TypeScript interfaces
├── .env.example                 # Environment variable template
└── README.md
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:
```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url          # optional
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key     # optional
```

### 3. Get a YouTube Data API v3 key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **YouTube Data API v3**
3. Create credentials → **API Key**
4. Paste it in `.env.local`

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Connecting Real YouTube Data

The app ships with mock data so it works out of the box. To connect real YouTube playlists:

In `hooks/usePlaylistInput.ts`, replace the mock delay with:
```ts
import { fetchPlaylistFromYouTube } from "@/lib/youtube";
// ...
const result = await fetchPlaylistFromYouTube(id);
setPlaylist(result);
```

The `fetchPlaylistFromYouTube` function in `lib/youtube.ts` handles:
- Fetching all playlist items (titles, thumbnails, order)
- Bulk-fetching video durations (ISO 8601 → mm:ss)
- Computing total playlist duration

---

## Adding Supabase Auth + Persistence

Install Supabase client:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

Suggested database schema:
```sql
-- Playlists imported by users
create table user_playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  playlist_id text not null,
  title text not null,
  channel text,
  thumbnail text,
  total_videos int,
  created_at timestamptz default now()
);

-- Per-video progress
create table video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  playlist_id text not null,
  video_id int not null,
  completed boolean default false,
  unlocked boolean default false,
  watched_at timestamptz,
  unique(user_id, playlist_id, video_id)
);
```

---

## Themes

Three built-in themes, toggled via the cycle button on every page:

| Theme    | Accent   | Background |
|----------|----------|------------|
| Dark     | `#6c63ff`| `#0b0b10`  |
| Midnight | `#00d4ff`| `#030410`  |
| Light    | `#5b4ef8`| `#f3f3f8`  |

Theme preference is persisted in `localStorage`.

---

## Responsive Breakpoints

| Breakpoint | Behaviour                                           |
|------------|-----------------------------------------------------|
| > 900px    | Full desktop layout — sidebar + playlist panel      |
| ≤ 900px    | Sidebar collapses to hamburger overlay              |
| ≤ 900px    | Playlist panel becomes FAB-triggered slide-in drawer|
| ≤ 600px    | Nav labels hidden, grids collapse to 2-col          |
| ≤ 380px    | Single column, smaller headings                     |

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.
