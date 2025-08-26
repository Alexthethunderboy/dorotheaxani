


"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const ENDPOINT = '/api/hit';
    const VID_ID = 'anniv-2025';
    const MIN_RECOUNT_MS = 30_000;

    function shouldCount(kind: string) {
      const key = `hit:${VID_ID}:${kind}`;
      const last = parseInt(localStorage.getItem(key) || '0', 10);
      if (Date.now() - last < MIN_RECOUNT_MS) return false;
      localStorage.setItem(key, String(Date.now()));
      return true;
    }

    function send(payload: Record<string, unknown>) {
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(ENDPOINT, blob);
        return;
      }
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }

    const vid = document.getElementById('player') as HTMLVideoElement | null;
    if (!vid) return;

    const onPlay = () => {
      if (!shouldCount('play')) return;
      send({ event: 'play', videoId: VID_ID, ts: Date.now() });
    };
    const onEnded = () => {
      send({ event: 'ended', videoId: VID_ID, ts: Date.now() });
    };
    let lastPing = -1;
    const onTimeUpdate = () => {
      if (!vid) return;
      const now = Math.floor(vid.currentTime);
      if (now && now % 10 === 0 && now !== lastPing) {
        lastPing = now;
        send({ event: 'progress', sec: now, videoId: VID_ID, ts: Date.now() });
      }
    };
    vid.addEventListener('play', onPlay);
    vid.addEventListener('ended', onEnded);
    vid.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      vid.removeEventListener('play', onPlay);
      vid.removeEventListener('ended', onEnded);
      vid.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl">
        <video
          id="player"
          className="w-full aspect-video rounded-xl shadow-2xl"
          controls
          poster="/videos/thumbnail.jpg"
          playsInline
        >
          <source src="/videos/wedding.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}
