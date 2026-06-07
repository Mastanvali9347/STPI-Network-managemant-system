export const HeatmapGrid = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];
  const hours = [...new Set(safeData.map((d) => d?.hour))].filter((h) => h !== undefined).sort((a, b) => a - b);
  const floors = [...new Set(safeData.map((d) => d?.floor))].filter((f) => f !== undefined);

  const getLoad = (hour, floor) =>
    safeData.find((d) => d?.hour === hour && d?.floor === floor)?.load ?? 0;

  const color = (load) => {
    const val = Number(load) || 0;
    if (val > 80) return 'bg-rose-500/80';
    if (val > 60) return 'bg-amber-500/70';
    if (val > 40) return 'bg-cyan-500/60';
    return 'bg-emerald-500/40';
  };

  if (!safeData.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[280px] bg-slate-900/20 rounded-xl border border-dashed border-slate-700">
        <p className="text-xs text-slate-500">No utilization data available for this range</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-grid gap-1 min-w-full" style={{ gridTemplateColumns: `80px repeat(${Math.max(1, hours.length)}, 1fr)` }}>
        <div />
        {hours.map((h) => (
          <div key={`hour-${h}`} className="text-center text-[10px] text-slate-500 py-1">
            {h}:00
          </div>
        ))}
        {floors.map((floor) => (
          <div key={`floor-${floor}`} className="contents">
            <div className="text-xs text-slate-400 flex items-center pr-2">{floor}</div>
            {hours.map((hour) => {
              const load = getLoad(hour, floor);
              return (
                <div
                  key={`${floor}-${hour}`}
                  title={`${load}% load`}
                  className={`h-8 rounded-md ${color(load)} transition-colors hover:ring-1 hover:ring-cyan-400/50`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-500 italic">Historical floor × hour utilization heatmap</p>
    </div>
  );
};
