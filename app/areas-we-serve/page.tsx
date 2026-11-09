import type { Metadata } from 'next';
import { ArrowRight, MapPin } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Areas We Serve',
  description: 'Property Security Services, Inc is based in Granada Hills and provides security services throughout California. Ask about coverage for your location.',
  alternates: { canonical: '/areas-we-serve' },
};

export default function AreasWeServePage() {
  return (
    <>
      <PageHero
        title="Areas We Serve"
        description="Security services throughout California, with the company based in Granada Hills."
        image="/images/original-site/building-security.jpg"
        imageAlt="Security professional protecting a property"
      />
      <section className="section-space bg-white">
        <div className="site-container grid items-start gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
          <Reveal>
            <p className="eyebrow">California coverage</p>
            <h2 className="mt-4 max-w-2xl text-[30px] leading-tight sm:text-4xl">Discuss security coverage for your location.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-body">
              Property Security Services, Inc describes its service area as throughout California. Security requirements depend on the assignment, so contact the team to confirm whether your location and requested schedule can be served.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-body">
              The company is based in Granada Hills. Please contact the team to confirm availability for a particular city, site, and schedule.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact-us#quote" variant="gold">Discuss your location</ButtonLink>
              <ButtonLink href="/services" variant="outline">Explore services</ButtonLink>
            </div>
          </Reveal>

          <Reveal variant="slideRight">
            <div className="rounded-card border border-line bg-surface p-7 sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-navy">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-6 font-heading text-[15px] font-bold uppercase tracking-[0.14em] text-accent">Company office</p>
              <h2 className="mt-3 text-2xl">Granada Hills, CA</h2>
              <address className="mt-4 not-italic text-[15px] leading-7 text-body">{business.address}</address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-heading text-[15px] font-bold text-navy underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
              >
                View on Google Maps <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
