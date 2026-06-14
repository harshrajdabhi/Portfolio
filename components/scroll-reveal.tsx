"use client"

import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion"
import { useRef, type ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right"

const offsetMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: Direction
  once?: boolean
}

/**
 * Reveal-on-scroll wrapper. Fades/slides children in as they enter the viewport.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const offset = offsetMap[direction]
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Pixels to translate across the scroll range. Positive = moves down slower. */
  offset?: number
  style?: MotionStyle
}

/**
 * Subtle parallax wrapper. Translates children on the Y axis as the element
 * scrolls through the viewport.
 */
export function Parallax({ children, className, offset = 80, style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  )
}
