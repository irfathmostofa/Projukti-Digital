"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, ...(direction === "none" ? {} : offset) }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className }: Omit<RevealProps, "direction">) {
  return (
    <Reveal direction="none" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function FadeUp({ children, delay = 0, className }: Omit<RevealProps, "direction">) {
  return (
    <Reveal direction="up" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function FadeDown({ children, delay = 0, className }: Omit<RevealProps, "direction">) {
  return (
    <Reveal direction="down" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function ScaleIn({ children, delay = 0, className }: Omit<RevealProps, "direction">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SlideLeft({ children, delay = 0, className }: Omit<RevealProps, "direction">) {
  return (
    <Reveal direction="left" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

export function SlideRight({ children, delay = 0, className }: Omit<RevealProps, "direction">) {
  return (
    <Reveal direction="right" delay={delay} className={className}>
      {children}
    </Reveal>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: Omit<RevealProps, "delay" | "duration">) {
  const reduce = useReducedMotion();
  const offset = directionOffset[direction];
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ViewportTracker({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className={className} data-inview={inView}>
      {children}
    </div>
  );
}

export const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1 },
  },
};
