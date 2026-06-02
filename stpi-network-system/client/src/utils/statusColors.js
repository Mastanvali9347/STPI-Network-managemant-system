/** Status → Tailwind classes for tables and badges */
export const statusBadgeClass = (status) => {
  const map = {
    online: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    offline: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    degraded: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    healthy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  };
  return map[status] || map.online;
};

export const statusDotClass = (status) => {
  const map = {
    online: 'bg-emerald-400 shadow-emerald-400/50',
    offline: 'bg-rose-500 shadow-rose-500/50',
    warning: 'bg-amber-400 shadow-amber-400/50 animate-pulse',
  };
  return map[status] || map.online;
};
