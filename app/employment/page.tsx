import type { Metadata } from 'next';
import { ArrowUpRight, Download, FileText } from 'lucide-react';
import Image from 'next/image';
import { PageHero } from '@/components/layout/PageHero';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { business } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Employment',
  description: 'Employment opportunities, guard card training, and downloadable employment forms from Property Security Services, Inc.',
  alternates: { canonical: '/employment' },
};

const forms = [
  { title: 'Form W-4 (2019)', href: '/documents/fw4.pdf' },
  { title: 'Employment Eligibility Form', href: '/documents/employment-eligibility-form.pdf' },
  { title: 'Guard Card Change of Address', href: '/documents/guard-card-change-of-address.pdf' },
  { title: 'Guard Card Renewal Application', href: '/documents/guard-card-renewal-application.pdf' },
  { title: 'Live Scan Form', href: '/documents/live-scan-form.pdf' },
  { title: 'New Guard Card Application', href: '/documents/new-guard-card-application.pdf' },
  { title: 'Property Security – Information Package', href: '/documents/property-security-information-package.pdf' },
  { title: 'Property Security - Security Action Plan', href: '/documents/security-action-plan.pdf' },
  { title: 'Property Security- Employment Application', href: '/documents/employment-application.pdf' },
];

export default function EmploymentPage() {
  return (
    <>
      <PageHero
        title="Employment"
        description="Explore employment information and downloadable forms for applicants."
        image="/images/original-site/office-620817_1920-768x510.jpg"
        imageAlt="Person working at a desk"
      />
      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading eyebrow="Home / Employment" title="People Make the Difference" align="left" />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_390px] lg:gap-14">
            <Reveal>
              <div className="space-y-5 leading-8">
                <p>Property Security Services, Inc welcomes applications from people interested in security work. Employment decisions are based on merit, qualifications, and abilities. Except where required or permitted by law, employment practices are not influenced by an applicant’s or employee’s race, color, religion, sex, national origin, age, disability, or any other characteristic protected by law.</p>
                <p>Property Security Services, Inc believes that the work conditions, wages, and benefits it offers to its employees are competitive with those offered by other employers in this area and in this industry. If employees have concerns about work conditions or compensation, they are strongly encouraged to voice these concerns openly and directly to their supervisors. Our experience has shown that when employees deal openly and directly with supervisors, the work environment can be excellent, communications can be clear, and attitudes can be positive. We believe that Property Security Services, Inc amply demonstrates its commitment to employees by responding effectively to employee concerns.</p>
              </div>
            </Reveal>
            <Reveal variant="scaleIn">
              <Image src="/images/original-site/office-620817_1920-768x510.jpg" alt="Person working on administrative paperwork" width={768} height={510} sizes="(max-width: 1024px) 100vw, 390px" className="aspect-[4/3] w-full rounded-card object-cover shadow-lift" />
            </Reveal>
          </div>
          <Reveal className="mt-10 space-y-5 leading-8">
            <p>Property Security Services, Inc is in full compliance with the federal mandates of the Americans with Disabilities Act. Property Security Services, Inc will make reasonable accommodations for qualified individuals with known disabilities unless doing so would result in an undue hardship. This policy governs all aspects of employment, including selection, job assignment, compensation, discipline, termination, and access to benefits and training. In addition to a commitment to provide equal employment opportunities to all qualified individuals, Property Security Services, Inc has established an affirmative action program to promote opportunities for individuals in certain protected classes throughout the organization.</p>
            <p>Applicants can review the employment information and downloadable forms below. For questions about an application or current opportunities, contact Property Security Services, Inc directly.</p>
          </Reveal>
          <Reveal className="mt-8">
            <ButtonLink href="http://www.resedaguardcardtraining.com/" external variant="outline" arrow={false}>We Now Offer Guard Card Training Click Here To Learn More<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-space border-y border-line bg-surface" id="online-application">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Join our team" title="Employment Applications & Forms" align="left" />
            <ButtonLink href={`mailto:${business.email}?subject=Employment%20Application`} variant="gold">Apply by Email</ButtonLink>
          </div>
          <div className="mt-10">
            <h2 className="text-[25px]">Download Forms</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {forms.map((form) => (
                <a key={form.title} href={form.href} download className="group flex h-full items-center gap-4 rounded-card border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-soft">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-navy"><FileText className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="flex-1 font-heading text-[15px] font-semibold leading-6 text-navy">{form.title}</span>
                  <Download className="h-4 w-4 shrink-0 text-body transition-colors group-hover:text-accent" aria-hidden="true" />
                  <span className="sr-only">Download {form.title} PDF</span>
                </a>
              ))}
            </div>
            <a href="https://search.dca.ca.gov/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md font-heading text-[15px] font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4">Verify Your Guardcard<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
