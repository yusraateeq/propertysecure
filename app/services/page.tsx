import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services, splitServices } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security Services',
  description: 'Explore commercial, residential, retail, event, and construction site security services from Property Security Services, Inc.',
  alternates: { canonical: '/services' },
};

const allServices = [...services, ...splitServices];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Security Services"
        description="Professional security options for commercial properties, residential communities, retail environments, events, and construction sites."
      />
      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            eyebrow="Our services"
            title="Security shaped around the property"
            description="Discuss the site, requested duties, and schedule with our team. Service scope and availability are confirmed directly for each inquiry."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={index * 0.04}>
                  <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift">
                    <div className="relative aspect-[16/10] bg-surface-blue">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                        <h2 className="text-xl leading-7">{service.title}</h2>
                      </div>
                      <p className="mt-4 text-[15px] leading-7">{service.text}</p>
                      <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-4">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-[15px] leading-6 text-body">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <ButtonLink href={service.detailHref} variant="outline" className="mt-6 self-start">
                        Service details
                      </ButtonLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
