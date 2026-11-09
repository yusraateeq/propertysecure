import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({
  title,
  eyebrow = 'Property Security Services, Inc',
  description,
  image = '/images/original-site/sl4-revslider.jpg',
  imageAlt = '',
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-16 text-white sm:py-20">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover object-center opacity-40" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,44,73,0.98),rgba(11,64,104,0.88))]" aria-hidden="true" />
      <div className="site-container">
        <Reveal>
          <p className="eyebrow !text-gold">{eyebrow}</p>
          <h1 className="mt-4 text-balance !text-[40px] !text-white sm:!text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/75 sm:text-base sm:leading-8">{description}</p>}
          <nav className="mt-5 flex items-center gap-2 text-[15px] text-white/65" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span aria-current="page" className="text-white">{title}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
