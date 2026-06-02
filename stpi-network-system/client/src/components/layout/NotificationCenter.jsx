import { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useRealtime } from '../../hooks/useRealtime';

export const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { alerts } = useRealtime();

  const recent = (alerts || []).slice(0, 8);
  const unread = recent.filter((a) => !a.acknowledged && a.severity !== 'info').length;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-slate-600/80 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3">
            <p className="text-sm font-semibold text-white">Notifications</p>
            <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {recent.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No alerts</p>
            ) : (
              recent.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg px-3 py-2 mb-1 text-xs border ${
                    a.severity === 'critical'
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-200'
                      : a.severity === 'warning'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                        : 'border-emerald-500/20 bg-emerald-500/5 text-slate-300'
                  }`}
                >
                  <p className="font-medium">{a.title}</p>
                  <p className="opacity-80 mt-0.5 line-clamp-2">{a.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
