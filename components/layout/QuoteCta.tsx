import { Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/lib/site';

export function QuoteCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-12 text-white">
      <div className="dark-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-[24px] !text-white sm:text-[28px]">Let’s discuss your security requirements.</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/75">Share your property, schedule, and service needs with our team. Office hours are {business.hours}.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink href="/contact-us#quote" variant="gold">Request Quote</ButtonLink>
            <ButtonLink href={business.phoneHref} variant="light" arrow={false}><Phone className="h-4 w-4" aria-hidden="true" />{business.phoneDisplay}</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
