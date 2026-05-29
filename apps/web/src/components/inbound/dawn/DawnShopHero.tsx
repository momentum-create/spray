"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { gsap, useGSAP } from "@/lib/gsap";

export function DawnShopHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(
            headlineRef.current,
            {
              yPercent: -48,
              autoAlpha: 0,
              ease: "none",
            },
            0,
          )
          .to(
            metaRef.current,
            {
              yPercent: -90,
              autoAlpha: 0,
              ease: "none",
            },
            0,
          )
          .to(
            mediaRef.current,
            {
              scale: 1.08,
              yPercent: 12,
              ease: "none",
            },
            0,
          );
      });

      return () => matchMedia.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[165svh] overflow-clip border-b border-[#e8e8e8]"
      aria-label="Shop hero"
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-play-on-snow-ride-concrete.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/45 to-white" />
      </div>

      <div className="sticky top-0 z-10 mx-auto flex min-h-svh w-full max-w-[1200px] flex-col justify-between px-4 py-6 md:px-6">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-black/60 sm:text-xs">
          <span>{dawnCopy.shopHome.badge}</span>
          <span>SPRAY / 2026</span>
        </div>

        <div className="pb-[9svh]">
          <h1
            ref={headlineRef}
            className="text-[clamp(3.2rem,14vw,10rem)] font-medium uppercase leading-[0.78] tracking-[-0.1em] text-black"
          >
            <span className="block">{dawnCopy.shopHome.heroA}</span>
            <span className="block pl-[10vw]">{dawnCopy.shopHome.heroB}</span>
            <span className="block">{dawnCopy.shopHome.heroC}</span>
          </h1>

          <div
            ref={metaRef}
            className="mt-10 grid gap-6 border-t border-black/15 pt-5 text-sm uppercase tracking-[0.2em] text-black/55 sm:grid-cols-[1fr_2fr] sm:text-base"
          >
            <p>Scroll / 2026</p>
            <div className="normal-case tracking-normal">
              <p className="max-w-2xl text-sm leading-7 text-black/70 md:text-base">
                {dawnCopy.shopHome.lead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/en/products/categories" className="dawn-btn-primary">
                  {dawnCopy.shopHome.ctaBrands}
                </Link>
                <Link href="/en/products/categories/gloves" className="dawn-btn-secondary">
                  Gloves
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
