"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      overscroll: true,
    });

    // Listen for scroll events
    lenis.on("scroll", (e) => {
      console.log("Scroll position:", e.animatedScroll);
    });

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold">Landing Page</h1>
    </div>
  );
}
