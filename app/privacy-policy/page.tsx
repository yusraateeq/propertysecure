import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how the Property Security Services website handles information submitted through its quote request form.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="section-space bg-white">
        <div className="site-container">
          <Reveal className="reading-width mx-auto">
            <p className="eyebrow">Website information</p>
            <h2 className="mt-4 text-3xl">How this website handles quote requests</h2>
            <p className="mt-5 leading-8">
              The quote request form on this website prepares an email in the visitor’s own email application. It does not submit form entries to or store them on this website.
            </p>
            <h3 className="mt-10 text-xl">Information you choose to send</h3>
            <p className="mt-3 leading-8">
              If you choose to send the prepared email, the information in it is delivered through your email provider to Property Security Services, Inc at {business.email}. You may also contact the company by phone or mail at the details below.
            </p>
            <h3 className="mt-10 text-xl">Questions about an inquiry</h3>
            <p className="mt-3 leading-8">
              For questions about information you have sent to the company, contact the team directly. Do not include sensitive personal information in a quote request unless the company specifically asks for it.
            </p>
            <div className="mt-8 rounded-card border border-line bg-surface p-6 text-[15px] leading-7">
              <p className="font-semibold text-navy">{business.name}</p>
              <p>{business.address}</p>
              <p><a className="font-semibold text-navy underline decoration-accent underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a></p>
            </div>
          </Reveal>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
