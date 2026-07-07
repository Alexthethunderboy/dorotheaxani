"use client";

import { useVideoTracker } from "@/hooks/useVideoTracker";

export default function WeddingVideoPlayer() {
  useVideoTracker();

  return (
    <div className="relative w-full rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] ring-1 ring-white/5 transition-all duration-700 hover:ring-white/20 hover:shadow-[0_30px_80px_-15px_rgba(183,203,181,0.15)] group">
      <video
        id="player"
        controls
        poster="/videos/thumbnail.jpg"
        className="w-full h-auto aspect-video object-cover bg-black outline-none"
      >
        <source src="/videos/wedding.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
    </div>
  );
}
