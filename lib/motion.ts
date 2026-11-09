import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const viewport = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const reducedFade: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/**
 * Hero scene tokens (MT-01) - additive block consumed only by
 * `components/sections/Hero.tsx` (homepage-revamp-plan §5). Extends, never
 * alters, the tokens above. Values keep the photo drift slow and the content
 * entrance concise: a 0.72s stagger from the first beat through the stats.
 */
export const HERO_SCENE = {
  /** Auto-advance clock; manual navigation re-arms it (reset-on-select timer). */
  autoAdvanceMs: 7000,
  crossfadeSeconds: 0.8,
  driftSeconds: 10,
  kenBurns: { from: 1.025, to: 1.095 },
  entrance: {
    chip: { y: 12, delay: 0.02, duration: 0.34 },
    headline: { y: 22, delay: 0.08, duration: 0.46 },
    support: { y: 16, delay: 0.14, duration: 0.42 },
    ctaRow: { y: 16, delay: 0.2, duration: 0.42 },
    phonePill: { y: 12, delay: 0.28, duration: 0.4 },
    stats: { y: 12, delay: 0.32, duration: 0.4 },
  },
  blob: { floatY: [-6, 6, -6] as [number, number, number], floatSeconds: 18, floatSecondsAlt: 22 },
  parallax: {
    photoY: [0, 40] as [number, number],
    copyY: [0, -24] as [number, number],
    copyOpacity: [1, 0.85] as [number, number],
  },
} as const;