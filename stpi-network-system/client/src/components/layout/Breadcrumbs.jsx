import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

const LABELS = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.ANALYTICS]: 'Analytics',
  [ROUTES.TOPOLOGY]: 'Network Topology',
  [ROUTES.DEVICES]: 'Device Management',
  [ROUTES.WIFI]: 'WiFi Management',
  [ROUTES.USERS]: 'Connected Users',
  [ROUTES.ALERTS]: 'Alerts Center',
  [ROUTES.REPORTS]: 'Reports',
  [ROUTES.SETTINGS]: 'Settings',
};

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const label = LABELS[pathname] || 'Overview';

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link to={ROUTES.DASHBOARD} className="hover:text-cyan-400 flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      <ChevronRight className="h-3 w-3 opacity-50" />
      <span className="text-slate-300 font-medium">{label}</span>
    </nav>
  );
};
