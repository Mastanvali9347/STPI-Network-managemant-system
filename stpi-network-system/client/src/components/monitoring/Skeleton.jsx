export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-slate-700/50 ${className}`} />
);

export const StatCardSkeleton = () => (
  <div className="rounded-xl border border-slate-700/40 bg-surface-800/50 p-5 backdrop-blur-sm">
    <Skeleton className="h-3 w-24 mb-4" />
    <Skeleton className="h-8 w-16" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="rounded-xl border border-slate-700/40 bg-surface-800/50 p-5 h-70">
    <Skeleton className="h-4 w-40 mb-6" />
    <Skeleton className="h-50 w-full" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);
