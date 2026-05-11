"use client";

import { useEffect, useRef } from "react";

const DEFAULT_X = 0.62;
const DEFAULT_Y = 0.44;

export function InteractiveBackground() {
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({
    x: DEFAULT_X,
    y: DEFAULT_Y,
    opacity: 0,
  });

  const currentRef = useRef({
    x: DEFAULT_X,
    y: DEFAULT_Y,
    opacity: 0,
  });

  useEffect(() => {
    const root = document.documentElement;
    // debug logs removed

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      root.style.setProperty("--cursor-glow-x", `${DEFAULT_X * 100}%`);
      root.style.setProperty("--cursor-glow-y", `${DEFAULT_Y * 100}%`);
      root.style.setProperty("--cursor-glow-opacity", "0.28");
      return;
    }

    const render = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.opacity += (target.opacity - current.opacity) * 0.1;

      root.style.setProperty("--cursor-glow-x", `${current.x * 100}%`);
      root.style.setProperty("--cursor-glow-y", `${current.y * 100}%`);
      root.style.setProperty(
        "--cursor-glow-opacity",
        current.opacity.toFixed(3)
      );

      // no-op (debugging removed)

      rafRef.current = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX / window.innerWidth;
      targetRef.current.y = event.clientY / window.innerHeight;
      targetRef.current.opacity = 1;
    };

    const handlePointerEnter = () => {
      targetRef.current.opacity = 1;
    };

    const handlePointerLeave = () => {
      targetRef.current.opacity = 0.18;
    };

    const handleBlur = () => {
      targetRef.current.opacity = 0.16;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handleBlur);

    rafRef.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handleBlur);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="interactive-bg" aria-hidden="true">
      <div className="interactive-bg__pattern" />
      <div className="interactive-bg__glow" />
      <div className="interactive-bg__edge" />
    </div>
  );
}