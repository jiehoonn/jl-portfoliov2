"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/layout/Hero";
import Experience from "@/components/layout/Experience";
import Projects from "@/components/layout/Projects";
import Contact from "@/components/layout/Contact";
import ModelInfo from "@/components/layout/ModelInfo";

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

    // Make Lenis available globally for navigation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as { lenis?: any }).lenis = lenis;

    // Listen for scroll events
    lenis.on("scroll", (e) => {
      console.log("Scroll position:", e.animatedScroll);
    });

    // Cleanup
    return () => {
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as { lenis?: any }).lenis;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <div id="experience">
        <Experience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <ModelInfo />
    </div>
  );
}
