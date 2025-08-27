"use client";
import { useEffect, useState } from "react";

export default function WeddingBackground() {
  const [mounted, setMounted] = useState(false);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      // Generate petal positions and animation only on client
      setPetals(
        Array.from({ length: 12 }, () => ({
          cx: Math.random() * window.innerWidth,
          cy: Math.random() * window.innerHeight,
          rx: 24 + Math.random() * 16,
          ry: 8 + Math.random() * 8,
          rotate: Math.random() * 360,
          anim: 18 + Math.random() * 12,
        }))
      );
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ overflow: "hidden" }}
    >
      <svg
        width="100vw"
        height="100vh"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {petals.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill="#F6E7E1"
            opacity={0.18}
            style={{
              transform: `rotate(${p.rotate}deg)`,
              animation: `petal-float ${p.anim}s linear infinite`,
            }}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, #fff9f4 0%, #f1e7dc 60%, #b7cbb5 100%)",
          opacity: 0.5,
          zIndex: 1,
        }}
        role="presentation"
      />
      <svg
        width="100vw"
        height="120"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: 120,
          zIndex: 2,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <g>
          {[...Array(16)].map((_, i) => (
            <circle
              key={i}
              cx={40 + i * 60}
              cy={60 + Math.sin(i) * 18}
              r={8 + Math.sin(i * 2) * 2}
              fill="#F1E7DC"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.7;0.3;0.7"
                dur={`${2 + (i % 3)}s`}
                repeatCount="indefinite"
                begin={`${i * 0.2}s`}
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}
