import { ChevronDown } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqItems } from '@/lib/site';

export function Faq() {
  return (
    <section className="section-space bg-white" aria-labelledby="faq-title">
      <div className="site-container grid items-start gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
        <div>
          <SectionHeading
            id="faq-title"
            eyebrow="Common questions"
            title="Before you get in touch"
            description="A few helpful details about services, coverage, and requesting a quote."
            align="left"
          />
          <ButtonLink href="/contact-us#quote" variant="gold" className="mt-6">
            Request a quote
          </ButtonLink>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-sm py-1 font-heading text-base font-semibold leading-6 text-navy marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 sm:text-lg">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pr-8 pt-4 text-[15px] leading-7 text-body">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
