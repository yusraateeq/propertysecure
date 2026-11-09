import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  inverse = false,
  className = '',
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : 'text-left'} max-w-3xl ${className}`}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-7 bg-accent" aria-hidden="true" />
          <p className={`eyebrow ${inverse ? '!text-gold' : ''}`}>{eyebrow}</p>
          {centered && <span className="h-px w-7 bg-accent" aria-hidden="true" />}
        </div>
      )}
      <h2 id={id} className={`text-balance text-[30px] leading-tight sm:text-4xl ${inverse ? '!text-white' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[16px] leading-8 sm:text-[17px] ${inverse ? 'text-white/75' : 'text-body'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
