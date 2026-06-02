const TYPES = ['router', 'switch', 'accessPoint', 'firewall', 'server'];
const STATUSES = ['online', 'offline', 'warning'];
const FLOORS = ['Core', 'Floor 1', 'Floor 2', 'Server Room', 'Conference Hall', 'Admin Office'];

export const DeviceModal = ({ open, onClose, onSubmit, initial, title }) => {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    onSubmit({
      deviceName: fd.get('deviceName'),
      ipAddress: fd.get('ipAddress'),
      type: fd.get('type'),
      status: fd.get('status'),
      location: fd.get('location'),
      floor: fd.get('floor'),
      uptime: Number(fd.get('uptime')) || 99,
      enabled: fd.get('enabled') === 'on',
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/20 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-700/60 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Device name" name="deviceName" defaultValue={initial?.deviceName} required />
          <Field label="IP address" name="ipAddress" defaultValue={initial?.ipAddress} required />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Type" name="type" options={TYPES} defaultValue={initial?.type || 'switch'} />
            <Select label="Status" name="status" options={STATUSES} defaultValue={initial?.status || 'online'} />
          </div>
          <Field label="Location" name="location" defaultValue={initial?.location} />
          <Select label="Floor" name="floor" options={FLOORS} defaultValue={initial?.floor || 'Floor 1'} />
          <Field label="Uptime %" name="uptime" type="number" defaultValue={initial?.uptime ?? 99} />
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" name="enabled" defaultChecked={initial?.enabled !== false} className="rounded" />
            Device enabled in simulation
          </label>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-600 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-2 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, name, type = 'text', defaultValue, required }) => (
  <div>
    <label className="text-xs text-slate-400">{label}</label>
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      required={required}
      className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
    />
  </div>
);

const Select = ({ label, name, options, defaultValue }) => (
  <div>
    <label className="text-xs text-slate-400">{label}</label>
    <select
      name={name}
      defaultValue={defaultValue}
      className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
