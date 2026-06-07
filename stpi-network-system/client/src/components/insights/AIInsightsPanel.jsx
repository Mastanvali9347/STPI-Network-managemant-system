import { Brain, Lightbulb, TriangleAlert, CircleCheck, CircleX, Info } from 'lucide-react';

const typeStyles = {
  critical: { icon: CircleX, border: 'border-rose-500/40', bg: 'bg-rose-500/10', text: 'text-rose-300' },
  warning: { icon: TriangleAlert, border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-300' },
  success: { icon: CircleCheck, border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-300' },
  info: { icon: Info, border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', text: 'text-cyan-300' },
};

export const AIInsightsPanel = ({ insights = [], recommendations = [], loading }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-slate-800/60 animate-pulse shimmer-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-violet-400" />
        <h3 className="text-sm font-semibold text-white">AI Network Insights</h3>
        <span className="text-[10px] text-slate-500">(rule-based simulation)</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {insights.map((item) => {
          const s = typeStyles[item.type] || typeStyles.info;
          const Icon = s.icon;
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 backdrop-blur-md transition hover:scale-[1.01] ${s.border} ${s.bg}`}
            >
              <div className="flex gap-3">
                <Icon className={`h-5 w-5 shrink-0 ${s.text}`} />
                <div>
                  <p className={`text-sm font-semibold ${s.text}`}>{item.title}</p>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.message}</p>
                  <p className="mt-2 text-[10px] text-slate-500">Confidence {item.confidence}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {recommendations.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Smart recommendations
            </h4>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="rounded-lg border border-slate-700/50 bg-slate-900/40 px-4 py-3 hover:border-cyan-500/30 transition"
              >
                <p className="text-sm font-medium text-white">{rec.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{rec.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
