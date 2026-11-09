'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import { Download, Play } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ActionButton } from '@/components/ui/ActionButton';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoModal } from '@/components/ui/VideoModal';
import { fadeUp, reducedFade, stagger, viewport } from '@/lib/motion';
import { whyChooseUs } from '@/lib/site';

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const [videoOpen, setVideoOpen] = useState(false);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <section className="section-space border-y border-line/60 bg-surface-blue" aria-labelledby="why-choose-title">
      <div className="site-container">
        <SectionHeading
          id="why-choose-title"
          eyebrow="Why choose us"
          title="Why Choose Property Security Services?"
          description="Established experience, a California PPO license, and service options for a range of property needs."
        />
        <motion.div
          className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2"
          variants={reduceMotion ? reducedFade : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
            <motion.article
              key={item.title}
              variants={reduceMotion ? reducedFade : fadeUp}
              className={`flex items-start gap-4 rounded-xl border border-line/70 bg-white p-5 shadow-[0_6px_20px_rgba(7,44,73,0.035)] transition-all duration-300 hover:border-accent/50 hover:shadow-soft sm:p-6 ${index === whyChooseUs.length - 1 ? 'md:col-span-2' : ''}`}
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-navy">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base leading-6">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-[#45515e] sm:text-[15px] sm:leading-7">{item.description}</p>
              </div>
            </motion.article>
            );
          })}
        </motion.div>
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          variants={reduceMotion ? reducedFade : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ActionButton type="button" onClick={() => setVideoOpen(true)} aria-haspopup="dialog">
            <Play className="h-4 w-4 text-accent" fill="currentColor" aria-hidden="true" />
            Click to watch
          </ActionButton>
          <ButtonLink href="/documents/property-security-information-package.pdf" variant="outline" arrow={false} download external className="bg-white">
            <Download className="h-4 w-4 text-navy" aria-hidden="true" />
            Information Package
          </ButtonLink>
        </motion.div>
      </div>
      <VideoModal open={videoOpen} onClose={closeVideo} />
    </section>
  );
}
