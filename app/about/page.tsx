import type { Metadata } from 'next';
import Image from 'next/image';
import { ClipboardCheck, MessageSquareText, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Property Security Services, Inc, a California private patrol operator serving commercial, residential, retail, and construction clients.',
  alternates: { canonical: '/about' },
};

const commitments = [
  {
    title: 'Field supervision',
    icon: ClipboardCheck,
    text: 'The company describes mobile field inspectors who visit client sites and supervise assigned security operations.',
  },
  {
    title: 'Clear communication',
    icon: MessageSquareText,
    text: 'Communication with clients and site contacts is part of the company’s stated service approach.',
  },
  {
    title: 'Site-specific service',
    icon: ShieldCheck,
    text: 'Commercial, residential, retail, event, and construction security needs are discussed with each client.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Property Security Services"
        description="A California security company with more than 33 years in the security industry."
        image="/images/original-site/sl4-revslider.jpg"
        imageAlt="Security professional providing property protection"
      />
      <section className="section-space bg-white">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift">
              <Image
                src="/images/original-site/party-security-guards.jpg"
                alt="Security officer positioned near an indoor entrance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal variant="slideRight">
            <p className="eyebrow">Our company</p>
            <h2 className="mt-4 text-[30px] leading-tight sm:text-4xl">Professional security, grounded in experience.</h2>
            <div className="mt-6 space-y-5 text-[15px] leading-8 text-body">
              <p>
                Property Security Services, Inc serves individuals, institutions, and business clients seeking professional security services throughout California.
              </p>
              <p>
                With more than 33 years in the security industry and California PPO License #119841, the company provides commercial, residential, retail, emergency and event, and construction-site security.
              </p>
              <p>
                The company’s approach centers on discussing each client’s security requirements, site conditions, and requested service scope before an assignment is confirmed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-space border-y border-line bg-surface">
        <div className="site-container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">How we work</p>
            <h2 className="mt-4 text-[30px] leading-tight sm:text-4xl">A practical, client-focused service approach.</h2>
            <p className="mt-5 text-[15px] leading-7 text-body sm:text-base sm:leading-8">
              Security needs differ from one property to another. The team discusses site details and requested responsibilities so clients can understand the proposed scope before moving forward.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title}>
                  <article className="h-full rounded-card border border-line bg-white p-7 shadow-soft">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-navy">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-body">{item.text}</p>
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
