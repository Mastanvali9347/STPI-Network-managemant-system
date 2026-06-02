/** Enterprise RBAC — map legacy roles for backward compatibility */
const ROLES = {
  SUPER_ADMIN: 'super_admin',
  NETWORK_ADMIN: 'network_admin',
  VIEWER: 'viewer',
};

const normalizeRole = (role) => {
  if (role === 'admin') return ROLES.SUPER_ADMIN;
  if (role === 'operator') return ROLES.NETWORK_ADMIN;
  return role;
};

const PERMISSIONS = {
  VIEW_WIFI_DASHBOARD: [ROLES.SUPER_ADMIN, ROLES.NETWORK_ADMIN, ROLES.VIEWER],
  MANAGE_WIFI: [ROLES.SUPER_ADMIN, ROLES.NETWORK_ADMIN],
  REVEAL_WIFI_PASSWORD: [ROLES.SUPER_ADMIN, ROLES.NETWORK_ADMIN],
  MANAGE_DEVICES: [ROLES.SUPER_ADMIN, ROLES.NETWORK_ADMIN],
  VIEW_AUDIT_LOGS: [ROLES.SUPER_ADMIN, ROLES.NETWORK_ADMIN],
  EXPORT_REPORTS: [ROLES.SUPER_ADMIN, ROLES.NETWORK_ADMIN, ROLES.VIEWER],
};

const can = (userRole, permission) => {
  const role = normalizeRole(userRole);
  return PERMISSIONS[permission]?.includes(role) ?? false;
};

module.exports = { ROLES, normalizeRole, can, PERMISSIONS };
