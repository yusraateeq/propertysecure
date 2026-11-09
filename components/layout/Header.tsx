'use client';

import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion';
import { Clock3, Mail, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { EASE } from '@/lib/motion';
import { business, navigation } from '@/lib/site';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === 'Tab' && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 border-b bg-white/95 ${
          scrolled ? 'border-line/80 shadow-header backdrop-blur-xl' : 'border-transparent'
        }`}
        animate={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.98)' }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
      >
        <div className="site-container flex h-[72px] items-center justify-between gap-4 sm:h-[84px]">
          <Link href="/" className="group flex shrink-0 items-center gap-3 rounded-md" aria-label="Property Security Services, Inc — Home">
            <Image
              src="/images/original-site/LOGGGG.png"
              width={595}
              height={596}
              className="h-[52px] w-[52px] object-contain sm:h-[60px] sm:w-[60px]"
              alt="Property Security Services, Inc shield logo"
              sizes="60px"
              priority
            />
            <span className="hidden border-l border-line pl-3 font-heading leading-none min-[420px]:block">
              <span className="block text-[15px] font-bold tracking-[-0.02em] text-navy sm:text-[15px]">PROPERTY SECURITY</span>
              <span className="mt-1.5 block text-[13px] font-semibold tracking-[0.14em] text-body sm:text-[13px]">SERVICES, INC</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-3 min-[1180px]:flex xl:gap-4" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative whitespace-nowrap py-3 font-heading text-[15px] font-semibold xl:text-[15px] transition-colors duration-300 hover:text-accent ${
                    active ? 'text-navy' : 'text-[#45515e]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="active-navigation"
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <ButtonLink href="/contact-us#quote" variant="gold" arrow={false} className="hidden !min-h-11 !px-4 !text-[15px] min-[1180px]:inline-flex">
            Request Quote
          </ButtonLink>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-navy transition-colors hover:border-accent hover:bg-surface min-[1180px]:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[80] min-[1180px]:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 h-full w-full cursor-default bg-navy-deep/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              onClick={closeMenu}
            />
            <motion.div
              ref={drawerRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="absolute inset-y-0 right-0 flex w-[min(90vw,400px)] flex-col overflow-y-auto bg-white shadow-2xl"
              initial={reduceMotion ? { opacity: 1 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <div className="flex items-center gap-3">
                  <Image src="/images/original-site/LOGGGG.png" width={48} height={48} alt="" className="h-12 w-12" />
                  <span className="font-heading text-[15px] font-bold leading-5 text-navy">PROPERTY SECURITY<br />SERVICES, INC</span>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-navy transition-colors hover:border-accent hover:bg-surface"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-7" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {navigation.map((item, index) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.045, duration: 0.4, ease: EASE }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-heading text-base font-semibold transition-colors ${
                            active ? 'bg-surface text-navy' : 'text-[#45515e] hover:bg-surface hover:text-navy'
                          }`}
                        >
                          {item.label}
                          {active && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <ButtonLink href="/contact-us#quote" variant="gold" className="mt-6 w-full" onClick={() => setMenuOpen(false)}>
                  Request Quote
                </ButtonLink>
              </nav>

              <div className="bg-navy-deep px-6 py-7 text-white">
                <div className="space-y-3 text-[15px] text-white/75">
                  <a href={business.phoneHref} className="flex items-center gap-3 hover:text-gold"><Phone className="h-4 w-4 text-gold" aria-hidden="true" />{business.phoneDisplay}</a>
                  <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all hover:text-gold"><Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />{business.email}</a>
                  <p className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-gold" aria-hidden="true" />{business.hours}</p>
                </div>
                <SocialLinks inverse className="mt-5 flex-wrap" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
