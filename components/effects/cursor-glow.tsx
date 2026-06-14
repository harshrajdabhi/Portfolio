"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Full-viewport radial spotlight that follows the cursor.
 * Desktop-only (hidden on touch / small screens), purely decorative.
 */
export function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 30, mass: 0.4 });

  const background = useTransform(
    [sx, sy],
    ([lx, ly]) =>
      `radial-gradient(600px circle at ${lx}px ${ly}px, rgba(0,229,255,0.10), rgba(124,58,237,0.06) 35%, transparent 70%)`
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block mix-blend-screen"
      style={{ background }}
    />
  );
}
