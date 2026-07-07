"use client";

import { useEffect, useState } from "react";
import WeddingLoader from "@/components/WeddingLoader";
import ClientWeddingBackground from "@/components/ClientWeddingBackground";
import WeddingVideoPlayer from "@/components/WeddingVideoPlayer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col lg:flex-row bg-black">
      {/* Animated Petal Background */}
      <ClientWeddingBackground />

      {loading ? (
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4">
          <WeddingLoader />
        </section>
      ) : (
        <>
          {/* Left Side: Typography & Details (40%) */}
          <section className="relative z-10 w-full lg:w-[40%] min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/50 backdrop-blur-xl wedding-fadein">
            <div className="max-w-md w-full text-center lg:text-left flex flex-col h-full justify-center lg:justify-start lg:pt-24 lg:pb-12">

              
              <h1 className="text-6xl lg:text-8xl text-wedding-sage mb-6 tracking-wide font-bold drop-shadow-md leading-[1.1]">
                Dorothea <br className="hidden lg:block"/> & Ani
              </h1>
              
              <div className="text-xl lg:text-2xl text-wedding-gold/80 mb-12 font-serif tracking-widest drop-shadow-sm italic">
                Together with you, forever.
              </div>
              

            </div>
          </section>

          {/* Right Side: Immersive Video (60%) */}
          <section className="relative z-10 w-full lg:w-[60%] min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center p-6 lg:p-16 wedding-fadein" style={{ animationDelay: '0.2s' }}>
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
              <WeddingVideoPlayer />
              
              <div className="text-sm sm:text-base text-wedding-muted/60 mt-10 font-sans-ui flex items-center justify-center gap-4 tracking-[0.2em] uppercase">
                <span className="w-12 h-[1px] bg-wedding-muted/30"></span>
                <span>Enjoy our story</span>
                <span className="w-12 h-[1px] bg-wedding-muted/30"></span>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
