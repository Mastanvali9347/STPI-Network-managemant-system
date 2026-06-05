import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { authService } from '../services/authService';
import { Sun, Moon, Laptop } from 'lucide-react';


export const SettingsPage = () => {
  const { user } = useAuth();
  const { settings, updateSettings, resetSettings } = useSettings();
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
          <div className="space-y-6 text-sm">
            <div className="space-y-3">
              <span className="text-slate-400 block font-medium">Theme mode</span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark (NOC)', icon: Moon },
                  { value: 'system', label: 'System', icon: Laptop },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.value}
                      onClick={() => updateSettings({ theme: t.value })}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                        settings.theme === t.value
                          ? 'border-cyan-500 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/5'
                          : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-500 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex items-center justify-between gap-4 py-2 border-t border-slate-700/50">
              <span className="text-slate-400">Data Refresh rate</span>
              <select
                value={settings.refreshInterval}
                onChange={(e) => updateSettings({ refreshInterval: Number(e.target.value) })}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value={3}>Fast (3s)</option>
                <option value={5}>Medium (5s)</option>
                <option value={10}>Slow (10s)</option>
              </select>
            </label>

            <div className="space-y-3 border-t border-slate-700/50 pt-4">
              <span className="text-slate-400 block font-medium">Interface controls</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: 'notifications', label: 'Toast notifications' },
                  { key: 'showOfficeHoursBanner', label: 'Office hours banner' },
                  { key: 'showOfflineDevices', label: 'Show offline devices' },
                  { key: 'showOfflineNetworks', label: 'Show offline WiFi' },
                  { key: 'compactCharts', label: 'Compact charts' },
                ].map((item) => (
                  <label key={item.key} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 p-2.5 transition hover:border-slate-600">
                    <input
                      type="checkbox"
                      checked={settings[item.key]}
                      onChange={(e) => updateSettings({ [item.key]: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-slate-800"
                    />
                    <span className="text-slate-300">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-700/50 pt-4">
              <button
                type="button"
                onClick={resetSettings}
                className="inline-flex w-fit items-center rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-rose-500/50 hover:bg-rose-500/5 hover:text-rose-400"
              >
                Reset to factory defaults
              </button>
              <p className="text-xs text-slate-500 leading-relaxed">
                Global UI preferences are stored in your browser's local storage. System default follows your OS level light/dark mode preference.
              </p>
            </div>
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
