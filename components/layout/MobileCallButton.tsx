'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { business } from '@/lib/site';

export function MobileCallButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={business.phoneHref}
      aria-label={`Call Now: ${business.phoneDisplay}`}
      className="fixed bottom-5 right-5 z-40 flex min-h-12 items-center gap-2.5 rounded-full border border-gold/70 bg-navy-deep px-5 py-3 font-heading text-[15px] font-bold text-white shadow-[0_10px_35px_rgba(7,44,73,0.35)] sm:hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 1, duration: 0.5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
    >
      <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
      Call Now
    </motion.a>
  );
}
