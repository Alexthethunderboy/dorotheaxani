"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

export default function WeddingLoader() {
  const [mounted, setMounted] = useState(false);
  const [lottieOk, setLottieOk] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  if (!mounted) {
    // Avoid rendering anything until after mount (client-only)
    return null;
  }

  if (reduced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]" aria-live="polite">
        <img
          src="/videos/thumbnail.jpg"
          alt="Wedding"
          style={{
            borderRadius: "1.5rem",
            filter: "brightness(0.95) blur(1.5px)",
            boxShadow: "0 0 80px 10px #F1E7DC inset",
            maxWidth: 320,
            marginBottom: 16,
          }}
        />
        <div className="mt-4 text-muted text-lg font-serif" style={{letterSpacing:1}}>Preparing your video…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]" aria-live="polite">
      <div style={{
        background: "red",
        borderRadius: "50%",
        boxShadow: "0 0 80px 10px #F1E7DC inset",
        padding: 24,
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 120,
        minHeight: 120,
      }}>
        {lottieOk ? (
          <LottiePlayer
            autoplay
            loop
            src="/wedding-loader.json"
            style={{ height: 120, width: 120 }}
            onEvent={e => {
              if (e === "error") setLottieOk(false);
            }}
          />
        ) : (
          <PetalFallback />
        )}
      </div>
      <div className="mt-4 text-muted text-lg font-serif" style={{letterSpacing:1}}>…</div>
    </div>
  );
}

function PetalFallback() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="animate-spin-slow"
      style={{ opacity: 0.7 }}
    >
      <g>
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="30"
            rx="10"
            ry="30"
            fill="#F6E7E1"
            opacity={0.5}
            transform={`rotate(${i * 45} 60 60)`}
          />
        ))}
      </g>
    </svg>
  );
}
