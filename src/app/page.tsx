"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ModelInfo from "@/components/layout/ModelInfo";
import { hasMemory, WindowWithLenis } from "@/types/performance";

export default function Home() {
  useEffect(() => {
    // Memory monitoring for debugging
    const monitorMemory = () => {
      if (hasMemory(performance)) {
        const memory = performance.memory;
        console.log('Memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
          percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100) + '%'
        });
      }
    };

    // Monitor memory every 5 seconds
    const memoryInterval = setInterval(monitorMemory, 5000);
    monitorMemory(); // Initial check

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

    // Make Lenis available globally for navigation
    (window as WindowWithLenis).lenis = lenis;

    // Listen for scroll events
    lenis.on("scroll", (e) => {
      console.log("Scroll position:", e.animatedScroll);
    });

    // Cleanup
    return () => {
      clearInterval(memoryInterval);
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
