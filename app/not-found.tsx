import { ButtonLink } from '@/components/ui/ButtonLink';

export default function NotFound() {
  return (
    <section className="section-space bg-surface text-center">
      <div className="site-container">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-lg">The page you requested could not be found.</p>
        <ButtonLink href="/" variant="gold" className="mt-8">Return Home</ButtonLink>
      </div>
    </section>
  );
}
