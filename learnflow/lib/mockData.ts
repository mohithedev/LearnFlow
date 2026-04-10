import type { Playlist, UserPlaylist, UserStats } from "@/types";

export const MOCK_PLAYLIST: Playlist = {
  id: "PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb",
  title: "Complete React Developer Course 2024",
  channel: "Traversy Media",
  thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg",
  totalVideos: 24,
  totalDuration: "18h 42m",
  createdAt: "2024-09-10",
  videos: [
    { id: 1,  ytId: "w7ejDZ8SWv8", title: "Introduction & Setup",          duration: "12:34", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: true,  unlocked: true,  order: 1  },
    { id: 2,  ytId: "w7ejDZ8SWv8", title: "JSX & Components Basics",       duration: "24:18", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: true,  unlocked: true,  order: 2  },
    { id: 3,  ytId: "w7ejDZ8SWv8", title: "State & Props Deep Dive",       duration: "31:05", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: true,  order: 3  },
    { id: 4,  ytId: "w7ejDZ8SWv8", title: "useEffect & Lifecycle",         duration: "28:44", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 4  },
    { id: 5,  ytId: "w7ejDZ8SWv8", title: "Context API & useContext",      duration: "22:10", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 5  },
    { id: 6,  ytId: "w7ejDZ8SWv8", title: "Custom Hooks Pattern",          duration: "19:52", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 6  },
    { id: 7,  ytId: "w7ejDZ8SWv8", title: "React Router v6",               duration: "33:27", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 7  },
    { id: 8,  ytId: "w7ejDZ8SWv8", title: "Forms & Validation",            duration: "25:15", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 8  },
    { id: 9,  ytId: "w7ejDZ8SWv8", title: "Redux Toolkit Intro",           duration: "40:11", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 9  },
    { id: 10, ytId: "w7ejDZ8SWv8", title: "API Calls with React Query",    duration: "35:22", thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", completed: false, unlocked: false, order: 10 },
  ],
};

export const MOCK_USER_PLAYLISTS: UserPlaylist[] = [
  { id: 1, playlistId: "PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb", title: "Complete React Developer Course",    channel: "Traversy Media", progress: 35, totalVideos: 24, completedCount: 8,  thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", lastWatched: "2h ago"    },
  { id: 2, playlistId: "PLSyLGd0D4kk9GBg4xdLdBKzGBFBMJixni", title: "Advanced CSS Animations & Motion", channel: "Kevin Powell",   progress: 72, totalVideos: 15, completedCount: 11, thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", lastWatched: "Yesterday" },
  { id: 3, playlistId: "PLSyLGd0D4kk9GBg4xdLdBKzGBFBMJixnx", title: "Node.js & Express Full Course",    channel: "Fireship",       progress: 12, totalVideos: 30, completedCount: 4,  thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/mqdefault.jpg", lastWatched: "3 days ago"},
];

export const MOCK_USER_STATS: UserStats = {
  totalVideos: 69,
  completedVideos: 23,
  streakDays: 7,
  totalMinutes: 840,
};
