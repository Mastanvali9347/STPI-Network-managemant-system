import { Wifi, Radio, Users, Gauge, Shield } from 'lucide-react';
import { statusBadgeClass } from '../../utils/statusColors';

export const WifiNetworkCard = ({ network, onRevealPassword, canReveal }) => (
  <div className="group rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/20">
          <Wifi className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-white truncate">{network.ssid || network.wifiName}</h3>
          <p className="text-[10px] text-slate-500">{network.accessPoint} · {network.floor}</p>
        </div>
      </div>
      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] capitalize ${statusBadgeClass(network.status)}`}>
        {network.status}
      </span>
    </div>

    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
      <Metric icon={Radio} label="Signal" value={`${network.signalStrength} dBm`} />
      <Metric icon={Users} label="Users" value={network.connectedUsers} />
      <Metric icon={Gauge} label="Bandwidth" value={`${Math.round(network.bandwidthMbps || 0)} Mbps`} />
      <Metric icon={Shield} label="Security" value={network.securityType} />
    </div>

    <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-slate-500">
      <span className="rounded bg-slate-800 px-1.5 py-0.5">Ch {network.channel}</span>
      <span className="rounded bg-slate-800 px-1.5 py-0.5">{network.frequency}</span>
      <span className="rounded bg-slate-800 px-1.5 py-0.5">VLAN {network.vlan}</span>
    </div>

    <div className="mt-3 flex items-center justify-between border-t border-slate-700/50 pt-3">
      <span className="font-mono text-xs text-slate-500 tracking-widest">********</span>
      {canReveal && network.hasVault !== false && (
        <button
          type="button"
          onClick={() => onRevealPassword(network)}
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
        >
          Reveal password
        </button>
      )}
    </div>
  </div>
);

const Metric = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-1.5 rounded-md bg-slate-800/50 px-2 py-1.5">
    <Icon className="h-3 w-3 text-slate-500" />
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="text-slate-200 font-medium truncate">{value}</p>
    </div>
  </div>
);
