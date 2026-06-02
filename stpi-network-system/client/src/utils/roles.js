export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  NETWORK_ADMIN: 'network_admin',
  VIEWER: 'viewer',
};

export const normalizeRole = (role) => {
  if (role === 'admin') return ROLES.SUPER_ADMIN;
  if (role === 'operator') return ROLES.NETWORK_ADMIN;
  return role;
};

export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  network_admin: 'Network Admin',
  viewer: 'Viewer',
  admin: 'Super Admin',
  operator: 'Network Admin',
};

export const canRevealWifiPassword = (role) => {
  const r = normalizeRole(role);
  return r === ROLES.SUPER_ADMIN || r === ROLES.NETWORK_ADMIN;
};

export const canManageWifi = (role) => {
  const r = normalizeRole(role);
  return r === ROLES.SUPER_ADMIN || r === ROLES.NETWORK_ADMIN;
};
