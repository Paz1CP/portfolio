"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const interactive = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = window.innerWidth * 0.62;
    let y = window.innerHeight * 0.44;
    let targetX = x;
    let targetY = y;

    const blocked = () => document.hidden || document.body.hasAttribute("data-scroll-locked");
    const paint = () => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      glow.style.opacity = "0";
    };
    const tick = () => {
      frame = 0;
      if (!interactive.matches || blocked()) return stop();
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) < 0.5) {
        x = targetX;
        y = targetY;
        paint();
        return;
      }
      paint();
      frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (!interactive.matches || blocked() || event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const refresh = () => {
      if (blocked()) return stop();
      if (!interactive.matches) {
        stop();
        x = targetX = window.innerWidth * 0.62;
        y = targetY = window.innerHeight * 0.44;
        paint();
        glow.style.opacity = "0.28";
      }
    };
    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
    paint();
    refresh();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", stop);
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", refresh);
    interactive.addEventListener("change", refresh);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", stop);
      window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", refresh);
      interactive.removeEventListener("change", refresh);
    };
  }, []);

  return (
    <div className="interactive-bg" aria-hidden="true">
      <div ref={glowRef} className="interactive-bg__cursor">
        <div className="interactive-bg__pattern" />
        <div className="interactive-bg__glow" />
      </div>
    </div>
  );
}
