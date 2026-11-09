'use client';

import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star, StarHalf } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EASE } from '@/lib/motion';
import { testimonials } from '@/lib/site';

function Rating({ rating, name }: { rating: number; name: string }) {
  return (
    <div className="flex items-center justify-center gap-1 text-navy" role="img" aria-label={`${name}: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => {
        if (rating >= value) return <Star key={value} className="h-4 w-4" fill="currentColor" strokeWidth={1.5} aria-hidden="true" />;
        if (rating + 0.5 === value) return <StarHalf key={value} className="h-4 w-4" fill="currentColor" strokeWidth={1.5} aria-hidden="true" />;
        return <Star key={value} className="h-4 w-4 text-line" fill="currentColor" strokeWidth={1.5} aria-hidden="true" />;
      })}
    </div>
  );
}

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [[current, direction], setCurrent] = useState<[number, number]>([0, 0]);
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const paused = userPaused || interactionPaused;

  const paginate = useCallback((nextDirection: number) => {
    setCurrent(([index]) => [(index + nextDirection + testimonials.length) % testimonials.length, nextDirection]);
  }, []);

  const goTo = (index: number) => {
    setCurrent(([currentIndex]) => [index, index > currentIndex ? 1 : -1]);
  };

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setTimeout(() => paginate(1), 6500);
    return () => window.clearTimeout(timer);
  }, [current, paginate, paused, reduceMotion]);

  const testimonial = testimonials[current];
  const variants = {
    enter: (move: number) => ({ opacity: 0, x: reduceMotion ? 0 : move > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (move: number) => ({ opacity: 0, x: reduceMotion ? 0 : move > 0 ? -30 : 30 }),
  };

  return (
    <section className="border-t border-line/70 bg-white py-14 sm:py-16" aria-labelledby="testimonials-title">
      <div className="site-container">
        <SectionHeading id="testimonials-title" eyebrow="Client reviews" title="What Our Clients Say" />

        <div
          className="relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-xl border border-line/80 bg-white shadow-soft"
          aria-roledescription="carousel"
          aria-label="Three client reviews automatic slideshow"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') paginate(-1);
            if (event.key === 'ArrowRight') paginate(1);
          }}
          onMouseEnter={() => setInteractionPaused(true)}
          onMouseLeave={() => setInteractionPaused(false)}
          onFocusCapture={() => setInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
          }}
        >
          <Quote className="absolute right-6 top-5 h-12 w-12 text-navy/[0.06] sm:right-8 sm:top-6 sm:h-14 sm:w-14" fill="currentColor" aria-hidden="true" />

          <div className="px-6 pb-6 pt-8 text-center sm:px-12 sm:pb-7 sm:pt-9">
            <div className="min-h-[405px] sm:min-h-[220px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.blockquote
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                  drag={reduceMotion ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70 || info.velocity.x < -500) paginate(1);
                    else if (info.offset.x > 70 || info.velocity.x > 500) paginate(-1);
                  }}
                  className="flex min-h-[inherit] cursor-grab flex-col active:cursor-grabbing"
                  aria-live="polite"
                >
                  <Rating rating={testimonial.rating} name={testimonial.name} />
                  <p className="mt-5 flex-1 text-base leading-7 text-[#3f4b58] sm:text-base sm:leading-7">“{testimonial.quote}”</p>
                  <footer className="mt-5">
                    <cite className="block font-heading text-base font-bold not-italic text-navy">{testimonial.name}</cite>
                    <span className="mt-1 block text-[15px] text-body">{testimonial.location}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line/70 bg-surface/50 px-4 py-3 sm:px-6">
            <button type="button" onClick={() => paginate(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-navy transition-colors hover:border-accent hover:text-accent" aria-label="Previous review">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="group" aria-label="Choose a review">
              {testimonials.map((item, index) => (
                <button key={item.name} type="button" onClick={() => goTo(index)} className="flex h-8 w-5 items-center justify-center" aria-label={`Show review ${index + 1} of 3: ${item.name}`} aria-current={current === index ? 'true' : undefined}>
                  <span className={`h-1.5 rounded-full transition-all duration-300 ${current === index ? 'w-6 bg-accent' : 'w-1.5 bg-navy/20 hover:bg-navy/40'}`} />
                </button>
              ))}
              <button type="button" onClick={() => setUserPaused((value) => !value)} className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-navy/55 transition-colors hover:bg-white hover:text-navy" aria-label={userPaused ? 'Play automatic testimonial slideshow' : 'Pause automatic testimonial slideshow'} aria-pressed={userPaused}>
                {userPaused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            </div>

            <button type="button" onClick={() => paginate(1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy bg-navy text-white transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep" aria-label="Next review">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
