import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  Globe,
  Router,
  Network,
  Shield,
  Wifi,
  Server,
  Users,
  Activity,
} from 'lucide-react';

const ICONS = {
  internet: Globe,
  router: Router,
  switch: Network,
  firewall: Shield,
  wifi: Wifi,
  server: Server,
};

const GRADIENT = {
  internet: 'from-sky-500/30 to-blue-600/20',
  router: 'from-cyan-500/30 to-teal-600/20',
  switch: 'from-violet-500/30 to-purple-600/20',
  firewall: 'from-rose-500/30 to-orange-600/20',
  wifi: 'from-emerald-500/30 to-green-600/20',
  server: 'from-amber-500/30 to-yellow-600/20',
};

const STATUS_RING = {
  online: 'ring-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.35)]',
  warning: 'ring-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.35)]',
  offline: 'ring-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.4)] opacity-75',
};

const STATUS_DOT = {
  online: 'bg-emerald-400 topology-blink',
  warning: 'bg-amber-400 animate-pulse',
  offline: 'bg-rose-500',
};

/**
 * Glassmorphism device node — icon, status, traffic, users.
 */
export const CustomNode = memo(({ data, selected }) => {
  const nodeType = data.nodeType || 'switch';
  const Icon = ICONS[nodeType] || Network;
  const status = data.status || 'online';
  const isSelected = selected || data.selected;

  return (
    <div
      className={`topology-node group min-w-[168px] max-w-[200px] rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 backdrop-blur-xl transition-all duration-300 ring-2 ${STATUS_RING[status]} ${
        isSelected ? 'scale-105 border-cyan-400/50' : 'hover:scale-[1.02] hover:border-cyan-500/30'
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-2 !border-cyan-400/80 !bg-slate-900"
      />

      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br opacity-40 pointer-events-none ${GRADIENT[nodeType]}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 border border-white/10">
              <Icon className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{data.label}</p>
              <p className="text-[10px] text-slate-400 font-mono">{data.ipAddress}</p>
            </div>
          </div>
          <span
            className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[status]}`}
            title={status}
          />
        </div>

        <p className="mt-1 text-[10px] text-slate-500 truncate">{data.floor}</p>

        <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1 rounded-md bg-slate-800/60 px-1.5 py-1">
            <Activity className="h-3 w-3 text-cyan-400" />
            <span className="text-slate-300">{data.traffic ?? 0} Mbps</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-slate-800/60 px-1.5 py-1">
            <Users className="h-3 w-3 text-emerald-400" />
            <span className="text-slate-300">{data.activeUsers ?? 0}</span>
          </div>
        </div>

        <p
          className={`mt-1.5 text-center text-[10px] font-medium capitalize rounded-md py-0.5 ${
            status === 'online'
              ? 'bg-emerald-500/15 text-emerald-400'
              : status === 'warning'
                ? 'bg-amber-500/15 text-amber-400'
                : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          {status} · {data.latency ?? '—'} ms
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-2 !border-cyan-400/80 !bg-slate-900"
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
