"use client";
import { useEffect, useState } from "react";

interface Petal {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  animDuration: number;
  delay: number;
  opacity: number;
  blur: number;
}

export default function WeddingBackground() {
  const [mounted, setMounted] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setPetals(
        Array.from({ length: 25 }, () => ({
          cx: Math.random() * window.innerWidth,
          cy: Math.random() * window.innerHeight,
          rx: 10 + Math.random() * 18,
          ry: 4 + Math.random() * 8,
          rotate: Math.random() * 360,
          animDuration: 20 + Math.random() * 20, // Slower, more elegant
          delay: -(Math.random() * 30), // Staggered start
          opacity: 0.05 + Math.random() * 0.1, // Softer opacity
          blur: Math.random() > 0.5 ? Math.random() * 3 : 0, // Depth of field effect
        }))
      );
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Richer radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(183,203,181,0.03)_0%,rgba(0,0,0,0.6)_50%,rgba(5,5,5,0.95)_100%)] z-10" />

      {/* Floating Petals with Depth */}
      <svg
        width="100vw"
        height="100vh"
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none z-0"
        aria-hidden="true"
      >
        {petals.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={i % 3 === 0 ? "#f1e7dc" : "#b7cbb5"}
            opacity={p.opacity}
            className="petal"
            style={{
              transformOrigin: `${p.cx}px ${p.cy}px`,
              animationDuration: `${p.animDuration}s`,
              animationDelay: `${p.delay}s`,
              filter: p.blur > 0 ? `blur(${p.blur}px)` : 'none',
            }}
          />
        ))}
      </svg>

      {/* Ambient glow points (stars/dust) spread across the screen */}
      <svg
        width="100vw"
        height="100vh"
        className="absolute inset-0 pointer-events-none z-20"
        aria-hidden="true"
      >
        <g>
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * dimensions.width}
              cy={Math.random() * dimensions.height}
              r={1 + Math.random() * 2}
              fill="#f1e7dc"
              opacity="0.2"
            >
              <animate
                attributeName="opacity"
                values="0.05;0.3;0.05"
                dur={`${4 + Math.random() * 4}s`}
                repeatCount="indefinite"
                begin={`${Math.random() * 2}s`}
              />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}
