import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Power } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { DeviceModal } from '../components/devices/DeviceModal';
import { DeviceFilters } from '../components/devices/DeviceFilters';
import { enterpriseApi } from '../api/enterpriseApi';
import { useRealtime } from '../hooks/useRealtime';

const defaultFilters = {
  search: '',
  status: 'all',
  type: 'all',
  floor: 'all',
  latency: 'all',
  traffic: 'all',
};

export const DevicesPage = () => {
  const { connectionStatus, isLive } = useRealtime();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [modal, setModal] = useState({ open: false, device: null });

  const load = useCallback(() => {
    enterpriseApi
      .listDevices()
      .then((res) => setDevices(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const floors = useMemo(
    () => [...new Set(devices.map((d) => d.floor).filter(Boolean))],
    [devices]
  );

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      const q = filters.search.toLowerCase();
      if (q && !`${d.deviceName} ${d.ipAddress} ${d.location}`.toLowerCase().includes(q)) return false;
      if (filters.status !== 'all' && d.status !== filters.status) return false;
      if (filters.type !== 'all' && d.type !== filters.type) return false;
      if (filters.floor !== 'all' && d.floor !== filters.floor) return false;
      if (filters.latency === 'low' && d.latency >= 15) return false;
      if (filters.latency === 'high' && d.latency <= 30) return false;
      if (filters.traffic === 'high' && d.traffic <= 400) return false;
      if (filters.traffic === 'low' && d.traffic >= 200) return false;
      return true;
    });
  }, [devices, filters]);

  const handleSave = async (payload) => {
    if (modal.device) {
      await enterpriseApi.updateDevice(modal.device.id, payload);
    } else {
      await enterpriseApi.createDevice(payload);
    }
    setModal({ open: false, device: null });
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this simulated device?')) return;
    await enterpriseApi.deleteDevice(id);
    load();
  };

  const handleToggle = async (id) => {
    await enterpriseApi.toggleDevice(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Device Management</h1>
          <p className="text-sm text-slate-400">Simulated inventory · CRUD for demo NOC workflows</p>
        </div>
        <div className="flex items-center gap-2">
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
          <button
            type="button"
            onClick={() => setModal({ open: true, device: null })}
            className="flex items-center gap-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> Add device
          </button>
        </div>
      </div>

      <DeviceFilters filters={filters} onChange={setFilters} floors={floors} />

      <Card title={`Devices (${filtered.length})`} className="bg-white/5! border-white/10!">
        {loading ? (
          <p className="text-sm text-slate-500 py-8 text-center">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-500 py-8 text-center">No devices match filters</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/60 text-left text-xs text-slate-500">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">IP</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Floor</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Uptime</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-b border-slate-800/80 hover:bg-slate-800/30">
                    <td className="py-3 pr-4 font-medium text-white">{d.deviceName}</td>
                    <td className="py-3 pr-4 font-mono text-slate-400">{d.ipAddress}</td>
                    <td className="py-3 pr-4 capitalize text-slate-300">{d.type}</td>
                    <td className="py-3 pr-4 text-slate-400">{d.floor}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                          d.status === 'online'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : d.status === 'warning'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{d.uptime}%</td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setModal({ open: true, device: d })}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-cyan-400"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(d.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-amber-400"
                          aria-label="Toggle"
                        >
                          <Power className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(d.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-rose-400"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <DeviceModal
        open={modal.open}
        initial={modal.device}
        title={modal.device ? 'Edit device' : 'Add device'}
        onClose={() => setModal({ open: false, device: null })}
        onSubmit={handleSave}
      />
    </div>
  );
};
