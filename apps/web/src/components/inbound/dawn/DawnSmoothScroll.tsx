"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type DawnSmoothScrollProps = {
  children: ReactNode;
};

export function DawnSmoothScroll({ children }: DawnSmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, []);

  return <div className="overflow-x-clip">{children}</div>;
}
