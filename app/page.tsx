import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Introduction } from '@/components/sections/Introduction';
import { Services } from '@/components/sections/Services';
import { SplitServices } from '@/components/sections/SplitServices';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { SecurityProcess } from '@/components/sections/SecurityProcess';
import { AreasWeServe } from '@/components/sections/AreasWeServe';
import { Faq } from '@/components/sections/Faq';
import { QuoteCta } from '@/components/layout/QuoteCta';

export const metadata: Metadata = {
  title: 'Property Security Services, Inc | Los Angeles Security Guards',
  description: 'Professional commercial, residential, retail, event, and construction site security services throughout California. Request a quote from Property Security Services, Inc.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Services />
      <SplitServices />
      <SecurityProcess />
      <WhyChooseUs />
      <AreasWeServe />
      <Testimonials />
      <Faq />
      <QuoteCta />
    </>
  );
}
