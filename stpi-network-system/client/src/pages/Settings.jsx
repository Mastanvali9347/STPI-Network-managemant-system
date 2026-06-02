import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { authService } from '../services/authService';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const handlePassword = async (e) => {
    e.preventDefault();
    setPwdMsg('');
    if (pwd.next !== pwd.confirm) {
      setPwdMsg('New passwords do not match');
      return;
    }
    setPwdLoading(true);
    try {
      await authService.changePassword(pwd.current, pwd.next);
      setPwdMsg('Password updated successfully');
      setPwd({ current: '', next: '', confirm: '' });
    } catch (err) {
      setPwdMsg(err.response?.data?.message || 'Password change failed');
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-400">Preferences and admin profile</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Admin profile" subtitle="Current session">
          <dl className="space-y-3 text-sm">
            <Row label="Name" value={user?.name} />
            <Row label="Email" value={user?.email} />
            <Row label="Role" value={user?.role} className="capitalize text-cyan-400" />
          </dl>
        </Card>

        <Card title="Dashboard preferences" subtitle="Stored locally in browser">
          <div className="space-y-4 text-sm">
            <label className="flex items-center justify-between">
              <span className="text-slate-400">Theme</span>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value })}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-white"
              >
                <option value="dark">Dark (NOC)</option>
                <option value="light">Light</option>
              </select>
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Refresh interval (simulated)</span>
              <select
                value={settings.refreshInterval}
                onChange={(e) => updateSettings({ refreshInterval: Number(e.target.value) })}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-white"
              >
                <option value={3}>3 seconds</option>
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSettings({ notifications: e.target.checked })}
              />
              Enable toast notifications
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                checked={settings.compactCharts}
                onChange={(e) => updateSettings({ compactCharts: e.target.checked })}
              />
              Compact chart layout
            </label>
          </div>
        </Card>

        <Card title="Change password" subtitle="Requires current password" className="lg:col-span-2">
          <form onSubmit={handlePassword} className="grid gap-4 sm:grid-cols-3 max-w-3xl">
            <input
              type="password"
              placeholder="Current password"
              value={pwd.current}
              onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
              className="rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-white"
              required
            />
            <input
              type="password"
              placeholder="New password (8+ chars)"
              value={pwd.next}
              onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
              className="rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-white"
              required
              minLength={8}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={pwd.confirm}
              onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
              className="rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-white"
              required
            />
            <button
              type="submit"
              disabled={pwdLoading}
              className="sm:col-span-3 w-fit rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {pwdLoading ? 'Updating…' : 'Update password'}
            </button>
            {pwdMsg && (
              <p className={`sm:col-span-3 text-sm ${pwdMsg.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pwdMsg}
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

const Row = ({ label, value, className = 'text-white' }) => (
  <div className="flex justify-between border-b border-slate-700/50 pb-2">
    <dt className="text-slate-500">{label}</dt>
    <dd className={className}>{value}</dd>
  </div>
);
