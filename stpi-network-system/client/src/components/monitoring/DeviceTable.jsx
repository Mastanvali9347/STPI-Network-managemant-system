import { statusBadgeClass, statusDotClass } from '../../utils/statusColors';

export const DeviceTable = ({ devices }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-200 text-left text-sm">
      <thead>
        <tr className="border-b border-slate-700/80 text-xs uppercase tracking-wider text-slate-500">
          <th className="pb-3 pr-4">Device</th>
          <th className="pb-3 pr-4">IP</th>
          <th className="pb-3 pr-4">Status</th>
          <th className="pb-3 pr-4">Uptime</th>
          <th className="pb-3 pr-4">Traffic</th>
          <th className="pb-3 pr-4">Latency</th>
          <th className="pb-3">Users</th>
        </tr>
      </thead>
      <tbody>
        {(devices || []).map((d) => (
          <tr
            key={d.id}
            className="border-b border-slate-800/60 text-slate-300 transition-colors hover:bg-white/5"
          >
            <td className="py-3 pr-4 font-medium text-white">{d.deviceName}</td>
            <td className="py-3 pr-4 font-mono text-xs">{d.ipAddress}</td>
            <td className="py-3 pr-4">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs capitalize ${statusBadgeClass(d.status)}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusDotClass(d.status)}`} />
                {d.status}
              </span>
            </td>
            <td className="py-3 pr-4">{d.uptime}%</td>
            <td className="py-3 pr-4">{d.traffic} Mbps</td>
            <td className="py-3 pr-4">{d.latency} ms</td>
            <td className="py-3">{d.activeUsers}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
