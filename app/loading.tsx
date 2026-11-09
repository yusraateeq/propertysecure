export default function Loading() {
  return (
    <div className="bg-white" role="status" aria-live="polite" aria-label="Loading page">
      <span className="sr-only">Loading page…</span>
      <div className="h-[440px] animate-pulse bg-navy-deep sm:h-[560px]" />
      <div className="site-container py-20">
        <div className="mx-auto h-4 w-28 animate-pulse rounded bg-line" />
        <div className="mx-auto mt-5 h-10 max-w-md animate-pulse rounded bg-line" />
        <div className="mx-auto mt-6 h-4 max-w-xl animate-pulse rounded bg-surface" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-card bg-surface" />)}
        </div>
      </div>
    </div>
  );
}
