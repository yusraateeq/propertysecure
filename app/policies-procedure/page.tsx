import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteCta } from '@/components/layout/QuoteCta';
import { ContentBlocks, contentId, type ContentNode } from '@/components/ui/ContentBlocks';
import content from '@/lib/content/policies-procedure.json';

export const metadata: Metadata = {
  title: 'Policies & Procedure',
  description: 'Property Security Services, Inc policies, procedures, training, supervision, licensing, and quality management system.',
  alternates: { canonical: '/policies-procedure' },
};

const nodes = content as ContentNode[];
const contents = nodes.flatMap((node, index) => node.type === 'h2' ? [{ title: node.text, href: `#${contentId(node.text, index)}` }] : []);

export default function PoliciesPage() {
  return (
    <>
      <PageHero title="Policies & Procedure" />
      <section className="section-space bg-white">
        <div className="site-container grid items-start gap-12 lg:grid-cols-[290px_1fr] lg:gap-12">
          <aside className="rounded-card border border-line bg-surface p-6 lg:sticky lg:top-32">
            <h2 className="text-[18px]">Policies & Procedure</h2>
            <nav className="mt-5" aria-label="On this page">
              <ul className="space-y-2.5">
                {contents.map((item) => <li key={item.href}><Link href={item.href} className="text-[15px] leading-6 text-body transition-colors hover:text-navy">{item.title}</Link></li>)}
              </ul>
            </nav>
            <div className="mt-7 hidden border-t border-line pt-7 text-center lg:block">
              <Image src="/images/original-site/security-gurad-227x300.png" alt="Uniformed security guard" width={227} height={300} className="mx-auto h-auto max-h-[290px] w-auto object-contain" />
            </div>
          </aside>
          <article className="reading-width max-w-none"><ContentBlocks nodes={nodes} /></article>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
