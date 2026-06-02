import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud, Router, Network, Wifi, Shield } from 'lucide-react';

const icons = {
  cloud: Cloud,
  router: Router,
  switch: Network,
  accessPoint: Wifi,
  firewall: Shield,
};

const statusStyles = {
  online: 'border-emerald-500/50 shadow-emerald-500/20',
  warning: 'border-amber-500/50 shadow-amber-500/20',
  offline: 'border-rose-500/50 shadow-rose-500/20',
};

export const NetworkNode = memo(({ data }) => {
  const Icon = icons[data.type] || Network;
  const status = data.status || 'online';

  return (
    <div
      className={`min-w-[140px] rounded-lg border-2 bg-surface-800 px-3 py-2 shadow-lg ${statusStyles[status]}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-cyan-400" />
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyan-400" />
        <div>
          <p className="text-xs font-semibold text-white">{data.label}</p>
          <p className="text-[10px] capitalize text-slate-400">{data.type}</p>
        </div>
      </div>
      <span
        className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium capitalize ${
          status === 'online'
            ? 'bg-emerald-500/20 text-emerald-400'
            : status === 'warning'
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-rose-500/20 text-rose-400'
        }`}
      >
        {status}
      </span>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400" />
    </div>
  );
});

NetworkNode.displayName = 'NetworkNode';
