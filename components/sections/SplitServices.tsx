import { Check } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { splitServices } from '@/lib/site';

export function SplitServices() {
  return (
    <section className="grid overflow-hidden md:grid-cols-2" aria-label="Specialized security services">
      {splitServices.map((service, index) => {
        const Icon = service.icon;
        const navy = service.theme === 'navy';
        return (
          <Reveal key={service.title} variant={index === 0 ? 'slideLeft' : 'slideRight'} className="h-full">
            <article className={`relative h-full overflow-hidden px-6 py-12 sm:px-8 sm:py-14 lg:px-10 xl:px-12 ${navy ? 'bg-navy-deep text-white' : 'bg-surface-blue text-body'}`}>
              {navy && <div className="dark-grid absolute inset-0 opacity-50" aria-hidden="true" />}
              <div className={`relative flex h-full max-w-[620px] flex-col ${navy ? 'md:ml-auto' : ''}`}>
                <div className="relative mb-6 aspect-[16/8] overflow-hidden rounded-xl border border-white/10 bg-white/10">
                  <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  {navy && <div className="absolute inset-0 bg-navy-deep/20" aria-hidden="true" />}
                </div>
                <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-heading text-[13px] font-bold uppercase tracking-[0.13em] ${navy ? 'border-white/15 bg-white/5 text-gold' : 'border-navy/10 bg-white/70 text-navy'}`}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                  {navy ? 'Emergency Security' : 'Construction Security'}
                </div>
                <h2 className={`mt-4 text-balance text-[27px] leading-9 sm:text-[32px] sm:leading-10 ${navy ? '!text-white' : ''}`}>{service.title}</h2>
                <p className={`mt-4 flex-1 text-[15px] leading-7 ${navy ? 'text-white/70' : 'text-body'}`}>{service.text}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-2.5 text-[15px] font-semibold ${navy ? 'text-white/85' : 'text-navy'}`}>
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full ${navy ? 'bg-white/10 text-gold' : 'bg-gold/20 text-navy'}`}>
                        <Check className="h-2.5 w-2.5" strokeWidth={2.6} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={service.detailHref} ariaLabel={`Explore ${service.title}`} variant={navy ? 'gold' : 'navy'} className="mt-6 self-start">
                  Explore service
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        );
      })}
    </section>
  );
}
