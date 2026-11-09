import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { business, footerNavigation } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="site-container py-12 md:py-16">
        <div className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-heading text-[15px] font-bold uppercase tracking-[0.18em] text-gold">Here when you need us</p>
            <h2 className="mt-3 text-2xl text-white sm:text-3xl">Let’s talk about your property’s security needs.</h2>
            <p className="mt-3 text-[15px] leading-7 text-white/70">Contact our team to discuss service options, availability, and pricing.</p>
          </div>
          <ButtonLink href="/contact-us#quote" variant="gold" className="shrink-0 self-start md:self-center">
            Request a quote
          </ButtonLink>
        </div>

        <div className="grid gap-8 border-b border-white/15 py-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-4 rounded-md" aria-label="Property Security Services, Inc — Home">
              <Image src="/images/original-site/LOGGGG.png" alt="" width={72} height={72} className="h-[72px] w-[72px]" />
              <span className="font-heading text-lg font-bold leading-6 text-white">PROPERTY SECURITY<br /><span className="text-[15px] tracking-[0.13em] text-white/65">SERVICES, INC</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/65">
              Professional security services for businesses, residential communities, properties, and people throughout California.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[15px] font-semibold text-white/80">{business.license}</p>
          </div>
          <div>
            <h2 className="!text-[15px] !tracking-normal text-white">Explore</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {footerNavigation.map((item) => (
                <li key={item.href}><Link href={item.href} className="inline-flex min-h-8 items-center text-[15px] text-white/70 transition-colors hover:text-gold">{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="!text-[15px] !tracking-normal text-white">Contact</h2>
            <ul className="mt-5 space-y-4 text-[15px] text-white/65">
              <li><a href={business.phoneHref} className="flex items-start gap-3 transition-colors hover:text-gold"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />{business.phoneDisplay}</a></li>
              <li><a href={`mailto:${business.email}`} className="flex items-start gap-3 break-all transition-colors hover:text-gold"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />{business.email}</a></li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /><span>{business.address}</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-b border-white/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-[15px] font-semibold uppercase tracking-[0.16em] text-white/70">Connect with us</p>
          <SocialLinks inverse className="flex-wrap" />
        </div>

        <div className="flex flex-col gap-4 pt-6 text-center text-[15px] leading-6 text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Property Security Services, Inc.</p>
          <Link href="/privacy-policy" className="text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-gold">Privacy Policy</Link>
          <p>
            Developed by{' '}
            <a href="https://www.syedmujtabaabbas.xyz/" target="_blank" rel="noopener noreferrer" className="text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-gold">Syed Mujtaba Abbas</a>
            {' '}and{' '}
            <a href="https://yusraateeq-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-gold">Yusra Ateeq</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
