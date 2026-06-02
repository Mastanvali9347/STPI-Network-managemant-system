import { memo } from 'react';
import { Activity, Server, AlertTriangle, Percent } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, sub, accent }) => (
  <div
    className={`rounded-lg border border-white/5 bg-slate-900/60 backdrop-blur-md px-3 py-2 ${accent}`}
  >
    <div className="flex items-center gap-2 text-slate-400">
      <Icon className="h-3.5 w-3.5" />
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </div>
    <p className="mt-0.5 text-lg font-bold text-white tabular-nums">{value}</p>
    {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
  </div>
);

export const TopologyMetricsPanel = memo(({ metrics, isLive }) => {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      <MetricCard
        icon={Server}
        label="Total Devices"
        value={metrics.totalDevices ?? 0}
        sub={isLive ? 'Live via Socket.IO' : 'Connecting…'}
        accent="border-l-2 border-l-cyan-500/50"
      />
      <MetricCard
        icon={Activity}
        label="Active Traffic"
        value={`${metrics.activeTrafficMbps ?? 0} Mbps`}
        sub="Aggregate simulated load"
        accent="border-l-2 border-l-emerald-500/50"
      />
      <MetricCard
        icon={Percent}
        label="Online"
        value={`${metrics.onlinePercent ?? 0}%`}
        sub={`${metrics.onlineDevices ?? 0} devices up`}
        accent="border-l-2 border-l-violet-500/50"
      />
      <MetricCard
        icon={AlertTriangle}
        label="Failed / Warn"
        value={metrics.failedDevices ?? 0}
        sub={`${metrics.warningDevices ?? 0} warnings`}
        accent="border-l-2 border-l-amber-500/50"
      />
    </div>
  );
});

TopologyMetricsPanel.displayName = 'TopologyMetricsPanel';
