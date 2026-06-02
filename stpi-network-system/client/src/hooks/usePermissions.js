import { useAuth } from './useAuth';
import {
  canRevealWifiPassword,
  canManageWifi,
  normalizeRole,
  ROLE_LABELS,
} from '../utils/roles';

export const usePermissions = () => {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);

  return {
    role,
    roleLabel: ROLE_LABELS[user?.role] || ROLE_LABELS[role] || 'User',
    canRevealWifiPassword: canRevealWifiPassword(user?.role),
    canManageWifi: canManageWifi(user?.role),
    isViewer: role === 'viewer',
    isSuperAdmin: role === 'super_admin',
  };
};
