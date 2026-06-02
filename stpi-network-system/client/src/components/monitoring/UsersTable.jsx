import { statusBadgeClass, statusDotClass } from '../../utils/statusColors';

export const UsersTable = ({ users }) => (
  <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
    <table className="w-full min-w-200 text-left text-sm">
      <thead>
        <tr className="border-b border-slate-700/80 bg-slate-900/40 text-xs uppercase tracking-wider text-slate-500">
          <th className="px-4 py-3">Device name</th>
          <th className="px-4 py-3">IP address</th>
          <th className="px-4 py-3">MAC address</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Upload</th>
          <th className="px-4 py-3">Download</th>
        </tr>
      </thead>
      <tbody>
        {(users || []).map((u) => (
          <tr
            key={u.id}
            className="border-b border-slate-800/50 transition-all duration-200 hover:bg-emerald-500/5"
          >
            <td className="px-4 py-3 font-medium text-white">{u.deviceName || u.name}</td>
            <td className="px-4 py-3 font-mono text-xs">{u.ipAddress || u.ip}</td>
            <td className="px-4 py-3 font-mono text-xs text-slate-500">
              {u.macAddress || u.mac}
            </td>
            <td className="px-4 py-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs capitalize ${statusBadgeClass(u.status)}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass(u.status)}`} />
                {u.status}
              </span>
            </td>
            <td className="px-4 py-3 text-cyan-400">{u.uploadSpeed} Mbps</td>
            <td className="px-4 py-3 text-emerald-400">{u.downloadSpeed} Mbps</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
