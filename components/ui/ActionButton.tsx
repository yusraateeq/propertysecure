'use client';

import { m as motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type ActionButtonProps = HTMLMotionProps<'button'> & {
  children: ReactNode;
  variant?: 'navy' | 'outline' | 'light' | 'gold';
};

const styles = {
  navy: 'border-navy bg-navy text-white hover:border-navy-deep hover:bg-navy-deep',
  outline: 'border-line bg-white text-navy hover:border-accent',
  light: 'border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy-deep',
  gold: 'border-gold bg-gold text-navy-deep hover:border-gold-hover hover:bg-gold-hover',
};

export function ActionButton({ children, variant = 'navy', className = '', ...props }: ActionButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border px-6 py-3 font-heading text-[15px] font-bold leading-5 shadow-sm transition-colors duration-300 ${styles[variant]} ${className}`}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
