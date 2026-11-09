import { Clock3, Mail, Phone, ShieldCheck } from 'lucide-react';
import { business } from '@/lib/site';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function TopBar() {
  return (
    <div className="relative z-[60] bg-navy-deep text-white">
      <div className="site-container flex min-h-10 items-center justify-between gap-4 py-2 text-[13px] leading-5 lg:text-[15px]">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 whitespace-nowrap font-semibold text-white/90">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {business.license}
          </span>
          <a className="hidden items-center gap-2 text-white/75 transition-colors hover:text-gold lg:flex" href={`mailto:${business.email}`}>
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {business.email}
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a className="flex items-center gap-2 whitespace-nowrap font-semibold transition-colors hover:text-gold" href={business.phoneHref}>
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <span className="hidden items-center gap-2 whitespace-nowrap text-white/75 md:flex">
            <Clock3 className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {business.hours}
          </span>
          <SocialLinks className="hidden gap-1 xl:flex [&_a]:h-7 [&_a]:w-7" />
        </div>
      </div>
    </div>
  );
}
