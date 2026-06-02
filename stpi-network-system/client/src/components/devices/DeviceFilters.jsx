export const DeviceFilters = ({ filters, onChange, floors }) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
    <input
      type="search"
      placeholder="Search devices…"
      value={filters.search}
      onChange={(e) => onChange({ ...filters, search: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500 sm:col-span-2"
    />
    <select
      value={filters.status}
      onChange={(e) => onChange({ ...filters, status: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">All status</option>
      <option value="online">Online</option>
      <option value="offline">Offline</option>
      <option value="warning">Warning</option>
    </select>
    <select
      value={filters.type}
      onChange={(e) => onChange({ ...filters, type: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">All types</option>
      <option value="router">Router</option>
      <option value="switch">Switch</option>
      <option value="accessPoint">Access Point</option>
      <option value="firewall">Firewall</option>
      <option value="server">Server</option>
    </select>
    <select
      value={filters.floor}
      onChange={(e) => onChange({ ...filters, floor: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">All floors</option>
      {floors.map((f) => (
        <option key={f} value={f}>
          {f}
        </option>
      ))}
    </select>
    <select
      value={filters.latency}
      onChange={(e) => onChange({ ...filters, latency: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">Any latency</option>
      <option value="low">&lt; 15ms</option>
      <option value="high">&gt; 30ms</option>
    </select>
    <select
      value={filters.traffic}
      onChange={(e) => onChange({ ...filters, traffic: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">Any traffic</option>
      <option value="high">&gt; 400 Mbps</option>
      <option value="low">&lt; 200 Mbps</option>
    </select>
  </div>
);
