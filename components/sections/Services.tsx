'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeUp, reducedFade, stagger, viewport } from '@/lib/motion';
import { services } from '@/lib/site';

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-space border-y border-line/60 bg-surface-blue">
      <div className="site-container">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
          <SectionHeading eyebrow="Our services" title="Our Services" align="left" />
          <Reveal delay={0.08}>
            <p className="max-w-xl text-[15px] leading-7 text-body lg:ml-auto">
              Security services for commercial properties, residential communities, and retail environments throughout California.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          variants={reduceMotion ? reducedFade : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const featured = index === 1;
            return (
              <motion.article
                key={service.title}
                variants={reduceMotion ? reducedFade : fadeUp}
                whileHover={reduceMotion ? undefined : { y: -7 }}
                transition={{ duration: 0.35 }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-card border bg-white transition-[border-color,box-shadow] duration-500 hover:border-accent/60 hover:shadow-lift ${featured ? 'border-navy/25 shadow-lift' : 'border-line/80 shadow-soft'}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-blue">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/65 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-navy-deep/40 text-white backdrop-blur-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {featured && <p className="eyebrow !text-[13px]">Residential communities</p>}
                  <h3 className={`${featured ? 'mt-2' : ''} text-[20px] leading-7`}>{service.title}</h3>
                  <p className="mt-3.5 text-[15px] leading-7 text-body">{service.text}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-line/80 pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[15px] font-semibold leading-6 text-[#45515e]">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.4} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={service.detailHref} ariaLabel={`Explore ${service.title}`} variant="outline" className="mt-6 self-start !border-0 !bg-transparent !px-0 !py-1 !text-[15px] !shadow-none hover:!bg-transparent hover:!text-navy">
                    Explore service
                  </ButtonLink>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
