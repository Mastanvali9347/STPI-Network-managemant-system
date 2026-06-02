import { useState, useRef, useEffect } from 'react';
import { Search, X, Server, Wifi, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { ROUTES } from '../../utils/constants';

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const navigate = useNavigate();
  const results = useGlobalSearch(query);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (path) => {
    setOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-400 hover:border-cyan-500/30 hover:text-slate-200 min-w-50 lg:min-w-65"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search network…</span>
        <kbd className="hidden lg:inline text-[10px] bg-slate-900 px-1.5 rounded border border-slate-600">⌘K</kbd>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,400px)] rounded-xl border border-slate-600/80 bg-slate-900/95 shadow-2xl backdrop-blur-xl p-3">
          <div className="flex items-center gap-2 border-b border-slate-700/60 pb-2 mb-2">
            <Search className="h-4 w-4 text-cyan-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Devices, IPs, WiFi, alerts…"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {!query.trim() ? (
            <p className="text-xs text-slate-500 py-4 text-center">Type to search simulated inventory</p>
          ) : results.total === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No matches</p>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-3">
              {results.devices.length > 0 && (
                <section>
                  <p className="text-[10px] uppercase text-slate-500 mb-1 flex items-center gap-1">
                    <Server className="h-3 w-3" /> Devices
                  </p>
                  {results.devices.slice(0, 5).map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => go(ROUTES.DEVICES)}
                      className="w-full text-left rounded-lg px-2 py-1.5 text-xs hover:bg-slate-800"
                    >
                      <span className="text-white">{d.deviceName}</span>
                      <span className="text-slate-500 ml-2 font-mono">{d.ipAddress}</span>
                    </button>
                  ))}
                </section>
              )}
              {results.wifi.length > 0 && (
                <section>
                  <p className="text-[10px] uppercase text-slate-500 mb-1 flex items-center gap-1">
                    <Wifi className="h-3 w-3" /> WiFi
                  </p>
                  {results.wifi.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => go(ROUTES.WIFI)}
                      className="w-full text-left rounded-lg px-2 py-1.5 text-xs hover:bg-slate-800 text-white"
                    >
                      {w.wifiName}
                    </button>
                  ))}
                </section>
              )}
              {results.alerts.length > 0 && (
                <section>
                  <p className="text-[10px] uppercase text-slate-500 mb-1 flex items-center gap-1">
                    <Bell className="h-3 w-3" /> Alerts
                  </p>
                  {results.alerts.slice(0, 5).map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => go(ROUTES.ALERTS)}
                      className="w-full text-left rounded-lg px-2 py-1.5 text-xs hover:bg-slate-800"
                    >
                      <span className="text-white">{a.title}</span>
                    </button>
                  ))}
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
