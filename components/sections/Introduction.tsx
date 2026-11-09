import { ArrowUpRight, Clock3, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/lib/site';

const trustIndicators = [
  { value: '33+', label: 'Years in the security industry' },
  { value: 'PPO', label: 'License # 119841' },
  { value: 'Mon–Fri', label: business.hours.replace('Mon – Fri ', ''), icon: Clock3 },
] as const;

export function Introduction() {
  return (
    <section id="intro" className="overflow-hidden bg-white py-14 md:py-16 lg:py-20">
      <div className="site-container">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface shadow-lift">
              <Image
                src="/images/original-site/building-security.jpg"
                alt="Uniformed security officer at a commercial property"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-4 max-w-[230px] rounded-xl border border-line/70 bg-white p-4 shadow-lift sm:right-7 sm:p-5">
              <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
              <p className="mt-2 font-heading text-[15px] font-bold leading-5 text-navy">California PPO License #119841</p>
            </div>
          </Reveal>

          <Reveal variant="slideRight">
            <p className="eyebrow">Security & personal protection services</p>
            <h2 className="text-balance mt-4 max-w-2xl text-[30px] leading-tight sm:text-[36px]">
              A considered approach to protecting the places people rely on.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 sm:text-base sm:leading-8">
              Property Security Services, Inc provides professional security services for businesses, residential communities, institutions, retail properties, and construction sites throughout California.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-body">
              With more than 33 years in the security industry, the company works with clients to discuss the duties, schedule, and site details relevant to each assignment.
            </p>
            <ButtonLink href="/about" variant="outline" className="mt-6" arrow>
              About the company <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="mt-12 border-y border-line/80" delay={0.08}>
          <ul className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {trustIndicators.map((item, index) => (
              <li
                key={item.label}
                className={`flex items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 ${index > 0 ? 'sm:border-l sm:border-line' : ''}`}
              >
                {'icon' in item && <item.icon className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />}
                <div className="flex flex-col">
                  <p className="font-heading text-lg font-bold leading-tight tracking-[-0.02em] text-navy sm:text-xl">{item.value}</p>
                  <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-body sm:text-[15px]">{item.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
