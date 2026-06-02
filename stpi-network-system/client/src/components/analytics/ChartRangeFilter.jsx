const RANGES = [
  { id: 'today', label: 'Today' },
  { id: '24h', label: '24 Hours' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
];

export const ChartRangeFilter = ({ value, onChange }) => (
  <div className="flex flex-wrap gap-1 rounded-lg border border-slate-700/60 bg-slate-900/60 p-1">
    {RANGES.map((r) => (
      <button
        key={r.id}
        type="button"
        onClick={() => onChange(r.id)}
        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
          value === r.id
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        {r.label}
      </button>
    ))}
  </div>
);

export { RANGES };
