import { createContext, useCallback, useState, useEffect, useRef } from 'react';
import { useRealtimeMonitoring } from '../hooks/useRealtimeMonitoring';
import { useSettings } from '../hooks/useSettings';

export const RealtimeContext = createContext(null);

export const RealtimeProvider = ({ children }) => {
  const { settings } = useSettings();
  const monitoring = useRealtimeMonitoring();
  const [toasts, setToasts] = useState([]);
  const lastAlertIdRef = useRef(null);
  const alertsInitializedRef = useRef(false);

  // Show unavailability warning once if socket is not available
  useEffect(() => {
    if (!monitoring.isSocketAvailable && monitoring.connectionStatus === 'unavailable') {
      const hasShownWarning = sessionStorage.getItem('socket-unavailable-shown');
      if (!hasShownWarning) {
        console.warn('[Realtime] Socket.IO unavailable - application running in API-only mode');
        sessionStorage.setItem('socket-unavailable-shown', 'true');
      }
    }
  }, [monitoring.isSocketAvailable, monitoring.connectionStatus]);

  const pushToast = useCallback((toast) => {
    if (!settings.notifications) return;
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, ...toast }].slice(-5));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, [settings.notifications]);

  // Skip toasts for initial alert list; only notify on newly arrived alerts
  useEffect(() => {
    const latest = monitoring.alerts?.[0];
    if (!latest?.id) return;

    if (!alertsInitializedRef.current) {
      lastAlertIdRef.current = latest.id;
      alertsInitializedRef.current = true;
      return;
    }

    if (latest.id === lastAlertIdRef.current) return;

    if (latest.severity === 'critical' || latest.severity === 'warning') {
      lastAlertIdRef.current = latest.id;
      pushToast({
        severity: latest.severity,
        title: latest.title,
        message: latest.message,
      });
    }
  }, [monitoring.alerts, pushToast]);

  // WiFi join/disconnect toasts
  const lastWifiEventRef = useRef(null);
  useEffect(() => {
    const latest = monitoring.wifiEvents?.[0];
    if (!latest?.id || latest.id === lastWifiEventRef.current) return;
    lastWifiEventRef.current = latest.id;
    pushToast({
      severity: latest.type === 'disconnect' ? 'warning' : 'info',
      title: `WiFi ${latest.type}`,
      message: latest.message,
    });
  }, [monitoring.wifiEvents, pushToast]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <RealtimeContext.Provider value={{ ...monitoring, toasts, pushToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      {!monitoring.isSocketAvailable && (
        <BackendUnavailableWarning />
      )}
    </RealtimeContext.Provider>
  );
};

const ToastContainer = ({ toasts, onDismiss }) => (
  <div className="fixed bottom-4 right-4 z-100 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
    {toasts.map((t) => (
      <div
        key={t.id}
        role="alert"
        className={`rounded-xl border px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-300 ${
          t.severity === 'critical'
            ? 'border-rose-500/40 bg-rose-950/90 text-rose-100 animate-pulse'
            : t.severity === 'warning'
              ? 'border-amber-500/40 bg-amber-950/90 text-amber-100'
              : 'border-cyan-500/40 bg-slate-900/90 text-slate-100'
        }`}
      >
        <div className="flex justify-between gap-2">
          <div>
            <p className="font-semibold text-sm">⚠ {t.title}</p>
            <p className="text-xs mt-0.5 opacity-80">{t.message}</p>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            className="text-xs opacity-60 hover:opacity-100 shrink-0"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Warning shown when backend Socket.IO server is unavailable
 */
const BackendUnavailableWarning = () => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md">
    <div className="rounded-xl border border-amber-500/40 bg-amber-950/90 px-4 py-3 text-sm text-amber-100 shadow-xl backdrop-blur-xl">
      <p className="font-semibold">⚠ Backend Server Unavailable</p>
      <p className="text-xs mt-1 opacity-90">
        Socket.IO server is not configured. Application running in API-only mode. Set VITE_SOCKET_URL or VITE_API_URL to enable real-time updates.
      </p>
    </div>
  </div>
);
