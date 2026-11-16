// Ruta: src/components/motion.ts
// Shared motion presets. MotionConfig reducedMotion="user" (App.tsx) turns
// the transforms off for visitors who prefer reduced motion.
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const inView = { once: true, amount: 0.25 } as const;
