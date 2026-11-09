import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/lib/site';

export function SecurityProcess() {
  return (
    <section className="section-space bg-surface" aria-labelledby="process-title">
      <div className="site-container">
        <SectionHeading
          id="process-title"
          eyebrow="Getting started"
          title="A straightforward path to the right coverage"
          description="Share your property type, location, and schedule. We’ll talk through service options, availability, and pricing before you decide."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.number} className="relative h-full rounded-card border border-line bg-white p-6 shadow-soft sm:p-7">
              <Reveal delay={index * 0.06}>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-heading text-[15px] font-bold tracking-[0.08em] text-gold">
                    {step.number}
                  </span>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-accent lg:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-6 text-lg leading-7">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-body">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/contact-us#quote" variant="gold">
            Discuss your security needs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
