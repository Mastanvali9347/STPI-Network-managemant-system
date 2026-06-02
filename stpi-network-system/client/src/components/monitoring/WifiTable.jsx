import { statusBadgeClass } from '../../utils/statusColors';

export const WifiTable = ({ networks }) => (
  <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
    <table className="w-full min-w-180 text-left text-sm">
      <thead>
        <tr className="border-b border-slate-700/80 bg-slate-900/40 text-xs uppercase tracking-wider text-slate-500">
          <th className="px-4 py-3">WiFi Name</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Connected Users</th>
          <th className="px-4 py-3">Frequency</th>
          <th className="px-4 py-3">Signal</th>
          <th className="px-4 py-3">Password</th>
        </tr>
      </thead>
      <tbody>
        {(networks || []).map((w) => (
          <tr
            key={w.id || w.wifiName}
            className="border-b border-slate-800/50 transition-colors hover:bg-cyan-500/5"
          >
            <td className="px-4 py-3 font-medium text-white">{w.wifiName || w.ssid}</td>
            <td className="px-4 py-3">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs capitalize ${statusBadgeClass(w.status)}`}
              >
                {w.status}
              </span>
            </td>
            <td className="px-4 py-3">{w.connectedUsers ?? w.clients}</td>
            <td className="px-4 py-3">{w.frequency || w.band}</td>
            <td className="px-4 py-3">{w.signalStrength} dBm</td>
            <td className="px-4 py-3 font-mono text-slate-500 tracking-widest">
              {w.password || '********'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
