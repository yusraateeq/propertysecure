'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
