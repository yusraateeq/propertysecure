import { business, services, splitServices } from '@/lib/site';

/**
 * Hero stats strip (hero-revamp-spec SS3). Every fact is derived from `lib/site.ts`
 * and existing page copy - no invented claims:
 * - "33+"  <- "over 33 years of experience in the security industry" (lib/site.ts:72)
 * - "5"    <- services (3, lib/site.ts:34-56) + splitServices (2, lib/site.ts:58-75)
 * - license stays plain literal text, no count-up (lib/site.ts:5)
 * - "CA / Statewide service" <- "throughout California" (Introduction.tsx:7,19)
 * Deliberately excluded: "24/7 Support" (contradicts business.hours, lib/site.ts:9),
 * response times, founding dates.
 */

// Short-landscape collapse (hero-revamp-spec SS6): single-line inline badges under
// 860px height in landscape. Underscores become spaces inside arbitrary variants.
const COMPACT = '[@media(max-height:859px)_and_(orientation:landscape)]';

export function HeroStats() {
  const stats = [
    { value: '33+', label: 'Years in security', valueClass: 'text-[20px] sm:text-[22px] md:text-[25px]' },
    { value: `${services.length + splitServices.length}`, label: 'Service lines', valueClass: 'text-[20px] sm:text-[22px] md:text-[25px]' },
    { value: business.license, label: 'BSIS-licensed', valueClass: 'text-[15px] sm:text-[17px]' },
    { value: 'CA', label: 'Statewide', valueClass: 'text-[18px] sm:text-[20px] md:text-[24px]' },
  ] as const;

  return (
    <dl className={`grid grid-cols-2 border-t border-white/10 py-3 sm:py-4 md:grid-cols-4 ${COMPACT}:grid-cols-4 ${COMPACT}:py-2`}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex min-w-0 flex-col px-2.5 py-1 sm:px-4 sm:py-2 ${COMPACT}:flex-row ${COMPACT}:items-baseline ${COMPACT}:gap-2 ${COMPACT}:px-2 ${
            index > 0 ? 'md:border-l md:border-white/10' : ''
          } ${index % 2 === 1 ? 'border-l border-white/10' : ''} ${index > 1 ? 'border-t border-white/10 md:border-t-0' : ''}`}
        >
          <dd
            className={`order-1 whitespace-nowrap font-heading font-bold leading-none tracking-[-0.04em] text-white ${stat.valueClass} ${COMPACT}:text-[15px]`}
          >
            {stat.value}
          </dd>
          <dt
            className={`order-2 mt-1 min-w-0 truncate text-[13px] font-semibold uppercase tracking-[0.08em] text-white/65 sm:text-[13px] sm:leading-4 md:text-[15px] ${COMPACT}:order-none ${COMPACT}:mt-0 ${COMPACT}:text-[11px]`}
          >
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}