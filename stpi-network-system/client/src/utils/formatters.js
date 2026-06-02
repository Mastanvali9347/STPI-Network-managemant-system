export const formatPercent = (value) => `${Math.round(value)}%`;

export const formatNumber = (value) =>
  new Intl.NumberFormat('en-IN').format(value);

export const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

export const severityColor = (severity) => {
  const map = {
    info: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    warning: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    critical: 'text-rose-400 bg-rose-400/10 border-rose-400/30',
  };
  return map[severity] || map.info;
};
