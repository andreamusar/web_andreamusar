export function ProductSkeleton() {
  return (
    <div className="card-dark animate-pulse">
      <div className="aspect-square bg-brand-charcoal-light w-full" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-brand-charcoal-light rounded w-1/3" />
        <div className="h-5 bg-brand-charcoal-light rounded w-3/4" />
        <div className="h-4 bg-brand-charcoal-light rounded w-1/2" />
        <div className="h-10 bg-brand-charcoal-light rounded w-full" />
      </div>
    </div>
  )
}

export function BlogSkeleton() {
  return (
    <div className="card-dark animate-pulse">
      <div className="h-48 bg-brand-charcoal-light w-full" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-brand-charcoal-light rounded w-1/4" />
        <div className="h-6 bg-brand-charcoal-light rounded w-5/6" />
        <div className="h-4 bg-brand-charcoal-light rounded w-full" />
        <div className="h-4 bg-brand-charcoal-light rounded w-4/5" />
      </div>
    </div>
  )
}

export function ServiceSkeleton() {
  return (
    <div className="card-dark animate-pulse p-8 space-y-4">
      <div className="h-6 bg-brand-charcoal-light rounded w-1/2" />
      <div className="h-4 bg-brand-charcoal-light rounded w-full" />
      <div className="h-4 bg-brand-charcoal-light rounded w-4/5" />
      <div className="h-10 bg-brand-charcoal-light rounded w-1/3 mt-6" />
      <div className="h-12 bg-brand-charcoal-light rounded w-full" />
    </div>
  )
}
