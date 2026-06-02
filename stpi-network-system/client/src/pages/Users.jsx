import { useEffect, useState } from 'react';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { TableSkeleton } from '../components/monitoring/Skeleton';
import { useRealtime } from '../hooks/useRealtime';
import { wifiApi } from '../api/wifiApi';

export const UsersPage = () => {
  const { wifiClients: liveClients, connectionStatus, isLive } = useRealtime();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    wifiApi
      .getClients({ q: q || undefined })
      .then((res) => setClients(res.data.clients || []))
      .finally(() => setLoading(false));
  }, [q]);

  useEffect(() => {
    if (liveClients?.length) setClients(liveClients);
  }, [liveClients]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Connected Devices</h1>
          <p className="text-sm text-slate-400">
            Live WiFi clients — MAC, IP, roaming, throughput (simulated)
          </p>
        </div>
        <ConnectionStatus status={connectionStatus} isLive={isLive} />
      </div>

      <input
        type="search"
        placeholder="Search device, MAC, IP, SSID…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full max-w-md rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
      />

      {loading && !clients.length ? (
        <TableSkeleton rows={6} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full min-w-250 text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700/80 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">MAC</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">OS</th>
                <th className="px-4 py-3">Manufacturer</th>
                <th className="px-4 py-3">Signal</th>
                <th className="px-4 py-3">Up / Down</th>
                <th className="px-4 py-3">SSID</th>
                <th className="px-4 py-3">AP</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-cyan-500/5">
                  <td className="px-4 py-3 font-medium text-white">{c.deviceName}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{c.macAddress}</td>
                  <td className="px-4 py-3 font-mono text-xs">{c.ipAddress}</td>
                  <td className="px-4 py-3 text-slate-300">{c.osType || '—'}</td>
                  <td className="px-4 py-3 text-slate-300">{c.manufacturer || '—'}</td>
                  <td className="px-4 py-3">{c.signalStrength} dBm</td>
                  <td className="px-4 py-3 text-xs">
                    ↑{c.uploadSpeed} / ↓{c.downloadSpeed} Mbps
                  </td>
                  <td className="px-4 py-3">{c.ssid}</td>
                  <td className="px-4 py-3 text-slate-400">{c.accessPoint}</td>
                  <td className="px-4 py-3">{Math.round(c.connectedMinutes || 0)} min</td>
                  <td className="px-4 py-3 capitalize text-emerald-400">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!clients.length && (
            <p className="py-8 text-center text-sm text-slate-500">No connected devices</p>
          )}
        </div>
      )}
    </div>
  );
};
