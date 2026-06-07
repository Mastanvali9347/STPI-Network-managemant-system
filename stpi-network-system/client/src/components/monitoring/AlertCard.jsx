import { TriangleAlert, Info, CircleX } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

const icons = {
  critical: CircleX,
  warning: TriangleAlert,
  info: Info,
};

const styles = {
  critical: 'border-rose-500/40 bg-rose-500/5 text-rose-300',
  warning: 'border-amber-500/40 bg-amber-500/5 text-amber-300 animate-pulse-slow',
  info: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300',
};

export const AlertCard = ({ alert, blink = false }) => {
  const Icon = icons[alert.severity] || Info;
  const style = styles[alert.severity] || styles.info;

  return (
    <div
      className={`rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:border-opacity-80 ${style} ${
        blink && alert.severity === 'critical' ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="font-semibold text-white">
              {alert.severity === 'critical' || alert.severity === 'warning' ? '⚠ ' : ''}
              {alert.title}
            </p>
            <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase border border-current">
              {alert.severity}
            </span>
          </div>
          <p className="mt-1 text-sm opacity-90">{alert.message}</p>
          <p className="mt-2 text-xs opacity-60">
            {alert.source} · {formatDateTime(alert.timestamp || alert.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
