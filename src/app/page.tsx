"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import ModelInfo from "@/components/layout/ModelInfo";
import { WindowWithLenis } from "@/types/performance";

export default function Home() {
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (window.innerWidth < 1024 || !slidesRef.current) return;
      const progress = Math.max(0, Math.min(2, scroll / window.innerHeight));
      slidesRef.current.style.transform = `translateX(-${progress * window.innerWidth}px)`;
    });

    return () => {
      lenis.destroy();
      delete (window as WindowWithLenis).lenis;
    };
  }, []);

  return (
    <div>
      {/* Horizontal scroll zone — 300vh on desktop, auto height on mobile */}
      <div className="lg:relative lg:h-[300vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
          <div
            ref={slidesRef}
            className="lg:flex lg:flex-row lg:h-full lg:w-[300vw]"
            style={{ willChange: "transform" }}
          >
            <div className="lg:w-screen lg:flex-shrink-0">
              <Hero />
            </div>
            <div id="experience" className="lg:w-screen lg:flex-shrink-0">
              <Experience />
            </div>
            <div id="projects" className="lg:w-screen lg:flex-shrink-0">
              <Projects />
            </div>
          </div>
        </div>
      </div>

      {/* Contact — normal vertical section */}
      <div id="contact">
        <Contact />
      </div>

      <ModelInfo />
    </div>
  );
}
