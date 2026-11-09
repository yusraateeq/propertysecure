import type { Metadata } from 'next';
import { ArrowRight, Check, Clock3, Phone, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { business, services, splitServices } from '@/lib/site';

const servicePages = [
  ...services,
  ...splitServices.filter((service) => service.slug === 'emergency-security'),
];

const serviceContent = {
  'commercial-security': {
    intro: 'Commercial security requirements vary by property use, access needs, and operating schedule. Property Security Services, Inc provides security for the commercial settings listed below.',
    settings: ['High-rise buildings and office floors', 'Hotels, warehouses, and banks', 'Government facilities'],
    planning: 'When requesting a quote, share the property type, location, hours, and duties you would like covered. The team can discuss a suitable scope and confirm availability.',
  },
  'residential-security': {
    intro: 'Residential security services are available for apartment complexes and communities, including front-desk security needs described by the company.',
    settings: ['Apartment complexes', 'Front-desk security', 'Residential communities'],
    planning: 'Tell the team about the property, access points, requested post duties, and schedule so the service requirements can be discussed directly.',
  },
  'retail-security': {
    intro: 'Retail security is focused on reducing the risk of theft or loss while maintaining a professional and comfortable shopping environment for customers.',
    settings: ['Retail properties', 'Customer-facing security presence', 'Loss-prevention-focused assignments'],
    planning: 'Share your store location, operating schedule, and security concerns. Specific duties and availability are confirmed with the team before an assignment.',
  },
  'emergency-security': {
    intro: 'The company describes event security support for access control, crowd management, traffic control, and patrol. The exact duties depend on the event and requested assignment.',
    settings: ['Access control and crowd management', 'Traffic control', 'Event patrol and guest-area support'],
    planning: 'For an event or other time-sensitive need, call during the listed office hours with the location, date, schedule, and requested duties. Availability is confirmed directly.',
  },
} as const;

type ServiceSlug = keyof typeof serviceContent;

function getService(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Service not found' };

  return {
    title: service.title,
    description: `${service.text} Contact Property Security Services, Inc to discuss your security requirements.`,
    alternates: { canonical: service.detailHref },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || !(slug in serviceContent)) notFound();

  const content = serviceContent[slug as ServiceSlug];
  const related = servicePages.filter((item) => item.slug !== service.slug).slice(0, 2);

  return (
    <>
      <PageHero
        title={service.title}
        eyebrow="Security services"
        description={service.text}
        image={service.image}
        imageAlt={service.imageAlt}
      />
      <section className="section-space bg-white">
        <div className="site-container grid items-start gap-12 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div>
            <Reveal>
              <p className="eyebrow">Service overview</p>
              <h2 className="mt-4 max-w-3xl text-[28px] leading-tight sm:text-3xl">{service.title} for California properties</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-body">{content.intro}</p>
            </Reveal>

            <Reveal className="mt-10 rounded-card border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-xl">Settings and service focus</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.settings.map((setting) => (
                  <li key={setting} className="flex items-start gap-3 rounded-lg border border-line bg-white p-4 text-[15px] leading-6 text-body">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {setting}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-10 rounded-card border border-line p-6 sm:p-8">
              <h3 className="text-xl">Planning an inquiry</h3>
              <p className="mt-3 text-[15px] leading-7 text-body">{content.planning}</p>
              <p className="mt-4 text-[15px] leading-7 text-body">
                Share the site address, requested service, expected schedule, and any important instructions when contacting the company.
              </p>
              <ButtonLink href="/contact-us#quote" variant="gold" className="mt-6">
                Request a quote
              </ButtonLink>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32">
            <Reveal>
              <div className="rounded-card bg-navy-deep p-6 text-white shadow-lift sm:p-7">
                <ShieldCheck className="h-6 w-6 text-gold" aria-hidden="true" />
                <p className="mt-4 font-heading text-[15px] font-bold uppercase tracking-[0.14em] text-gold">{business.license}</p>
                <h2 className="mt-3 text-2xl !text-white">Discuss your site requirements</h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">Ask about service scope and availability for your property or event.</p>
                <a href={business.phoneHref} className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5 font-heading text-lg font-bold text-white transition-colors hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  {business.phoneDisplay}
                </a>
                <p className="mt-3 flex items-center gap-2 text-[15px] text-white/65">
                  <Clock3 className="h-4 w-4 text-gold" aria-hidden="true" />
                  Office hours: {business.hours}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="rounded-card border border-line bg-surface p-6">
                <h2 className="text-base">Explore other services</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={item.detailHref} className="group flex items-center justify-between gap-3 text-[15px] font-semibold text-navy transition-colors hover:text-accent">
                        {item.title}
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
