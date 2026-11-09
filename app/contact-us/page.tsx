import type { Metadata } from 'next';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Property Security Services, Inc in Granada Hills, California, or request a security services quote.',
  alternates: { canonical: '/contact-us' },
};

const details = [
  { title: 'Address', icon: MapPin, value: business.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}` },
  { title: 'Phone No', icon: Phone, value: business.phoneDisplay, href: business.phoneHref },
  { title: 'Email', icon: Mail, value: business.email, href: `mailto:${business.email}` },
  { title: 'Working Hours', icon: Clock3, value: business.hours, href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Tell us about your property and security requirements. Our team can discuss service scope and availability."
        image="/images/original-site/sl4-revslider.jpg"
        imageAlt="Security officers beside a patrol vehicle"
      />
      <section className="section-space bg-surface">
        <div className="site-container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-[28px] sm:text-[32px]">Let’s talk about the protection your property needs.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail) => {
              const Icon = detail.icon;
              const content = <><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/20 text-navy"><Icon className="h-5 w-5" aria-hidden="true" /></span><h3 className="mt-5 text-[18px]">{detail.title}</h3><p className="mt-3 break-words text-[15px] leading-7 text-body">{detail.value}</p></>;
              return <Reveal key={detail.title} className="h-full">{detail.href ? <a href={detail.href} target={detail.title === 'Address' ? '_blank' : undefined} rel={detail.title === 'Address' ? 'noopener noreferrer' : undefined} className="block h-full rounded-card border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent">{content}</a> : <div className="h-full rounded-card border border-line bg-white p-6 shadow-soft">{content}</div>}</Reveal>;
            })}
          </div>
          <div id="quote" className="mt-12 grid scroll-mt-32 items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
            <Reveal variant="slideLeft">
              <p className="eyebrow">Request Quote</p>
              <h2 className="mt-4 text-[30px] sm:text-4xl">Let us know how we can help you</h2>
              <p className="mt-5 leading-8">Call during our listed office hours or send an inquiry by email. Security assignment availability is confirmed directly with the team.</p>
              <div className="mt-8 rounded-card bg-navy-deep p-6 text-white">
                <p className="font-heading text-[15px] font-bold">{business.license}</p>
                <a href={business.phoneHref} className="mt-4 block font-heading text-xl font-bold text-white transition-colors hover:text-gold">{business.phoneDisplay}</a>
                <a href={`mailto:${business.email}`} className="mt-2 block break-all text-[15px] text-white/70 transition-colors hover:text-gold">{business.email}</a>
                <p className="mt-3 text-[15px] text-white/65">Office hours: {business.hours}</p>
              </div>
            </Reveal>
            <Reveal variant="slideRight"><QuoteForm /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
