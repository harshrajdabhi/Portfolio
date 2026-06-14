"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

/**
 * Slow-drifting blurred gradient blobs (primary / secondary / accent).
 * Decorative, pointer-events-none. Place inside a `relative` container.
 */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const blobs = [
    { color: "rgba(0,229,255,0.22)", size: 520, top: "-10%", left: "5%", dur: 18 },
    { color: "rgba(124,58,237,0.22)", size: 600, top: "30%", left: "60%", dur: 22 },
    { color: "rgba(0,255,163,0.16)", size: 460, top: "65%", left: "20%", dur: 26 },
  ];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
