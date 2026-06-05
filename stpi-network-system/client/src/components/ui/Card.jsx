export const Card = ({ title, subtitle, children, className = '', action }) => (
  <div
    className={`rounded-xl border border-slate-700/60 dark:border-slate-700/60 bg-surface-800 backdrop-blur-sm shadow-lg shadow-black/5 dark:shadow-black/40 ${className}`}
  >
    {(title || action) && (
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-700/50 px-5 py-4">
        <div>
          {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
          {subtitle && <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>}
        </div>
        {action}
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);


export const StatCard = ({ label, value, icon: Icon, trend, accent = 'cyan' }) => {
  const accents = {
    cyan: 'from-cyan-500/10 dark:from-cyan-500/20 to-transparent text-cyan-600 dark:text-cyan-400',
    blue: 'from-blue-500/10 dark:from-blue-500/20 to-transparent text-blue-600 dark:text-blue-400',
    emerald: 'from-emerald-500/10 dark:from-emerald-500/20 to-transparent text-emerald-600 dark:text-emerald-400',
    amber: 'from-amber-500/10 dark:from-amber-500/20 to-transparent text-amber-600 dark:text-amber-400',
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/60 bg-surface-800 p-5 shadow-sm dark:shadow-none">
      <div className={`absolute inset-0 bg-gradient-to-br ${accents[accent]}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary opacity-80">{label}</p>
          <p className="mt-2 text-2xl font-bold text-text-primary">{value}</p>
          {trend && <p className="mt-1 text-xs text-text-secondary">{trend}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg bg-slate-200/50 dark:bg-slate-900/60 p-2">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};

