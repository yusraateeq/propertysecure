'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

const MotionLink = motion.create(Link);

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'gold' | 'navy' | 'outline' | 'light' | 'accent';
  className?: string;
  arrow?: boolean;
  download?: boolean | string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

const styles = {
  gold: 'border-gold bg-gold text-navy-deep hover:border-gold-hover hover:bg-gold-hover',
  navy: 'border-navy bg-navy text-white hover:border-navy-deep hover:bg-navy-deep',
  outline: 'border-line bg-transparent text-navy hover:border-accent hover:bg-white',
  light: 'border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy-deep',
  accent: 'border-accent bg-accent text-white hover:border-navy hover:bg-navy',
};

export function ButtonLink({
  href,
  children,
  variant = 'navy',
  className = '',
  arrow = true,
  download,
  external = false,
  ariaLabel,
  onClick,
}: ButtonLinkProps) {
  const reduceMotion = useReducedMotion();
  const classes = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border px-6 py-3 text-center font-heading text-[15px] font-bold leading-5 tracking-[0.015em] shadow-sm transition-colors duration-300 ${styles[variant]} ${className}`;
  const motionProps = {
    whileHover: reduceMotion ? undefined : { y: -2 },
    whileTap: reduceMotion ? undefined : { scale: 0.98 },
    transition: { duration: 0.25 },
  };

  return (
    <MotionLink
      href={href}
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...motionProps}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover:translate-x-1"
          strokeWidth={2}
        />
      )}
    </MotionLink>
  );
}
