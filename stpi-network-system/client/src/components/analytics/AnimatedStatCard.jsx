import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

export const AnimatedStatCard = ({ label, value, suffix = '', icon: Icon, accent = 'cyan', live }) => {
  const numeric = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.]/g, '')) || 0;
  const animated = useAnimatedCounter(numeric);
  const display = typeof value === 'string' && value.includes('Mbps') ? `${animated} Mbps` : `${animated}${suffix}`;

  const ring = {
    cyan: 'border-cyan-500/30 shadow-cyan-500/10',
    emerald: 'border-emerald-500/30 shadow-emerald-500/10',
    rose: 'border-rose-500/30 shadow-rose-500/10',
    amber: 'border-amber-500/30 shadow-amber-500/10',
    violet: 'border-violet-500/30 shadow-violet-500/10',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-slate-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shimmer-border ${ring[accent]}`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
      {live && (
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      )}
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white tabular-nums">{display}</p>
        </div>
        {Icon && (
          <div className="rounded-lg border border-white/10 bg-slate-800/80 p-2">
            <Icon className="h-4 w-4 text-cyan-400" />
          </div>
        )}
      </div>
    </div>
  );
};
