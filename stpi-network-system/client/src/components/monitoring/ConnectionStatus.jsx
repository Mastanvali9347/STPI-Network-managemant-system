import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const labels = {
  connected: { text: 'Live', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  reconnected: { text: 'Live', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  connecting: { text: 'Connecting...', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  reconnecting: { text: 'Reconnecting...', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  disconnected: { text: 'Offline', color: 'text-rose-400', bg: 'bg-rose-500/15' },
  error: { text: 'Connection error', color: 'text-rose-400', bg: 'bg-rose-500/15' },
};

export const ConnectionStatus = ({ status, isLive }) => {
  const cfg = labels[status] || labels.connecting;
  const Icon = status === 'disconnected' || status === 'error' ? WifiOff : isLive ? Wifi : RefreshCw;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/5 px-3 py-1 text-xs font-medium backdrop-blur-md ${cfg.bg} ${cfg.color}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isLive ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
        }`}
      />
      <Icon className={`h-3.5 w-3.5 ${status === 'reconnecting' ? 'animate-spin' : ''}`} />
      {cfg.text}
    </span>
  );
};
