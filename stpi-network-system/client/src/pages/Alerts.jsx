import { useMemo, useState } from 'react';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { AlertCard } from '../components/monitoring/AlertCard';
import { TableSkeleton } from '../components/monitoring/Skeleton';
import { useRealtime } from '../hooks/useRealtime';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical' },
  { id: 'warning', label: 'Warnings' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'info', label: 'Info' },
];

export const AlertsPage = () => {
  const { alerts, connectionStatus, isLive } = useRealtime();
  const [tab, setTab] = useState('all');

  const filtered = useMemo(() => {
    const list = alerts || [];
    if (tab === 'resolved') return list.filter((a) => a.acknowledged);
    if (tab === 'all') return list;
    return list.filter((a) => a.severity === tab && !a.acknowledged);
  }, [alerts, tab]);

  const counts = useMemo(
    () => ({
      critical: (alerts || []).filter((a) => a.severity === 'critical' && !a.acknowledged).length,
      warning: (alerts || []).filter((a) => a.severity === 'warning' && !a.acknowledged).length,
      resolved: (alerts || []).filter((a) => a.acknowledged).length,
    }),
    [alerts]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts Center</h1>
          <p className="text-sm text-slate-400">Real-time NOC notifications · simulated events</p>
        </div>
        <ConnectionStatus status={connectionStatus} isLive={isLive} />
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
              tab === t.id
                ? 'border-cyan-500/40 bg-cyan-500/15 text-cyan-400'
                : 'border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
            {t.id === 'critical' && counts.critical > 0 && ` (${counts.critical})`}
            {t.id === 'warning' && counts.warning > 0 && ` (${counts.warning})`}
            {t.id === 'resolved' && counts.resolved > 0 && ` (${counts.resolved})`}
          </button>
        ))}
      </div>

      {!alerts?.length ? (
        <TableSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-600 py-16 text-center">
          <p className="text-sm text-slate-500">No alerts in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <AlertCard
              key={a.id}
              alert={a}
              blink={a.severity === 'critical' && !a.acknowledged}
            />
          ))}
        </div>
      )}
    </div>
  );
};
