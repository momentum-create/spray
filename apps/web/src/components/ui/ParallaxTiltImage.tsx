"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

type ParallaxTiltImageProps = ImageProps & {
  /** カーソル位置に応じた最大平行移動量 (px)。デフォルト 14。 */
  maxTranslate?: number;
  /** カーソル位置に応じた最大 3D 回転量 (deg)。デフォルト 5。 */
  maxRotate?: number;
  /** 端の見切れ防止のためのベース拡大率。デフォルト 1.08。 */
  scale?: number;
  /** lerp 係数。1 に近いほど即追従、小さいほど滑らか。デフォルト 0.08。 */
  smoothing?: number;
  /** ラッパー <div> に付与する className（位置決め用）。 */
  wrapperClassName?: string;
};

/**
 * カーソル追従のパララックス / 3D チルトを適用した next/image。
 * - ビューポート中心からのオフセットで動くため、画像が画面内にある限り常に反応する。
 * - `prefers-reduced-motion` および粗いポインタ（タッチ）では自動的に無効化。
 */
export function ParallaxTiltImage({
  maxTranslate = 14,
  maxRotate = 5,
  scale = 1.08,
  smoothing = 0.08,
  wrapperClassName,
  ...imageProps
}: ParallaxTiltImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      el.style.transform = `scale(${scale})`;
      return;
    }

    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
    };

    const animate = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      const tx = currentX * maxTranslate;
      const ty = currentY * maxTranslate;
      const rx = -currentY * maxRotate;
      const ry = currentX * maxRotate;

      el.style.transform = `perspective(1200px) translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, [maxTranslate, maxRotate, scale, smoothing]);

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName ?? "absolute inset-0"}
      style={{
        willChange: "transform",
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      <Image {...imageProps} />
    </div>
  );
}
