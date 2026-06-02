export const HeatmapGrid = ({ data = [] }) => {
  const hours = [...new Set(data.map((d) => d.hour))];
  const floors = [...new Set(data.map((d) => d.floor))];

  const getLoad = (hour, floor) =>
    data.find((d) => d.hour === hour && d.floor === floor)?.load ?? 0;

  const color = (load) => {
    if (load > 80) return 'bg-rose-500/80';
    if (load > 60) return 'bg-amber-500/70';
    if (load > 40) return 'bg-cyan-500/60';
    return 'bg-emerald-500/40';
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-grid gap-1 min-w-full" style={{ gridTemplateColumns: `80px repeat(${hours.length}, 1fr)` }}>
        <div />
        {hours.map((h) => (
          <div key={h} className="text-center text-[10px] text-slate-500 py-1">
            {h}:00
          </div>
        ))}
        {floors.map((floor) => (
          <div key={floor} className="contents">
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
      <p className="mt-2 text-[10px] text-slate-500">Simulated floor × hour utilization heatmap</p>
    </div>
  );
};
