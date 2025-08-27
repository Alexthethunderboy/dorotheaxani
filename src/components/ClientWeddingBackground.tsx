"use client";
import dynamic from "next/dynamic";
const WeddingBackground = dynamic(() => import("@/components/WeddingBackground"), { ssr: false });
export default function ClientWeddingBackground() {
  return <WeddingBackground />;
}
