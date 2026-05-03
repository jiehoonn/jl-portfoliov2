"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ModelInfo from "@/components/layout/ModelInfo";
import { WindowWithLenis } from "@/types/performance";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis with mobile-optimized settings
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

    (window as WindowWithLenis).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as WindowWithLenis).lenis;
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
