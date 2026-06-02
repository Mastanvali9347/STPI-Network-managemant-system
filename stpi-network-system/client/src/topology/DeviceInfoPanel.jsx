import {
  X,
  Router,
  Network,
  Shield,
  Wifi,
  Server,
  Globe,
  Clock,
  Gauge,
  Users,
  MapPin,
} from 'lucide-react';

const TYPE_ICONS = {
  internet: Globe,
  router: Router,
  switch: Network,
  firewall: Shield,
  wifi: Wifi,
  server: Server,
};

export const DeviceInfoPanel = ({ device, onClose }) => {
  if (!device) {
    return (
      <aside className="hidden lg:flex w-72 shrink-0 flex-col rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl p-4">
        <p className="text-sm font-medium text-slate-300">Device Inspector</p>
        <p className="mt-2 text-xs text-slate-500">
          Click a node on the topology map to view live device details.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 py-12 text-slate-600">
          <Network className="h-10 w-10 opacity-40" />
          <p className="mt-2 text-xs">No device selected</p>
        </div>
      </aside>
    );
  }

  const Icon = TYPE_ICONS[device.nodeType] || Network;
  const status = device.status || 'online';

  const rows = [
    { label: 'IP Address', value: device.ipAddress, icon: Globe },
    { label: 'Floor / Zone', value: device.floor, icon: MapPin },
    { label: 'Uptime', value: `${device.uptime ?? '—'}%`, icon: Clock },
    { label: 'Bandwidth', value: `${device.traffic ?? 0} Mbps`, icon: Gauge },
    { label: 'Users Connected', value: device.activeUsers ?? 0, icon: Users },
    { label: 'Latency', value: `${device.latency ?? '—'} ms`, icon: Gauge },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col rounded-xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl shadow-xl shadow-cyan-500/5">
      <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3">
        <p className="text-sm font-semibold text-white">Device Details</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
            <Icon className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{device.label}</h3>
            <span
              className={`inline-block mt-0.5 text-[10px] font-medium capitalize px-2 py-0.5 rounded-full ${
                status === 'online'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : status === 'warning'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <dl className="space-y-2">
          {rows.map(({ label, value, icon: RowIcon }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg bg-slate-800/50 px-3 py-2 border border-slate-700/40"
            >
              <dt className="flex items-center gap-2 text-xs text-slate-400">
                <RowIcon className="h-3.5 w-3.5" />
                {label}
              </dt>
              <dd className="text-xs font-mono text-slate-200">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="text-[10px] text-slate-500 leading-relaxed">
          Simulated metrics for educational monitoring. Replace with SNMP or API
          polling to attach real devices.
        </p>
      </div>
    </aside>
  );
};
