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
  const isSnappingRef = useRef(false);
  const targetSlideRef = useRef(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // Sync target slide on load in case of browser scroll restoration
    targetSlideRef.current = Math.round(
      Math.min(3, window.scrollY / window.innerHeight)
    );

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (window.innerWidth < 1024 || !slidesRef.current) return;
      const progress = Math.max(0, Math.min(2, scroll / window.innerHeight));
      slidesRef.current.style.transform = `translateX(-${progress * window.innerWidth}px)`;

      // Keep target slide in sync after navbar jumps
      if (!isSnappingRef.current) {
        targetSlideRef.current = Math.round(
          Math.min(3, scroll / window.innerHeight)
        );
      }
    });

    const snapTo = (slideIndex: number) => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      isSnappingRef.current = true;
      targetSlideRef.current = slideIndex;
      lenis.scrollTo(slideIndex * window.innerHeight, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isSnappingRef.current = false;
        },
      });
      // Safety reset in case onComplete never fires (e.g. interrupted by navbar)
      snapTimeoutRef.current = setTimeout(() => {
        isSnappingRef.current = false;
      }, 1500);
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (window.scrollY >= window.innerHeight * 3) return;

      // Capture phase + stopImmediatePropagation ensures Lenis never sees
      // this event — we drive scroll exclusively via lenis.scrollTo()
      e.preventDefault();
      e.stopImmediatePropagation();

      if (isSnappingRef.current) return;
      if (e.deltaY === 0) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSlide = Math.max(0, Math.min(3, targetSlideRef.current + direction));

      if (nextSlide === targetSlideRef.current) return;

      snapTo(nextSlide);
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    return () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      lenis.destroy();
      delete (window as WindowWithLenis).lenis;
    };
  }, []);

  return (
    <div>
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

      <div id="contact">
        <Contact />
      </div>

      <ModelInfo />
    </div>
  );
}
