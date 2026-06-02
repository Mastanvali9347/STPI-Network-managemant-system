import { Activity } from 'lucide-react';

export const WifiLiveEvents = ({ events = [] }) => (
  <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 max-h-48 overflow-y-auto">
    <div className="flex items-center gap-2 mb-3">
      <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
      <h3 className="text-sm font-semibold text-white">Live WiFi events</h3>
    </div>
    {events.length === 0 ? (
      <p className="text-xs text-slate-500">Waiting for simulated join/disconnect events…</p>
    ) : (
      <ul className="space-y-2">
        {events.slice(0, 12).map((e) => (
          <li key={e.id} className="text-xs border-l-2 border-cyan-500/50 pl-2 py-0.5">
            <span className="text-cyan-400 capitalize">{e.type}</span>
            <span className="text-slate-400"> — {e.message}</span>
            <span className="block text-[10px] text-slate-600">
              {new Date(e.timestamp).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
