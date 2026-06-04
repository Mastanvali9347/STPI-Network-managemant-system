import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLoading } from '../components/AuthLoading';
import { ROUTES } from '../utils/constants';

const DashboardPage = lazy(() => import('../pages/Dashboard').then((m) => ({ default: m?.DashboardPage || m?.default })));
const AnalyticsPage = lazy(() => import('../pages/Analytics').then((m) => ({ default: m?.AnalyticsPage || m?.default })));
const TopologyPage = lazy(() => import('../pages/Topology').then((m) => ({ default: m?.TopologyPage || m?.default })));
const DevicesPage = lazy(() => import('../pages/Devices').then((m) => ({ default: m?.DevicesPage || m?.default })));
const WifiPage = lazy(() => import('../pages/Wifi').then((m) => ({ default: m?.WifiPage || m?.default })));
const UsersPage = lazy(() => import('../pages/Users').then((m) => ({ default: m?.UsersPage || m?.default })));
const AlertsPage = lazy(() => import('../pages/Alerts').then((m) => ({ default: m?.AlertsPage || m?.default })));
const ReportsPage = lazy(() => import('../pages/Reports').then((m) => ({ default: m?.ReportsPage || m?.default })));
const SettingsPage = lazy(() => import('../pages/Settings').then((m) => ({ default: m?.SettingsPage || m?.default })));


const PageLoader = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <AuthLoading />
  </div>
);

export const AppRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.ANALYTICS}
        element={
          <Suspense fallback={<PageLoader />}>
            <AnalyticsPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.TOPOLOGY}
        element={
          <Suspense fallback={<PageLoader />}>
            <TopologyPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.DEVICES}
        element={
          <Suspense fallback={<PageLoader />}>
            <DevicesPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.WIFI}
        element={
          <Suspense fallback={<PageLoader />}>
            <WifiPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.USERS}
        element={
          <Suspense fallback={<PageLoader />}>
            <UsersPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.ALERTS}
        element={
          <Suspense fallback={<PageLoader />}>
            <AlertsPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.REPORTS}
        element={
          <Suspense fallback={<PageLoader />}>
            <ReportsPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        }
      />
    </Route>

    <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
  </Routes>
);
