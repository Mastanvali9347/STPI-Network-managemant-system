import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Network,
  Server,
  Wifi,
  Users,
  Bell,
  FileText,
  Settings,
  LogOut,
  Activity,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { ROUTES } from '../utils/constants';


const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Command Center', icon: LayoutDashboard },
  { to: ROUTES.TOPOLOGY, label: 'Topology', icon: Network },
  { to: ROUTES.DEVICES, label: 'Devices', icon: Server },
  { to: ROUTES.WIFI, label: 'WiFi', icon: Wifi },
  { to: ROUTES.USERS, label: 'Users', icon: Users },
  { to: ROUTES.ALERTS, label: 'Alerts', icon: Bell },
  { to: ROUTES.REPORTS, label: 'Reports', icon: FileText },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
];

export const Sidebar = ({ open, onClose }) => {
  const { logout } = useAuth();
  const { settings, updateSettings } = useSettings();


  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-cyan-500/15 text-cyan-400 shadow-sm shadow-cyan-500/10 border border-cyan-500/20'
        : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100 border border-transparent'
    }`;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-700/60 bg-surface-800 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-slate-700/60 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">STPI Network</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Enterprise NOC</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-700/60 p-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-slate-900/50 p-1.5 border border-slate-700/50">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${settings.theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              title="Light Mode"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateSettings({ theme: 'system' })}
              className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${settings.theme === 'system' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              title="System Default"
            >
              <Laptop className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${settings.theme === 'dark' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              title="Dark Mode"
            >
              <Moon className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

    </>
  );
};
