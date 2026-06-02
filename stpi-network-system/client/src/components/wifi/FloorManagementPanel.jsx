import { Building2, Wifi, Users, Gauge } from 'lucide-react';

export const FloorManagementPanel = ({ floorStats = [] }) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {floorStats.map((f) => (
      <div
        key={f.floor}
        className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-cyan-950/20 p-4 backdrop-blur-md hover:border-cyan-500/25 transition"
      >
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">{f.floor}</h3>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-xs">
          <Stat icon={Wifi} label="SSIDs" value={f.ssidCount} />
          <Stat icon={Users} label="Users" value={f.users} />
          <Stat icon={Gauge} label="Bandwidth" value={`${f.bandwidthMbps} Mbps`} />
          <Stat label="Signal" value={`${f.avgSignal} dBm`} />
        </dl>
        <div className="mt-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${Math.min(100, (f.users / 50) * 100)}%` }}
          />
        </div>
        <p className="mt-1 text-[10px] text-slate-500">{f.activeAps} active AP(s)</p>
      </div>
    ))}
  </div>
);

const Stat = ({ icon: Icon, label, value }) => (
  <div>
    <dt className="text-slate-500 flex items-center gap-1">
      {Icon && <Icon className="h-3 w-3" />} {label}
    </dt>
    <dd className="text-white font-medium">{value}</dd>
  </div>
);
