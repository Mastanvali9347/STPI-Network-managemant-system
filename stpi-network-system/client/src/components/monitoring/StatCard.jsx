export const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  accent = 'cyan',
  live = false,
}) => {
  const accents = {
    cyan: { grad: 'from-cyan-500/20 to-transparent', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    blue: { grad: 'from-blue-500/20 to-transparent', text: 'text-blue-400', border: 'border-blue-500/20' },
    emerald: { grad: 'from-emerald-500/20 to-transparent', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    amber: { grad: 'from-amber-500/20 to-transparent', text: 'text-amber-400', border: 'border-amber-500/20' },
    rose: { grad: 'from-rose-500/20 to-transparent', text: 'text-rose-400', border: 'border-rose-500/20' },
  };

  const a = accents[accent] || accents.cyan;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border bg-white/5 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/10 ${a.border} ${a.text}`}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${a.grad}`} />
      {live && (
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-white transition-all duration-500">{value}</p>
          {trend && <p className="mt-1 text-xs text-slate-500">{trend}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg border border-white/10 bg-slate-900/50 p-2 transition-transform group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};
