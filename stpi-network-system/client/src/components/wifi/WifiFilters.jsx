import { FLOORS } from './wifiConstants';

export const WifiFilters = ({ filters, onChange }) => (
  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
    <input
      type="search"
      placeholder="Search SSID, AP, floor…"
      value={filters.q}
      onChange={(e) => onChange({ ...filters, q: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white sm:col-span-2 lg:col-span-1"
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
      value={filters.band}
      onChange={(e) => onChange({ ...filters, band: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">All bands</option>
      <option value="2.4 GHz">2.4 GHz</option>
      <option value="5 GHz">5 GHz</option>
    </select>
    <select
      value={filters.floor}
      onChange={(e) => onChange({ ...filters, floor: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">All floors</option>
      {FLOORS.map((f) => (
        <option key={f} value={f}>
          {f}
        </option>
      ))}
    </select>
    <select
      value={filters.signal}
      onChange={(e) => onChange({ ...filters, signal: e.target.value })}
      className="rounded-lg border border-slate-600 bg-slate-800/60 px-3 py-2 text-sm text-white"
    >
      <option value="all">Any signal</option>
      <option value="good">Good (≥ -65 dBm)</option>
      <option value="weak">Weak (&lt; -70 dBm)</option>
    </select>
  </div>
);
