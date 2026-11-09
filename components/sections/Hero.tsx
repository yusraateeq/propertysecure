'use client';

import {
  AnimatePresence,
  m as motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Phone, Play, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HeroStats } from '@/components/sections/hero/HeroStats';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { EASE, HERO_SCENE } from '@/lib/motion';
import { business } from '@/lib/site';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const slides = [
  {
    src: '/images/original-site/sl4-revslider.jpg',
    alt: 'Security officers beside a patrol vehicle',
    position: 'center center',
  },
  {
    src: '/images/original-site/sl2-1024x543.jpg',
    alt: 'Security professional wearing a communication headset',
    position: 'center center',
  },
];

// Pre-blurred radial gradients (hero-revamp-spec SS2): brand token colors only
// (gold from globals.css :root), painted once,
// transform/opacity drift only, never an animated filter blur.
const BLOB_GRADIENTS = [
  'radial-gradient(600px at 20% 30%, color-mix(in srgb, var(--color-gold) 12%, transparent), transparent 70%)',
  'radial-gradient(520px at 60% 70%, color-mix(in srgb, var(--color-gold) 9%, transparent), transparent 70%)',
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const inView = useInView(sectionRef, { amount: 0.15 });

  // The page's single scroll owner: scoped to this hero section
  // (docs/design/hero-motion-guidelines.md). Identity at scrollY = 0 -> zero CLS.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [...HERO_SCENE.parallax.photoY]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [...HERO_SCENE.parallax.copyY]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [...HERO_SCENE.parallax.copyOpacity],
  );

  const paginate = useCallback((move: number) => {
    setHasTransitioned(true);
    setDirection(move);
    setCurrent((value) => (value + move + slides.length) % slides.length);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const target = (index + slides.length) % slides.length;
      setHasTransitioned(true);
      setDirection(target > current ? 1 : -1);
      // Announce manual navigation only - autoplay advances stay silent (spec SS7.1).
      setLiveMessage(`Slide ${target + 1} of ${slides.length}`);
      setCurrent(target);
    },
    [current],
  );

  // Reset-on-select 7s clock: every slide change re-arms the timeout
  // (homepage-revamp-plan SS5 state model; same pattern as Testimonials).
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setTimeout(() => paginate(1), HERO_SCENE.autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [current, paginate, paused, reduceMotion]);

  // Pre-JS readability upgrade (motion guidelines SS2): the server renders the copy
  // column at its final pose; hydration applies the brief y-offset (SS entrance
  // restitution, element -> settled). Deliberately NO server/client branch - that is
  // React's hydration-mismatch bullet #1 - so the first client render is identical to
  // SSR under every reduced-motion value; the offset only appears after hydration
  // commits, and reduced-motion users hold the final pose with no animation.
  const [entrancePhase, setEntrancePhase] = useState(0); // 0 rest = SSR pose, 1 = offset, 2 = settle
  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return; // reduced motion: settle forever at the final pose
    setEntrancePhase(1);
    const raf = requestAnimationFrame(() => setEntrancePhase(2));
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const enter = (beat: { y: number; delay: number; duration: number }) => {
    if (entrancePhase === 1) return { animate: { opacity: 1, y: beat.y }, transition: { duration: 0 } };
    if (entrancePhase === 2)
      return { animate: { opacity: 1, y: 0 }, transition: { duration: beat.duration, delay: beat.delay, ease: EASE } };
    return { animate: { opacity: 1, y: 0 }, transition: { duration: 0 } };
  };

  // Continuous loops are the only JS animations hidden offscreen: gated by Motion's
  // own useInView, so nothing animates while the hero is scrolled away (SS5).
  const floatsActive = inView && !reduceMotion;
  const blobAnimate = floatsActive ? { y: [...HERO_SCENE.blob.floatY] } : { y: 0 };
  const blobTransition = floatsActive
    ? { duration: HERO_SCENE.blob.floatSeconds, ease: 'easeInOut' as const, repeat: Infinity }
    : { duration: reduceMotion ? 0 : 0.3 };
  const blobTransitionAlt = floatsActive
    ? { duration: HERO_SCENE.blob.floatSecondsAlt, ease: 'easeInOut' as const, repeat: Infinity, delay: reduceMotion ? 0 : 1.2 }
    : { duration: reduceMotion ? 0 : 0.3 };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate h-[calc(100svh-112px)] min-h-[740px] max-h-[840px] overflow-hidden bg-navy-deep text-white sm:h-[calc(100svh-124px)] sm:min-h-[680px]"
      aria-roledescription="carousel"
      aria-label="Property Security Services highlights"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') goTo(current - 1);
        if (event.key === 'ArrowRight') goTo(current + 1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {/* Layers 1-2: base photo carousel inside the scroll-parallax wrapper. */}
      <motion.div className="absolute inset-0" style={{ y: photoY }}>
        <div className="absolute -inset-[3%]">
          <Image
            src={slides[0].src}
            alt={hasTransitioned ? '' : slides[0].alt}
            fill
            priority
            loading="eager"
            decoding="sync"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slides[0].position }}
          />
        </div>
        {hasTransitioned && (
          <AnimatePresence initial={false}>
            <motion.div
              key={slides[current].src}
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? 28 : -28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -14 : 14 }}
              transition={{ duration: reduceMotion ? 0 : HERO_SCENE.crossfadeSeconds, ease: EASE }}
            >
              <motion.div
                className="absolute -inset-[3%]"
                initial={reduceMotion ? false : { scale: HERO_SCENE.kenBurns.from }}
                animate={{ scale: reduceMotion ? 1 : HERO_SCENE.kenBurns.to }}
                transition={{ duration: reduceMotion ? 0 : HERO_SCENE.driftSeconds, ease: 'linear' }}
              >
                <Image
                  src={slides[current].src}
                  alt={slides[current].alt}
                  fill
                  loading="eager"
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slides[current].position }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Layer 3: kinetic gradient blobs behind the copy column (aria-hidden). */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={blobAnimate}
        transition={blobTransition}
      >
        <span className="absolute inset-0 block" style={{ backgroundImage: BLOB_GRADIENTS[0] }} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={blobAnimate}
        transition={blobTransitionAlt}
      >
        <span className="absolute inset-0 block" style={{ backgroundImage: BLOB_GRADIENTS[1] }} />
      </motion.div>

      {/* Layers 4-5: scrims - the scrim guarantee (>=0.86 navy alpha to 40% width)
          plus a mobile-only wider band so the full-width copy column stays readable. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,29,49,0.95)_0%,rgba(5,35,58,0.86)_58%,rgba(5,35,58,0.6)_100%)] sm:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,29,49,0.96)_0%,rgba(5,35,58,0.86)_40%,rgba(5,35,58,0.38)_74%,rgba(5,35,58,0.3)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,29,49,0.74)_0%,transparent_45%,rgba(4,29,49,0.12)_100%)]"
        aria-hidden="true"
      />
      {/* Layer 6: copy column. Scroll-linked exit lives on this wrapper only;
          entrance staggering lives on the children - one owner per element. */}
      <div className="site-container relative flex h-full items-start pb-40 pt-8 sm:items-center sm:pb-36 sm:pt-4">
        <motion.div className="max-w-[760px]" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            className="mb-4 inline-flex sm:mb-6 items-center gap-2.5 rounded-full border border-white/15 bg-navy-deep/25 px-3.5 py-2 backdrop-blur-sm"
            initial={false}
            {...enter(HERO_SCENE.entrance.chip)}
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
            <p className="font-heading text-[13px] font-bold uppercase tracking-[0.13em] text-gold sm:text-[13px]">{business.license}</p>
          </motion.div>
          <motion.h1
            className="text-balance max-w-[720px] !text-[36px] font-bold leading-[1.1] !text-white sm:!text-5xl lg:!text-[56px]"
            initial={false}
            {...enter(HERO_SCENE.entrance.headline)}
          >
            Security for <span className="text-gold">California</span> properties
          </motion.h1>
          <motion.p
            className="mt-4 max-w-[650px] sm:mt-6 text-[16px] leading-8 text-white/80 sm:text-[17px]"
            initial={false}
            {...enter(HERO_SCENE.entrance.support)}
          >
            Commercial, residential, retail, event, and construction-site security. Let&apos;s discuss what your property needs.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-col gap-3 sm:mt-8 min-[360px]:flex-row"
            initial={false}
            {...enter(HERO_SCENE.entrance.ctaRow)}
          >
            <ButtonLink href="/contact-us#quote" variant="gold" className="min-[360px]:min-w-0 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-sm">Request Quote</ButtonLink>
            <ButtonLink href="#services" variant="light" className="min-[360px]:min-w-0 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-sm">Our Services</ButtonLink>
          </motion.div>
          <motion.a
            href={business.phoneHref}
            className="group mt-4 inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-navy-deep/25 px-3 py-2.5 backdrop-blur-sm transition-colors hover:border-gold/60 sm:mt-5"
            initial={false}
            {...enter(HERO_SCENE.entrance.phonePill)}
            aria-label={`Call Property Security Services at ${business.phoneDisplay}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-navy-deep"><Phone className="h-3.5 w-3.5" aria-hidden="true" /></span>
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/60">Prefer to call?</span>
              <span className="font-heading text-[15px] font-bold text-white transition-colors group-hover:text-gold">{business.phoneDisplay}</span>
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Layer 8: stats strip, bottom-anchored above the controls row (spec SS3). */}
      <motion.div
        className="absolute inset-x-0 bottom-[84px] sm:bottom-[100px]"
        initial={false}
        {...enter(HERO_SCENE.entrance.stats)}
      >
        <div className="site-container">
          <HeroStats />
        </div>
      </motion.div>

      {/* Layer 9: controls + scroll cue (a11y contract preserved verbatim). */}
      <div className="site-container pointer-events-none absolute inset-x-0 bottom-5 flex items-end justify-between gap-4 sm:bottom-7">
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/15 bg-navy-deep/35 p-1.5 backdrop-blur-md sm:gap-4 sm:rounded-2xl sm:p-2">
          <div className="flex items-center gap-1 pl-1 sm:gap-2 sm:pl-2" role="group" aria-label="Choose hero slide">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(index)}
                className="group flex h-8 w-7 items-center justify-center"
                aria-label={`Show slide ${index + 1} of ${slides.length}`}
                aria-current={current === index ? 'true' : undefined}
              >
                <span className={`block h-1 rounded-full transition-all duration-500 ${current === index ? 'w-6 bg-gold sm:w-8' : 'w-2.5 bg-white/40 group-hover:bg-white/70'}`} />
              </button>
            ))}
          </div>
          <span className="h-5 w-px bg-white/20" aria-hidden="true" />
          <button type="button" onClick={() => goTo(current - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 hover:text-gold sm:h-9 sm:w-9" aria-label="Previous hero slide">
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setPaused((value) => !value)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 hover:text-gold sm:h-9 sm:w-9" aria-label={paused ? 'Play hero slideshow' : 'Pause hero slideshow'} aria-pressed={paused}>
            {paused ? <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => goTo(current + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 hover:text-gold sm:h-9 sm:w-9" aria-label="Next hero slide">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </button>
        </div>

        <Link href="#intro" className="pointer-events-auto group hidden items-center gap-3 rounded-md text-[13px] font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white md:flex">
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 pt-1.5">
            <motion.span animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          </span>
          Scroll down
        </Link>
      </div>

      {/* Announces manual slide changes only; silent during autoplay (spec SS7.1). */}
      <p aria-live="polite" className="sr-only">{liveMessage}</p>
    </section>
  );
}