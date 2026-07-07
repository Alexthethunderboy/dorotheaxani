"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

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

  if (!mounted) return null;

  if (reduced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] wedding-fadein" aria-live="polite">
        <div className="relative w-64 h-36 mb-6 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(241,231,220,0.1)] border border-white/10">
          <Image
            src="/videos/thumbnail.jpg"
            alt="Wedding"
            fill
            className="object-cover brightness-75 blur-sm"
          />
        </div>
        <div className="text-wedding-gold/80 text-lg font-serif tracking-widest">Preparing your video...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] wedding-fadein" aria-live="polite">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_60px_rgba(183,203,181,0.15)] p-6 mb-6 flex items-center justify-center min-w-[120px] min-h-[120px]">
        {lottieOk ? (
          <LottiePlayer
            autoplay
            loop
            src="/wedding-loader.json"
            style={{ height: 100, width: 100 }}
            onEvent={e => {
              if (e === "error") setLottieOk(false);
            }}
          />
        ) : (
          <PetalFallback />
        )}
      </div>
      <div className="text-wedding-gold/80 text-lg font-serif tracking-[0.2em] uppercase text-sm">Loading...</div>
    </div>
  );
}

function PetalFallback() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="animate-[spin_6s_linear_infinite] opacity-60"
    >
      <g>
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="30"
            rx="8"
            ry="24"
            fill="#b7cbb5"
            opacity={0.6}
            transform={`rotate(${i * 45} 60 60)`}
          />
        ))}
      </g>
    </svg>
  );
}
