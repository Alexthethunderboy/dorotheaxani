
"use client";
import { useEffect, useState } from "react";
import WeddingLoader from "@/components/WeddingLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // --- Video hit counter script ---
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
        keepalive: true
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
    // --- End video hit counter script ---
  }, []);

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Petal Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <svg
            key={i}
            className="petal"
            style={{
              left: `${(i * 5 + (i % 3) * 8) % 100}vw`,
              top: `${(i * 12 + (i % 4) * 7) % 100}vh`,
              width: 48 + (i % 3) * 12,
              height: 24 + (i % 2) * 10,
              animationDelay: `${i * 1.2}s`,
              zIndex: 0,
            }}
            viewBox="0 0 48 24"
            fill="none"
          >
            <ellipse cx="24" cy="12" rx="18" ry="8" fill="#F6E7E1" />
          </svg>
        ))}
      </div>

      <section style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <WeddingLoader />
        ) : (
          <div className="wedding-card wedding-fadein" style={{ maxWidth: '100vw', margin: '3rem auto', textAlign: 'center', background: 'rgba(0,0,0,0.92)' }}>
            <h1 style={{ fontSize: '2.6rem', color: 'var(--wedding-sage)', marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>Dorothea & Ani</h1>
            <div style={{ fontSize: '1.3rem', color: 'var(--wedding-muted)', marginBottom: 24, fontFamily: 'serif', letterSpacing: 0.5 }}>Together with you, forever.</div>
            <video
              id="player"
              controls
              poster="/videos/thumbnail.jpg"
              style={{
                width: '100%',
                maxWidth: 800,
                minHeight: 420,
                borderRadius: '2rem',
                boxShadow: '0 8px 48px 0 rgba(183,203,181,0.18)',
                margin: '0 auto 2rem',
                background: '#fffff',
                outline: 'none',
                border: '2.5px solid black',
                transition: 'max-width 0.3s cubic-bezier(.4,2,.6,1)',
              }}
            >
              <source src="/videos/wedding.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{ fontSize: '1.1rem', color: 'var(--wedding-muted)', marginTop: 16 }}>
              <span role="img" aria-label="flower">💐</span> Enjoy our wedding video!
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
