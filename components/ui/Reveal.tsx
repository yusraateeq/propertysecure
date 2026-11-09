'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeIn, fadeUp, reducedFade, scaleIn, slideLeft, slideRight, viewport } from '@/lib/motion';

const variants = { fadeUp, fadeIn, scaleIn, slideLeft, slideRight };

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  amount?: number;
  as?: 'div' | 'section' | 'article';
};

export function Reveal({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  amount = 0.2,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const selected = reduceMotion ? reducedFade : variants[variant];

  return (
    <motion.div
      className={className}
      variants={selected}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
