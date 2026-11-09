import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { ContentBlocks, type ContentNode } from '@/components/ui/ContentBlocks';
import { Reveal } from '@/components/ui/Reveal';
import content from '@/lib/content/construction-security.json';

export const metadata: Metadata = {
  title: 'Construction Security',
  description: 'Construction site security, standing guard, patrol, access control, and trailer guard services from Property Security Services, Inc.',
  alternates: { canonical: '/construction-security' },
};

export default function ConstructionSecurityPage() {
  return (
    <>
      <PageHero
        title="Construction Site Security"
        description="On-site security, patrol, access control, and trailer guard options for construction projects."
        image="/images/original-site/ConstructionSecurity-1.jpg"
        imageAlt="Security officer at a construction site"
      />
      <section className="section-space bg-white">
        <div className="site-container grid items-start gap-12 lg:grid-cols-[1fr_340px] lg:gap-12">
          <div className="reading-width max-w-none"><ContentBlocks nodes={content as ContentNode[]} /></div>
          <aside className="lg:sticky lg:top-32">
            <Reveal variant="scaleIn">
              <div className="overflow-hidden rounded-card border border-line bg-surface shadow-soft">
                <Image src="/images/original-site/ConstructionSecurity-1.jpg" alt="Security officer at a construction site" width={642} height={261} sizes="(max-width: 1024px) 100vw, 340px" className="h-auto w-full object-cover" />
                <div className="p-6"><h2 className="text-[20px]">Construction Site Management</h2><p className="mt-3 text-[15px] leading-7">A customized security package designed to your exact specifications.</p></div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
