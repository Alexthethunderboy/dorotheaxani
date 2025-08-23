"use client";
import { useEffect, useState } from "react";

export default function HitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/dorotheaxani.com/visits")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setCount(data.value))
      .catch(() => setError(true));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "rgba(30,30,30,0.85)",
        color: "#fff",
        borderRadius: 12,
        padding: "8px 18px",
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: 14,
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        zIndex: 1000,
        letterSpacing: 1.2,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
      aria-label="Website visit counter"
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{marginRight:4}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
        <circle cx="12" cy="12" r="3" fill="#fff" stroke="#fff" strokeWidth="1.5" />
      </svg>
      <span>
        {error
          ? "Counter unavailable"
          : count === null
          ? "Counting..."
          : `Visitors: ${count}`}
      </span>
    </div>
  );
}
