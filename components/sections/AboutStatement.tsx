import { Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function AboutStatement() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24" aria-labelledby="about-statement-title">
      <div className="site-container">
        <Reveal className="mx-auto max-w-[850px] text-center">
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <span className="h-px w-10 bg-line" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-blue text-navy"><Quote className="h-4 w-4" /></span>
            <span className="h-px w-10 bg-line" />
          </div>
          <h2 id="about-statement-title" className="sr-only">About Us</h2>
          <blockquote className="mt-6 font-heading text-[19px] font-semibold leading-8 tracking-[-0.025em] text-navy sm:text-[22px] sm:leading-9">
            “Property Security Services, Inc, is an Innovative, Aggressive & Experienced security guard company from Los Angeles, CA. Our top priority is to insure the safety and security of our clients. At Property Security Services, Inc, We offer a variety of services including emergency security guard services for circumstances that require immediate services”
          </blockquote>
          <p className="mt-5 font-heading text-[13px] font-bold uppercase tracking-[0.15em] text-body">Property Security Services, Inc <span className="mx-2 text-accent">•</span> Los Angeles, CA</p>
        </Reveal>
      </div>
    </section>
  );
}
