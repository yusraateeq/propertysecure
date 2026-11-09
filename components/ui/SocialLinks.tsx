'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import { socials } from '@/lib/site';

type SocialIconProps = { icon: (typeof socials)[number]['icon']; className?: string };

function SocialIcon({ icon, className = 'h-[17px] w-[17px]' }: SocialIconProps) {
  const common = { className, fill: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': true } as const;

  switch (icon) {
    case 'twitter':
      return <svg {...common}><path d="M23.4 4.8c-.8.4-1.7.6-2.6.8a4.5 4.5 0 0 0 2-2.5c-.9.5-1.9.9-2.9 1.1a4.5 4.5 0 0 0-7.8 4.1A12.9 12.9 0 0 1 2.8 3.7a4.5 4.5 0 0 0 1.4 6.1c-.7 0-1.4-.2-2-.5v.1a4.5 4.5 0 0 0 3.6 4.5c-.7.2-1.4.2-2 .1a4.5 4.5 0 0 0 4.2 3.2A9.1 9.1 0 0 1 0 19.2a12.8 12.8 0 0 0 7 2c8.3 0 12.9-7 12.9-13v-.6c.9-.7 1.7-1.5 2.4-2.4l1.1-.4Z" /></svg>;
    case 'facebook':
      return <svg {...common}><path d="M13.7 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H6.8V13h3.1v9h3.8Z" /></svg>;
    case 'linkedin':
      return <svg {...common}><path d="M5.3 7.8H1.8V22h3.5V7.8ZM3.5 2A2 2 0 1 0 3.5 6a2 2 0 0 0 0-4ZM22 13.9c0-4.3-2.3-6.3-5.4-6.3-2.5 0-3.6 1.4-4.2 2.3V7.8H8.9V22h3.5v-7c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8V22H22v-8.1Z" /></svg>;
    case 'youtube':
      return <svg {...common}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>;
    case 'yelp':
      return <svg {...common}><path d="M11.1 2.2c-1.1.3-1 2.5-.9 4.6.1 2.4.3 5.6 1.3 6 .9.4 2.4-1.5 3.5-3.3 1-1.6 2.3-4.2 1.6-5-1.2-1.3-4.4-2.6-5.5-2.3ZM6.4 8.1c-.8.7-.4 2.9.2 4.6.6 1.8 1.6 4 2.7 4.1 1 .1 1.8-2.8 2.2-4.7.3-1.8.4-3.6-.4-4-1.1-.6-3.9-.7-4.7 0Zm11.8 4.1c-1.1-.4-3.9.4-4.5 1.3-.5.9 1.4 3 2.7 4.2 1.2 1.1 3.1 2.3 4 1.8.8-.5 1.4-3.3 1.3-4.8-.1-1.5-.1-3.5-1-3.8-.7-.3-1.5 1.7-2.5 1.3ZM9.5 18c-.9-.4-3.2 1.5-3.6 2.5-.4 1.1 1.4 3.1 2.6 3.5 1.1.4 2.8-.5 3.1-1.5.4-1.2-.3-3.8-1.2-4.4-.3-.2-.6-.3-.9-.1Zm7.2.2c-.9.6-.6 3.1-.1 3.8.5.8 2.9.9 4 .5 1-.4 1.6-2.1 1.3-3.1-.4-1.2-2.2-2.7-3.3-2.6-.7 0-1.3.9-1.9 1.4Z" /></svg>;
  }
}

type SocialLinksProps = { inverse?: boolean; className?: string };

export function SocialLinks({ inverse = false, className = '' }: SocialLinksProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Social media links">
      {socials.map((social) => (
        <li key={social.label}>
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${
              inverse
                ? 'border-white/15 bg-white/5 text-white hover:border-gold hover:bg-gold hover:text-navy-deep'
                : 'border-white/15 text-white/80 hover:border-gold hover:bg-gold hover:text-navy-deep'
            }`}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          >
            <SocialIcon icon={social.icon} />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
