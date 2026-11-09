import { ArrowUpRight, MapPin } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/lib/site';

export function AreasWeServe() {
  return (
    <section className="section-space border-y border-line/70 bg-surface-blue" aria-labelledby="areas-title">
      <div className="site-container grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">Service coverage</p>
          <h2 id="areas-title" className="mt-4 text-balance text-[30px] leading-tight sm:text-4xl">
            California-wide service. One local point of contact.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-body sm:text-base sm:leading-8">
            Property Security Services, Inc describes its service coverage as throughout California and is based in Granada Hills. Contact the team to discuss your property&apos;s location and the coverage you need.
          </p>
          <ButtonLink href="/areas-we-serve" variant="outline" className="mt-6">
            Explore service coverage <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>

        <Reveal variant="slideRight">
          <div className="relative overflow-hidden rounded-card bg-navy-deep p-6 text-white shadow-lift sm:p-8">
            <div className="dark-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gold">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-[15px] font-bold uppercase tracking-[0.16em] text-gold">Headquarters</p>
                <h3 className="mt-3 text-2xl !text-white">Granada Hills, California</h3>
                <p className="mt-3 max-w-md text-[15px] leading-7 text-white/70">
                  10722 White Oak Ave Ste 4<br />
                  Granada Hills, CA 91344
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 py-2 font-heading text-[15px] font-semibold text-white transition-colors hover:border-gold hover:text-gold focus-visible:outline-white"
                >
                  View location <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
