'use client';

import { Send } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ActionButton } from '@/components/ui/ActionButton';
import { business, services } from '@/lib/site';

const inputStyles = 'mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-navy-deep shadow-sm outline-none transition-colors placeholder:text-[#7a8490] hover:border-[#b9c5cf] focus:border-accent focus:ring-4 focus:ring-accent/10';

export function QuoteForm() {
  const [prepared, setPrepared] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const phone = String(data.get('phone') || '');
    const service = String(data.get('service') || '');
    const message = String(data.get('message') || '');
    const subject = `Quote Request — ${service || 'Security Services'} — ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`, `Service: ${service || 'Not selected'}`, '', message].join('\n');
    setPrepared(true);
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-line bg-white p-6 shadow-soft sm:p-8" aria-label="Request a security quote">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[15px] font-semibold text-navy">Name *<input className={inputStyles} type="text" name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label className="text-[15px] font-semibold text-navy">Your Email *<input className={inputStyles} type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label>
        <label className="text-[15px] font-semibold text-navy">Phone<input className={inputStyles} type="tel" name="phone" autoComplete="tel" placeholder="(555) 000-0000" /></label>
        <label className="text-[15px] font-semibold text-navy">Service<select className={inputStyles} name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}<option value="Emergency Security Solution">Emergency Security Solution</option><option value="Construction Site Management">Construction Site Management</option></select></label>
      </div>
      <label className="mt-5 block text-[15px] font-semibold text-navy">Your Message<textarea className={`${inputStyles} min-h-[150px] resize-y`} name="message" placeholder="Tell us about your security needs" required /></label>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <ActionButton type="submit" variant="gold" className="border-gold bg-gold text-navy-deep hover:border-[#f0bd19] hover:bg-[#f0bd19]"><Send className="h-4 w-4" aria-hidden="true" />Request Quote</ActionButton>
        <p className="text-[15px] leading-6 text-body">Submitting opens your email application with this request prepared. If it does not open, email <a className="font-semibold text-navy underline decoration-accent underline-offset-2" href={`mailto:${business.email}`}>{business.email}</a>.</p>
      </div>
      {prepared && <p className="mt-4 rounded-lg bg-surface px-4 py-3 text-[15px] leading-6 text-navy" role="status">Your email application should open with the request prepared. This website has not submitted or stored your information.</p>}
      <p className="mt-4 text-[15px] leading-6 text-body">For details about this form, read our <Link className="font-semibold text-navy underline decoration-accent underline-offset-2" href="/privacy-policy">Privacy Policy</Link>.</p>
    </form>
  );
}
